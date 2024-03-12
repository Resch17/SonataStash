import { useEffect, useState } from 'react';
import './App.css';
import { ComposerForm } from './components/ComposerForm';
import { Book, Composer, Piece } from './types';
import { getComposers } from './services/composerService';
import { getPiecesByComposer } from './services/pieceService';
import { ComposerList } from './components/ComposerList';
import { ComposerPieceList } from './components/ComposerPieceList';
import { BookList } from './components/BookList';
import { getAllBooks } from './services/bookService';
import { BookForm } from './components/BookForm';
import { PieceMultiForm } from './components/PieceMultiForm';

function App() {
  type Tab = 'composer' | 'book' | 'piece';
  const [activeTab, setActiveTab] = useState<Tab>('composer');
  const [composers, setComposers] = useState<Composer[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const [selectedComposer, setSelectedComposer] = useState<
    Composer | undefined
  >();
  const [composerPieces, setComposerPieces] = useState<Piece[]>([]);

  const loadComposers = async () => {
    const data = await getComposers();
    setComposers(data);
  };

  const loadBooks = async () => {
    const data = await getAllBooks();
    setBooks(data);
  };

  const onComposerSuccess = () => {
    window.alert('Composer Created!');
    loadComposers();
  };

  const tabClass = (tab: Tab) => {
    let baseClass =
      'w-full py-4 text-xl roboto-black cursor-pointer border-x-2 border-b-2 border-black text-center';
    if (activeTab === tab) baseClass += ' bg-blue-200';
    return baseClass;
  };

  const loadPieceByComposer = async () => {
    if (selectedComposer) {
      const data = await getPiecesByComposer(selectedComposer.composerId);
      setComposerPieces(data);
    }
  };

  useEffect(() => {
    loadComposers();
    loadBooks();
  }, []);

  useEffect(() => {
    loadPieceByComposer();
  }, [selectedComposer]);

  return (
    <main className="w-full">
      <div className="w-full flex justify-between pb-4 px-16">
        <div
          className={tabClass('composer')}
          onClick={() => setActiveTab('composer')}
        >
          Composers
        </div>
        <div className={tabClass('book')} onClick={() => setActiveTab('book')}>
          Books
        </div>
        <div
          className={tabClass('piece')}
          onClick={() => setActiveTab('piece')}
        >
          Pieces
        </div>
      </div>
      {activeTab === 'composer' && (
        <div className="flex">
          {!selectedComposer && (
            <ComposerForm onSuccessCallback={onComposerSuccess} />
          )}
          <ComposerList
            composers={composers}
            selectedComposer={selectedComposer}
            setSelectedComposer={setSelectedComposer}
          />
          {selectedComposer && <ComposerPieceList pieces={composerPieces} />}
        </div>
      )}
      {activeTab === 'book' && (
        <div className="flex">
          <BookForm composers={composers} />
          <BookList books={books} />
        </div>
      )}
      {activeTab === 'piece' && (
        <div className="flex">
          <PieceMultiForm composers={composers}  books={books} />
        </div>
      )}
    </main>
  );
}

export default App;
