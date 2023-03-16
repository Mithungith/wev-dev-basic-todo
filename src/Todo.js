import React from 'react'
//import './styles.scss'

export default function Todo({todo,toggleTodo}) {
  function handleTodoChange(){
    toggleTodo(todo.id);
  }
  return (
    <label>
      <input type='checkbox' checked={todo.complete} onChange={handleTodoChange}></input>
      {todo.name}
    </label>
  )
}
