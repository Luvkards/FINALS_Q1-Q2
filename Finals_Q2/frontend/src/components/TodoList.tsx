import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { todos } = useTodos();

  const done = todos.filter((t) => t.completed).length;

  if (todos.length === 0) {
    return (
      <div className="todo-empty">
        <div style={{ fontSize: '2.5rem' }}>📋</div>
        <p>No tasks yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <>
      <div className="todo-list-header">
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {todos.length} task{todos.length !== 1 ? 's' : ''}
        </span>
        <span className="todo-count-badge">
          ✓ {done} / {todos.length} done
        </span>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}
