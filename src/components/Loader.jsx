import { useLoading } from '../context/LoadingContext';
import { useTheme } from '../context/ThemeContext';
import { CSSTransition } from 'react-transition-group';
import '../../src/styles/loader.css';

const Loader = () => {
  const { loading } = useLoading();

  return (
    <CSSTransition in={loading} timeout={300} classNames="fade" unmountOnExit>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg)] bg-opacity-80">
        <svg
          className="animate-spin h-12 w-12 text-[var(--primary)]"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 4h16v2H4V4zm0 6h10v2H4v-2zm0 6h6v2H4v-2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 14v6m0 0h-6m6 0l-7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="ml-4 text-[var(--text-secondary)] font-medium">Loading epic thoughts…</span>
      </div>
    </CSSTransition>
  );
};

export default Loader;