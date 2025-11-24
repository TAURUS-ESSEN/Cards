import { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';

export default function Pair() {
  const {allCards, setAllCards, setTurn, setEndGame, newGame, theme} = useAppContext();
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const cardsCount = allCards.length;
  const [startAnim, setStartAnim] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setStartAnim(false), 560);
    return () => clearTimeout(t);
  }, []);

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
      <div className={`grid gap-4 p-4 shadow-field rounded-xl bg-white/40 transition-all duration-700 ease-out ${startAnim ? 'opacity-0 translate-y-300' : 'opacity-100 translate-y-0'}`}
        style={{ gridTemplateColumns: `repeat(${cols}, 125px)` }}>
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
      <div className='mt-2'>
        <button type='button' onClick={newGame} className='rounded-lg bg-[#FDF3C6] hover:bg-amber-400'>
          Restart Game
        </button>
      </div>
    </>
  )
}