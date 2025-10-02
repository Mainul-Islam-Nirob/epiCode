import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'All Articles' },
    { path: '/coding', label: 'Coding' },
    { path: '/literature', label: 'Literature' },
    { path: '/about', label: 'About' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--surface)]/80 backdrop-blur-md shadow-lg border-b border-[var(--border)]'
          : 'bg-[var(--surface)] border-b border-[var(--border)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with epic/code animation - Fixed overflow */}
          <Link 
            to="/" 
            className="flex items-center group"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div className="relative">
              <div className="text-2xl font-black flex items-center whitespace-nowrap">
                {/* epic */}
                <span className="text-[var(--primary)] transition-all duration-300">
                  epi
                </span>
                
                {/* First C - fades out and collapses */}
                <span 
                  className={`text-[var(--secondary)] inline-block transition-all duration-300 ${
                    isLogoHovered ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100'
                  }`}
                  style={{ transformOrigin: 'right center' }}
                >
                  c
                </span>
                
                {/* Slash - fades out */}
                <span 
                  className={`text-[var(--text-secondary)] inline-block transition-all duration-300 ${
                    isLogoHovered ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100'
                  }`}
                >
                  /
                </span>
                
                {/* Second C - moves left on hover */}
                <span 
                  className={`text-[var(--secondary)] relative inline-block transition-all duration-300 ${
                    isLogoHovered ? '-translate-x-0' : 'translate-x-0'
                  }`}
                >
                  c
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                </span>
                
                {/* ode */}
                <span className="text-[var(--primary)] transition-all duration-300">
                  ode
                </span>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                  isActive(link.path)
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--code-bg)] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[var(--text-primary)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--text-primary)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <nav className="px-4 py-4 space-y-2 bg-[var(--surface)] border-t border-[var(--border)]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-full text-left block px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--code-bg)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;