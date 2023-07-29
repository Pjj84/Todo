/* eslint-disable react/prop-types */
import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

function App() {

  // eslint-disable-next-line no-unused-vars
  const [tasks, setTasks] =  useState(localStorage.tasks ? JSON.parse(localStorage.tasks) : [])
  //console.log("parse: ",JSON.parse(localStorage.tasks))

  function List(){
    return(
      <ul>
        {tasks.map(task => {
          return <ToDO key={task.id} task={task}/>
        })}
      </ul>
    )
  }

  function ToDO({task}){
    return(
      <label htmlFor={task.id}>
      <li className='flex-row'>
        <textarea className='flex-oneThird' value={task.text}readOnly/>
        <div className='flex-oneThird'>
          {task.isDone ? <input name="done" type="checkbox" onChange={handleCheck} id={task.id} checked/> : <input name="done" type="checkbox" onChange={handleCheck} id={task.id}/>}
          Done
        </div>
        <div id={task.id} className='flex-row flex-oneThird'>
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
        const id = task.id
        if(id == e.target.parentNode.id){
          return {...task, isDone: false, text: e.target.updatedTask.value}
        }else{
          return task
        }
      })
      localStorage.setItem("tasks",JSON.stringify(temp))
      return temp
    })
  }

  function handleDelete(e){
    e.preventDefault()
    setTasks(tasks =>{
          const temp =  tasks.filter(task =>{
          return task.id != e.target.parentNode.id
        })
        localStorage.setItem("tasks",JSON.stringify(temp))
        return temp
    })
  }

  // eslint-disable-next-line no-unused-vars
  function handleCheck(e){
    e.preventDefault()
    const newTasks =tasks.map(task =>{
    if( task.id == e.target.id){
      const isDone = task.isDone
      return {...task, isDone: !isDone}
    }
    return task
   })
   setTasks(newTasks)
   localStorage.setItem("tasks",JSON.stringify(newTasks))
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
    const newTasks = [...tasks,{id: id, text: e.target.task.value, isDone: false}]
    // eslint-disable-next-line no-unused-vars
    localStorage.setItem("tasks",JSON.stringify(newTasks))
    // eslint-disable-next-line no-unused-vars
    setTasks(tasks => newTasks)
  }
  console.log("localStorage: ",localStorage)
  //localStorage.setItem("tasks","")
  //console.log(JSON.parse(localStorage.tasks))
  return (
    <div className='centered-element'>
      <Form/>
      <List/>
    </div>
  )

}

export default App
