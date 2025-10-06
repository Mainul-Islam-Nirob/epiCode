import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isArticleDetail = location.pathname.startsWith('/article/');
  
  // Determine page type for sidebar
  const getPageType = () => {
    if (location.pathname.includes('/coding')) return 'coding';
    if (location.pathname.includes('/literature')) return 'literature';
    return 'all';
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <Header />
      
      {isArticleDetail ? (
        // Article detail page - no sidebar
        <main className="w-full">
          <Outlet />
        </main>
      ) : (
        // Other pages - with sidebar
        <div className="flex flex-col lg:flex-row">
          <main className="flex-1 px-4 py-6 lg:px-8 lg:pr-0">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </main>
          
          <aside className="w-full lg:w-80 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto border-t lg:border-t-0 lg:border-l border-[var(--border)] bg-[var(--surface)]">
            <div className="p-4 lg:p-6">
              <Sidebar pageType={getPageType()} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Layout;