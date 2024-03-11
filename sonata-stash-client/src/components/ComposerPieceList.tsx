import { Piece } from '../types';

interface ComposerPieceListProps {
  pieces: Piece[];
}
export const ComposerPieceList = ({ pieces }: ComposerPieceListProps) => {
  return (
    <section>
      {pieces.length === 0 && <p>No pieces found</p>}
      <ul className="space-y-2 pl-6">
        {pieces.map((p) => (
          <li key={p.pieceId}>{p.pieceTitle}</li>
        ))}
      </ul>
    </section>
  );
};
