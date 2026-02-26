import { FaArrowRight, FaCalendar, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = () => {
    const blogPosts = [
        {
            title: 'Interior Design Trends 2024',
            excerpt: 'Discover the hottest interior design trends that are shaping homes this year. From sustainable materials to bold color choices.',
            author: 'Priya Menon', date: 'Feb 5, 2024', category: 'Trends',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
        },
        {
            title: 'Multiple Wallpaper Design Ideas',
            excerpt: 'Creative wallpaper ideas for every room in your home. Learn how to mix and match patterns for stunning results.',
            author: 'Vijay Kumar', date: 'Feb 3, 2024', category: 'Design Tips',
            image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80',
        },
        {
            title: 'Small Spaces, Big Style Designs',
            excerpt: 'Maximize your small space with smart design tips. Transform compact areas into functional and beautiful living spaces.',
            author: 'Divya Reddy', date: 'Feb 1, 2024', category: 'Space Planning',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
        },
        {
            title: 'Creating Affordable Luxury',
            excerpt: 'Learn how to achieve a luxurious look without breaking the bank. Budget-friendly tips for elegant interiors.',
            author: 'Arun Sharma', date: 'Jan 28, 2024', category: 'Budget Tips',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
        },
        {
            title: 'Kitchen Design Essentials',
            excerpt: 'Everything you need to know about designing a functional and beautiful kitchen. From layout to lighting.',
            author: 'Priya Menon', date: 'Jan 25, 2024', category: 'Kitchen',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
        },
        {
            title: 'Bedroom Sanctuary Guide',
            excerpt: 'Create a peaceful bedroom retreat with our expert tips. From color psychology to furniture placement.',
            author: 'Vijay Kumar', date: 'Jan 22, 2024', category: 'Bedroom',
            image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
        },
        {
            title: 'Lighting Design Basics',
            excerpt: 'Master the art of lighting design. Learn about ambient, task, and accent lighting for perfect illumination.',
            author: 'Divya Reddy', date: 'Jan 20, 2024', category: 'Lighting',
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
        },
        {
            title: 'Sustainable Interior Design',
            excerpt: 'Go green with eco-friendly design choices. Discover sustainable materials and practices for your home.',
            author: 'Arun Sharma', date: 'Jan 18, 2024', category: 'Sustainability',
            image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
        },
        {
            title: 'Color Psychology in Interiors',
            excerpt: 'Understand how colors affect mood and behavior. Choose the perfect palette for each room in your home.',
            author: 'Priya Menon', date: 'Jan 15, 2024', category: 'Color Theory',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
        },
    ];

    return (
        <div className="blog-page">
            {/* Hero Section */}
            <section className="blog-hero">
                <div className="blog-hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80"
                        alt=""
                        className="blog-hero-img"
                    />
                    <div className="blog-hero-overlay"></div>
                </div>
                <div className="container">
                    <div className="blog-hero-content animate-fade-in">
                        <span className="blog-hero-badge">Insights</span>
                        <h1>Design <span className="hero-highlight">Blog</span></h1>
                        <p>
                            Tips, inspiration, and expert advice for creating beautiful interiors.
                            Stay updated with the latest trends and design ideas.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="section featured-section">
                <div className="container">
                    <div className="featured-post animate-scale-in">
                        <div className="featured-image">
                            <img src={blogPosts[0].image} alt={blogPosts[0].title} />
                        </div>
                        <div className="featured-content">
                            <span className="featured-badge">Featured Post</span>
                            <h2>{blogPosts[0].title}</h2>
                            <div className="post-meta">
                                <span><FaUser /> {blogPosts[0].author}</span>
                                <span><FaCalendar /> {blogPosts[0].date}</span>
                                <span className="category-badge">{blogPosts[0].category}</span>
                            </div>
                            <p>{blogPosts[0].excerpt}</p>
                            <Link to="#" className="btn btn-primary">Read More <FaArrowRight /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="section blog-grid-section bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Latest <span className="gradient-text"><em>Articles</em></span></h2>
                        <p>Explore our collection of design tips and inspiration</p>
                    </div>
                    <div className="blog-grid">
                        {blogPosts.slice(1).map((post, index) => (
                            <div key={index} className="blog-card animate-scale-in" style={{ animationDelay: `${index * 0.08}s` }}>
                                <div className="blog-image">
                                    <img src={post.image} alt={post.title} loading="lazy" />
                                    <span className="category-badge">{post.category}</span>
                                </div>
                                <div className="blog-content">
                                    <h3>{post.title}</h3>
                                    <div className="post-meta">
                                        <span><FaUser /> {post.author}</span>
                                        <span><FaCalendar /> {post.date}</span>
                                    </div>
                                    <p>{post.excerpt}</p>
                                    <Link to="#" className="blog-link">Read More <FaArrowRight /></Link>
                                </div>
                            </div>
                        ))}
                    </div>
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
