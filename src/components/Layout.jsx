import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  
  // Determine page type for sidebar
  const getPageType = () => {
    if (location.pathname.includes('/coding')) return 'coding';
    if (location.pathname.includes('/literature')) return 'literature';
    return 'all';
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Container for header and content - doesn't extend to sidebar */}
      <div className="lg:mr-80">
        <Header />
      </div>
      
      <div className="flex">
        {/* Main Content Area */}
        <main className="flex-1 px-4 py-6 lg:px-8 lg:mr-80">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Sidebar - Fixed on right, hidden on mobile */}
        <aside className="hidden lg:block fixed right-0 top-16 w-72 h-[calc(100vh-4rem)] overflow-y-auto border-l border-[var(--border)] bg-[var(--surface)]">
          <div className="p-4">
            <Sidebar pageType={getPageType()} />
          </div>
        </aside>
      </div>

      {/* Mobile Sidebar - Bottom Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)] border-t border-[var(--border)] max-h-[60vh] overflow-y-auto">
        <div className="p-4">
          <Sidebar pageType={getPageType()} />
        </div>
      </div>
    </div>
  );
};

export default Layout;