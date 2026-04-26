import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '🔀', title: 'Routing', desc: 'Client-side navigation with React Router for smooth page transitions.' },
  { icon: '🧠', title: 'Context API', desc: 'Global state management with automatic API sync.' },
  { icon: '🎨', title: 'Theming', desc: 'Dynamic light/dark mode via shared ThemeContext.' },
  { icon: '🔗', title: 'Backend', desc: '.NET Core Web API serving RESTful endpoints as the data source.' },
  { icon: '🔒', title: 'Immutability', desc: 'Strict immutable state update patterns throughout the component tree.' },
  { icon: '⚡', title: 'Vite + React', desc: 'Lightning-fast dev experience with TypeScript support.' },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="page-header">
        About <span>TaskFlow</span>
      </h1>
      <div className="about-card">
        <p>
          TaskFlow is a full-stack Todo application built as a culminating project demonstrating
          modern React patterns integrated with a .NET Core backend.
        </p>

        <h3>Key Features</h3>
        <div className="feature-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/')} className="btn-primary">
          ← Back to Tasks
        </button>
      </div>
    </div>
  );
}
