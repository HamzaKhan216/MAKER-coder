import React from 'react';
import './TodoList.css'; // Import the stylesheet
import TodoItem from './TodoItem'; // Assuming TodoItem is in the same directory

const TodoList = ({ todos, onToggleComplete, onDelete }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id} // Important for list rendering performance and stability
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
