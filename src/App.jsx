import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Coding from './pages/Coding';
import Literature from './pages/Literature';
import About from './pages/About';
import ArticleDetail from './pages/ArticleDetail';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/coding" element={<Coding />} />
        <Route path="/literature" element={<Literature />} />
        <Route path="/about" element={<About />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Route>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;