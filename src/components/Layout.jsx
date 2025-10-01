import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <Header />
      <Loader />
      
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;