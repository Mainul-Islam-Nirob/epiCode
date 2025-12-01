import { useState, useEffect } from 'react';
import axios from 'axios';
import { Code2, TrendingUp, Clock, Zap, Terminal, Cpu } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';

const Coding = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('latest');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/posts?category=coding');
      const articlesArray = Array.isArray(response.data) 
        ? response.data 
        : (response.data.posts || response.data.data || []);
      
      setArticles(articlesArray);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const handleRandomArticle = () => {
    if (articles.length > 0) {
      const randomIndex = Math.floor(Math.random() * articles.length);
      window.location.href = `/article/${articles[randomIndex].id}`;
    }
  };

  const filterButtons = [
    { id: 'latest', label: 'Latest', icon: Clock },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'random', label: 'Random', icon: Zap, action: handleRandomArticle }
  ];

  if (loading) {
    return (
      <div className="pb-6 mr-3">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-12 bg-[var(--code-bg)] rounded w-1/3 mb-4"></div>
          <div className="flex gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-10 bg-[var(--code-bg)] rounded w-24"></div>
            ))}
          </div>
        </div>

        {/* Articles Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-[var(--surface)] rounded-2xl border border-[var(--border)] animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8 max-w-md mx-auto">
          <Terminal className="w-16 h-16 mx-auto mb-4 text-[var(--secondary)]" />
          <p className="text-[var(--secondary)] text-lg mb-4">⚠️ Error loading articles</p>
          <p className="text-[var(--text-secondary)] mb-4 font-mono text-sm">{error}</p>
          <button 
            onClick={fetchArticles}
            className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-6 mr-3">
      {/* Header with Tech Vibe */}
      <div className="mb-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 text-6xl font-mono text-[var(--primary)]">{'</'}</div>
          <div className="absolute top-0 right-0 text-6xl font-mono text-[var(--secondary)]">{'>'}</div>
          <div className="absolute bottom-0 left-1/4 text-4xl font-mono text-[var(--accent)]">{'{}'}</div>
          <div className="absolute bottom-0 right-1/4 text-4xl font-mono text-[var(--primary)]">{'[]'}</div>
        </div>

        <div className="relative">
          {/* Title with Tech Icons */}
          <div className="flex items-center gap-4 mb-2 justify-between">
            {/* <div className="flex items-center gap-2">
              <Code2 className="w-10 h-10 text-[var(--primary)]" />
              <Terminal className="w-8 h-8 text-[var(--secondary)]" />
            </div> */}
            <div>
              <h1 className="text-4xl font-black text-[var(--text-primary)] tracking-tight">
                <span className="text-[var(--primary)]">{'<'}</span>
                Coding
                <span className="text-[var(--secondary)]">{'/>'}</span>
              </h1>
              <p className="text-[var(--text-secondary)] font-mono text-sm">
                // {articles.length} articles found
              </p>
            </div>

             {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {filterButtons.map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={btn.action || (() => setFilter(btn.id))}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all border-2 ${
                    filter === btn.id && !btn.action
                      ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg shadow-[var(--primary)]/30'
                      : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-mono text-sm">{btn.label}</span>
                </button>
              );
            })}
          </div>

          </div>

         
          {/* Tech Stats Banner */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 rounded-xl p-4 border border-[var(--primary)]/20">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-xs font-mono text-[var(--text-secondary)]">TOTAL</span>
              </div>
              <p className="text-2xl font-bold text-[var(--primary)] font-mono">{articles.length}</p>
            </div>
            <div className="bg-gradient-to-br from-[var(--secondary)]/10 to-[var(--secondary)]/5 rounded-xl p-4 border border-[var(--secondary)]/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-[var(--secondary)]" />
                <span className="text-xs font-mono text-[var(--text-secondary)]">TRENDING</span>
              </div>
              <p className="text-2xl font-bold text-[var(--secondary)] font-mono">
                {Math.floor(articles.length * 0.3)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 rounded-xl p-4 border border-[var(--accent)]/20">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-xs font-mono text-[var(--text-secondary)]">THIS WEEK</span>
              </div>
              <p className="text-2xl font-bold text-[var(--accent)] font-mono">
                {Math.floor(articles.length * 0.2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid with Code Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {articles.map((article, index) => (
          <div 
            key={article.id}
            className="relative group"
          >
            {/* Line numbers decoration */}
            {/* <div className="absolute -left-8 top-0 text-[var(--text-secondary)] opacity-30 font-mono text-xs select-none hidden lg:block">
              {String(index + ).padStart(2, '0')}
            </div> */}
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="bg-[var(--surface)] rounded-2xl border-2 border-dashed border-[var(--border)] p-12">
            <Terminal className="w-20 h-20 mx-auto mb-4 text-[var(--text-secondary)] opacity-50" />
            <p className="text-[var(--text-secondary)] text-lg font-mono mb-2">
              {'// No articles found'}
            </p>
            <p className="text-[var(--text-secondary)] text-sm">Check back later for coding content!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coding;