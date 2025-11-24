import { useState, useEffect, useMemo, useCallback  } from 'react';
import Menu from './components/Menu'
import Pair from './components/Pair';
import UnPair from './components/UnPair';
import Result from './components/Result';
import './App.css'
import { AppContext } from './components/AppContext';

function App() {
  const [game, setGame] = useState({difficulty: null, type: ''});
  const [allCards, setAllCards] = useState([]);
  const [turn, setTurn] = useState(1);
  const [uniq, setUniq] = useState(0);
  const [endGame, setEndGame] = useState({result: false, type: ''})
  const [theme, setTheme] = useState('default');
  const defaultRecords = {
    1:   { 4: null, 6: null, 9: null, 12: null },
    2: { 4: null, 6: null, 9: null, 12: null },
  };

  const STORAGE_KEY = 'catGameRecords';
  const stored = localStorage.getItem(STORAGE_KEY);
  const records = stored ? JSON.parse(stored) : defaultRecords;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); 

  const shuffle = useCallback((array) => {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }, []);


  const newGame = useCallback(() => {
    setGame({difficulty: null, type: ''});
    setAllCards([]);
    setTurn(1);
    setUniq(0);
    setEndGame({result: false, type: ''});
  }, []);

  useEffect(()=>{
    if (!game.difficulty) {
                document.documentElement.style.setProperty(
    '--bg-image',
    `url('/${theme}/background.jpg')`)
    return 
    }
    const tempArray = [];
    fetch('https://68f4a5d6b16eb6f468351fd2.mockapi.io/api/ShoppingCartTaurusAusEssen/cats')
    .then(r=>r.json())
      .then(data=>{
        console.log(data);
        for (let i = 0; i < game.difficulty; i++) {
          const obj = {id: i, name: data[i].name, img: data[i].img, isMatched: false}
          tempArray.push(obj);
          if (game.type === 1) {
            const obj2 = {id: i+'i', name: data[i].name, img: data[i].img, isMatched: false}
            tempArray.push(obj2);
          }
        }
        setAllCards(shuffle(tempArray));
        document.documentElement.style.setProperty(
          '--bg-image',
          `url('/${theme}/background2.jpg')`
        );
      })
  },[game.difficulty, game.type, shuffle, theme])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--bg-image',
      `url('/${theme}/background.jpg')`
    );
    document.documentElement.style.setProperty(
      '--card-back',
      `url('/${theme}/back.jpg')`
    );
  }, [theme]);

  const contextValue = useMemo(() => ({
      game, setGame, setTheme, theme, allCards, setAllCards,
      turn, setTurn, endGame, setEndGame, newGame, shuffle, uniq, setUniq, records
    }), [ game, turn, theme, allCards, newGame, uniq, records, endGame, shuffle,]);

  return (
  <>
    <AppContext.Provider value={contextValue}>
      <div className="flex flex-col justify-center items-center h-screen p-2 border ">
        {!endGame.result && records[game.type]?.[game.difficulty] && 
        <span className='absolute top-2 max-w-40 right-100 p-2 rounded font-bold'>
          <span>Best Score: {records[game.type]?.[game.difficulty]}</span>  
        </span>}
        
        {game.difficulty &&  
        <span className='mb-1 font-bold text-3xl text-gray-600'> 
          {game.type===1 ? 'Turn' : 'Unique Cards'} 
          <span className='text-amber-600'> {game.type === 1 ? turn : uniq}</span>
        </span> }
        
        {!game.difficulty && <Menu /> }

        {!endGame.result && game.difficulty && game.type === 1 &&  <Pair /> }

        {!endGame.result && game.difficulty && game.type === 2 &&  <UnPair /> }

        {endGame.result && <Result />}

        <div className='absolute bottom-1 flex justify-around gap-8 text-center'>
          <span>© 2025 by <a href="https://reitarov.dev">Reitarov Yevhen</a></span> 
          <span><a href="https://github.com/TAURUS-ESSEN/Cards" target='_blank' className='text-gray-500 hover:font-bold'>[Source Code]</a></span>
        </div>
      </div>
    </AppContext.Provider>
  </>
  )
}
export default App
