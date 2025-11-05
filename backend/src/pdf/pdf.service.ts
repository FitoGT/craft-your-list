import { Injectable } from '@nestjs/common';
import { GamePdfStrategy, SupportedTCG, CommonFields } from './pdf.types';
import { PokemonPdfStrategy } from './strategies/pokemon.pdf';
import { YugiohPdfStrategy } from './strategies/yugioh.pdf';

@Injectable()
export class PdfService {
  private strategies: Map<SupportedTCG, GamePdfStrategy>;

  constructor() {
    const pokemon = new PokemonPdfStrategy();
    const yugioh = new YugiohPdfStrategy();

    const entries: ReadonlyArray<readonly [SupportedTCG, GamePdfStrategy]> = [
      ['pokemon', pokemon],
      ['yugioh', yugioh],
    ];

    this.strategies = new Map<SupportedTCG, GamePdfStrategy>(entries);
  }

  private get(tcg: SupportedTCG): GamePdfStrategy {
    const strat = this.strategies.get(tcg);
    if (!strat) throw new Error(`No hay estrategia PDF registrada para ${tcg}`);
    return strat;
  }

  parse(tcg: SupportedTCG, raw: string): unknown {
    return this.get(tcg).parse(raw);
  }

  render(tcg: SupportedTCG, parsed: unknown, fields?: CommonFields) {
    return this.get(tcg).render(parsed, fields);
  }

  async listFields(tcg: SupportedTCG) {
    const s = this.get(tcg);
    if (!s.listFields) return [];
    return s.listFields();
  }
}
