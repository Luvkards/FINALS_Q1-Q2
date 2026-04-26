import { useState } from 'react';
import type { Todo } from '../context/TodoContext';
import { useTodos } from '../hooks/useTodos';
import EditTodoModal from './EditTodoModal';

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: Props) {
  const { updateTodo, deleteTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = () => {
    updateTodo(todo.id, { ...todo, completed: !todo.completed });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      deleteTodo(todo.id);
    }
  };

  return (
    <>
      <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <div className="todo-content">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="todo-checkbox"
            aria-label={`Toggle: ${todo.title}`}
          />
          <span className="todo-title">{todo.title}</span>
        </div>
        <div className="todo-actions">
          <button onClick={() => setIsEditing(true)} className="btn-secondary">
            ✏️ Edit
          </button>
          <button onClick={handleDelete} className="btn-danger">
            🗑 Delete
          </button>
        </div>
      </li>

      {isEditing && (
        <EditTodoModal todo={todo} onClose={() => setIsEditing(false)} />
      )}
    </>
  );
}
