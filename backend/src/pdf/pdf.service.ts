import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { ParsedDeck } from '../parse/pokemon.parser';

type Row = { qty: number; name: string; set?: string; num?: string };

@Injectable()
export class PdfService {
  private templatePath = path.join(__dirname, '..', 'templates', 'pokemon-decklist.pdf');

  private readonly TEXT_FIELDS = new Set([
    'pokemon', 'trainer', 'energy', // sections
    'player_name', 'player_id', 'month', 'day', 'year', // player data
  ]);

  private readonly CHECKBOX_FIELDS = new Set(['junior', 'senior', 'master']);

  async render(
    deck: ParsedDeck,
    fields?: Record<string, string | boolean>
  ): Promise<Buffer> {
    const bytes = fs.readFileSync(this.templatePath);
    const pdfDoc = await PDFDocument.load(bytes);
    const form = pdfDoc.getForm();

    const rowText = (r: Row) =>
      r.set && r.num ? `${r.qty} ${r.name}  ${r.set} ${r.num}` : `${r.qty} ${r.name}`;

    const fillMultilineText = (name: 'pokemon' | 'trainer' | 'energy', rows: Row[]) => {
      let tf;
      try {
        tf = form.getTextField(name);
      } catch {
        throw new Error(`El campo de formulario "${name}" no existe en la plantilla PDF.`);
      }
      tf.setText(rows.map(rowText).join('\n'));
      // @ts-ignore
      tf.setMultiline?.(true);
    };

    fillMultilineText('pokemon', deck.pokemon);
    fillMultilineText('trainer', deck.trainer);
    fillMultilineText('energy', deck.energy);

    if (fields) {
      for (const [name, value] of Object.entries(fields)) {
        if (this.TEXT_FIELDS.has(name)) {
          try {
            const tf = form.getTextField(name);
            tf.setText(String(value ?? ''));
          } catch {
            throw new Error(`El TextField "${name}" no existe en el PDF (revisa el nombre en el template).`);
          }
          continue;
        }

        if (this.CHECKBOX_FIELDS.has(name)) {
          try {
            const cb = form.getCheckBox(name);
            const v = typeof value === 'boolean'
              ? value
              : typeof value === 'string'
                ? ['yes', 'on', 'true', '1'].includes(value.toLowerCase())
                : false;
            v ? cb.check() : cb.uncheck();
          } catch {
            throw new Error(`El CheckBox "${name}" no existe en el PDF (revisa el nombre en el template).`);
          }
          continue;
        }

      }
    }

    const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
    form.updateFieldAppearances(helv);
    const out = await pdfDoc.save();
    return Buffer.from(out);
  }

  async listFields(): Promise<string[]> {
    const templateBytes = fs.readFileSync(this.templatePath);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();
    return form.getFields().map((f) => f.getName());
  }
}
