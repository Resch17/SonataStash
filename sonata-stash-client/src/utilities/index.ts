import { Book, Composer, Key } from '../types';

export const trimmedOrNull = (
  input: string | null | undefined
): string | null => {
  if (!input) return null;
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const positiveOrNull = (
  input: number | null | undefined
): number | null => {
  if (!input) return null;
  if (input > 0) return input;
  return null;
};

export const bookNameDisplay = (book: Book) => {
  let name = book.bookTitle;
  if (book.composer) {
    name = `${book.composer.lastName} - ${name}`;
  }
  if (book.volumeInfo) {
    name = `${name} (${book.volumeInfo})`;
  }
  return name;
};

export const composerNameDisplay = (composer: Composer, nameOnly?: boolean) => {
  let name = '';
  if (!composer.firstName) {
    name = composer.lastName;
  } else {
    name = composer.firstName + ' ' + composer.lastName;
  }
  if (nameOnly) return name;
  if (composer.nationality) {
    name += ` - ${composer.nationality}`;
  }
  if (composer.pieceCount && composer.pieceCount > 0) {
    if (composer.pieceCount == 1) {
      name += ' - 1 piece';
    } else {
      name += ` - ${composer.pieceCount} pieces`;
    }
  }
  return name;
};

export const keys: Key[] = [
  'C Major',
  'C Minor',
  'C# Major',
  'C# Minor',
  'Db Major',
  'Db Minor',
  'D Major',
  'D Minor',
  'D# Major',
  'D# Minor',
  'Eb Major',
  'Eb Minor',
  'E Major',
  'E Minor',
  'F Major',
  'F Minor',
  'F# Major',
  'F# Minor',
  'Gb Major',
  'Gb Minor',
  'G Major',
  'G Minor',
  'G# Major',
  'G# Minor',
  'Ab Major',
  'Ab Minor',
  'A Major',
  'A Minor',
  'A# Major',
  'A# Minor',
  'Bb Major',
  'Bb Minor',
  'B Major',
  'B Minor',
];
