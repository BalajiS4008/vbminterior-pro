import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaStar,
    FaCheckCircle,
    FaArrowRight,
    FaPaintBrush,
    FaCouch,
    FaBed,
    FaUtensils,
    FaQuoteLeft,
    FaClock,
    FaAward,
    FaUsers,
    FaLightbulb
} from 'react-icons/fa';
import ContactModal from '../components/ContactModal';
import heroVideo from '../assets/images/herosectionofvbm.mp4';
import './Home.css';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: <FaPaintBrush />,
            title: 'Custom Interior Designs',
            description: 'Tailored designs that reflect your unique style and personality',
            gradient: 'var(--primary-gradient)',
        },
        {
            icon: <FaCheckCircle />,
            title: 'End to End Services',
            description: 'Complete project management from concept to completion',
            gradient: 'var(--secondary-gradient)',
        },
        {
            icon: <FaAward />,
            title: '10 Years Warranty',
            description: 'Quality assurance with comprehensive warranty coverage',
            gradient: 'var(--accent-gradient)',
        },
        {
            icon: <FaUsers />,
            title: 'Expert Team',
            description: 'Experienced designers and craftsmen dedicated to excellence',
            gradient: 'var(--warm-gradient)',
        },
        {
            icon: <FaLightbulb />,
            title: 'Creative Solutions',
            description: 'Innovative design solutions for every space',
            gradient: 'var(--ocean-gradient)',
        },
        {
            icon: <FaClock />,
            title: 'On Time Delivery',
            description: 'Committed to delivering projects on schedule',
            gradient: 'var(--fire-gradient)',
        },
    ];

    const services = [
        {
            icon: <FaCouch />,
            title: 'Living Room Designs',
            description: 'Create stunning living spaces that welcome and inspire',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
        },
        {
            icon: <FaBed />,
            title: 'Bedroom Design',
            description: 'Transform your bedroom into a peaceful sanctuary',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
        },
        {
            icon: <FaUtensils />,
            title: 'Kitchen Designs',
            description: 'Modern, functional kitchens that inspire culinary creativity',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
        },
        {
            icon: <FaPaintBrush />,
            title: 'Interior Designing',
            description: 'Complete interior solutions for homes and offices',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
        },
    ];

    const testimonials = [
        {
            name: 'Rajesh Kumar',
            role: 'Homeowner',
            rating: 5,
            text: 'VBM Interior transformed our home beyond our expectations. The attention to detail and creative solutions were outstanding!',
        },
        {
            name: 'Priya Sharma',
            role: 'Business Owner',
            text: 'Professional, creative, and delivered on time. Our office looks absolutely stunning. Highly recommended!',
            rating: 5,
        },
        {
            name: 'Arun Patel',
            role: 'Homeowner',
            text: 'The team at VBM Interior made our dream home a reality. Excellent service and beautiful designs!',
            rating: 5,
        },
    ];

    const stats = [
        { number: '500+', label: 'Projects Completed' },
        { number: '450+', label: 'Happy Clients' },
        { number: '15+', label: 'Years Experience' },
        { number: '50+', label: 'Expert Team' },
    ];

    const blogPosts = [
        {
            title: 'Interior Design Trends',
            excerpt: 'Discover the latest trends in interior design that are shaping modern homes',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
        },
        {
            title: 'Multiple Wallpaper Design Ideas',
            excerpt: 'Creative wallpaper ideas for every room in your home',
            image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80',
        },
        {
            title: 'Small Spaces, Unique Style',
            excerpt: 'Maximize your small space with smart design solutions',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
        },
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <video
                        className="hero-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>
                </div>
                <div className="container">
                    <div className="hero-content animate-fade-in">
                        <span className="hero-badge">Premium Interior Design</span>
                        <h1 className="hero-title">
                            Design Your Dream Home with{' '}
                            <span className="hero-highlight">VBM Interior</span>
                        </h1>
                        <p className="hero-subtitle">
                            Elegant interiors crafted just for you. Transform your space into a masterpiece
                            with our expert design solutions.
                        </p>
                        <div className="hero-buttons">
                            <button onClick={() => setShowModal(true)} className="btn btn-primary">
                                Get Instant Quote
                            </button>
                            <Link to="/portfolio" className="btn btn-outline hero-btn-outline">
                                View Portfolio <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section about-section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-content animate-slide-in-left">
                            <span className="section-label">About Us</span>
                            <h2>
                                Transforming Spaces,{' '}
                                <span className="gradient-text"><em>Elevating Lifestyles</em></span>
                            </h2>
                            <p>
                                At VBM Interior, we specialize in creating innovative and elegant spaces
                                that resonate with your personal style and needs. Whether it's your home,
                                office, or a commercial project, our mission is to transform your vision
                                into reality with our expertise in interior design.
                            </p>
                            <p>
                                Our team of experienced designers and craftsmen are dedicated to delivering
                                designs that are not only aesthetically pleasing but also highly functional.
                            </p>
                            <div className="about-features">
                                <div className="about-feature">
                                    <FaCheckCircle />
                                    <span>Tailored Designs</span>
                                </div>
                                <div className="about-feature">
                                    <FaCheckCircle />
                                    <span>End-to-End Solutions</span>
                                </div>
                                <div className="about-feature">
                                    <FaCheckCircle />
                                    <span>Quality Craftsmanship</span>
                                </div>
                                <div className="about-feature">
                                    <FaCheckCircle />
                                    <span>Timely Delivery</span>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(true)} className="btn btn-primary">
                                Get Instant Quote
                            </button>
                        </div>
                        <div className="about-image animate-slide-in-right">
                            <img
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                                alt="Beautiful Interior Design"
                            />
                            <div className="about-image-accent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section features-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-label" style={{ justifyContent: 'center' }}>Why Choose Us</span>
                        <h2>
                            Why Choose <span className="gradient-text"><em>VBM Interior</em></span>
                        </h2>
                        <p>Experience excellence in every detail of your project</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="feature-icon" style={{ background: feature.gradient }}>
                                    {feature.icon}
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Affordable Luxury Section */}
            <section className="section luxury-section">
                <div className="container">
                    <div className="luxury-content text-center">
                        <span className="section-label" style={{ justifyContent: 'center' }}>Affordable Luxury</span>
                        <h2 className="animate-fade-in">
                            Experience Luxury Living at an{' '}
                            <span className="gradient-text"><em>Affordable Price</em></span>
                        </h2>
                        <p className="animate-fade-in">
                            At VBM Interior, we believe that luxury should be accessible to everyone.
                            Our approach to design combines elegance and functionality while staying
                            budget-friendly, so you can enjoy a beautifully curated home without the
                            premium price tag.
                        </p>
                        <button onClick={() => setShowModal(true)} className="btn btn-secondary animate-fade-in">
                            Get Quote
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="section services-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-label" style={{ justifyContent: 'center' }}>Our Services</span>
                        <h2>
                            Explore Our <span className="gradient-text"><em>Interior Designs</em></span>
                        </h2>
                        <p>Comprehensive design solutions for every space</p>
                    </div>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card">
                                <div className="service-image">
                                    <img src={service.image} alt={service.title} loading="lazy" />
                                    <div className="service-overlay">
                                        <Link to="/services" className="btn btn-primary">
                                            Learn More <FaArrowRight />
                                        </Link>
                                    </div>
                                </div>
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section stats-section">
                <div className="stats-background"></div>
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <h3 className="stat-number">{stat.number}</h3>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section testimonials-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-label" style={{ justifyContent: 'center' }}>Testimonials</span>
                        <h2>
                            What Our <span className="gradient-text"><em>Clients Say</em></span>
                        </h2>
                        <p>See what our happy clients have to say about our work</p>
                    </div>
                    <div className="testimonials-container">
                        <div className="testimonial-card">
                            <FaQuoteLeft className="quote-icon" />
                            <p className="testimonial-text">{testimonials[activeTestimonial].text}</p>
                            <div className="testimonial-rating">
                                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <div className="testimonial-author">
                                <h4>{testimonials[activeTestimonial].name}</h4>
                                <p>{testimonials[activeTestimonial].role}</p>
                            </div>
                        </div>
                        <div className="testimonial-dots">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                                    onClick={() => setActiveTestimonial(index)}
                                    aria-label={`View testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="section blog-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-label" style={{ justifyContent: 'center' }}>Our Blog</span>
                        <h2>
                            Design Guides: <span className="gradient-text"><em>Tips & Inspiration</em></span>
                        </h2>
                        <p>Stay updated with the latest design trends and ideas</p>
                    </div>
                    <div className="blog-grid">
                        {blogPosts.map((post, index) => (
                            <div key={index} className="blog-card">
                                <div className="blog-image">
                                    <img src={post.image} alt={post.title} loading="lazy" />
                                </div>
                                <div className="blog-content">
                                    <h3>{post.title}</h3>
                                    <p>{post.excerpt}</p>
                                    <Link to="/blog" className="blog-link">
                                        Read More <FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center" style={{ marginTop: '2.5rem' }}>
                        <Link to="/blog" className="btn btn-outline">
                            View All Articles
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="container">
                    <div className="cta-content text-center">
                        <h2 className="text-white">
                            Your Dream Home is Just a Click Away
                        </h2>
                        <p className="text-white">
                            Get started with a free consultation and transform your space today
                        </p>
                        <button onClick={() => setShowModal(true)} className="btn btn-primary">
                            Get Free Quote
                        </button>
                    </div>
                </div>
            </section>

            {/* Contact Modal */}
            {showModal && <ContactModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Home;
