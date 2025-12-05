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

  const addTodo = async (text) => {
    try {
      const response = await axios.post('/todos', { text });
      // Assuming the API returns the newly created todo item
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id, currentCompletedStatus) => {
    try {
      const newCompletedStatus = !currentCompletedStatus;
      const response = await axios.put(`/todos/${id}`, { completed: newCompletedStatus });
      // Update the state for the specific to-do item
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id === id ? { ...todo, completed: response.data.completed } : todo
        )
      );
    } catch (error) {
      console.error(`Error toggling todo ${id} completion:`, error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      // Filter the deleted item out of the local 'todos' state
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList 
        todos={todos} 
        onUpdateSuccess={fetchTodos} 
        onDeleteTodo={deleteTodo}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
