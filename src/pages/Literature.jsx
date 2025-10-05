import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, TrendingUp, Clock, Sparkles, Feather, Quote } from 'lucide-react';
import ArticleCard from '../components/ArticleCard';

const Literature = () => {
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
      const response = await axios.get('http://localhost:3000/api/posts?category=literature');
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
    { id: 'random', label: 'Surprise Me', icon: Sparkles, action: handleRandomArticle }
  ];

  if (loading) {
    return (
      <div className="pb-6">
        {/* Header Skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="h-12 bg-[var(--code-bg)] rounded w-1/3 mb-4"></div>
          <div className="flex gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-10 bg-[var(--code-bg)] rounded w-32"></div>
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
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-[var(--secondary)]" />
          <p className="text-[var(--secondary)] text-lg mb-4">⚠️ Error loading articles</p>
          <p className="text-[var(--text-secondary)] mb-4">{error}</p>
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
    <div className="pb-6">
      {/* Header with Literary Vibe */}
      <div className="mb-8 relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 text-6xl text-[var(--primary)]">"</div>
          <div className="absolute top-0 right-0 text-6xl text-[var(--secondary)]">"</div>
          <Feather className="absolute bottom-0 left-1/4 w-16 h-16 text-[var(--accent)] opacity-30" />
          <BookOpen className="absolute bottom-0 right-1/4 w-12 h-12 text-[var(--primary)] opacity-30" />
        </div>

        <div className="relative">
          {/* Title with Literary Style */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-10 h-10 text-[var(--primary)]" />
              <Feather className="w-8 h-8 text-[var(--secondary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-[var(--text-primary)] tracking-tight">
                <span className="text-[var(--primary)]">"</span>
                Literature
                <span className="text-[var(--secondary)]">"</span>
              </h1>
              <p className="text-[var(--text-secondary)] italic text-sm">
                A collection of {articles.length} literary pieces
              </p>
            </div>
          </div>

          {/* Filter Buttons - Elegant Style */}
          <div className="flex flex-wrap gap-3 mt-6">
            {filterButtons.map((btn) => {
              const Icon = btn.icon;
              return (
                <button
                  key={btn.id}
                  onClick={btn.action || (() => setFilter(btn.id))}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all ${
                    filter === btn.id && !btn.action
                      ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg'
                      : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{btn.label}</span>
                </button>
              );
            })}
          </div>

          {/* Literary Stats Cards */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-[var(--primary)]/5 to-transparent rounded-2xl p-4 border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <Quote className="w-5 h-5 text-[var(--primary)]" />
                <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Pieces
                </span>
              </div>
              <p className="text-3xl font-serif font-bold text-[var(--primary)]">{articles.length}</p>
            </div>
            <div className="bg-gradient-to-br from-[var(--secondary)]/5 to-transparent rounded-2xl p-4 border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[var(--secondary)]" />
                <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Popular
                </span>
              </div>
              <p className="text-3xl font-serif font-bold text-[var(--secondary)]">
                {Math.floor(articles.length * 0.3)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-[var(--accent)]/5 to-transparent rounded-2xl p-4 border border-[var(--border)]">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  Recent
                </span>
              </div>
              <p className="text-3xl font-serif font-bold text-[var(--accent)]">
                {Math.floor(articles.length * 0.2)}
              </p>
            </div>
          </div>

          {/* Decorative Quote */}
          <div className="mt-6 p-4 border-l-4 border-[var(--primary)] bg-gradient-to-r from-[var(--primary)]/5 to-transparent rounded-r-xl">
            <p className="text-[var(--text-secondary)] italic text-sm">
              "The only way to do great work is to love what you do."
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">— Literary Wisdom</p>
          </div>
        </div>
      </div>

      {/* Articles Grid with Literary Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <div 
            key={article.id}
            className="relative"
          >
            {/* Decorative quote mark */}
            {index % 3 === 0 && (
              <div className="absolute -top-4 -left-4 text-6xl text-[var(--primary)] opacity-10 font-serif select-none hidden lg:block">
                "
              </div>
            )}
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-12">
            <BookOpen className="w-20 h-20 mx-auto mb-4 text-[var(--text-secondary)] opacity-50" />
            <p className="text-[var(--text-secondary)] text-lg italic mb-2">
              No literary pieces found
            </p>
            <p className="text-[var(--text-secondary)] text-sm">The library awaits new stories...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Literature;