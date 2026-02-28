import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa';
import logoVbm from '../assets/images/logovbm.webp';
import './Navbar.css';

const Navbar = ({ onOpenModal }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 60);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/services', label: 'Services' },
        { path: '/portfolio', label: 'Portfolio' },
        { path: '/blog', label: 'Blog' },
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact Us' },
    ];

    return (
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
                        <li className="nav-phone">
                            <a href="tel:+917397373587" className="nav-phone-link">
                                <FaPhoneAlt className="nav-phone-icon" />
                                <span>+91 7397373587</span>
                            </a>
                        </li>
                        <li className="nav-cta">
                            <button onClick={onOpenModal} className="btn-nav">
                                Get Quote
                            </button>
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
    );
};

export default Navbar;
