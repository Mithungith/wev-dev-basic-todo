import React,{useState,useRef,useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './styles.scss';

const LOCAL_STORAGE_KEY ='todoApp.todos';
function App() {
  const [todos,setTodos]= useState([]);
  const todoNameRef = useRef();

  
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(prevValue=>[...prevValue,...storedTodos]);
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos));
  },[todos]);

  function toggleTodo(id){
    const newTodos = [...todos];
    const todo= newTodos.find(todo=> todo.id===id)
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddToDo(e){
  const name = todoNameRef.current.value;
  if(name==='') return
  setTodos(prevValue=>{
    return [...prevValue,{id: uuidv4(),name:name,complete:false}]
  })
  console.log(name);
  todoNameRef.current.value = null;
  }
  function handleClear(){
    const newTodo = todos.filter(todo=> !todo.complete);
    setTodos(newTodo);
  }
  return (
    <div className="parent">
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input type='text' ref={todoNameRef}></input>
      <button onClick={handleAddToDo}>Add Todo</button>
      <button onClick={handleClear}>Clear Complete</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
