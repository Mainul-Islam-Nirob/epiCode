import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded border transition-all duration-300 text-sm bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:shadow"
    >
      Theme: {theme.replace('theme-', '')}
    </button>
  );
};

export default ThemeToggle;