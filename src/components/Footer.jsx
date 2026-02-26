import { Link } from 'react-router-dom';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaHeart
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About Us' },
        { path: '/services', label: 'Services' },
        { path: '/portfolio', label: 'Portfolio' },
    ];

    const services = [
        'Interior Design',
        'Kitchen Design',
        'Bedroom Design',
        'Living Room Design',
        'Office Design',
        'Commercial Design',
    ];

    const socialLinks = [
        { icon: <FaFacebookF />, url: '#', label: 'Facebook' },
        { icon: <FaTwitter />, url: '#', label: 'Twitter' },
        { icon: <FaInstagram />, url: '#', label: 'Instagram' },
        { icon: <FaLinkedinIn />, url: '#', label: 'LinkedIn' },
        { icon: <FaPinterest />, url: '#', label: 'Pinterest' },
    ];

    return (
        <footer className="footer">
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <div className="footer-logo">
                                <span className="logo-text gradient-text">VBM</span>
                                <span className="logo-subtitle">Interior</span>
                            </div>
                            <p className="footer-description">
                                Transforming spaces into stunning masterpieces. We specialize in creating
                                innovative and elegant interiors that resonate with your personal style.
                            </p>
                            <div className="social-links">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        className="social-link"
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="footer-col">
                            <h3 className="footer-title">Quick Links</h3>
                            <ul className="footer-links">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link to={link.path}>{link.label}</Link>
                                    </li>
                                ))}
                                <li><Link to="/blog">Blog</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h3 className="footer-title">Our Services</h3>
                            <ul className="footer-links">
                                {services.map((service, index) => (
                                    <li key={index}>
                                        <Link to="/services">{service}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h3 className="footer-title">Contact Info</h3>
                            <ul className="footer-contact">
                                <li>
                                    <FaMapMarkerAlt />
                                    <span>123 Design Street, Chennai, Tamil Nadu 600001</span>
                                </li>
                                <li>
                                    <FaPhone />
                                    <a href="tel:+919876543210">+91 98765 43210</a>
                                </li>
                                <li>
                                    <FaEnvelope />
                                    <a href="mailto:info@vbminterior.com">info@vbminterior.com</a>
                                </li>
                            </ul>
                            <Link to="/contact" className="btn btn-primary footer-cta">
                                Get Free Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>
                            © {currentYear} VBM Interior. All rights reserved. Made with{' '}
                            <FaHeart className="heart-icon" /> in Chennai
                        </p>
                        <div className="footer-bottom-links">
                            <a href="#">Privacy Policy</a>
                            <span>•</span>
                            <a href="#">Terms of Service</a>
                            <span>•</span>
                            <a href="#">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
