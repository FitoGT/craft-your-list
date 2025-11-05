import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { GamePdfStrategy, CommonFields } from '../pdf.types';
import { parseDeckFromClipboard, ParsedDeck as PokemonParsed } from '../../parse/pokemon.parser';

type Row = { qty: number; name: string; set?: string; num?: string };

export class PokemonPdfStrategy implements GamePdfStrategy {
  readonly tcg = 'pokemon' as const;
  private templatePath = path.join(__dirname, '..', '..', 'templates', 'pokemon-decklist.pdf');

  private readonly TEXT_FIELDS = new Set([
    'pokemon', 'trainer', 'energy',
    'player_name', 'player_id', 'month', 'day', 'year',
  ]);

  private readonly CHECKBOX_FIELDS = new Set(['junior', 'senior', 'master']);

  parse(raw: string): PokemonParsed {
    return parseDeckFromClipboard(raw);
  }

  private rowText(r: Row) {
    return r.set && r.num ? `${r.qty} ${r.name}  ${r.set} ${r.num}` : `${r.qty} ${r.name}`;
  }

  async render(parsed: PokemonParsed, fields?: CommonFields): Promise<Buffer> {
    const bytes = fs.readFileSync(this.templatePath);
    const pdfDoc = await PDFDocument.load(bytes);
    const form = pdfDoc.getForm();

    const fillMultiline = (name: 'pokemon' | 'trainer' | 'energy', rows: Row[]) => {
      const tf = form.getTextField(name);
      tf.setText(rows.map(this.rowText).join('\n'));
      // @ts-ignore
      tf.setMultiline?.(true);
    };

    fillMultiline('pokemon', parsed.pokemon);
    fillMultiline('trainer', parsed.trainer);
    fillMultiline('energy', parsed.energy);

    if (fields) {
      for (const [name, value] of Object.entries(fields)) {
        if (this.TEXT_FIELDS.has(name)) {
          form.getTextField(name).setText(String(value ?? ''));
          continue;
        }
        if (this.CHECKBOX_FIELDS.has(name)) {
          const cb = form.getCheckBox(name);
          const v = typeof value === 'boolean'
            ? value
            : typeof value === 'string'
              ? ['yes', 'on', 'true', '1'].includes(value.toLowerCase())
              : false;
          v ? cb.check() : cb.uncheck();
        }
      }
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
