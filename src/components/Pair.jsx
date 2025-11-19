import { useState, useEffect } from 'react';

export default function Pair({allCards, setAllCards, setTurn, setEndGame, newGame}) {
    const [firstCard, setFirstCard] = useState('');
    const [secondCard, setSecondCard] = useState('');

    
    function chooseCard(card) {
        firstCard === '' ? setFirstCard(card) : setSecondCard(card)
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
          <button onClick={newGame}>Play again</button>
        {(allCards.length > 0 ) && 
        <div className='flex flex-wrap max-w-200 gap-4'>
            {allCards.map(card  => {
                return (
                <button key={card.id} className='  border' onClick={()=>chooseCard(card)} disabled={firstCard.id===card.id || secondCard !== '' || card.isMatched ? true : false}>
                <img src={card.isMatched || card.id===firstCard.id || card.id===secondCard.id? card.img: 'rubaha.webp'} width="100" />
                </button> )
            })}
        </div>
        
        }
        {firstCard && firstCard.name }
        </>
    )
}