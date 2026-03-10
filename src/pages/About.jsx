import { FaCheckCircle, FaAward, FaUsers, FaLightbulb, FaHeart, FaStar } from 'react-icons/fa';
import './About.css';

const About = () => {
    const values = [
        {
            icon: <FaLightbulb />,
            title: 'Innovation',
            description: 'We constantly push boundaries with creative design solutions',
            gradient: 'var(--primary-gradient)',
        },
        {
            icon: <FaAward />,
            title: 'Quality',
            description: 'Excellence in every detail, from concept to completion',
            gradient: 'var(--secondary-gradient)',
        },
        {
            icon: <FaUsers />,
            title: 'Client-Focused',
            description: 'Your vision and satisfaction are our top priorities',
            gradient: 'var(--accent-gradient)',
        },
        {
            icon: <FaHeart />,
            title: 'Passion',
            description: 'We love what we do and it shows in our work',
            gradient: 'var(--warm-gradient)',
        },
    ];

    const team = [
        {
            name: 'Thamizh Priya N',
            role: 'Lead Interior Designer',
            description: 'Leads design vision with creative excellence and client-centric approach',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        },
        {
            name: 'Selva Kumar B',
            role: 'Project Manager',
            description: 'Ensures timely delivery, quality execution, and seamless coordination',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        },
        {
            name: 'Gandhi M',
            role: '3D Visual Artist',
            description: 'Brings designs to life with detailed 2D drawings and realistic 3D visuals',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        },
        {
            name: 'Balaji S',
            role: 'Client Consultant',
            description: 'Expert guidance on design ideas, materials, and bringing your vision to life',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        },
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-bg">
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
                        alt=""
                        className="about-hero-img"
                    />
                    <div className="about-hero-overlay"></div>
                </div>
                <div className="container">
                    <div className="about-hero-content animate-fade-in">
                        <span className="about-hero-badge">Since 2017</span>
                        <h1>
                            About <span className="hero-highlight">VBM Interior</span>
                        </h1>
                        <p>
                            Precision. Perfection. Promise — Transforming spaces with strong execution,
                            clean process, and long-term trust since 2017.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="section story-section">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-content animate-slide-in-left">
                            <span className="section-label">Our Journey</span>
                            <h2>Our <span className="gradient-text"><em>Story</em></span></h2>
                            <p>
                                Founded in 2017 by Mohan Kumar S, VBM Interior has grown into a trusted
                                and leading name in interior services and turnkey contracting. Based in
                                Tamil Nadu with office in Arumbakkam, we bring 8+ years of
                                experience to every project.
                            </p>
                            <p>
                                With 200+ successfully completed projects and a strong team of 30+
                                technical professionals, we continue to set benchmarks in delivering
                                world-class interiors.
                            </p>
                            <p>
                                From residential homes to corporate offices, commercial buildings and
                                industrial spaces, we deliver interiors that blend aesthetic appeal with
                                practical solutions — bringing exact design visions into reality.
                            </p>
                        </div>
                        <div className="story-image animate-slide-in-right">
                            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="VBM Interior workspace" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section mission-section bg-light">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-card animate-scale-in">
                            <div className="mission-icon"><FaLightbulb /></div>
                            <h3>Our Mission</h3>
                            <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0 }}>
                                <li>Deliver quality interiors with honest pricing</li>
                                <li>Maintain precise measurement & planning</li>
                                <li>Ensure hassle-free execution for clients</li>
                                <li>Build long-term trust through reliable work</li>
                            </ul>
                        </div>
                        <div className="mission-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
                            <div className="mission-icon"><FaStar /></div>
                            <h3>Our Vision</h3>
                            <p>
                                To create beautiful and practical living spaces that bring comfort,
                                happiness and long-term value to every home.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section values-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Our <span className="gradient-text"><em>Core Values</em></span></h2>
                        <p>The principles that guide everything we do</p>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="value-icon" style={{ background: value.gradient }}>{value.icon}</div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section team-section bg-light">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Meet Our <span className="gradient-text"><em>Expert Team</em></span></h2>
                        <p>Talented professionals dedicated to bringing your vision to life</p>
                    </div>
                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="team-image">
                                    <img src={member.image} alt={member.name} />
                                </div>
                                <div className="team-info">
                                    <h3>{member.name}</h3>
                                    <p className="team-role gradient-text">{member.role}</p>
                                    <p className="team-description">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section why-choose-section">
                <div className="container">
                    <div className="why-choose-content">
                        <h2 className="text-center">Why Choose <span className="gradient-text"><em>VBM Interior</em></span></h2>
                        <div className="why-choose-grid">
                            {[
                                { title: '1 Year Free Maintenance', desc: 'We offer 1-year free service support after project completion for complete peace of mind' },
                                { title: 'Long-Term Trust Builders', desc: 'We are not just service providers — we are committed to customer satisfaction and lasting relationships' },
                                { title: 'Floor Protection Commitment', desc: 'We provide protective sheet covering for tiles during work to prevent scratches and damage' },
                                { title: 'Daily Site Cleaning', desc: 'After every workday, the site is cleaned and maintained neatly for a hassle-free experience' },
                                { title: 'Transparent Pricing', desc: 'No hidden costs or surprises. Honest pricing with clear, upfront quotes for all our services' },
                                { title: 'Timely Completion', desc: 'We respect your time and ensure projects are completed within the agreed timeline' },
                            ].map((item, index) => (
                                <div key={index} className="why-choose-item">
                                    <FaCheckCircle />
                                    <div>
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
