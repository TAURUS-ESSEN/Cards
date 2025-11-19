import { useState, useEffect } from 'react';
import Menu from './components/Menu'
import Pair from './components/Pair';

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [allCards, setAllCards] = useState([]);
  const [firstCard, setFirstCard] = useState('');
  const [secondCard, setSecondCard] = useState('');
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

  useEffect(()=>{
    if (!difficulty) return;
    const tempArray = [];
    fetch('https://digimon-api.vercel.app/api/digimon')
    .then(r=>r.json())
      .then(data=>{
        // console.log(data);
        for (let i = 89; i < 89 + difficulty; i++) {
          const obj = {id: i, name: data[i].name, img: data[i].img, isMatched: false}
          tempArray.push(obj);
          const obj2 = {id: i+'i', name: data[i].name, img: data[i].img, isMatched: false}
          tempArray.push(obj2);
        }
        setAllCards(shuffle(tempArray));
      })
  },[difficulty])

function chooseCard(card) {
  console.log(card)
  firstCard === '' ? setFirstCard(card) : setSecondCard(card)
}

function checkEndGame() {
  // allCards.some(card=>card.isMatched === false) ? setEndGame('false') :  setEndGame(true)
}

useEffect(()=>{
  if (firstCard === '') return
  const id = setInterval(()=>{ 
    if (firstCard.name === secondCard.name) {
  const updatedCards = allCards.map(card => {
    if (card.name === firstCard.name) {
      return { ...card, isMatched: true };
    }
    return card;
  });

    setAllCards(updatedCards);
    updatedCards.some(card=>card.isMatched === false) ? setEndGame(false) :  setEndGame(true)
    setFirstCard('');
    setSecondCard('');
    checkEndGame()
  }
  else {
    setFirstCard('');
    setSecondCard('');
    setTurn(prev=>prev+1)
  }
  },2000)
  return () => clearInterval(id);
},[secondCard])

return (
  <>
    <div className="flex flex-col justify-center items-center h-screen border p-2">
      {!difficulty && <Menu setDifficulty={setDifficulty}/> }
      difficulty:{difficulty} 
      {(allCards.length > 0 ) && 
        <div className='flex flex-wrap max-w-200 gap-4'>
            {allCards.map(card  => {
              return (
              <button key={card.id} className='  border' onClick={()=>chooseCard(card)} disabled={firstCard.id===card.id || secondCard !== ''? true : false}>
                <img src={card.isMatched || card.id===firstCard.id || card.id===secondCard.id? card.img: 'rubaha.webp'} width="100" />
              </button> )
            })}
        </div>
        
      }
      {firstCard && firstCard.name } Turn:{turn}  
      <div>Endgame:{endGame.toString()}</div>
    </div>
  </>
  )
}
export default App
