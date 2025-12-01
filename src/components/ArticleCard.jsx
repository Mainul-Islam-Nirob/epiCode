
import { Link } from 'react-router-dom';
import { Clock, MessageCircle, ThumbsUp, Bookmark, UserPen } from 'lucide-react';

const ArticleCard = ({ article }) => {
  const truncate = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // const formatDate = (date) => {
  //   return new Date(date).toLocaleDateString('en-US', {
  //     month: 'short',
  //     day: 'numeric'
  //   });
  // };

  return (
    <article className="group relative pl-8 pb-8 border-l-2 border-[var(--border)] hover:border-[var(--primary)] transition-colors">
      {/* Timeline dot */}
      <div className="absolute left-0 top-[-13px] -translate-x-[9px] w-4 h-4 rounded-full bg-[var(--surface)] border-2 border-[var(--border)] group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] transition-all"></div>

      {/* Date badge */}
      {/* <div className="absolute left-0 top-8 -translate-x-[calc(100%+2rem)] text-right">
        <div className="text-sm font-bold text-[var(--text-primary)]">
          {formatDate(article.createdAt).split(' ')[0]}
        </div>
        <div className="text-xs text-[var(--text-secondary)]">
          {formatDate(article.createdAt).split(' ')[1]}
        </div>
      </div> */}

      <div className="bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)] hover:shadow-lg transition-all">
       {/* Title */}
        <Link to={`/article/${article.id}`}>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>

         {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {article.tags && article.tags.slice(0, 3).map((tagObj) => (
            <span
              key={tagObj.tag?.id || tagObj.tagId}
              className="px-2 py-0.5 text-xs font-semibold rounded bg-[var(--code-bg)] text-[var(--primary)]"
            >
              {tagObj.tag?.name || 'Tag'}
            </span>
          ))}
        </div>

        {/* Excerpt */}
        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
          {truncate(article.excerpt || article.content, 290)}
          {/* {article.excerpt} */}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
            <UserPen  className="w-3.5 h-3.5" />
            <span className="font-medium text-[var(--text-primary)]">
              {article.author?.name || 'Anonymous'}
            </span>
            <span>|</span>
            <Clock  className="w-3.5 h-3.5"/>
            <span>{article.readTime} min</span>
          </div>

          <div className="flex items-center gap-3 text-[var(--text-secondary)]">
            <div className="flex items-center gap-1 hover:text-[var(--primary)] cursor-pointer transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{article._count?.upvotes || 0}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-[var(--primary)] cursor-pointer transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{article._count?.comments || 0}</span>
            </div>
            <button className="hover:text-[var(--primary)] transition-colors">
              <Bookmark className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;