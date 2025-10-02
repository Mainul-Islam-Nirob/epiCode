import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ThumbsUp, Calendar } from 'lucide-react';

const ArticleCard = ({ article }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Truncate text helper
  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="group bg-[var(--surface)] rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
      {/* Featured Image */}
      <Link to={`/article/${article.id}`} className="block relative overflow-hidden aspect-video bg-[var(--code-bg)] flex-shrink-0">
        {!imageError && article.image ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-[var(--code-bg)]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>
              </div>
            )}
            <img
              src={article.image}
              alt={article.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10">
            <span className="text-4xl font-bold text-[var(--text-secondary)] opacity-20">
              {article.title?.charAt(0) || 'A'}
            </span>
          </div>
        )}
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags.slice(0, 3).map((tagObj) => (
              <span
                key={tagObj.tag?.id || tagObj.tagId}
                className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-[var(--primary)]/10 to-[var(--secondary)]/10 text-[var(--primary)] hover:from-[var(--primary)] hover:to-[var(--secondary)] hover:text-white transition-all duration-200 cursor-pointer"
              >
                {tagObj.tag?.name || 'Tag'}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--code-bg)] text-[var(--text-secondary)]">
                +{article.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <Link to={`/article/${article.id}`}>
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-200">
            {truncate(article.title, 80)}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-[var(--text-secondary)] mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
          {truncate(article.excerpt || article.content, 150)}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)] border-t border-[var(--border)] pt-4 mt-auto">
          {/* Author */}
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span className="font-medium">{article.author?.name || 'Anonymous'}</span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(article.createdAt)}</span>
          </div>

          {/* Read Time */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime} min</span>
          </div>

          {/* Upvotes */}
          <div className="flex items-center gap-1.5 ml-auto">
            <ThumbsUp className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span className="font-semibold text-[var(--primary)]">
              {article._count?.upvotes || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="h-1 bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </article>
  );
};

export default ArticleCard;