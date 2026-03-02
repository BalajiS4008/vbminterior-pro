import { Link } from 'react-router-dom';
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
    FaEnvelope,
    FaWhatsapp
} from 'react-icons/fa';
import logoVbmFooter from '../assets/images/logovbm-footer.png';
import './Footer.css';

const Footer = ({ onOpenModal }) => {
    const quickLinks = [
        { path: '/', label: 'Home' },
        { path: '/blog', label: 'Blogs' },
        { path: '/portfolio', label: 'Projects' },
        { path: '/services', label: 'Services' },
        { path: '/about', label: 'About Us' },
    ];

    const services = [
        { label: 'Interior Design', path: '/services' },
        { label: 'Kitchen Designs', path: '/services' },
        { label: 'Bedroom Designs', path: '/services' },
        { label: 'Living room Designs', path: '/services' },
    ];

    const socialLinks = [
        { icon: <FaFacebookF />, url: '#', label: 'Facebook' },
        { icon: <FaTwitter />, url: '#', label: 'Twitter' },
        { icon: <FaYoutube />, url: '#', label: 'YouTube' },
        { icon: <FaInstagram />, url: '#', label: 'Instagram' },
        { icon: <FaLinkedinIn />, url: '#', label: 'LinkedIn' },
    ];

    return (
        <footer className="footer">
            {/* CTA Banner with dark geometric background */}
            <div className="footer-cta-banner">
                <div className="footer-cta-overlay" />
                <div className="container">
                    <div className="footer-cta-banner-content">
                        <h3>Transform Your Vision into Reality with VBM Interior</h3>
                        <button onClick={onOpenModal} className="btn btn-cta-gold">
                            Book Free Consultation!
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Column 1: Logo + Description + Social */}
                        <div className="footer-col footer-col-about">
                            <Link to="/" className="footer-logo-link">
                                <img src={logoVbmFooter} alt="VBM Interior" className="footer-logo-img" />
                            </Link>
                            <p className="footer-description">
                                Let us help you create a space that not only looks stunning but also
                                enhances your everyday living. Contact us today to start your design
                                journey.
                            </p>
                            <div className="footer-social-section">
                                <h4 className="footer-follow-title">Follow Us on</h4>
                                <div className="footer-follow-divider" />
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
                        </div>

                        {/* Column 2: Quick Links */}
                        <div className="footer-col">
                            <h3 className="footer-title">Quick Links</h3>
                            <ul className="footer-links">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <span className="link-arrow">&raquo;</span>
                                        <Link to={link.path}>{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Services */}
                        <div className="footer-col">
                            <h3 className="footer-title">Services</h3>
                            <ul className="footer-links">
                                {services.map((service, index) => (
                                    <li key={index}>
                                        <span className="link-arrow">&raquo;</span>
                                        <Link to={service.path}>{service.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Get in Touch */}
                        <div className="footer-col">
                            <h3 className="footer-title">Get in Touch</h3>
                            <ul className="footer-contact">
                                <li>
                                    <span className="contact-icon">&#9742;</span>
                                    <div className="contact-label">Phone:</div>
                                    <a href="tel:+917397373587">+91 7397373587</a>
                                </li>
                                <li>
                                    <span className="contact-icon">&#9993;</span>
                                    <div className="contact-label">E-mail:</div>
                                    <a href="mailto:Vbminterior@gmail.com">Vbminterior@gmail.com</a>
                                </li>
                                <li>
                                    <span className="contact-icon">&#8862;</span>
                                    <div className="contact-label">Address:</div>
                                    <span>112, NSK Nagar Main Rd, NSK Nagar, Arumbakkam, Chennai, Tamil Nadu 600106, India</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>&copy; Copyright 2026 &ndash; VBM Interior | All Rights Reserved</p>
                    </div>
                </div>
            </div>

            {/* Floating Social Sidebar */}
            <div className="footer-floating-sidebar">
                <a href="https://wa.me/917397373587" className="floating-btn floating-whatsapp" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp />
                </a>
                <a href="mailto:Vbminterior@gmail.com" className="floating-btn floating-email" aria-label="Email">
                    <FaEnvelope />
                </a>
                <a href="#" className="floating-btn floating-facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
