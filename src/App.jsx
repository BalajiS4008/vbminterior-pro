import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import ContactModal from './components/ContactModal';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Router>
      <div className="app">
        <Navbar onOpenModal={openModal} />
        <main>
          <Routes>
            <Route path="/" element={<Home onOpenModal={openModal} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services onOpenModal={openModal} />} />
            <Route path="/portfolio" element={<Portfolio onOpenModal={openModal} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost onOpenModal={openModal} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer onOpenModal={openModal} />
        {showModal && <ContactModal onClose={closeModal} />}
      </div>
    </Router>
  );
}

export default App;
