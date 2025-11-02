import { Injectable } from '@nestjs/common';
import { parseDeckFromClipboard, ParsedDeck } from './pokemon.parser';

@Injectable()
export class ParseService {
  parseDeck(raw: string): ParsedDeck {
    return parseDeckFromClipboard(raw);
  }
}
