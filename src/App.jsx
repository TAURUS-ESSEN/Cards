import { useState, useEffect } from 'react';
import Menu from './components/Menu'

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [allCards, setAllCards] = useState([]);

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

return (
  <>
    <div className="flex flex-col justify-center items-center h-screen border p-2">
      {!difficulty && <Menu setDifficulty={setDifficulty}/> }
      {difficulty}
      {(allCards.length > 0 ) && 
        <div className='flex flex-col'>
            {allCards.map(card  => {
              return <div key={card.id}>{card.name}{card.id}</div> 
            })}
        </div>
        
      }
    </div>
  </>
  )
}
export default App
