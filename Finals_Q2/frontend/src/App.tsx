import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TodoPage from './pages/TodoPage';
import AboutPage from './pages/AboutPage';
import { ThemeProvider } from './context/ThemeContext';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TodoPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
