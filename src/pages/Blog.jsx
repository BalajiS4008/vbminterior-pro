import { useEffect, useRef, useState, useMemo } from 'react';
import { FaArrowRight, FaCalendar, FaUser, FaClock, FaTh, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogData';
import './Blog.css';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [viewMode, setViewMode] = useState('grid');

    // Extract unique categories from blog data
    const categories = useMemo(() => {
        const cats = [...new Set(blogPosts.map(p => p.category))];
        return ['All', ...cats];
    }, []);

    // Filter posts by active category
    const filteredPosts = useMemo(() => {
        if (activeCategory === 'All') return blogPosts;
        return blogPosts.filter(p => p.category === activeCategory);
    }, [activeCategory]);

    // Featured post — only when showing all
    const featuredPost = activeCategory === 'All' ? blogPosts[0] : null;
    const gridPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

    // Scroll-reveal for blog cards
    const cardRefs = useRef([]);
    useEffect(() => {
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReduced) return;

        cardRefs.current.forEach(el => el?.classList.add('animate-ready'));

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        cardRefs.current.forEach(el => el && observer.observe(el));
        return () => observer.disconnect();
    }, [activeCategory, viewMode]);

    return (
        <div className="blog-page">
            {/* Hero Section */}
            <section className="blog-hero">
                <div className="blog-hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80"
                        alt="Interior design blog by VBM Interior Chennai"
                        className="blog-hero-img"
                        loading="eager"
                        fetchPriority="high"
                    />
                    <div className="blog-hero-overlay"></div>
                </div>
                <div className="container">
                    <div className="blog-hero-content animate-fade-in">
                        <span className="blog-hero-badge">Insights &amp; Ideas</span>
                        <h1>Design <span className="hero-highlight">Blog</span></h1>
                        <p>
                            Tips, inspiration, and expert advice for creating beautiful interiors.
                            Stay updated with the latest trends and design ideas from Chennai&apos;s trusted interior designers.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter + View Toggle Bar */}
            <section className="section blog-controls-section">
                <div className="container">
                    <div className="blog-controls">
                        <div className="blog-filter-pills">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="blog-view-toggle">
                            <button
                                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                                onClick={() => setViewMode('grid')}
                                aria-label="Grid view"
                            >
                                <FaTh />
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                                aria-label="List view"
                            >
                                <FaList />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="section featured-section">
                    <div className="container">
                        <Link to={`/blog/${featuredPost.slug}`} className="featured-post">
                            <div className="featured-image">
                                <img src={featuredPost.image} alt={featuredPost.title} />
                            </div>
                            <div className="featured-content">
                                <span className="featured-badge">Featured Post</span>
                                <h2>{featuredPost.title}</h2>
                                <div className="post-meta">
                                    <span><FaUser /> {featuredPost.author}</span>
                                    <span><FaCalendar /> {featuredPost.date}</span>
                                    <span><FaClock /> {featuredPost.readTime}</span>
                                    <span className="category-badge">{featuredPost.category}</span>
                                </div>
                                <p>{featuredPost.excerpt}</p>
                                <span className="btn btn-primary">Read More <FaArrowRight /></span>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Blog Grid / List */}
            <section className="section blog-grid-section">
                <div className="container">
                    {!featuredPost && (
                        <div className="section-header text-center">
                            <h2>{activeCategory} <span className="gradient-text"><em>Articles</em></span></h2>
                            <p>Explore our collection of design tips and inspiration</p>
                        </div>
                    )}

                    {gridPosts.length === 0 ? (
                        <div className="blog-empty-state">
                            <p>No articles found in this category yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className={`blog-${viewMode}`}>
                            {gridPosts.map((post, index) => (
                                <Link
                                    to={`/blog/${post.slug}`}
                                    key={post.slug}
                                    ref={el => cardRefs.current[index] = el}
                                    className={`blog-card blog-card-${viewMode}`}
                                    style={{ '--card-index': index }}
                                >
                                    <div className="blog-image">
                                        <img src={post.image} alt={post.title} loading="lazy" />
                                        <span className="category-badge">{post.category}</span>
                                    </div>
                                    <div className="blog-content">
                                        <h3>{post.title}</h3>
                                        <div className="post-meta">
                                            <span><FaUser /> {post.author}</span>
                                            <span><FaCalendar /> {post.date}</span>
                                            <span><FaClock /> {post.readTime}</span>
                                        </div>
                                        <p>{post.excerpt}</p>
                                        <span className="blog-link">Read More <FaArrowRight /></span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="section newsletter-section">
                <div className="container">
                    <div className="newsletter-content text-center">
                        <h2>Subscribe to Our <span className="gradient-text"><em>Newsletter</em></span></h2>
                        <p>Get the latest design tips, trends, and inspiration delivered to your inbox</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Enter your email address" required />
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
