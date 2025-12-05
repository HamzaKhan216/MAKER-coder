import React, { useState, useEffect } from 'react';
import axios from './api/axios';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h1>To-Do List</h1>
      {/* Placeholder for TodoList and AddTodoForm components */}
      {/* <AddTodoForm onAddSuccess={fetchTodos} /> */}
      {/* <TodoList todos={todos} onUpdateSuccess={fetchTodos} onDeleteSuccess={fetchTodos} /> */}
    </div>
  );
}

export default App;
