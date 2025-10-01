import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;