import { useState, useEffect } from 'react';

export default function Pair({allCards, shuffle, setAllCards, setUniq,  setEndGame, newGame, theme}) {
    const [selectedCards, setSelectedCards] = useState([]);
    const [needShuffle, setNeedShuffle] = useState(false);

    function chooseCard(name) {
      if (selectedCards.includes(name)) {
        setEndGame({result:true, type:'LOOSE :('})
      } else { 
        setSelectedCards(prev=> ([...prev, name]))  
        setNeedShuffle(true);
      } 
    }

    

    useEffect(()=>{
      if (selectedCards.length === 0) return
        console.log(selectedCards)
      if (selectedCards.length === allCards.length) {
        setEndGame({result:true, type:'WIN!!!'})
      } else {
        setUniq(prev=>prev+1)
      }
    },[selectedCards])

    useEffect(() => {
      if (!needShuffle) return;

      const timeoutId = setTimeout(() => {
        setAllCards(prev => shuffle([...prev]));
        setNeedShuffle(false);  
      }, 800);  

      return () => clearTimeout(timeoutId); 
    }, [needShuffle, setAllCards, shuffle]);

    return (
      <>
        <button onClick={newGame}>Play again</button>
        {(allCards.length > 0 ) && 
        <div className='flex flex-wrap max-w-200 gap-4'>
            {allCards.map(card  => {
                return (
                <button key={card.id} className='  border' onClick={()=>chooseCard(card.name)} disabled={''}>
                <img src={`${theme}/${card.img}.webp`} width="100" />{card.isMatched.toString()}
                </button> )
            })}
        </div>
        
        }
      </>
    )
}