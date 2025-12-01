import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon, Palette, LogIn, UserPlus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

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

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun className="w-5 h-5" />;
    if (theme === 'dark') return <Moon className="w-5 h-5" />;
    return <Palette className="w-5 h-5" />;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      console.log('Searching for:', searchQuery);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--surface)]/80 backdrop-blur-md shadow-lg border-b border-[var(--border)]'
          : 'bg-[var(--surface)] border-b border-[var(--border)]'
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center group flex-shrink-0"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div className="relative overflow-hidden">
              <div className="text-2xl font-black flex items-center">
                <span className="text-[var(--primary)]">epi</span>
                <span 
                  className={`text-[var(--secondary)] inline-block transition-all duration-300 ${
                    isLogoHovered ? 'opacity-0 w-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                >
                  c
                </span>
                <span 
                  className={`text-[var(--text-secondary)] inline-block transition-all duration-300 ${
                    isLogoHovered ? 'opacity-0 w-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                >
                  /
                </span>
                <span 
                  className={`text-[var(--secondary)] relative inline-block transition-all duration-300 ${
                    isLogoHovered ? '-translate-x-5' : 'translate-x-0'
                  }`}
                >
                  c
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                </span>
                <span className="text-[var(--primary)]">ode</span>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
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

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="cursor-pointer p-2 rounded-lg hover:bg-[var(--code-bg)] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
              
              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl p-3 z-50">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 bg-[var(--code-bg)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                      autoFocus
                    />
                  </form>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="cursor-pointer p-2 rounded-lg hover:bg-[var(--code-bg)] transition-colors"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
            </button>

            {/* Login */}
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[var(--code-bg)] transition-colors text-[var(--text-secondary)] hover:text-[var(--primary)]"
            >
              <LogIn className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </Link>

            {/* Register */}
            <Link
              to="/register"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white hover:shadow-lg transition-all"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Register</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--code-bg)] transition-colors"
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
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
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
          
          {/* Mobile Actions */}
          <div className="pt-2 border-t border-[var(--border)] space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[var(--code-bg)] transition-colors"
            >
              {getThemeIcon()}
              <span className="font-medium">Change Theme</span>
            </button>
            
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[var(--code-bg)] transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span className="font-medium">Login</span>
            </Link>
            
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-medium">Register</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;