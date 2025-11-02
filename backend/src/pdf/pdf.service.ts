import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { ParsedDeck } from '../parse/pokemon.parser';

type Row = { qty: number; name: string; set?: string; num?: string };

@Injectable()
export class PdfService {
  private templatePath = path.join(__dirname, '..', 'templates', 'pokemon-decklist.pdf');

  async render(deck: ParsedDeck): Promise<Buffer> {
    const bytes = fs.readFileSync(this.templatePath);
    const pdfDoc = await PDFDocument.load(bytes);
    const form = pdfDoc.getForm();

    const rowText = (r: Row) =>
      r.set && r.num ? `${r.qty} ${r.name}  ${r.set} ${r.num}` : `${r.qty} ${r.name}`;

    const fillSection = (fieldName: 'pokemon' | 'trainer' | 'energy', rows: Row[]) => {
      let field;
      try {
        field = form.getTextField(fieldName);
      } catch {
        throw new Error(`El campo de formulario "${fieldName}" no existe en la plantilla PDF.`);
      }
      const text = rows.map(rowText).join('\n');
      field.setText(text);
      try {
        // @ts-ignore
        field.setMultiline?.(true);
      } catch { }
    };

    fillSection('pokemon', deck.pokemon);
    fillSection('trainer', deck.trainer);
    fillSection('energy', deck.energy);

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
