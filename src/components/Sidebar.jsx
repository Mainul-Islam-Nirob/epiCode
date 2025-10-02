import { useState } from 'react';
import { Shuffle, X } from 'lucide-react';
import { Github, Linkedin, Facebook, Mail, Globe } from 'lucide-react';

const Sidebar = ({ pageType = 'all' }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  // Mock tags data
  const allTags = {
    coding: ['JavaScript', 'React', 'Python', 'Tutorial', 'Algorithm', 'CSS', 'Node.js', 'TypeScript', 'API'],
    literature: ['Poetry', 'Fiction', 'Essays', 'Analysis', 'Classic', 'Modern', 'Review', 'Drama']
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
  };

  const handleRandomArticle = () => {
    alert('Random article feature - will navigate to random article');
  };

  const socialLinks = [
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
    { icon: Github, url: '#', label: 'GitHub' },
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Mail, url: 'mailto:your@email.com', label: 'Email' },
    { icon: Globe, url: '#', label: 'Portfolio' }
  ];

  return (
    <div className="space-y-6">
      {/* Tags Section */}
      <div className="bg-[var(--bg)] rounded-2xl p-5 border border-[var(--border)]">
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
        {selectedTags.length > 0 && (
          <button
            onClick={clearFilters}
            className="w-full mt-4 px-4 py-2 bg-[var(--code-bg)] text-[var(--text-secondary)] rounded-lg font-medium hover:bg-[var(--secondary)] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear Filters ({selectedTags.length})
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

      {/* Social Links */}
      <div className="bg-[var(--bg)] rounded-2xl p-5 border border-[var(--border)]">
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Connect</h3>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--code-bg)] hover:scale-110 hover:bg-[var(--primary)] hover:text-white transition-all duration-300 group"
                aria-label={link.label}
              >
                <Icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-white transition-colors" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-[var(--text-secondary)] border-t border-[var(--border)] pt-4">
        <p>© {new Date().getFullYear()} EpiCode</p>
        <p className="mt-1">All rights reserved</p>
      </div>
    </div>
  );
};

export default Sidebar;