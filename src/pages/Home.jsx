import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaCheckCircle,
    FaArrowRight,
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import DesignTabs from '../components/DesignTabs';
import FAQAccordion from '../components/FAQAccordion';
import blogPostsData from '../data/blogData';
import GoogleReviews from '../components/GoogleReviews';
import heroVideo from '../assets/images/herosectionofvbm.mp4';
import welcomeImg from '../assets/images/welcome-sec-img.png';
import customDesignImg from '../assets/images/customintererdesign.png';
import endToEndImg from '../assets/images/endtoendservice.png';
import warrantyImg from '../assets/images/warrenty.png';
import expertTeamImg from '../assets/images/expertteam.png';
import creativeImg from '../assets/images/creative.png';
import onTimeImg from '../assets/images/ontimedelivery.png';
import affordableImg from '../assets/images/affortable.png';
import meetTeamImg from '../assets/images/section1/MeetourTeam.png';
import bookInteriorImg from '../assets/images/section1/Bookyourinterior.png';
import productionImg from '../assets/images/section1/Production.png';
import siteExecutionImg from '../assets/images/section1/Siteexecution.png';
import handoverImg from '../assets/images/section1/Handoverontime.png';
import ctaBookshelfImg from '../assets/images/Rooms/House-bookshelves-amico.webp';
import ctaKitchenImg from '../assets/images/Rooms/kitchen-concept-illustration.jpg';
import hallImg from '../assets/images/Rooms/Hall.png';
import homeImg from '../assets/images/Rooms/Home.png';
import dinnerImg from '../assets/images/Rooms/Dinner.png';
import studyAreaImg from '../assets/images/Rooms/studyarea.png';
import hall1Img from '../assets/images/Rooms/Hall1.png';
import dinningImg from '../assets/images/Rooms/Dinning.png';
import bathroomImg from '../assets/images/Rooms/bathroom.png';
import './Home.css';

