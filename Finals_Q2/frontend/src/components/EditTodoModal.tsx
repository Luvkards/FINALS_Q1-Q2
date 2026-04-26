import { useState, useEffect } from 'react';
import type { Todo } from '../context/TodoContext';
import { useTodos } from '../hooks/useTodos';

interface Props {
  todo: Todo;
  onClose: () => void;
}

export default function EditTodoModal({ todo, onClose }: Props) {
  const { updateTodo } = useTodos();
  const [title, setTitle] = useState(todo.title);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }
    await updateTodo(todo.id, { ...todo, title: title.trim() });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>✏️ Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              className="todo-input"
              autoFocus
              placeholder="Task title..."
            />
            {error && <span className="error-msg">⚠ {error}</span>}
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
