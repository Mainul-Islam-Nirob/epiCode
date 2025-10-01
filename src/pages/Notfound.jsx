import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg)] text-[var(--text-primary)] px-6 py-12 text-center">
    {/* SVG Illustration */}
    <svg
      className="w-24 h-24 mb-6 text-[var(--primary)] animate-bounce"
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

    {/* Witty Message */}
    <h1 className="text-4xl font-bold mb-4">404: Chapter Not Found</h1>
    <p className="text-[var(--text-secondary)] max-w-md mb-6">
      Looks like this page fell out of the book or got lost in a recursive loop. Let’s get you back to readable code.
    </p>

    {/* Navigation Button */}
    <Link
      to="/"
      className="px-4 py-2 rounded bg-[var(--primary)] text-white hover:bg-[var(--accent)] transition-colors duration-300"
    >
      Return Home
    </Link>
  </section>
);

export default NotFound;