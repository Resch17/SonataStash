import { useState } from 'react';
import { Book, Composer, NewPiece } from '../types';
import { AInput } from './AInput';
import { bookNameDisplay, composerNameDisplay, keys } from '../utilities';

interface PieceMultiFormProps {
  composers: Composer[];
  books: Book[];
}
export const PieceMultiForm = ({ composers, books }: PieceMultiFormProps) => {
  const [newPieces, setNewPieces] = useState<NewPiece[]>([]);
  return (
    <section className="flex flex-col w-1/2 p-2 items-center">
      <AInput id="newPieceTitle" labelText="Title" required />
      <div className="input-container">
        <label htmlFor="newPieceComposer">Composer</label>
        <select id="newPieceComposer" className="input">
          <option value="0">(none)</option>
          {composers.map((c) => (
            <option value={c.composerId} key={c.composerId}>
              {composerNameDisplay(c, true)}
            </option>
          ))}
        </select>
      </div>
      <div className="input-container">
        <label htmlFor="newPieceKey">Key</label>
        <select id="newPieceKey" className="input">
          <option value="-1">(none)</option>
          {keys.map((k) => (
            <option value={k} key={k}>
              {k}
            </option>
          ))}
        </select>
      </div>
      <AInput id="newPieceOpusNumber" labelText="Opus Number" />
      <AInput id="newPieceDescription" labelText="Description" />
      <div className="input-container">
        <label htmlFor="newPieceBook">Book</label>
        <select id="newPieceBook" className="input" multiple>
          <option value="-1">(none)</option>
          {books.map((b) => (
            <option value={b.bookId} key={b.bookId}>
              {bookNameDisplay(b)}
            </option>
          ))}
        </select>
      </div>
      <button className="btn mt-4">Submit Piece</button>
    </section>
  );
};
