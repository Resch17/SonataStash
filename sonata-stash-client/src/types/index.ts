export interface Composer {
  [key: string]: string | number | undefined;
  composerId: number;
  firstName?: string | undefined;
  lastName: string;
  birthYear?: number | undefined;
  deathYear?: number | undefined;
  nationality?: string | undefined;
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
