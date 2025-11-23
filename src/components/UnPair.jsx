import { useState, useEffect } from 'react';

export default function Pair({
  allCards,
  shuffle,
  setAllCards,
  setUniq,
  setEndGame,
  newGame,
  theme,
}) {
  const [selectedCards, setSelectedCards] = useState([]);
  const [needShuffle, setNeedShuffle] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  const cardsCount = allCards.length;

  const cols =
    cardsCount <= 4 ? 4 :
    cardsCount <= 6 ? 3 :
    cardsCount <= 9 ? 5 :
    4;

  function chooseCard(name) {
    if (isHiding || needShuffle) return;

    if (selectedCards.includes(name)) {
      setEndGame({ result: true, type: 'loose :(' });
    } else {
      setSelectedCards(prev => [...prev, name]);
      setNeedShuffle(true);
    }
  }

  useEffect(() => {
    if (selectedCards.length === 0) return;

    if (selectedCards.length === allCards.length) {
      setUniq(prev => prev + 1);
      setEndGame({ result: true, type: 'win' });
    } else {
      setUniq(prev => prev + 1);
    }
  }, [selectedCards, allCards.length, setEndGame, setUniq]);

  useEffect(() => {
    if (!needShuffle) return;

    setIsHiding(true);

    const timeoutId = setTimeout(() => {
      setAllCards(prev => shuffle([...prev]));
      setIsHiding(false);
      setNeedShuffle(false);
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [needShuffle, setAllCards, shuffle]);

  return (
    <>
      <p className="mt-4 mb-4 text-gray-700 text-center">
        Tap a new cat each time. If you pick the same cat twice — game over.
      </p>

      {allCards.length > 0 && (
        <div
          className={`
            grid max-w-fit mx-auto
            transition-all duration-500 ease-out
            ${isHiding ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
          `}
          style={{ gridTemplateColumns: `repeat(${cols}, 155px)` }}
        >
          {allCards.map(card => (
            <button
              key={card.id}
              className="card2 rounded-xl"
              onClick={() => chooseCard(card.name)}
              disabled={isHiding}
            >
              <img
                src={`${theme}/${card.img}.webp`}
                className="border border-[#FFC873] card p-2 bg-white rounded-lg"
                alt={card.name}
              />
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={newGame}
          className="rounded-lg bg-[#FDF3C6] hover:bg-amber-400"
          disabled={isHiding}
        >
          Restart Game
        </button>
      </div>
    </>
  );
}
  