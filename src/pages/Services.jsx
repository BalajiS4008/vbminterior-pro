import { useEffect, useRef, useState } from 'react';
import {
    FaCouch, FaBed, FaUtensils, FaPaintBrush, FaBuilding, FaChair,
    FaCheckCircle, FaArrowRight, FaHandshake, FaPalette, FaClipboardList,
    FaHammer, FaGift
} from 'react-icons/fa';
import './Services.css';

// Static data hoisted outside component to avoid re-creation on every render
const services = [
    {
        id: 'living-room',
        Icon: FaCouch,
        title: 'Living Room Design',
        description: 'Create stunning living spaces that welcome guests and provide comfort for your family.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
        features: ['Custom furniture selection', 'Color scheme consultation', 'Lighting design', 'Space optimization', 'Decor and accessories'],
    },
    {
        id: 'bedroom',
        Icon: FaBed,
        title: 'Bedroom Design',
        description: 'Transform your bedroom into a peaceful sanctuary that promotes relaxation.',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
        features: ['Wardrobe design', 'Bed and headboard selection', 'Ambient lighting', 'Storage solutions', 'Luxury finishes'],
    },
    {
        id: 'kitchen',
        Icon: FaUtensils,
        title: 'Kitchen Design',
        description: 'Modern, functional kitchens that inspire culinary creativity and practical use.',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
        features: ['Modular kitchen solutions', 'Appliance integration', 'Counter and cabinet design', 'Storage optimization', 'Ventilation planning'],
    },
    {
        id: 'complete-interior',
        Icon: FaPaintBrush,
        title: 'Complete Interior Design',
        description: 'End-to-end interior design services for your entire home or office.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
        features: ['Space planning', 'Material selection', 'Project management', 'Quality assurance', '10-year warranty'],
    },
    {
        id: 'office-commercial',
        Icon: FaBuilding,
        title: 'Office & Commercial',
        description: 'Professional office and commercial space design that enhances productivity.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        features: ['Workspace planning', 'Ergonomic furniture', 'Brand integration', 'Meeting room design', 'Reception area design'],
    },
    {
        id: 'furniture',
        Icon: FaChair,
        title: 'Furniture Design',
        description: 'Custom furniture design and selection to perfectly complement your interior.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
        features: ['Custom furniture', 'Material selection', 'Upholstery options', 'Space-specific designs', 'Quality craftsmanship'],
    },
];

const processSteps = [
    { id: 'consultation', step: '01', title: 'Consultation', description: 'We start with understanding your vision, requirements, and budget through a detailed consultation.', Icon: FaHandshake },
    { id: 'design-concept', step: '02', title: 'Design Concept', description: 'Our team creates initial design concepts with 3D visualizations for your approval.', Icon: FaPalette },
    { id: 'planning', step: '03', title: 'Planning', description: 'Detailed planning including material selection, timeline, and cost estimation.', Icon: FaClipboardList },
    { id: 'execution', step: '04', title: 'Execution', description: 'Professional execution with regular updates and quality checks throughout the project.', Icon: FaHammer },
    { id: 'delivery', step: '05', title: 'Delivery', description: 'Final walkthrough and handover with complete documentation and warranty.', Icon: FaGift },
];

const Services = ({ onOpenModal }) => {

    // Scroll-driven progress for Our Process
    const timelineRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [activeStep, setActiveStep] = useState(-1);
    const stepRefs = useRef([]);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setProgress(100);
            setActiveStep(processSteps.length - 1);
            return;
        }

        let mounted = true;
        let ticking = false;
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                if (!mounted) { ticking = false; return; }
                const timeline = timelineRef.current;
                if (!timeline) { ticking = false; return; }

                const rect = timeline.getBoundingClientRect();
                const windowH = window.innerHeight;
                const triggerPoint = windowH * 0.6;

                const totalHeight = rect.height;
                const scrolled = triggerPoint - rect.top;
                const pct = Math.min(100, Math.max(0, (scrolled / totalHeight) * 100));
                setProgress(pct);

                stepRefs.current.forEach((stepEl, i) => {
                    if (!stepEl) return;
                    const stepRect = stepEl.getBoundingClientRect();
                    if (stepRect.top < triggerPoint) {
                        setActiveStep(prev => Math.max(prev, i));
                    }
                });

                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => { mounted = false; window.removeEventListener('scroll', handleScroll); };
    }, []);

    // Scroll-reveal for service rows — JS-adds-class approach (C3 fix)
    const serviceRowRefs = useRef([]);
    useEffect(() => {
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) return; // rows stay visible at default opacity: 1

        // Add animate-ready class so CSS can set opacity: 0
        serviceRowRefs.current.forEach(el => el?.classList.add('animate-ready'));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        serviceRowRefs.current.forEach(el => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="services-hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80"
                        alt="Luxury interior design by VBM Interior in Chennai"
                        className="services-hero-img"
                        loading="eager"
                        fetchPriority="high"
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

            {/* Services — Alternating Editorial Rows */}
            <section className="section services-editorial-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>What We <span className="gradient-text"><em>Offer</em></span></h2>
                        <p>Professional design services for every space</p>
                    </div>
                    <div className="services-editorial-list">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                ref={el => serviceRowRefs.current[index] = el}
                                className={`service-editorial-row ${index % 2 !== 0 ? 'reversed' : ''}`}
                            >
                                <div className="service-editorial-image">
                                    <img src={service.image} alt={`${service.title} by VBM Interior in Chennai`} loading="lazy" />
                                    <div className="service-editorial-icon">
                                        <service.Icon />
                                    </div>
                                </div>
                                <div className="service-editorial-content">
                                    <span className="service-editorial-number">{String(index + 1).padStart(2, '0')}</span>
                                    <h3>{service.title}</h3>
                                    <p className="service-editorial-desc">{service.description}</p>
                                    <ul className="service-features">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx}><FaCheckCircle /><span>{feature}</span></li>
                                        ))}
                                    </ul>
                                    <button onClick={onOpenModal} className="btn btn-outline">
                                        Get Quote <FaArrowRight />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section — Scroll-Driven Timeline */}
            <section className="section process-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Our <span className="gradient-text"><em>Process</em></span></h2>
                        <p>A streamlined approach to bring your vision to life</p>
                    </div>
                    <ol className="process-timeline-wrapper" ref={timelineRef} aria-label="Our design process steps">
                        {/* Center line */}
                        <div className="process-track" aria-hidden="true">
                            <div className="process-track-bg"></div>
                            <div className="process-track-fill" style={{ height: `${progress}%` }}></div>
                        </div>

                        {processSteps.map((item, index) => (
                            <li
                                key={item.id}
                                ref={el => stepRefs.current[index] = el}
                                className={`process-step-row ${index % 2 !== 0 ? 'step-right' : 'step-left'} ${activeStep >= index ? 'step-active' : ''}`}
                            >
                                <div className="process-step-content">
                                    <div className="process-step-icon-badge">
                                        <item.Icon />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                                <div className="process-step-circle" aria-hidden="true">
                                    <span>{item.step}</span>
                                </div>
                                <div className="process-step-spacer"></div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section services-cta-section">
                <div className="services-cta-mesh"></div>
                <div className="container">
                    <div className="services-cta-content text-center">
                        <h2>Ready to Transform Your Space?</h2>
                        <p>
                            Get a free consultation and quote today. Let's bring your vision to life!
                        </p>
                        <button onClick={onOpenModal} className="btn btn-primary">
                            Get Free Quote
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Services;
