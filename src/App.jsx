import { useState, useEffect } from 'react';
import Menu from './components/Menu'
import Pair from './components/Pair';
import Result from './components/Result';

function App() {
  const [game, setGame] = useState({difficulty: null, type: ''});
  const [allCards, setAllCards] = useState([]);
  const [turn, setTurn] = useState(1);
  const [endGame, setEndGame] = useState(false)

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
    setEndGame(false)
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



return (
  <>
    <div className="flex flex-col justify-center items-center h-screen border p-2">
      {!game.difficulty && <Menu game={game} setGame={setGame}/> }
      {!endGame && game.difficulty && game.type === 1 &&  <Pair allCards={allCards} setAllCards={setAllCards} setTurn={setTurn} setEndGame={setEndGame} newGame={newGame}/> }
      {!endGame && game.difficulty && game.type === 2 &&  <Pair allCards={allCards} setAllCards={setAllCards} setTurn={setTurn} setEndGame={setEndGame} newGame={newGame}/> }

        Turn:{turn}
        {endGame && <Result turn={turn} newGame={newGame}/>}
      <div>Endgame:{endGame.toString()}</div>
    </div>
  </>
  )
}
export default App
