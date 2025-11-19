import { useState, useEffect} from 'react'
import './App.css'
import Menu from './Menu'

function App() {
  const [cards, setCards] = useState([]);
  const [difficulty, setDifficulty] = useState(null)
  
  useEffect(() => {
    // if (difficulty === 0) return;
    const tempArray = [];
    fetch('https://digimon-api.vercel.app/api/digimon')
    .then(response => response.json())
	    .then(data => {
        for (let i = 59; i < 59 + difficulty; i++) {
          const obj = {name: data[i].name, img: data[i].img}
          tempArray.push(obj);
        } 
      setCards(tempArray)
    });    
  }, [difficulty])

return (
  <>
    <div className='flex justify-center items-center h-screen'>
      {!cards.length && (
        <Menu setDifficulty={setDifficulty}/>
      )} 
      {difficulty}
    </div> 
  </>
  )
}
export default App
