import { useForm } from 'react-hook-form';
import { useTodos } from '../hooks/useTodos';

interface FormData {
  title: string;
}

export default function AddTodoForm() {
  const { addTodo } = useTodos();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await addTodo(data.title.trim());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-todo-form">
      <div className="input-group">
        <input
          {...register('title', {
            required: 'Title is required',
            validate: (value) => value.trim().length > 0 || 'Title cannot be empty',
          })}
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          autoComplete="off"
        />
        {errors.title && <span className="error-msg">⚠ {errors.title.message}</span>}
      </div>
      <button type="submit" className="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? '⏳ Adding...' : '＋ Add Task'}
      </button>
    </form>
  );
}
