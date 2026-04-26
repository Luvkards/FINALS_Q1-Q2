import { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  updateTodo: (id: string, updatedTodo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  isBackendOnline: boolean;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

const API_URL = 'http://localhost:5198/api/todos';

// Generate a simple GUID
const generateId = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isBackendOnline, setIsBackendOnline] = useState(true);

  const fetchTodos = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
        setIsBackendOnline(true);
      }
    } catch {
      setIsBackendOnline(false);
    }
  }, []);

  const addTodo = async (title: string) => {
    const payload = { title, completed: false };

    if (!isBackendOnline) {
      // Offline fallback — local only
      setTodos((prev) => [...prev, { id: generateId(), ...payload }]);
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const newTodo = await res.json();
        setTodos((prev) => [...prev, newTodo]);
      } else {
        console.error('POST failed:', res.status);
      }
    } catch (error) {
      // Backend went offline mid-session — add locally
      console.warn('Backend unreachable, adding locally:', error);
      setIsBackendOnline(false);
      setTodos((prev) => [...prev, { id: generateId(), ...payload }]);
    }
  };

  const updateTodo = async (id: string, updatedTodo: Todo) => {
    if (!isBackendOnline) {
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodo),
      });
      if (res.ok) {
        setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
      }
    } catch (error) {
      console.warn('Backend unreachable, updating locally:', error);
      setIsBackendOnline(false);
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
    }
  };

  const deleteTodo = async (id: string) => {
    if (!isBackendOnline) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (error) {
      console.warn('Backend unreachable, deleting locally:', error);
      setIsBackendOnline(false);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <TodoContext.Provider value={{ todos, fetchTodos, addTodo, updateTodo, deleteTodo, isBackendOnline }}>
      {children}
    </TodoContext.Provider>
  );
};
