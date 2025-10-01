import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="text-center py-20">
    <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
    <p className="mb-6 text-[var(--text-secondary)]">Lost in the code jungle?</p>
    <Link to="/" className="text-[var(--accent)] underline">Return Home</Link>
  </section>
);

export default NotFound;