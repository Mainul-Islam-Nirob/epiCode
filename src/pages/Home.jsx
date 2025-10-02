import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      if (!response.ok) throw new Error('Failed to fetch articles');
      const data = await response.json();
      
      // Handle both array and object responses
      const articlesArray = Array.isArray(data) ? data : (data.posts || data.data || []);
      setArticles(articlesArray);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Masonry layout - assign different sizes to cards
  const getCardSize = (index) => {
    const patterns = [
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-2', // Tall
      'col-span-2 row-span-1', // Wide
      'col-span-2 row-span-2', // Large
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-1', // Small
    ];
    return patterns[index % patterns.length];
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden animate-pulse ${getCardSize(i)}`}
          >
            <div className="aspect-video bg-[var(--code-bg)]"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-[var(--code-bg)] rounded w-3/4"></div>
              <div className="h-4 bg-[var(--code-bg)] rounded"></div>
              <div className="h-4 bg-[var(--code-bg)] rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8">
          <p className="text-[var(--secondary)] text-lg mb-4">⚠️ Error loading articles</p>
          <p className="text-[var(--text-secondary)]">{error}</p>
          <button 
            onClick={fetchArticles}
            className="mt-4 px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 lg:pb-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">All Articles</h1>
        <p className="text-[var(--text-secondary)]">
          Explore our collection of {articles.length} articles on coding and literature
        </p>
      </div>

      {/* Masonry Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
        {articles.map((article, index) => (
          <div key={article.id} className={getCardSize(index)}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8">
            <p className="text-[var(--text-secondary)] text-lg">📝 No articles found</p>
            <p className="text-[var(--text-secondary)] text-sm mt-2">Check back later for new content!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;