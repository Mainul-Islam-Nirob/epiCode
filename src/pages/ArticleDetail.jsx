import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Calendar,
  Clock,
  ThumbsUp,
  MessageCircle,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
  TrendingUp
} from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    fetchArticle();
    checkUpvoteStatus();
    
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
      setArticle(response.data.data);
      setUpvoteCount(response.data.data._count?.upvotes || 0);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch article');
    } finally {
      setLoading(false);
    }
  };

  const checkUpvoteStatus = () => {
    const upvotedArticles = JSON.parse(localStorage.getItem('upvotedArticles') || '[]');
    setUpvoted(upvotedArticles.includes(id));
  };

  const handleUpvote = async () => {
    try {
      if (upvoted) {
        await axios.delete(`http://localhost:3000/api/posts/${id}/upvote`);
        setUpvoteCount(prev => prev - 1);
        setUpvoted(false);
        const upvotedArticles = JSON.parse(localStorage.getItem('upvotedArticles') || '[]');
        localStorage.setItem('upvotedArticles', JSON.stringify(upvotedArticles.filter(articleId => articleId !== id)));
      } else {
        await axios.post(`http://localhost:3000/api/posts/${id}/upvote`);
        setUpvoteCount(prev => prev + 1);
        setUpvoted(true);
        const upvotedArticles = JSON.parse(localStorage.getItem('upvotedArticles') || '[]');
        localStorage.setItem('upvotedArticles', JSON.stringify([...upvotedArticles, id]));
      }
    } catch (err) {
      console.error('Upvote error:', err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || '';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getArticleCategory = () => {
    if (!article?.tags) return 'general';
    const codingTags = ['javascript', 'python', 'react', 'css', 'html', 'nodejs', 'typescript', 'api', 'algorithm', 'tutorial'];
    const hasCodeTag = article.tags.some(tag => 
      codingTags.includes(tag.tag?.name?.toLowerCase())
    );
    return hasCodeTag ? 'coding' : 'literature';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-[var(--surface)] rounded-2xl w-3/4"></div>
            <div className="h-6 bg-[var(--surface)] rounded-xl w-1/2"></div>
            <div className="h-96 bg-[var(--surface)] rounded-3xl"></div>
            <div className="space-y-4">
              <div className="h-4 bg-[var(--surface)] rounded-lg"></div>
              <div className="h-4 bg-[var(--surface)] rounded-lg"></div>
              <div className="h-4 bg-[var(--surface)] rounded-lg w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-8xl mb-4">😕</div>
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Article Not Found</h2>
          <p className="text-[var(--text-secondary)] mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const category = getArticleCategory();
  const isCoding = category === 'coding';

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[var(--border)] z-50">
        <div 
          className="h-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-8 z-40 animate-slideUp">
        <div className="bg-[var(--surface)]/80 backdrop-blur-xl rounded-full shadow-2xl border border-[var(--border)] p-2 flex items-center gap-2">
          {/* Upvote */}
          <button
            onClick={handleUpvote}
            className={`group relative flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
              upvoted
                ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg shadow-[var(--primary)]/30'
                : 'hover:bg-[var(--code-bg)] text-[var(--text-secondary)]'
            }`}
          >
            <ThumbsUp className={`w-5 h-5 transition-transform group-hover:scale-110 ${upvoted ? 'fill-current' : ''}`} />
            <span className="font-bold">{upvoteCount}</span>
            {!upvoted && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--text-primary)] text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Upvote this article
              </span>
            )}
          </button>

          <div className="w-px h-8 bg-[var(--border)]"></div>

          {/* Comments */}
          <button className="group relative flex items-center gap-2 px-6 py-3 rounded-full hover:bg-[var(--code-bg)] text-[var(--text-secondary)] transition-all">
            <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-bold">{article._count?.comments || 0}</span>
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--text-primary)] text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              View comments
            </span>
          </button>

          <div className="w-px h-8 bg-[var(--border)]"></div>

          {/* Copy Link */}
          <button
            onClick={handleCopyLink}
            className="group relative p-3 rounded-full hover:bg-[var(--code-bg)] text-[var(--text-secondary)] transition-all"
          >
            {linkCopied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 transition-transform group-hover:scale-110" />
            )}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--text-primary)] text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {linkCopied ? 'Copied!' : 'Copy link'}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={() => handleShare('twitter')}
            className="group relative p-3 rounded-full hover:bg-[var(--code-bg)] text-[var(--text-secondary)] transition-all"
          >
            <Share2 className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--text-primary)] text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Share
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-3xl mx-auto px-4 pt-8 pb-32">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-8 transition-colors"
        >
          <div className="p-2 rounded-full group-hover:bg-[var(--code-bg)] transition-all">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-medium">Back</span>
        </button>

        {/* Header */}
        <header className="mb-12">
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.slice(0, 3).map((tagObj) => (
                <Link
                  key={tagObj.tag?.id || tagObj.tagId}
                  to={`/${category}?tag=${tagObj.tag?.name}`}
                  className="group relative px-4 py-2 bg-[var(--code-bg)] text-[var(--primary)] rounded-full text-sm font-semibold hover:bg-gradient-to-r hover:from-[var(--primary)] hover:to-[var(--secondary)] hover:text-white transition-all"
                >
                  <span className="relative z-10">{tagObj.tag?.name}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className={`text-5xl md:text-6xl font-black text-[var(--text-primary)] mb-8 leading-tight ${
            isCoding ? 'font-sans' : 'font-serif'
          }`}>
            {article.title}
          </h1>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              {article.excerpt}
            </p>
          )}

          {/* Author & Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-[var(--border)]">
            <div className="flex items-center gap-4">
              {/* Author Avatar */}
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {article.author?.name?.charAt(0) || 'A'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[var(--surface)]"></div>
              </div>
              
              <div>
                <p className="font-bold text-[var(--text-primary)] text-lg">
                  {article.author?.name || 'Anonymous'}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  {article.author?.role || 'Author'}
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] rounded-full">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[var(--surface)] rounded-full">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {article.image && (
          <div className="mb-12 -mx-4 md:mx-0">
            <div className="relative group overflow-hidden rounded-3xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`prose prose-lg md:prose-xl max-w-none ${
          isCoding 
            ? 'prose-code:text-[var(--code-text)] prose-code:bg-[var(--code-bg)] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:bg-[var(--code-bg)] prose-pre:border prose-pre:border-[var(--border)]'
            : 'prose-headings:font-serif prose-p:text-[var(--text-primary)] prose-p:leading-relaxed'
        }`}>
          <div 
            className="text-[var(--text-primary)] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Related Tags */}
        <div className="mt-16 pt-8 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Topics</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {article.tags && article.tags.map((tagObj) => (
              <Link
                key={tagObj.tag?.id || tagObj.tagId}
                to={`/${category}?tag=${tagObj.tag?.name}`}
                className="px-5 py-2 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 text-[var(--primary)] rounded-full font-semibold hover:from-[var(--primary)] hover:to-[var(--secondary)] hover:text-white transition-all hover:shadow-lg hover:scale-105"
              >
                {tagObj.tag?.name}
              </Link>
            ))}
          </div>
        </div>
      </article>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;