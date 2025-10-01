import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => (
  <header className="bg-[var(--surface)] shadow-md px-4 py-3 flex justify-between items-center">
    <h1 className="text-xl font-bold text-[var(--primary)]">code/blog</h1>
    <nav className="space-x-4">
      <Link to="/" className="text-[var(--text-secondary)] hover:underline">All Articles</Link>
      <Link to="/about" className="text-[var(--text-secondary)] hover:underline">About</Link>
    </nav>

    <div className="bg-[var(--bg)] text-[var(--text-primary)] p-4 rounded shadow-[var(--shadow)]">
  This is themed content.
</div>

<ThemeToggle />
  </header>
);

export default Header;