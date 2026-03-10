import { useState } from 'react';
import {
    FaTh,
    FaCouch,
    FaBed,
    FaUtensils,
    FaBuilding,
    FaSearchPlus,
    FaTimes,
    FaArrowLeft,
    FaArrowRight,
    FaMapMarkerAlt,
    FaRulerCombined,
    FaChevronRight
} from 'react-icons/fa';
import './Portfolio.css';

const Portfolio = ({ onOpenModal }) => {
    const [filter, setFilter] = useState('all');
    const [lightbox, setLightbox] = useState({ open: false, index: 0 });

    const categories = [
        { id: 'all', label: 'All Projects', icon: <FaTh /> },
        { id: 'apartment', label: 'Apartment Interior', icon: <FaCouch /> },
        { id: 'bedroom', label: 'Bedroom', icon: <FaBed /> },
        { id: 'kitchen', label: 'Kitchen', icon: <FaUtensils /> },
        { id: 'wardrobe', label: 'Wardrobes', icon: <FaBuilding /> },
    ];

    const projects = [
        {
            title: 'Minimalist Apartment Interior',
            category: 'apartment',
            description: 'Modern minimalist apartment with elegant finishes and smart storage solutions',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
            location: 'Arumbakkam, Chennai',
            area: '2 BHK',
            featured: true,
        },
        {
            title: 'Premium 3BHK Interior',
            category: 'apartment',
            description: 'Complete home interior with premium laminate finishes and soft-close hardware',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
            location: 'Arumbakkam, Chennai',
            area: '3 BHK',
            featured: true,
        },
        {
            title: 'Luxury Bedroom Suite',
            category: 'bedroom',
            description: 'Elegant bedroom with custom wardrobe, ambient lighting and acrylic finish',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
            location: 'Anna Nagar, Chennai',
            area: '380 sq.ft',
            featured: false,
        },
        {
            title: 'Modular Kitchen — BWP Ply',
            category: 'kitchen',
            description: 'Century BWP Ply modular kitchen with soft-close fittings and tandem drawers',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
            location: 'Velachery, Chennai',
            area: '120 sq.ft',
            featured: true,
        },
        {
            title: 'Designer Wardrobe — Acrylic Finish',
            category: 'wardrobe',
            description: 'Custom acrylic and glass finish wardrobe with Hettich soft-close premium hardware',
            image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
            location: 'T. Nagar, Chennai',
            area: '2 Units',
            featured: false,
        },
        {
            title: 'Contemporary Apartment Living',
            category: 'apartment',
            description: 'Functional apartment interior with TV unit, back panel, glass profile shutters',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
            location: 'OMR, Chennai',
            area: '2 BHK',
            featured: false,
        },
        {
            title: 'Master Bedroom with Storage',
            category: 'bedroom',
            description: 'Spacious master bedroom with matte/gloss wardrobe and premium laminate loft',
            image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
            location: 'Porur, Chennai',
            area: '400 sq.ft',
            featured: false,
        },
        {
            title: 'Luxury Modular Kitchen',
            category: 'kitchen',
            description: 'Greenply BWP Ply kitchen with luxury finish, tandem drawers and premium hardware',
            image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
            location: 'Adyar, Chennai',
            area: '150 sq.ft',
            featured: false,
        },
        {
            title: 'Premium Laminate Wardrobe',
            category: 'wardrobe',
            description: 'Matte and gloss finish wardrobes with Ebco soft-close equivalent hardware',
            image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
            location: 'Arumbakkam, Chennai',
            area: '2 Units',
            featured: false,
        },
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    const openLightbox = (index) => {
        setLightbox({ open: true, index });
    };

    const closeLightbox = () => {
        setLightbox({ open: false, index: 0 });
    };

    const navigateLightbox = (direction) => {
        setLightbox(prev => ({
            ...prev,
            index: (prev.index + direction + filteredProjects.length) % filteredProjects.length,
        }));
    };

    const currentProject = filteredProjects[lightbox.index];

    return (
        <div className="portfolio-page">
            {/* Hero Section */}
            <section className="portfolio-hero">
                <div className="portfolio-hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80"
                        alt=""
                        className="portfolio-hero-img"
                    />
                    <div className="portfolio-hero-overlay"></div>
                </div>
                <div className="container">
                    <div className="portfolio-hero-content animate-fade-in">
                        <span className="portfolio-hero-badge">Our Work</span>
                        <h1>
                            Interior Design <span className="hero-highlight">Portfolio</span>
                        </h1>
                        <p>
                            Explore our collection of stunning interior design projects. Each space tells
                            a unique story of transformation and creativity.
                        </p>
                        <div className="portfolio-hero-stats">
                            <div className="hero-stat">
                                <strong>200+</strong>
                                <span>Projects</span>
                            </div>
                            <div className="hero-stat-divider"></div>
                            <div className="hero-stat">
                                <strong>30+</strong>
                                <span>Team Members</span>
                            </div>
                            <div className="hero-stat-divider"></div>
                            <div className="hero-stat">
                                <strong>8+</strong>
                                <span>Years</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="section filter-section">
                <div className="container">
                    <div className="filter-buttons">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                                onClick={() => setFilter(category.id)}
                            >
                                <span className="filter-btn-icon">{category.icon}</span>
                                {category.label}
                            </button>
                        ))}
                    </div>
                    <p className="filter-count">
                        Showing <strong>{filteredProjects.length}</strong> projects
                    </p>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="section portfolio-grid-section">
                <div className="container">
                    <div className="portfolio-grid">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={`${project.title}-${filter}`}
                                className={`portfolio-card ${project.featured ? 'featured' : ''}`}
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <div className="portfolio-image">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                    />
                                    <div className="portfolio-overlay">
                                        <button
                                            className="portfolio-zoom-btn"
                                            onClick={() => openLightbox(index)}
                                            aria-label="View project"
                                        >
                                            <FaSearchPlus />
                                        </button>
                                        <button
                                            onClick={onOpenModal}
                                            className="btn btn-primary portfolio-quote-btn"
                                        >
                                            Get Similar Design
                                        </button>
                                    </div>
                                    <span className="portfolio-category-badge">
                                        {categories.find(c => c.id === project.category)?.label}
                                    </span>
                                </div>
                                <div className="portfolio-content">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <div className="portfolio-meta">
                                        <span className="portfolio-meta-item">
                                            <FaMapMarkerAlt /> {project.location}
                                        </span>
                                        <span className="portfolio-meta-item">
                                            <FaRulerCombined /> {project.area}
                                        </span>
                                    </div>
                                    <button
                                        className="portfolio-view-btn"
                                        onClick={() => openLightbox(index)}
                                    >
                                        View Project <FaChevronRight />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section portfolio-cta-section">
                <div className="container">
                    <div className="portfolio-cta-content text-center">
                        <h2 className="text-white">Love What You See?</h2>
                        <p className="text-white">
                            Let's create something amazing for your space. Get in touch for a free consultation!
                        </p>
                        <button onClick={onOpenModal} className="btn btn-primary">
                            Start Your Project
                        </button>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox.open && currentProject && (
                <div className="lightbox-backdrop" onClick={closeLightbox}>
                    <div className="lightbox" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
                            <FaTimes />
                        </button>
                        <button
                            className="lightbox-nav lightbox-prev"
                            onClick={() => navigateLightbox(-1)}
                            aria-label="Previous"
                        >
                            <FaArrowLeft />
                        </button>
                        <button
                            className="lightbox-nav lightbox-next"
                            onClick={() => navigateLightbox(1)}
                            aria-label="Next"
                        >
                            <FaArrowRight />
                        </button>
                        <div className="lightbox-image">
                            <img src={currentProject.image} alt={currentProject.title} />
                        </div>
                        <div className="lightbox-info">
                            <h3>{currentProject.title}</h3>
                            <p>{currentProject.description}</p>
                            <div className="lightbox-meta">
                                <span><FaMapMarkerAlt /> {currentProject.location}</span>
                                <span><FaRulerCombined /> {currentProject.area}</span>
                            </div>
                            <button onClick={() => { closeLightbox(); onOpenModal(); }} className="btn btn-primary">
                                Get Similar Design
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Portfolio;
