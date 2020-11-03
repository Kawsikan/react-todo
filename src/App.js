import React, { useState, useEffect } from 'react';
import './App.css';

//Importing component
import Form from './components/Form';
import TodoList from './components/TodoList';


function App() {
  // State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //run once when the app starts (save local todos)
  useEffect(() => {
    getLocalTodos();
  }, []);
  // Use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos(); //(save local todos)
  }, [todos, status]);

  // Functions (You can use this function inside useEffect )
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //Save to local 
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  // End of save to local

  return (
    <div className="App">
      <header>
        <h1>Your Todo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos} />
    </div>
  );
}

export default App;
