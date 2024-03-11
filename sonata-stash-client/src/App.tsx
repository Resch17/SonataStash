import { useEffect, useState } from 'react';
import './App.css';
import { ComposerForm } from './components/ComposerForm';
import { Composer } from './types';
import { getComposers } from './services/composerService';
import { ComposerList } from './components/ComposerList';

function App() {
  type Tab = 'composer' | 'book' | 'piece';
  const [activeTab, setActiveTab] = useState<Tab>('composer');
  const [composers, setComposers] = useState<Composer[]>([]);

  const loadComposers = async () => {
    const data = await getComposers();
    setComposers(data);
  };

  const onComposerSuccess = () => {
    window.alert('Composer Created!');
    loadComposers();
  };

  const tabClass = (tab: Tab) => {
    let baseClass =
      'w-full pt-8 pb-3 cursor-pointer border-x-2 border-b-2 border-black text-center';
    if (activeTab === tab) baseClass += ' bg-blue-200';
    return baseClass;
  };

  useEffect(() => {
    loadComposers();
  }, []);

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
          <ComposerForm onSuccessCallback={onComposerSuccess} />
          <ComposerList composers={composers} />
        </div>
      )}
    </main>
  );
}

export default App;
