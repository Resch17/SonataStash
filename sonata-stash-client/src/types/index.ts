export interface Composer {
  [key: string]: string | number | undefined;
  composerId: number;
  firstName?: string | undefined;
  lastName: string;
  birthYear?: number | undefined;
  deathYear?: number | undefined;
  nationality?: string | undefined;
  pieceCount?: number | undefined;
}

export interface NewComposer {
  firstName?: string | undefined | null;
  lastName: string;
  birthYear?: number | undefined | null;
  deathYear?: number | undefined | null;
  nationality?: string | undefined | null;
}

export interface Book {
  bookId: number;
  bookTitle: string;
  publisher?: string | null;
  volumeInfo?: string | null;
  isbn?: string | null;
  bookDescription?: string | null;
  bookComposerId?: number | null;

  composer?: Composer | null;
  bookContents: BookContent[];
}

export interface NewPiece {
  pieceTitle: string;
  pieceComposerId?: number | null;
  pieceKey?: Key | null;
  pieceOpusNumber?: string | undefined | null;
  pieceDescription?: string | undefined | null;
}

export interface Piece {
  pieceId: number;
  pieceTitle: string;
  pieceComposerId?: number | null;
  pieceKey?: string | null;
  pieceOpusNumber?: string | null;
  pieceDescription?: string | null;

  composer?: Composer | null;
  appearsIn: BookContent[];
}

export interface BookContent {
  contentId: number;
  contentBookId?: number | null;
  contentPieceId?: number | null;
  pageRange?: string | null;

  book?: Book | null;
  piece?: Piece | null;
}

export type Key =
  | 'C Major'
  | 'C Minor'
  | 'C# Major'
  | 'C# Minor'
  | 'Db Major'
  | 'Db Minor'
  | 'D Major'
  | 'D Minor'
  | 'D# Major'
  | 'D# Minor'
  | 'Eb Major'
  | 'Eb Minor'
  | 'E Major'
  | 'E Minor'
  | 'F Major'
  | 'F Minor'
  | 'F# Major'
  | 'F# Minor'
  | 'Gb Major'
  | 'Gb Minor'
  | 'G Major'
  | 'G Minor'
  | 'G# Major'
  | 'G# Minor'
  | 'Ab Major'
  | 'Ab Minor'
  | 'A Major'
  | 'A Minor'
  | 'A# Major'
  | 'A# Minor'
  | 'Bb Major'
  | 'Bb Minor'
  | 'B Major'
  | 'B Minor';
