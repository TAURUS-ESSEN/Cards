import { useState, useEffect } from 'react';

export default function Pair({allCards, setAllCards, setTurn, setEndGame, newGame, theme}) {
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const cardsCount = allCards.length;

  const cols =
    cardsCount <= 12 ? 4 :
    cardsCount <= 18 ? 6 :
    cardsCount <= 24 ? 8 :
    8;

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
        updatedCards.some(card=>card.isMatched === false) ? setEndGame({result:false, type:''}) : setEndGame({result:true, type:''})
        setFirstCard(null);
        setSecondCard(null);
        } else {
          setFirstCard(null);
          setSecondCard(null);
          setTurn(prev=>prev+1)
      }
    }, 800)
    return () => clearTimeout(timeoutId)
  },[secondCard])

  return (
    <>
        <div
  className="grid gap-4"
  style={{ gridTemplateColumns: `repeat(${cols}, 130px)` }}
>
        {allCards.map((card)  => {
          const isFlipped =
            card.isMatched ||
            (firstCard && card.id === firstCard.id) ||
            (secondCard && card.id === secondCard.id);
          return (
            <button
              key={card.id}
              onClick={() => chooseCard(card)}
              disabled={
                (firstCard && firstCard.id === card.id) ||
                secondCard !== null ||
                card.isMatched
              }
              className={`flip-wrapper border-0 transition-all duration-500 ${card.isMatched ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
            >
            <div className={`card flip-inner ${isFlipped ? 'flipped' : ''}  `}>
              <img src={`${theme}/back.webp`} className="flip-front h-full" width="180"/>
              <img src={`${theme}/${card.img}.webp`} className="flip-back w-full h-full object-cover rounded-xl" />
            </div>{card.name}
          </button>
        );
      })}
      </div>
      {/* {firstCard && firstCard.name } */}
      <div className='mt-8'><button onClick={newGame}>Restart Game</button></div>
    </>
  )
}