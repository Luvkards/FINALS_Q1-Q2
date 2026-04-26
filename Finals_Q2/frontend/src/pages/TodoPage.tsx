import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';

export default function TodoPage() {
  return (
    <div>
      <h1 className="page-header">
        My <span>Tasks</span>
      </h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}
