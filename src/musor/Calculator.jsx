import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [value1, setValue1] = useState('0');
  const [value2, setValue2] = useState('');
  const [operand, setOperand] = useState('');
  
  function changeValue(e) {
    if (operand === '') {
      value1 === '0' ? setValue1(e) : setValue1(prev=> prev + e)
    }
    else {
      setValue2(prev=>prev+e);
    }
  }

  function reset() {
    setValue1('0');
    setValue2('');
    setOperand('');
  }

  function calculate(e) {
    if  (value2 ==='') {
      setOperand(e)
      return
    }
    else {
      switch (operand) {
        case '+':
          setValue1(prev=> Number(prev) + Number(value2));
          break;
        case '-':
          setValue1(prev=> Number(prev) - Number(value2));
          break;
        case '*':
          setValue1(prev=> Number(prev) * Number(value2));
          break;
        case '/':
          setValue1(prev => Number(prev) / Number(value2));
          break;
      }
      setOperand('');
      setValue2('');
    }
  }

function backspace() {
  if (operand === '') {
    // редактируем первое число
    setValue1(prev => {
      const next = prev.toString().slice(0, -1);   // убрали последний символ
      return next === '' ? '0' : next;             // если стало пусто — вернуть '0'
    });
  } else {
    // редактируем второе число
    setValue2(prev => {
      const next = prev.toString().slice(0, -1);
      return next === '' ? '' : next;              // здесь можно оставить пустую строку
    });
  }
}

function plusMinus() {
  if (operand === '') {
    value1 >= 0 ? setValue1(prev=>"-"+prev.toString()) : setValue1(prev=>prev.slice(1)) 
  }
  else {
    value2 >= 0 ? setValue2(prev=>"-"+prev.toString()) : setValue2(prev=>prev.slice(1)) 
  }
}

  useEffect(()=>{
    const handleKeyDown = (e) => {
      if (/^\d$/.test(e.key)) {
        changeValue(e.key)
      }

      if (['+', '-', '*', '/'].includes(e.key)) {
          calculate(e.key)
        }

      if (e.key === 'Backspace') {
        backspace();
        return
      }
  }



    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown);
  },[value1, value2, operand]) 

  return (
    <div className='max-w-300 flex flex-col justify-center h-screen items-center m-auto border '>
      <div className='flex flex-col gap-2 bg-gray-100 p-4 rounded border border-gray-600'>
        <div className='font-bold'>XUYASIO</div>
        <div id="display" className='min-h-11 border p-2 rounded text-right bg-white'> {value1}{operand}{value2}</div>
        <div className='flex gap-2'>
            <button  onClick={reset} className='bg-orange-300 hover:bg-orange-400'>AC</button>
            <button  value="%" className='action'>%</button>
            <button onClick={plusMinus} className='action' >+-</button>
            <button onClick={(e)=>calculate(e.target.value)}  value="/" className='action'>÷</button>
        </div>

        <div className='flex gap-2'>
            <button onClick={(e)=>changeValue(e.target.value)} value="7">7</button>
            <button onClick={(e)=>changeValue(e.target.value)} value="8">8</button>
            <button onClick={(e)=>changeValue(e.target.value)} value="9">9</button>
            <button onClick={(e)=>calculate(e.target.value)}  value="*" className='action'>×</button>
        </div>

        <div className='flex gap-2'>
            <button onClick={(e)=>changeValue(e.target.value)} value="4">4</button>
            <button onClick={(e)=>changeValue(e.target.value)} value="5">5</button>
            <button onClick={(e)=>changeValue(e.target.value)} value="6">6</button>
            <button onClick={(e)=>calculate(e.target.value)} value="-" className='action'>-</button>
        </div>

        <div className='flex gap-2'>
            <button onClick={(e)=>changeValue(e.target.value)} value="1">1</button>
            <button onClick={(e)=>changeValue(e.target.value)} value="2">2</button>
            <button onClick={(e)=>changeValue(e.target.value)} value="3">3</button>
            <button onClick={(e)=>calculate(e.target.value)}  value="+" className='action'>+</button>
        </div>

        <div className='flex gap-2'>
            <button onClick={(e)=>changeValue(e.target.value)} value="0">0</button>
            <button  value=".">.</button>
            <button onClick={backspace}>back </button>
            <button  onClick={() => value2 === '' ? null : calculate()} value="=" className='action'>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
