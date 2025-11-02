export type Line = { qty: number; name: string; set?: string; num?: string };
export type ParsedDeck = { pokemon: Line[]; trainer: Line[]; energy: Line[] };

const SECTION_HEADERS = ['Pokémon', 'Trainer', 'Energy'] as const;
type Section = typeof SECTION_HEADERS[number];

const LINE_WITH_SET = /^(\d+)\s+(.+?)\s+([A-Z]{2,4})\s+(\d+[A-Z]?)$/;
const LINE_SIMPLE = /^(\d+)\s+(.+?)$/;

function parseLine(line: string): Line | null {
  const s = line.trim();
  let m = s.match(LINE_WITH_SET);
  if (m) {
    return { qty: parseInt(m[1], 10), name: m[2].trim(), set: m[3], num: m[4] };
  }
  m = s.match(LINE_SIMPLE);
  if (m) {
    return { qty: parseInt(m[1], 10), name: m[2].trim() };
  }
  return null;
}

function isHeader(line: string): Section | null {
  const clean = line.trim().replace(/\s*\(\d+\)\s*$/, '');
  for (const h of SECTION_HEADERS) if (clean.toLowerCase().startsWith(h.toLowerCase())) return h;
  return null;
}

export function parseDeckFromClipboard(raw: string): ParsedDeck {
  const lines = raw.split(/\r?\n/);

  let current: Section | null = null;
  const out: ParsedDeck = { pokemon: [], trainer: [], energy: [] };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const header = isHeader(line);
    if (header) { current = header; continue; }
    if (!current) continue;

    const parsed = parseLine(line);
    if (!parsed) continue;

    if (current === 'Pokémon') out.pokemon.push(parsed);
    else if (current === 'Trainer') out.trainer.push(parsed);
    else out.energy.push(parsed);
  }

  return out;
}
