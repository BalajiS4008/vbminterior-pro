import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import logoVbm from '../assets/images/logovbm.webp';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/services', label: 'Services' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/blog', label: 'Blog' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <>
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-content">
                        <div className="contact-info">
                            <a href="tel:+919876543210" className="contact-item">
                                <FaPhone />
                                <span>+91 98765 43210</span>
                            </a>
                            <a href="mailto:info@vbminterior.com" className="contact-item">
                                <FaEnvelope />
                                <span>info@vbminterior.com</span>
                            </a>
                        </div>
                        <div className="top-bar-text">
                            <span className="gradient-text">✨ Transform Your Space Today!</span>
                        </div>
                    </div>
                </div>
            </div>

            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container">
                    <div className="navbar-content">
                        <Link to="/" className="logo">
                            <img src={logoVbm} alt="VBM Interior" className="logo-img" />
                        </Link>

                        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={location.pathname === link.path ? 'active' : ''}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li className="nav-cta">
                                <Link to="/contact" className="btn btn-primary">
                                    Get Quote
                                </Link>
                            </li>
                        </ul>

                        <button
                            className="mobile-menu-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
