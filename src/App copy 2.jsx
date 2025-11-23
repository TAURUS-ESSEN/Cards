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
    if (!game.difficulty) return;
    const tempArray = [];
    fetch('https://digimon-api.vercel.app/api/digimon')
    .then(r=>r.json())
      .then(data=>{
        // console.log(data);
        for (let i = 89; i < 89 + game.difficulty; i++) {
          const obj = {id: i, name: data[i].name, img: data[i].img, isMatched: false}
          tempArray.push(obj);
          if (game.type === 1) {
            const obj2 = {id: i+'i', name: data[i].name, img: data[i].img, isMatched: false}
            tempArray.push(obj2);
          }
        }
        setAllCards(shuffle(tempArray));
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
      {!game.difficulty && <Menu game={game} setGame={setGame} setTheme={setTheme} theme={theme}/> }
      {!endGame.result && game.difficulty && game.type === 1 &&  <Pair allCards={allCards} setAllCards={setAllCards} setTurn={setTurn} setEndGame={setEndGame} newGame={newGame} theme={theme} dificulty={game.dificulty}/> }
      {!endGame.result && game.difficulty && game.type === 2 &&  <UnPair allCards={allCards} shuffle={shuffle} setAllCards={setAllCards} setUniq={setUniq} setEndGame={setEndGame} newGame={newGame} theme={theme}/> }

        Turn:{turn} uniq:{uniq}
        {endGame.result && <Result turn={turn} newGame={newGame}/>}
      <div>Endgame:{endGame.result.toString()} {endGame.type}</div>
      <div className=''>theme: {theme}</div>
    </div>
  </>
  )
}
export default App
