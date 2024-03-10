import { useEffect } from 'react';
import './App.css';
import { getComposers } from './services/composerService';

function App() {
  const loadData = async () => {
    const data = await getComposers();
    console.log(data);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}

export default App;
