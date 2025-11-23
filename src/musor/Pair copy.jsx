import { useState, useEffect } from 'react';

export default function Pair({allCards, setAllCards, setTurn, setEndGame, newGame, theme}) {
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
const [flippedIndex, setFlippedIndex] = useState(null);
    
    function chooseCard(card) {
      firstCard === null ? setFirstCard(card) : setSecondCard(card)
    }
    
useEffect(()=>{
  if (firstCard === null || secondCard === null) return;
  const timeoutId = setTimeout(() => {
    if (firstCard.name === secondCard.name) {
  const updatedCards = allCards.map(card => {
    if (card.name === firstCard.name) {
      return { ...card, isMatched: true };
    }
    return card;
  });

    setAllCards(updatedCards);
    updatedCards.some(card=>card.isMatched === false) ? setEndGame({result:false, type:''}) :  setEndGame({result:true, type:''})
    setFirstCard(null);
    setSecondCard(null);
  }
  else {
    setFirstCard(null);
    setSecondCard(null);
    setTurn(prev=>prev+1)
  }
  },2000)
  return () => clearTimeout(timeoutId)
},[secondCard])

    return (
        <>
          <button onClick={newGame}>Play again</button>
        {(allCards.length > 0 ) && 
        <div className='flex flex-wrap max-w-200 gap-4'>
            {allCards.map((card, i)  => {
              // const isFlipped = flippedIndex === i;
              const isFlipped = card.isMatched ||
                      (firstCard && card.id === firstCard.id) ||
                      (secondCard && card.id === secondCard.id)
                return (
                <button key={card.id} className='border' onClick={()=>chooseCard(card)} disabled={(firstCard && firstCard.id === card.id) ||
  secondCard !== null ||
  card.isMatched
    ? true
    : false}>
        {/* <div className={`flip-inner ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}> */}
                <img src={ isFlipped ? card.img : `${theme}/back.webp`} width="100" className= '' />
                {/* </div> */}
                </button> )
            })}
        </div>
        
        }
        {firstCard && firstCard.name }
        </>
    )
}