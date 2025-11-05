import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { GamePdfStrategy, CommonFields } from '../pdf.types';

type Row = { qty: number; name: string };
export type YgoParsed = {
  monsters: Row[];
  spells: Row[];
  traps: Row[];
  side: Row[];
  extra: Row[];
};

const RX_LINE = /^\s*(\d+)\s*x?\s+(.+?)\s*$/i;
const HEADER_MAP: Record<string, keyof YgoParsed> = {
  'monsters': 'monsters',
  'spells': 'spells',
  'traps': 'traps',
  'side deck': 'side',
  'extra deck': 'extra',
};

export class YugiohPdfStrategy implements GamePdfStrategy {
  readonly tcg = 'yugioh' as const;
  private templatePath = path.join(__dirname, '..', '..', 'templates', 'yugioh-decklist.pdf');

  parse(raw: string): YgoParsed {
    const out: YgoParsed = { monsters: [], spells: [], traps: [], side: [], extra: [] };
    let current: keyof YgoParsed | null = null;

    const lines = raw.split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      if (/^main\s+deck/i.test(line)) continue;


      const headerKey = Object.keys(HEADER_MAP).find(h => line.toLowerCase().startsWith(h));
      if (headerKey) { current = HEADER_MAP[headerKey]; continue; }
      if (!current) continue;

      const m = line.match(RX_LINE);
      if (!m) continue;
      const qty = parseInt(m[1], 10);
      const name = m[2].trim();
      if (!isFinite(qty) || !name) continue;

      out[current].push({ qty, name });
    }

    return out;
  }

  private join(rows: Row[]) {
    return rows.map(r => `${r.qty} ${r.name}`).join('\n');
  }

  async render(parsed: YgoParsed, fields?: CommonFields): Promise<Buffer> {
    const bytes = fs.readFileSync(this.templatePath);
    const pdfDoc = await PDFDocument.load(bytes);
    const form = pdfDoc.getForm();

    const mapping = {
      monster: this.join(parsed.monsters),
      spells: this.join(parsed.spells),
      traps: this.join(parsed.traps),
      side_deck: this.join(parsed.side),
      extra_deck: this.join(parsed.extra),
      total_monsters: String(parsed.monsters.reduce((s, r) => s + r.qty, 0)),
      total_spells: String(parsed.spells.reduce((s, r) => s + r.qty, 0)),
      total_traps: String(parsed.traps.reduce((s, r) => s + r.qty, 0)),
      total_side: String(parsed.side.reduce((s, r) => s + r.qty, 0)),
      total_extra: String(parsed.extra.reduce((s, r) => s + r.qty, 0)),
    };

    for (const [name, value] of Object.entries(mapping)) {
      const tf = form.getTextField(name);
      tf.setText(value);
      // @ts-ignore
      tf.setMultiline?.(true);
    }

    if (fields) {
      if (fields['name']) form.getTextField('name').setText(String(fields['name'] ?? ''));
      if (fields['lastname']) form.getTextField('lastname').setText(String(fields['lastname'] ?? ''));
      if (fields['konami_id']) form.getTextField('konami_id').setText(String(fields['konami_id'] ?? ''));
    }

    const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
    form.updateFieldAppearances(helv);
    return Buffer.from(await pdfDoc.save());
  }

  async listFields(): Promise<string[]> {
    const bytes = fs.readFileSync(this.templatePath);
    const pdfDoc = await PDFDocument.load(bytes);
    const form = pdfDoc.getForm();
    return form.getFields().map(f => f.getName());
  }
}
