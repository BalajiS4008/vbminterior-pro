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
        { id: 'living', label: 'Living Room', icon: <FaCouch /> },
        { id: 'bedroom', label: 'Bedroom', icon: <FaBed /> },
        { id: 'kitchen', label: 'Kitchen', icon: <FaUtensils /> },
        { id: 'office', label: 'Office', icon: <FaBuilding /> },
    ];

    const projects = [
        {
            title: 'Modern Living Room',
            category: 'living',
            description: 'Contemporary living space with minimalist design and warm tones',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
            location: 'Bangalore',
            area: '450 sq.ft',
            featured: true,
        },
        {
            title: 'Luxury Bedroom Suite',
            category: 'bedroom',
            description: 'Elegant bedroom with custom wardrobe and ambient lighting',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80',
            location: 'Mumbai',
            area: '380 sq.ft',
            featured: false,
        },
        {
            title: 'Modular Kitchen',
            category: 'kitchen',
            description: 'Functional kitchen with modern appliances and smart storage',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
            location: 'Hyderabad',
            area: '200 sq.ft',
            featured: true,
        },
        {
            title: 'Corporate Office',
            category: 'office',
            description: 'Professional workspace with ergonomic design',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
            location: 'Chennai',
            area: '1200 sq.ft',
            featured: false,
        },
        {
            title: 'Cozy Living Space',
            category: 'living',
            description: 'Warm and inviting family room with custom furniture',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
            location: 'Delhi',
            area: '520 sq.ft',
            featured: false,
        },
        {
            title: 'Master Bedroom',
            category: 'bedroom',
            description: 'Luxurious master suite with walk-in closet and en-suite bathroom',
            image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80',
            location: 'Pune',
            area: '400 sq.ft',
            featured: true,
        },
        {
            title: 'Contemporary Kitchen',
            category: 'kitchen',
            description: 'Sleek kitchen with island counter and premium finishes',
            image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
            location: 'Bangalore',
            area: '250 sq.ft',
            featured: false,
        },
        {
            title: 'Executive Office',
            category: 'office',
            description: 'Premium office interior with collaborative zones',
            image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
            location: 'Mumbai',
            area: '2000 sq.ft',
            featured: false,
        },
        {
            title: 'Minimalist Living',
            category: 'living',
            description: 'Clean lines and modern aesthetics for urban living',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
            location: 'Bangalore',
            area: '600 sq.ft',
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
                                <strong>500+</strong>
                                <span>Projects</span>
                            </div>
                            <div className="hero-stat-divider"></div>
                            <div className="hero-stat">
                                <strong>450+</strong>
                                <span>Happy Clients</span>
                            </div>
                            <div className="hero-stat-divider"></div>
                            <div className="hero-stat">
                                <strong>15+</strong>
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