const Home = ({ onOpenModal }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onOpenModal) onOpenModal();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const whyChooseItems = [
        { image: customDesignImg, title: 'Custom Interior Designs', description: 'Tailored designs that reflect your unique style' },
        { image: endToEndImg, title: 'End to End Services', description: 'Complete project management from concept to completion' },
        { image: warrantyImg, title: '10 Years Warranty', description: 'Quality assurance with comprehensive warranty' },
        { image: expertTeamImg, title: 'Expert Team', description: 'Experienced designers dedicated to excellence' },
        { image: creativeImg, title: 'Creative', description: 'Innovative design solutions for every space' },
        { image: onTimeImg, title: 'On Time Delivery', description: 'Committed to delivering projects on schedule' },
        { image: affordableImg, title: 'Affordable', description: 'Luxury interiors at budget-friendly prices' },
    ];

    const designTabs = [
        {
            label: 'Interior Designing',
            images: [
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
                'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
                'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
            ],
            alts: [
                'Modern interior design in Anna Nagar, Chennai',
                'Contemporary home interior in Adyar, Chennai',
                'Luxury interior design in T. Nagar, Chennai',
                'Elegant home design in Velachery, Chennai',
            ],
        },
        {
            label: 'Kitchen Designs',
            images: [
                'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
                'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80',
                'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
            ],
            alts: [
                'Modular kitchen design in Porur, Chennai',
                'Modern kitchen interior in OMR, Chennai',
                'Kitchen renovation in Tambaram, Chennai',
                'Premium kitchen design in Besant Nagar, Chennai',
            ],
        },
        {
            label: 'Bedroom Design',
            images: [
                'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
                'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80',
                'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80',
            ],
            alts: [
                'Luxury bedroom design in Nungambakkam, Chennai',
                'Modern bedroom interior in Mylapore, Chennai',
                'Bedroom design in Guindy, Chennai',
                'Master bedroom in Kilpauk, Chennai',
            ],
        },
        {
            label: 'Living Room Designs',
            images: [
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
                'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80',
            ],
            alts: [
                'Living room interior design in Sholinganallur, Chennai',
                'Modern living room in ECR, Chennai',
                'Luxury living room in Alwarpet, Chennai',
                'Living room design in Chromepet, Chennai',
            ],
        },
    ];

    const dreamHomeSteps = [
        { step: '01', title: 'Meet our consultant', illustration: meetTeamImg },
        { step: '02', title: 'Book Your Interior', illustration: bookInteriorImg },
        { step: '03', title: 'Production', illustration: productionImg },
        { step: '04', title: 'Site Execution', illustration: siteExecutionImg },
        { step: '05', title: 'Handover on Time', illustration: handoverImg },
    ];

    const partners = [
        { name: 'Saint-Gobain', logo: 'https://download.logo.wine/logo/Saint-Gobain/Saint-Gobain-Logo.wine.png' },
        { name: 'Franke', logo: 'https://cdn.freebiesupply.com/logos/large/2x/franke-logo-png-transparent.png' },
        { name: 'Kaff', logo: 'https://cdn.brandfetch.io/idwcv07KPl/w/400/h/196/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1768201758325' },
        { name: 'Merino', logo: 'https://vtlogo.com/wp-content/uploads/2021/10/merino-laminates-ltd-vector-logo.png' },
        { name: 'Greenlam', logo: 'https://companieslogo.com/img/orig/GREENLAM.NS_BIG-df588761.png' },
        { name: 'Century', logo: 'https://companieslogo.com/img/orig/CENTURYPLY.NS_BIG-33e1b422.png' },
        { name: 'Hafele', logo: 'https://cdn.freebiesupply.com/logos/large/2x/hafele-logo-png-transparent.png' },
        { name: 'Hettich', logo: 'https://cdn.brandfetch.io/idbp4U67lG/w/820/h/512/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1764615564999' },
        { name: 'Ebco', logo: 'https://cdn.brandfetch.io/idUDqO4-Hu/w/400/h/234/theme/light/logo.png?c=1bxid64Mup7aczewSAYMX&t=1764483516771' },
        { name: 'Rehau', logo: 'https://cdn.freebiesupply.com/logos/large/2x/rehau-logo-png-transparent.png' },
        { name: 'Fevicol', logo: 'https://images.seeklogo.com/logo-png/22/1/fevicol-logo-png_seeklogo-226167.png' },
        { name: 'PTA', logo: '' },
    ];

    const faqItems = [
        { question: 'What services does VBM Interior offer?', answer: 'VBM Interior offers comprehensive interior design services including residential design, kitchen design, bedroom design, living room design, bathroom renovation, and complete home interiors. We provide end-to-end solutions from concept to completion.' },
        { question: 'How long does an interior design project typically take?', answer: 'The timeline depends on the scope of the project. A single room redesign may take 2-4 weeks, while a complete home interior can take 6-12 weeks. We always strive to deliver on time as promised.' },
        { question: 'Do you offer free consultations?', answer: 'Yes! We offer free initial design consultations where we understand your requirements, discuss your vision, and provide a preliminary estimate. Book your free consultation today.' },
        { question: 'What is the warranty on your work?', answer: 'We provide a comprehensive 10-year warranty on all our interior work. This covers manufacturing defects, material quality, and workmanship issues.' },
        { question: 'Can you work within a specific budget?', answer: 'Absolutely! We believe luxury should be accessible to everyone. We work with various budgets and offer flexible packages to suit your financial requirements without compromising on quality.' },
        { question: 'Do you handle the complete project or just design?', answer: 'We offer end-to-end services. From initial design concepts and 3D visualization to material procurement, execution, and final installation — we handle everything.' },
        { question: 'What areas do you serve?', answer: 'We serve all of Chennai except North Chennai — including Adyar, Anna Nagar, T. Nagar, Velachery, OMR, ECR, Besant Nagar, Porur, Mylapore, Nungambakkam, Tambaram, Sholinganallur, and 30+ more areas. We also serve nearby districts: Kancheepuram, Chengalpattu, and parts of Tiruvallur.' },
        { question: 'How do I get started with VBM Interior?', answer: 'Getting started is easy! Simply click the "Get Instant Quote" button or call us directly. We will schedule a free consultation to discuss your project requirements.' },
        { question: 'Do you provide 3D designs before execution?', answer: 'Yes, we provide detailed 3D visualizations and renderings so you can see exactly how your space will look before we begin the execution phase.' },
        { question: 'What makes VBM Interior different from others?', answer: 'Our combination of creative design expertise, quality materials, 10-year warranty, on-time delivery, and affordable pricing sets us apart. We treat every project as our own home.' },
        { question: 'How much does interior design cost in Chennai?', answer: 'Complete 2BHK interiors start from ₹3.5 lakhs, 3BHK from ₹5.5 lakhs, and 4BHK from ₹8 lakhs. Modular kitchens start from ₹1.5 lakhs, and single room interiors from ₹75,000. We offer transparent pricing with no hidden costs.' },
        { question: 'Do you provide interior design services in Anna Nagar and OMR?', answer: 'Yes! We have completed 100+ projects in Anna Nagar, OMR, ECR, and surrounding areas. Our team is familiar with the apartment layouts common in these neighborhoods and can provide free on-site consultations.' },
    ];

    const areasWeServe = {
        'South Chennai': ['Adyar', 'Besant Nagar', 'Thiruvanmiyur', 'Velachery', 'Mylapore', 'R.A. Puram', 'Alwarpet', 'Guindy'],
        'West Chennai': ['Anna Nagar', 'Mogappair', 'Ambattur', 'Porur', 'Valasaravakkam', 'Virugambakkam', 'Koyambedu', 'Vadapalani'],
        'Central Chennai': ['T. Nagar', 'Nungambakkam', 'Kilpauk', 'Egmore', 'Chetpet', 'Teynampet', 'Kodambakkam'],
        'IT Corridor': ['OMR', 'ECR', 'Sholinganallur', 'Perungudi', 'Siruseri', 'Navalur', 'Kelambakkam', 'Medavakkam'],
        'Nearby Districts': ['Tambaram', 'Chromepet', 'Pallavaram', 'Kancheepuram', 'Chengalpattu', 'Mahabalipuram', 'Tiruvallur'],
    };

    return (
        <div className="home">
            {/* 1. Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <video className="hero-video" autoPlay muted loop playsInline>
                        <source src={heroVideo} type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>
                </div>
                <div className="container">
                    <div className="hero-content animate-fade-in">
                        <h1 className="hero-title">
                            Hey there! Design Your New Home with <span className="hero-highlight">VBM Interior</span>
                        </h1>
                        <p className="hero-subtitle">
                            Elegant interiors just for you
                        </p>
                        <button onClick={onOpenModal} className="btn btn-primary">
                            Get Instant Quote
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. Welcome Section */}
            <section className="section welcome-section">
                <div className="container">
                    <div className="welcome-grid">
                        <div className="welcome-image animate-slide-in-left">
                            <img
                                src={welcomeImg}
                                alt="Luxury Interior Design by VBM"
                            />
                        </div>
                        <div className="welcome-content animate-slide-in-right">
                            <span className="welcome-subtitle">Transforming Spaces, Elevating Lifestyles</span>
                            <h2>Welcome to <span className="welcome-highlight">VBM Interior</span></h2>
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
                            <div className="welcome-features">
                                <div className="welcome-feature">
                                    <FaCheckCircle />
                                    <span>Tailored Designs</span>
                                </div>
                                <div className="welcome-feature">
                                    <FaCheckCircle />
                                    <span>End-to-End Solutions</span>
                                </div>
                                <div className="welcome-feature">
                                    <FaCheckCircle />
                                    <span>Quality Craftsmanship</span>
                                </div>
                                <div className="welcome-feature">
                                    <FaCheckCircle />
                                    <span>Timely Delivery</span>
                                </div>
                            </div>
                            <button onClick={onOpenModal} className="btn btn-primary">
                                Get Instant Quote
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Why Choose Us — Swiper Carousel */}
            <section className="section why-choose-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Why Choose VBM Interior</h2>
                        <p>Experience excellence in every detail of your project</p>
                    </div>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={0}
                        slidesPerView={5}
                        loop={true}
                        speed={900}
                        autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            0: { slidesPerView: 3 },
                            480: { slidesPerView: 4 },
                            768: { slidesPerView: 5 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="why-choose-swiper"
                    >
                        {whyChooseItems.map((item, index) => (
                            <SwiperSlide key={index}>
                                <img className="why-choose-img" src={item.image} alt={item.title} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* 4. Luxury Gallery */}
            <section className="section luxury-gallery-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Experience Luxury Living at an Affordable Price</h2>
                        <p>At VBM Interior, we believe luxury interior design in Chennai should be accessible to everyone. Our approach combines elegance and functionality while staying budget-friendly, so you can enjoy a beautifully curated home in Chennai and Tamil Nadu without the premium price tag.</p>
                        <button className="btn" onClick={onOpenModal}>Get Quote</button>
                    </div>
                    <div className="luxury-gallery">
                        <div className="luxury-gallery-item luxury-gallery-wide">
                            <img src={hallImg} alt="Luxury hall interior design in Anna Nagar, Chennai by VBM Interior" loading="lazy" />
                            <span className="luxury-gallery-label">HALL</span>
                        </div>
                        <div className="luxury-gallery-item">
                            <img src={homeImg} alt="Premium home interior design in Adyar, Chennai" loading="lazy" />
                            <span className="luxury-gallery-label">LIVING ROOM</span>
                        </div>
                        <div className="luxury-gallery-item">
                            <img src={dinnerImg} alt="Elegant dining room interior design in T. Nagar, Chennai" loading="lazy" />
                            <span className="luxury-gallery-label">DINING</span>
                        </div>
                        <div className="luxury-gallery-item">
                            <img src={studyAreaImg} alt="Modern study area interior design in Velachery, Chennai" loading="lazy" />
                            <span className="luxury-gallery-label">STUDY AREA</span>
                        </div>
                        <div className="luxury-gallery-item luxury-gallery-wide">
                            <img src={hall1Img} alt="Contemporary hall interior design in OMR, Chennai by VBM Interior" loading="lazy" />
                            <span className="luxury-gallery-label">HALL</span>
                        </div>
                        <div className="luxury-gallery-item">
                            <img src={dinningImg} alt="Beautiful dining room design in Besant Nagar, Chennai" loading="lazy" />
                            <span className="luxury-gallery-label">DINING</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Award-Winning CTA Banner */}
            <section className="award-cta-section">
                <div className="award-cta-blob"></div>
                <div className="container">
                    <div className="award-cta-content">
                        <h3>Chennai's top interiors come from award-winning decorators.</h3>
                        <button onClick={onOpenModal} className="btn btn-primary">
                            Get Quote
                        </button>
                    </div>
                </div>
            </section>

            {/* Google Reviews */}
            <GoogleReviews />

            {/* 7. Design Categories Tabs */}
            <section className="section design-tabs-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Explore Our Design Categories</h2>
                        <p>Browse through our diverse portfolio of interior designs</p>
                    </div>
                    <DesignTabs tabs={designTabs} />
                </div>
            </section>

            {/* 8. CTA Banner */}
            <section className="cta-banner-section">
                <div className="cta-banner-overlay"></div>
                <div className="container">
                    <div className="cta-banner-content text-center">
                        <h2>Your Dream Home is Just a Click Away</h2>
                        <p>Get started with a free consultation and transform your space today</p>
                        <button onClick={onOpenModal} className="btn btn-primary">
                            Get Free Quote
                        </button>
                    </div>
                </div>
            </section>

            {/* 9. Affordable Luxury */}
            <section className="section affordable-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Affordable luxury home interiors</h2>
                        <p>Luxury interiors crafted to perfection at prices that suit every budget</p>
                    </div>
                    <div className="affordable-grid">
                        <div className="affordable-image">
                            <img src={homeImg} alt="Affordable luxury living room interior design in Nungambakkam, Chennai" loading="lazy" />
                            <div className="affordable-overlay">
                                <span className="affordable-label">Living Room</span>
                            </div>
                        </div>
                        <div className="affordable-image">
                            <img src={hall1Img} alt="Premium bedroom interior design in Guindy, Chennai" loading="lazy" />
                            <div className="affordable-overlay">
                                <span className="affordable-label">Bedroom</span>
                            </div>
                        </div>
                        <div className="affordable-image">
                            <img src={dinnerImg} alt="Modern modular kitchen design in Porur, Chennai" loading="lazy" />
                            <div className="affordable-overlay">
                                <span className="affordable-label">Kitchen</span>
                            </div>
                        </div>
                        <div className="affordable-image">
                            <img src={bathroomImg} alt="Elegant bathroom interior design in ECR, Chennai" loading="lazy" />
                            <div className="affordable-overlay">
                                <span className="affordable-label">Bathroom</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center" style={{ marginTop: '2.5rem' }}>
                        <button onClick={onOpenModal} className="btn btn-primary">
                            Get Free Quote
                        </button>
                    </div>
                </div>
            </section>

            {/* Dream Home Interiors Made Easy */}
            <section className="section dream-home-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Dream Home Interiors Made Easy</h2>
                    </div>
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={5}
                        loop={true}
                        speed={800}
                        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        breakpoints={{
                            0: { slidesPerView: 2, spaceBetween: 12 },
                            480: { slidesPerView: 3, spaceBetween: 16 },
                            768: { slidesPerView: 4, spaceBetween: 20 },
                            1024: { slidesPerView: 5, spaceBetween: 24 },
                        }}
                        className="dream-home-swiper"
                    >
                        {dreamHomeSteps.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="dream-home-slide">
                                    <div className="dream-home-blob">
                                        <img src={item.illustration} alt={item.title} loading="lazy" />
                                    </div>
                                    <div className="dream-home-label">
                                        <span className="dream-home-step-num">{item.step}</span>
                                        <span className="dream-home-step-title">{item.title}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* 11. Blog Posts — Design Guides */}
            <section className="section home-blog-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Home Interior Design Guides: Tips & Inspiration</h2>
                        <p>Stay updated with the latest design trends and ideas</p>
                    </div>
                    <div className="home-blog-layout">
                        {/* Featured / Large Card */}
                        <Link to={`/blog/${blogPostsData[0].slug}`} className="home-blog-featured">
                            <div className="home-blog-featured-img">
                                <img src={blogPostsData[0].image} alt={blogPostsData[0].title} loading="lazy" />
                                <div className="home-blog-featured-overlay"></div>
                                <span className="home-blog-cat">{blogPostsData[0].category}</span>
                            </div>
                            <div className="home-blog-featured-body">
                                <span className="home-blog-date">{blogPostsData[0].date} &middot; {blogPostsData[0].readTime}</span>
                                <h3>{blogPostsData[0].title}</h3>
                                <p>{blogPostsData[0].excerpt}</p>
                                <span className="home-blog-read">
                                    Read Article <FaArrowRight />
                                </span>
                            </div>
                        </Link>

                        {/* Smaller Cards */}
                        <div className="home-blog-list">
                            {blogPostsData.slice(1).map((post) => (
                                <Link to={`/blog/${post.slug}`} key={post.slug} className="home-blog-card">
                                    <div className="home-blog-card-img">
                                        <img src={post.image} alt={post.title} loading="lazy" />
                                        <span className="home-blog-cat">{post.category}</span>
                                    </div>
                                    <div className="home-blog-card-body">
                                        <span className="home-blog-date">{post.date} &middot; {post.readTime}</span>
                                        <h3>{post.title}</h3>
                                        <p>{post.excerpt}</p>
                                        <span className="home-blog-read">
                                            Read More <FaArrowRight />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="home-blog-actions">
                        <Link to="/blog" className="btn btn-outline-gold">
                            View All Blog
                        </Link>
                        <button onClick={onOpenModal} className="btn btn-primary">
                            Get Free Quote
                        </button>
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="section partners-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Check Out Our Partners!</h2>
                    </div>
                    <div className="partners-marquee">
                        <div className="partners-track">
                            {[...partners, ...partners].map((partner, index) => (
                                <div className="partner-logo" key={index}>
                                    {partner.logo ? (
                                        <img src={partner.logo} alt={partner.name} loading="lazy" />
                                    ) : (
                                        <span className="partner-text-logo">{partner.name}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 12. FAQ */}
            <section className="section faq-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Frequently Asked Questions</h2>
                        <p>Find answers to common questions about our services</p>
                    </div>
                    <FAQAccordion items={faqItems} />
                </div>
            </section>

            {/* Areas We Serve */}
            <section className="section areas-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Areas We Serve in Chennai & Beyond</h2>
                        <p>Premium interior design services across Chennai, Kancheepuram, Chengalpattu, and nearby districts</p>
                    </div>
                    <div className="areas-grid">
                        {Object.entries(areasWeServe).map(([zone, areas]) => (
                            <div key={zone} className="areas-zone">
                                <h3 className="areas-zone-title">{zone}</h3>
                                <div className="areas-tags">
                                    {areas.map((area) => (
                                        <span key={area} className="area-tag">{area}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center" style={{ marginTop: '2rem' }}>
                        <button onClick={onOpenModal} className="btn btn-primary">
                            Get Free Quote for Your Area
                        </button>
                    </div>
                </div>
            </section>

            {/* 13. Final CTA */}
            <section className="section final-cta-section">
                <div className="final-cta-stage">
                    <div className="final-cta-illustration final-cta-illustration--left">
                        <img src={ctaBookshelfImg} alt="Living room interior design illustration" />
                    </div>
                    <div className="final-cta-content text-center">
                        <h2>Best Interiors in Chennai</h2>
                        <p className="final-cta-tagline">Your Vision, Our Expertise</p>
                        <button onClick={onOpenModal} className="btn btn-primary">
                            Get Free Quote
                        </button>
                    </div>
                    <div className="final-cta-illustration final-cta-illustration--right">
                        <img src={ctaKitchenImg} alt="Modern kitchen interior design illustration" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
