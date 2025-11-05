export type SupportedTCG = 'pokemon' | 'yugioh';

export type CommonFields = Record<string, string | boolean | number | undefined>;

export interface GamePdfStrategy {
  readonly tcg: SupportedTCG;

  parse(raw: string): unknown;

  render(parsed: unknown, extraFields?: CommonFields): Promise<Buffer>;

  listFields?(): Promise<string[]>;
}
