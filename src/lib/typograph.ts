// Russian typesetting for static copy: a one-letter preposition or
// conjunction («в», «и», «с»…) never ends a line, and a dash never starts
// one. Longer words stay breakable: bound pairs in display type would
// overflow a 320px screen.
const ONE_LETTER_WORD = /(?<=^|[\s(«])([А-Яа-яЁё]) /g;
const SPACE_BEFORE_DASH = / —/g;

export const typograph = (text: string): string =>
  text.replace(ONE_LETTER_WORD, "$1 ").replace(SPACE_BEFORE_DASH, " —");
