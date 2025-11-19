import { useState} from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState([]);
  const [taskName, setTaskName] = useState('');

  function addTask() {
    if (!taskName) return
    setTodo(prev=>[...prev, {id: Date.now(), name:taskName, done: false}]);
    setTaskName('');
  }

  function deleteTask(id) {
    setTodo(prev=>prev.filter(task=>task.id!==id))
  }

  function done(id) {
    setTodo(prev=>
      prev.map(task=>
        task.id===id 
          ? {...task, done: !task.done}
          : task
      )
    )
  }
  
return (
    <div className='flex flex-col gap-2 justify-center items-center h-screen'>
      <div className='flex gap-2'>
        <input onChange={(e)=>{setTaskName(e.target.value)}} type="text" value={taskName}/>
        <button onClick={addTask}>Add Task</button>
      </div>
      tasks: 
      <ul>
        {
          todo.map(task=>{
            return <li key={task.id} className='flex items-center gap-2'>
              <input type='checkbox' className='w-3 h-3 appearance-none checked:bg-amber-300' onChange={()=>done(task.id)} checked={task.done}/>
              {task.id} 
              <span className={task.done ? 'line-through text-gray-400' : ''}>
                {task.name}
              </span> 
              <span className='appearance-none checked:bg-amber-300'>{String(task.done)}</span>
              <button onClick={()=>deleteTask(task.id)}>Delete</button>
              
              </li>
          })}
      </ul>
    </div>
  )
}
export default App
