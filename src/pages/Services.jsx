import { useState } from 'react';
import {
    FaCouch, FaBed, FaUtensils, FaPaintBrush, FaBuilding, FaChair,
    FaCheckCircle, FaArrowRight
} from 'react-icons/fa';
import ContactModal from '../components/ContactModal';
import './Services.css';

const Services = () => {
    const [showModal, setShowModal] = useState(false);

    const services = [
        {
            icon: <FaCouch />,
            title: 'Living Room Design',
            description: 'Create stunning living spaces that welcome guests and provide comfort for your family.',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
            features: ['Custom furniture selection', 'Color scheme consultation', 'Lighting design', 'Space optimization', 'Decor and accessories'],
            gradient: 'var(--primary-gradient)',
        },
        {
            icon: <FaBed />,
            title: 'Bedroom Design',
            description: 'Transform your bedroom into a peaceful sanctuary that promotes relaxation.',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
            features: ['Wardrobe design', 'Bed and headboard selection', 'Ambient lighting', 'Storage solutions', 'Luxury finishes'],
            gradient: 'var(--secondary-gradient)',
        },
        {
            icon: <FaUtensils />,
            title: 'Kitchen Design',
            description: 'Modern, functional kitchens that inspire culinary creativity and practical use.',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
            features: ['Modular kitchen solutions', 'Appliance integration', 'Counter and cabinet design', 'Storage optimization', 'Ventilation planning'],
            gradient: 'var(--accent-gradient)',
        },
        {
            icon: <FaPaintBrush />,
            title: 'Complete Interior Design',
            description: 'End-to-end interior design services for your entire home or office.',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
            features: ['Space planning', 'Material selection', 'Project management', 'Quality assurance', '10-year warranty'],
            gradient: 'var(--warm-gradient)',
        },
        {
            icon: <FaBuilding />,
            title: 'Office & Commercial',
            description: 'Professional office and commercial space design that enhances productivity.',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
            features: ['Workspace planning', 'Ergonomic furniture', 'Brand integration', 'Meeting room design', 'Reception area design'],
            gradient: 'var(--ocean-gradient)',
        },
        {
            icon: <FaChair />,
            title: 'Furniture Design',
            description: 'Custom furniture design and selection to perfectly complement your interior.',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
            features: ['Custom furniture', 'Material selection', 'Upholstery options', 'Space-specific designs', 'Quality craftsmanship'],
            gradient: 'var(--fire-gradient)',
        },
    ];

    const process = [
        { step: '01', title: 'Consultation', description: 'We start with understanding your vision, requirements, and budget through a detailed consultation.' },
        { step: '02', title: 'Design Concept', description: 'Our team creates initial design concepts with 3D visualizations for your approval.' },
        { step: '03', title: 'Planning', description: 'Detailed planning including material selection, timeline, and cost estimation.' },
        { step: '04', title: 'Execution', description: 'Professional execution with regular updates and quality checks throughout the project.' },
        { step: '05', title: 'Delivery', description: 'Final walkthrough and handover with complete documentation and warranty.' },
    ];

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="services-hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80"
                        alt=""
                        className="services-hero-img"
                    />
                    <div className="services-hero-overlay"></div>
                </div>
                <div className="container">
                    <div className="services-hero-content animate-fade-in">
                        <span className="services-hero-badge">What We Do</span>
                        <h1>
                            Our <span className="hero-highlight">Services</span>
                        </h1>
                        <p>
                            Comprehensive interior design solutions tailored to your needs. From concept
                            to completion, we handle every detail with expertise and care.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section services-detail-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>What We <span className="gradient-text"><em>Offer</em></span></h2>
                        <p>Professional design services for every space</p>
                    </div>
                    <div className="services-detail-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-detail-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="service-card-image">
                                    <img src={service.image} alt={service.title} loading="lazy" />
                                    <div className="service-card-icon" style={{ background: service.gradient }}>
                                        {service.icon}
                                    </div>
                                </div>
                                <div className="service-card-body">
                                    <h3>{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                    <ul className="service-features">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx}><FaCheckCircle /><span>{feature}</span></li>
                                        ))}
                                    </ul>
                                    <button onClick={() => setShowModal(true)} className="btn btn-outline">
                                        Get Quote <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="section process-section bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Our <span className="gradient-text"><em>Process</em></span></h2>
                        <p>A streamlined approach to bring your vision to life</p>
                    </div>
                    <div className="process-timeline">
                        {process.map((item, index) => (
                            <div key={index} className="process-item animate-slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="process-step">{item.step}</div>
                                <div className="process-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section services-cta-section">
                <div className="container">
                    <div className="services-cta-content text-center">
                        <h2 className="text-white">Ready to Transform Your Space?</h2>
                        <p className="text-white">
                            Get a free consultation and quote today. Let's bring your vision to life!
                        </p>
                        <button onClick={() => setShowModal(true)} className="btn btn-primary">
                            Get Free Quote
                        </button>
                    </div>
                </div>
            </section>

            {showModal && <ContactModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Services;
