import { useState, useEffect } from 'react';
import Menu from './components/Menu'
import Pair from './components/Pair';
import UnPair from './components/UnPair';
import Result from './components/Result';
import './App.css'

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
 

  function shuffle(array) {
    const result = [...array];  
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));  
      [result[i], result[j]] = [result[j], result[i]];  
    }
    return result;
  }

  function newGame() {
    setGame({difficulty: null, type: ''});
    setAllCards([]);
    setTurn(1);
    setUniq(0);
    setEndGame({result: false, type: ''})
  }

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
  },[game.difficulty])

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


return (
  <>
    <div className="flex flex-col justify-center items-center h-screen border p-2">
      {!endGame.result && records[game.type]?.[game.difficulty] && <span className='absolute top-2 max-w-40  right-100 rounded font-bold p-2'>
        <span>Best Score: {records[game.type]?.[game.difficulty]}</span>  
      </span>}
      {game.difficulty &&  <span className='mb-1 font-bold text-3xl text-gray-600'> {game.type===1 ? 'Turn' : 'Unique Cards'} <span className='text-amber-600'>{game.type === 1 ? turn : uniq}</span></span> }
      {!game.difficulty && <Menu game={game} setGame={setGame} setTheme={setTheme} theme={theme}/> }
      {!endGame.result && game.difficulty && game.type === 1 &&  <Pair allCards={allCards} setAllCards={setAllCards} setTurn={setTurn} setEndGame={setEndGame} newGame={newGame} theme={theme} dificulty={game.difficulty}/> }
      {!endGame.result && game.difficulty && game.type === 2 &&  <UnPair allCards={allCards} shuffle={shuffle} setAllCards={setAllCards} setUniq={setUniq} setEndGame={setEndGame} newGame={newGame} theme={theme}/> }

        
        {endGame.result && <Result turn={turn} allCards={allCards} game={game} newGame={newGame} theme={theme} endGame={endGame} uniq={uniq} records={records}/>}
      {/* <div>Endgame:{endGame.result.toString()} {endGame.type}</div> */}
      {/* <div className=''>theme: {theme}</div> */}
      <div className='absolute bottom-1 text-center flex justify-around gap-8'>
        <span>© 2025 by <a href="https://reitarov.dev">Reitarov Yevhen</a></span> 
        <span><a href="https://github.com/TAURUS-ESSEN/Cards" target='_blank' className='text-gray-500 hover:font-bold'>[Source Code]</a></span>
      </div>
    </div>
  </>
  )
}
export default App
