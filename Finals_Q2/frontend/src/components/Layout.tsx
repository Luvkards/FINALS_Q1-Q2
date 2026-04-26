import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useTodos } from '../hooks/useTodos';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { isBackendOnline } = useTodos();
  const location = useLocation();

  return (
    <div className={`app-container ${theme}`}>
      <nav className="navbar">
        <div className="nav-brand">
          <h2>✦ TaskFlow</h2>
        </div>
        <div className="nav-links">
          <Link
            to="/"
            style={location.pathname === '/' ? { color: 'var(--primary)', background: 'var(--primary-light)' } : {}}
          >
            🏠 Home
          </Link>
          <Link
            to="/about"
            style={location.pathname === '/about' ? { color: 'var(--primary)', background: 'var(--primary-light)' } : {}}
          >
            ℹ️ About
          </Link>
          <span
            title={isBackendOnline ? 'Backend connected' : 'Backend offline — running in local mode'}
            style={{ fontSize: '0.75rem', fontWeight: 600, color: isBackendOnline ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: isBackendOnline ? 'var(--success)' : 'var(--danger)', display: 'inline-block' }} />
            {isBackendOnline ? 'API Online' : 'Offline Mode'}
          </span>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>✦ TaskFlow &mdash; Built with React + .NET &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
