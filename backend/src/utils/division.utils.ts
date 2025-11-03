export type Division = 'junior' | 'senior' | 'master';

export function calculateDivision(birthdate: Date): Division {
  const y = birthdate.getUTCFullYear();
  if (y >= 2013) return 'junior';
  if (y >= 2009 && y <= 2012) return 'senior';
  return 'master';
}

export function splitBirthdateParts(birthdate: Date) {
  const month = String(birthdate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(birthdate.getUTCDate()).padStart(2, '0');
  const year = String(birthdate.getUTCFullYear());
  return { month, day, year };
}
