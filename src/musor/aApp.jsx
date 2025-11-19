import { useState, useEffect} from 'react'
import './App.css'
import Timer from './Timer'

function App() {
  const [text, setText] = useState(localStorage.getItem("textarea") ?? '');
  const [timer, setTimer] = useState(0);
  const [message, setMessage] = useState('----')
 

  useEffect(()=> {
    setTimer(0)
    const id = setInterval(()=>{
      setTimer(prev => prev+1)
    }, 1000)
    return ()=> clearInterval(id);
  },[text.length])

  useEffect(()=>{
    if (timer === 6 ) {
      setMessage("сохранено");
      localStorage.setItem('textarea', text);
    }
  },[timer])

 
return (
  <>
    <div className='flex justify-center items-center h-screen flex-col'>
      <textarea onChange={(e)=>setText(e.target.value)} name="" id=""  cols='30' rows='10' className='border p-2 rounded' value={text}>{text}</textarea>
      timer: {timer} <br />
      {message}
      
    </div> 
  </>
  )
}
export default App
