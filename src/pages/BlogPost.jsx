import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FaArrowLeft, FaCalendar, FaUser, FaClock, FaTag, FaArrowRight } from 'react-icons/fa';
import blogPosts from '../data/blogData';
import './BlogPost.css';

const BlogPost = ({ onOpenModal }) => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(p => p.slug === slug);

    const currentIndex = blogPosts.findIndex(p => p.slug === slug);
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
    const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="blogpost-not-found">
                <div className="container">
                    <h1>Post Not Found</h1>
                    <p>The blog post you're looking for doesn't exist.</p>
                    <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="blogpost-page">
            {/* Hero */}
            <section className="blogpost-hero">
                <div className="blogpost-hero-bg">
                    <img src={post.image} alt={post.title} className="blogpost-hero-img" />
                    <div className="blogpost-hero-overlay"></div>
                </div>
                <div className="container">
                    <div className="blogpost-hero-content">
                        <Link to="/blog" className="blogpost-back-link">
                            <FaArrowLeft /> Back to Blog
                        </Link>
                        <span className="blogpost-category">{post.category}</span>
                        <h1>{post.title}</h1>
                        <div className="blogpost-meta">
                            <span><FaUser /> {post.author}</span>
                            <span><FaCalendar /> {post.date}</span>
                            <span><FaClock /> {post.readTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Body */}
            <article className="blogpost-article">
                <div className="container">
                    <div className="blogpost-article-inner">
                        {post.content.map((block, index) => {
                            if (block.type === 'paragraph') {
                                return <p key={index}>{block.text}</p>;
                            }
                            if (block.type === 'heading') {
                                return <h2 key={index}>{block.text}</h2>;
                            }
                            if (block.type === 'image') {
                                return (
                                    <figure key={index} className="blogpost-figure">
                                        <img src={block.src} alt={block.alt} loading="lazy" />
                                        {block.caption && <figcaption>{block.caption}</figcaption>}
                                    </figure>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Tags */}
                    <div className="blogpost-tags">
                        <FaTag />
                        <span>{post.category}</span>
                        <span>Interior Design</span>
                        <span>VBM Interior</span>
                    </div>
                </div>
            </article>

            {/* Prev / Next Navigation */}
            <nav className="blogpost-nav">
                <div className="container">
                    <div className="blogpost-nav-grid">
                        {prevPost ? (
                            <Link to={`/blog/${prevPost.slug}`} className="blogpost-nav-item blogpost-nav-prev">
                                <span className="blogpost-nav-label"><FaArrowLeft /> Previous Article</span>
                                <span className="blogpost-nav-title">{prevPost.title}</span>
                            </Link>
                        ) : <div />}
                        {nextPost ? (
                            <Link to={`/blog/${nextPost.slug}`} className="blogpost-nav-item blogpost-nav-next">
                                <span className="blogpost-nav-label">Next Article <FaArrowRight /></span>
                                <span className="blogpost-nav-title">{nextPost.title}</span>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </nav>

            {/* Related Posts */}
            <section className="blogpost-related">
                <div className="container">
                    <h2>More Design Guides</h2>
                    <div className="blogpost-related-grid">
                        {relatedPosts.map((rp) => (
                            <Link to={`/blog/${rp.slug}`} key={rp.slug} className="blogpost-related-card">
                                <div className="blogpost-related-img">
                                    <img src={rp.image} alt={rp.title} loading="lazy" />
                                    <span className="blogpost-related-cat">{rp.category}</span>
                                </div>
                                <div className="blogpost-related-body">
                                    <h3>{rp.title}</h3>
                                    <p>{rp.excerpt}</p>
                                    <span className="blogpost-related-link">
                                        Read More <FaArrowRight />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="blogpost-cta">
                <div className="container">
                    <div className="blogpost-cta-content">
                        <h2>Ready to Transform Your Space?</h2>
                        <p>Get expert guidance from VBM Interior's award-winning design team</p>
                        <button onClick={onOpenModal} className="btn btn-primary">
                            Get Free Quote
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPost;
