/* eslint-disable react/prop-types */
import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

function App() {

  // eslint-disable-next-line no-unused-vars
  const [tasks, setTasks] = useState(localStorage.arr ? localStorage.arr.split(",") : [])

  function List(){
    return(
      <ul>
        {tasks.map(task => {
          const id = task.split("/")[0]
          return <ToDO key={id} id={id} task={task.split('/')[1]}/>
        })}
      </ul>
    )
  }

  function ToDO({id, task}){
    return(
      <label htmlFor={id}>
      <li className='flex-row'>
        <textarea className='flex-oneThird' value={task}readOnly/>
        <div className='flex-oneThird'>
        <input type="checkbox" id={id} value="Done"/>
        Done
        </div>
        <div id={id} className='flex-row flex-oneThird'>
        <form onSubmit={handleUpdate} className='flex-row'>
          <input type='text' name='updatedTask' className='input'/>
          <input type='submit' value='Update' className='submit'/>
        </form>
        <form onSubmit={handleDelete} className='flex-row'>
          <input type='submit' value='Delete' className='delete'/>
        </form>
        </div>
      </li>
      </label>
    )
  }

  function handleUpdate(e){
    e.preventDefault()
    setTasks(tasks => {
      const temp = tasks.map(task => {
        const id = task.split("/")[0]
        if(id == e.target.parentNode.id){
          return id +"/" + e.target.updatedTask.value
        }else{
          return task
        }
      })
      localStorage.arr = temp
      return temp
    })
  }

  function handleDelete(e){
    e.preventDefault()
    setTasks(tasks =>{
          const temp =  tasks.filter(task =>{
          return task.split("/")[0] != e.target.parentNode.id
        })
        localStorage.arr =temp
        return temp
    })
  }

  // eslint-disable-next-line no-unused-vars
  function Form(){
    return(
      <form onSubmit={handleCreate} className='centered-form'>
        <input type='text' name="task" className='input'/>
        <input type='submit' className='submit'/> 
      </form>
    )
  }

  function handleCreate(e){
    e.preventDefault()
    const id = nanoid()   
    const newTasks = [...tasks,id+"/"+e.target.task.value]
    // eslint-disable-next-line no-unused-vars
    setTasks(tasks => newTasks)
    localStorage ? localStorage.setItem("arr",newTasks.toString()) : localStorage.setItem("arr",localStorage.arr+","+newTasks.toString())
  }
  return (
    <div className='centered-element'>
      <Form/>
      <List/>
    </div>
  )

}

export default App
