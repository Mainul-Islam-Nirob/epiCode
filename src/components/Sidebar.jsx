import { useState } from 'react';
import {Search, Sun, Moon, Palette, Github, Linkedin, Facebook, Mail, Globe, ExternalLink, Shuffle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';


const Sidebar = ({ pageType = 'all' }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Mock tags data
  const allTags = {
    coding: ['JavaScript', 'React', 'Python', 'Tutorial', 'Algorithm', 'CSS', 'Node.js'],
    literature: ['Poetry', 'Fiction', 'Essays', 'Analysis', 'Classic', 'Modern', 'Review']
  };

  const getTagsToShow = () => {
    if (pageType === 'coding') return { Coding: allTags.coding };
    if (pageType === 'literature') return { Literature: allTags.literature };
    return { Coding: allTags.coding, Literature: allTags.literature };
  };

  const tagsToShow = getTagsToShow();

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  const handleRandomArticle = () => {
    alert('Random article feature - will navigate to random article');
  };

  const socialLinks = [
    { icon: Linkedin, url: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Github, url: '#', label: 'GitHub', color: '#333' },
    { icon: Facebook, url: '#', label: 'Facebook', color: '#1877F2' },
    { icon: Globe, url: '#', label: 'Portfolio', color: '#8B5CF6' }
  ];

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun className="w-5 h-5" />;
    if (theme === 'dark') return <Moon className="w-5 h-5" />;
    return <Palette className="w-5 h-5" />;
  };

  const getThemeLabel = () => {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Search Bar */}
      <div className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)] shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[var(--code-bg)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all text-[var(--text-primary)]"
          />
        </div>
      </div>

      {/* Tags Section */}
      <div className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)] shadow-sm">
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Filter by Tags</h3>
        
        {Object.entries(tagsToShow).map(([category, tags]) => (
          <div key={category} className="mb-4 last:mb-0">
            <h4 className="text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wide">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-md scale-105'
                      : 'bg-[var(--code-bg)] text-[var(--text-secondary)] hover:bg-[var(--primary)] hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Clear Filters */}
        {(selectedTags.length > 0 || searchQuery) && (
          <button
            onClick={clearFilters}
            className="w-full mt-4 px-4 py-2 bg-[var(--code-bg)] text-[var(--text-secondary)] rounded-lg font-medium hover:bg-[var(--secondary)] hover:text-white transition-all duration-200"
          >
            Clear Filters ({selectedTags.length + (searchQuery ? 1 : 0)})
          </button>
        )}
      </div>

      {/* Random Article */}
      <button
        onClick={handleRandomArticle}
        className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-2xl p-4 font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
      >
        <Shuffle className="w-5 h-5" />
        Random Article
      </button>

      {/* Theme Toggle */}
      <div className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--border)] shadow-sm">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-3 bg-[var(--code-bg)] rounded-xl hover:bg-gradient-to-r hover:from-[var(--primary)] hover:to-[var(--secondary)] hover:text-white transition-all duration-300 group"
        >
          <span className="flex items-center gap-2 font-medium">
            {getThemeIcon()}
            <span>Theme: {getThemeLabel()}</span>
          </span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

       {/* Social Links */}
      <div className="bg-[var(--surface)] rounded-2xl p-5 border border-[var(--border)] shadow-sm">
        <h3 className="text-lg text-center font-bold text-[var(--text-primary)] mb-4">Connect</h3>
        <div className="flex justify-center flex-wrap gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--code-bg)] hover:scale-110 transition-all duration-300 group relative"
                aria-label={link.label}
              >
                <Icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--primary)] transition-colors" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[var(--text-primary)] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-[var(--text-secondary)]">
        <p>© {new Date().getFullYear()} EpiCode</p>
        <p className="mt-1">All rights reserved</p>
      </div>
    </aside>
  );
};

export default Sidebar;