import React, { useState } from 'react';
import './AddTodoForm.css';

const AddTodoForm = ({ onAddTodo }) => {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (todoText.trim() === '') {
      alert('Please enter a todo item!');
      return;
    }

    // Call a prop function to add the todo, if provided
    if (onAddTodo) {
      onAddTodo(todoText);
    }
    
    setTodoText(''); // Clear the input field after submission
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Add new todo..."
        aria-label="New todo item"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
