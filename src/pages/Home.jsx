import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import { Clock, TrendingUp, Shuffle} from 'lucide-react';


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/posts');
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

  if (loading) {
    return (
      <div className="pb-6 mr-3">
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-[var(--code-bg)] rounded w-1/3 mb-2"></div>
        </div>
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="pl-8 border-l-2 border-[var(--border)]">
              <div className="bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)] animate-pulse">
                <div className="h-4 bg-[var(--code-bg)] rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-[var(--code-bg)] rounded w-full mb-2"></div>
                <div className="h-4 bg-[var(--code-bg)] rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8 max-w-md mx-auto">
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
    <div className="pb-6 mr-3">
       {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-1">All Articles</h1>
          <p className="text-[var(--text-secondary)]">{articles.length} articles</p>
        </div>

        {/* Sort options */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSortBy('latest')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              sortBy === 'latest'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--code-bg)]'
            }`}
          >
            <Clock className="w-4 h-4" />
            Latest
          </button>
          <button
            onClick={() => setSortBy('trending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              sortBy === 'trending'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--code-bg)]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Trending
          </button>
           <button
            onClick={() => setSortBy('random')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              sortBy === 'random'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--code-bg)]'
            }`}
          >
            <Shuffle className="w-4 h-4" />
            Random
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-8">
            <p className="text-[var(--text-secondary)] text-lg">📝 No articles found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;