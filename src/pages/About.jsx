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
            name: 'Vijay Kumar',
            role: 'Founder & Lead Designer',
            description: 'With over 15 years of experience in interior design',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        },
        {
            name: 'Priya Menon',
            role: 'Senior Designer',
            description: 'Specializes in residential and commercial spaces',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        },
        {
            name: 'Arun Sharma',
            role: 'Project Manager',
            description: 'Ensures timely delivery and quality execution',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        },
        {
            name: 'Divya Reddy',
            role: 'Design Consultant',
            description: 'Expert in modern and contemporary designs',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
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
                        <span className="about-hero-badge">Since 2008</span>
                        <h1>
                            About <span className="hero-highlight">VBM Interior</span>
                        </h1>
                        <p>
                            Transforming spaces into stunning masterpieces since 2008. We are passionate
                            about creating interiors that inspire and delight.
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
                                Founded in 2008, VBM Interior began with a simple vision: to make beautiful,
                                functional interior design accessible to everyone. What started as a small
                                studio in Chennai has grown into one of the city's most trusted interior
                                design firms.
                            </p>
                            <p>
                                Over the years, we've completed more than 500 projects, ranging from cozy
                                apartments to sprawling commercial spaces. Each project is a testament to
                                our commitment to quality, creativity, and client satisfaction.
                            </p>
                            <p>
                                Our team of experienced designers and craftsmen work tirelessly to bring
                                your vision to life, combining innovative design solutions with practical
                                functionality.
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
                            <p>
                                To transform ordinary spaces into extraordinary experiences through
                                innovative design, exceptional craftsmanship, and personalized service.
                            </p>
                        </div>
                        <div className="mission-card animate-scale-in" style={{ animationDelay: '0.2s' }}>
                            <div className="mission-icon"><FaStar /></div>
                            <h3>Our Vision</h3>
                            <p>
                                To be the most trusted interior design firm, known for our creativity,
                                quality, and commitment to making luxury accessible to all.
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
                                { title: 'Personalized Approach', desc: 'Every project is unique, and we tailor our designs to your specific needs and preferences' },
                                { title: 'Transparent Pricing', desc: 'No hidden costs or surprises. We provide clear, upfront pricing for all our services' },
                                { title: 'Quality Materials', desc: 'We use only the finest materials and work with trusted suppliers to ensure durability' },
                                { title: 'Timely Completion', desc: 'We respect your time and ensure projects are completed within the agreed timeline' },
                                { title: 'After-Sales Support', desc: 'Our relationship doesn\'t end at project completion. We provide ongoing support and warranty' },
                                { title: 'Sustainable Design', desc: 'We incorporate eco-friendly materials and practices wherever possible' },
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
