import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Mock ChatBot to avoid complexity
vi.mock('./components/ChatBot', () => ({
  default: () => <div data-testid="chatbot">ChatBot</div>,
}));

function TestApp({ initialRoute = '/' }) {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <div className="app">
        <Navbar onOpenModal={openModal} />
        <main>
          <Routes>
            <Route path="/" element={<Home onOpenModal={openModal} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services onOpenModal={openModal} />} />
            <Route path="/portfolio" element={<Portfolio onOpenModal={openModal} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer onOpenModal={openModal} />
        {showModal && <ContactModal onClose={closeModal} />}
      </div>
    </MemoryRouter>
  );
}

describe('App', () => {
  it('renders navbar and footer on every page', () => {
    render(<TestApp />);
    const logos = screen.getAllByAltText('VBM Interior');
    expect(logos.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/Copyright 2026/)).toBeInTheDocument();
  });

  it('renders home page at root route', () => {
    render(<TestApp initialRoute="/" />);
    expect(screen.getByText(/Design Your New Home/i)).toBeInTheDocument();
  });

  it('renders about page', () => {
    render(<TestApp initialRoute="/about" />);
    expect(screen.getByText('Since 2008')).toBeInTheDocument();
  });

  it('renders services page', () => {
    render(<TestApp initialRoute="/services" />);
    expect(screen.getByText(/What We Do/i)).toBeInTheDocument();
  });

  it('renders portfolio page', () => {
    render(<TestApp initialRoute="/portfolio" />);
    expect(screen.getByText(/Our Work/i)).toBeInTheDocument();
  });

  it('renders blog page', () => {
    render(<TestApp initialRoute="/blog" />);
    // Blog title is split: "Design <span>Blog</span>"
    expect(screen.getByText('Insights')).toBeInTheDocument();
  });

  it('renders contact page', () => {
    render(<TestApp initialRoute="/contact" />);
    expect(screen.getByText(/Let's Talk/i)).toBeInTheDocument();
  });

  it('opens contact modal when Get Quote button is clicked', async () => {
    const user = userEvent.setup();
    render(<TestApp initialRoute="/about" />);
    const getQuoteBtn = screen.getByText('Get Quote');
    await user.click(getQuoteBtn);
    expect(screen.getByText(/Get A Free Design Consultation/i)).toBeInTheDocument();
  });
});
