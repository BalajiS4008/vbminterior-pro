import { useState } from 'react';
import {
    FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
    FaUser, FaPaperPlane, FaComment, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);
        try {
            const response = await fetch('https://hook.eu1.make.com/cddzd6hvvvvwnmm6twkt5jhvdaipdup3', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { icon: <FaMapMarkerAlt />, title: 'Visit Us', details: ['123 Design Street', 'Chennai, Tamil Nadu 600001', 'India'], gradient: 'var(--primary-gradient)' },
        { icon: <FaPhone />, title: 'Call Us', details: ['+91 98765 43210', '+91 98765 43211', 'Mon - Sat: 9AM - 7PM'], gradient: 'var(--secondary-gradient)' },
        { icon: <FaEnvelope />, title: 'Email Us', details: ['info@vbminterior.com', 'support@vbminterior.com', 'We reply within 24 hours'], gradient: 'var(--accent-gradient)' },
        { icon: <FaClock />, title: 'Working Hours', details: ['Monday - Friday: 9AM - 7PM', 'Saturday: 10AM - 5PM', 'Sunday: Closed'], gradient: 'var(--warm-gradient)' },
    ];

    const faqs = [
        { q: 'What services does VBM Interior provide?', a: 'We offer comprehensive interior design services including living room, kitchen, wardrobe, and bedroom designs, as well as office and commercial space transformations.' },
        { q: 'How long does a typical project take?', a: 'A single room redesign might take 4-6 weeks, while larger projects could take several months. We provide a clear schedule during the planning phase.' },
        { q: 'Do you offer free consultations?', a: 'Yes! We begin with a free initial consultation to discuss your ideas, style preferences, and budget.' },
        { q: 'What is your warranty policy?', a: 'We offer a comprehensive 10-year warranty on all our work, ensuring quality and peace of mind.' },
    ];

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="contact-hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
                        alt=""
                        className="contact-hero-img"
                    />
                    <div className="contact-hero-overlay"></div>
                </div>
                <div className="container">
                    <div className="contact-hero-content animate-fade-in">
                        <span className="contact-hero-badge">Let's Talk</span>
                        <h1>Get In <span className="hero-highlight">Touch</span></h1>
                        <p>
                            Have a project in mind? We'd love to hear from you. Send us a message
                            and we'll respond as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="section contact-info-section">
                <div className="container">
                    <div className="contact-info-grid">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="contact-info-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="contact-info-icon" style={{ background: info.gradient }}>
                                    {info.icon}
                                </div>
                                <h3>{info.title}</h3>
                                <div className="contact-details">
                                    {info.details.map((detail, idx) => (
                                        <p key={idx}>{detail}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="section contact-form-section bg-light">
                <div className="container">
                    <div className="contact-form-wrapper">
                        <div className="form-header text-center">
                            <h2>Send Us a <span className="gradient-text"><em>Message</em></span></h2>
                            <p>Fill out the form below and we'll get back to you shortly</p>
                        </div>
                        <form onSubmit={handleSubmit} className="contact-form-main">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name"><FaUser /> Full Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><FaEnvelope /> Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone"><FaPhone /> Phone Number</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message"><FaComment /> Your Message</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows="6" required></textarea>
                            </div>
                            {submitStatus === 'success' && (
                                <div className="alert alert-success">Thank you! Your message has been sent successfully. We'll contact you soon!</div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="alert alert-error">Oops! Something went wrong. Please try again.</div>
                            )}
                            <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
                                {isSubmitting ? (<><span className="spinner"></span> Sending...</>) : (<><FaPaperPlane /> Send Message</>)}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="section map-section">
                <div className="container">
                    <div className="map-wrapper">
                        <iframe
                            title="VBM Interior Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8!2d80.24!3d13.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzM2LjAiTiA4MMKwMTQnMjQuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
                            width="100%"
                            height="400"
                            style={{ border: 0, borderRadius: 'var(--radius-xl)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section faq-section bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Frequently Asked <span className="gradient-text"><em>Questions</em></span></h2>
                        <p>Quick answers to common questions</p>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                <div className="faq-question">
                                    <h4>{faq.q}</h4>
                                    {openFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
