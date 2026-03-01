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
import useScrollReveal from '../hooks/useScrollReveal';
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
import hallImg from '../assets/images/Rooms/Hall.jpg';
import homeImg from '../assets/images/Rooms/Home.jpg';
import dinnerImg from '../assets/images/Rooms/Dinner.jpg';
import studyAreaImg from '../assets/images/Rooms/studyarea.jpg';
import hall1Img from '../assets/images/Rooms/Hall1.jpg';
import dinningImg from '../assets/images/Rooms/Dinning.jpg';
import bathroomImg from '../assets/images/Rooms/bathroom.jpg';
import './Home.css';

const Home = ({ onOpenModal }) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onOpenModal) onOpenModal();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const [activeStep, setActiveStep] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % 5);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    // Character-by-character word cycling hook
    const useCharCycle = (words, interval = 3000) => {
        const [wordIndex, setWordIndex] = useState(0);
        const [phase, setPhase] = useState('visible'); // 'visible' | 'exit' | 'enter'
        const currentWord = words[wordIndex];

        useEffect(() => {
            const timer = setInterval(() => {
                setPhase('exit');
                const charCount = words[wordIndex].length;
                const exitDuration = charCount * 60 + 200;
                setTimeout(() => {
                    setWordIndex(prev => (prev + 1) % words.length);
                    setPhase('enter');
                    const newCharCount = words[(wordIndex + 1) % words.length].length;
                    setTimeout(() => setPhase('visible'), newCharCount * 60 + 200);
                }, exitDuration);
            }, interval);
            return () => clearInterval(timer);
        }, [wordIndex]);

        return { currentWord, phase };
    };

    const chooseCycle = useCharCycle(['Choose', 'Trust'], 3000);
    const dreamCycle = useCharCycle(['Dream', 'Perfect'], 3000);
    const luxuryCycle = useCharCycle(['Luxury', 'Premium'], 3000);

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
        { step: '01', title: 'Meet Our Consultant', duration: '1–2 days', description: 'Discuss your vision, lifestyle, and budget with our expert designer. Get a personalized design concept.', illustration: meetTeamImg },
        { step: '02', title: 'Book Your Interior', duration: '7 days', description: 'Finalize your design with detailed 3D renderings. Refine every detail until it matches your dream.', illustration: bookInteriorImg },
        { step: '03', title: 'Production', duration: '30–45 days', description: 'Our skilled craftsmen create high-quality furniture and fixtures with rigorous quality checks.', illustration: productionImg },
        { step: '04', title: 'Site Execution', duration: '15 days', description: 'Expert installation team brings your dream home to life with minimal disruption to your routine.', illustration: siteExecutionImg },
        { step: '05', title: 'Handover on Time', duration: 'On schedule', description: 'Enjoy your new space with our 10-year warranty and dedicated after-support services.', illustration: handoverImg },
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
        { question: 'How much does interior design cost in Chennai?', answer: 'Complete 2BHK interiors start from ₹3.5 lakhs, 3BHK from ₹5.5 lakhs, and 4BHK from ₹8 lakhs. Modular kitchens start from ₹1.5 lakhs, and single room interiors from ₹75,000. We offer transparent pricing with no hidden costs — the quote you receive is the price you pay.' },
        { question: 'How long does an interior design project take to complete?', answer: 'A single room redesign typically takes 2-4 weeks, while a complete home interior takes 6-12 weeks depending on size and complexity. We commit to a fixed timeline at the start and guarantee on-time delivery with milestone updates throughout the project.' },
        { question: 'Do you offer free consultations?', answer: 'Yes! We offer a completely free initial design consultation. Our designer visits your site, understands your requirements, takes measurements, discusses your vision and budget, and provides a detailed estimate — all at no cost and no obligation.' },
        { question: 'What is the warranty on your interior work?', answer: 'We provide a comprehensive 10-year warranty covering manufacturing defects, material quality, and workmanship issues. This includes modular furniture, cabinetry, hardware, and finishes. Our after-sales service team handles any warranty claims promptly.' },
        { question: 'What materials and brands do you use?', answer: 'We use only premium, ISI-certified materials from trusted brands like Hettich and Hafele (hardware), Century and Green Ply (plywood), Asian Paints and Berger (finishes), and Saint-Gobain (glass). All materials are termite-treated and moisture-resistant for Chennai\'s climate.' },
        { question: 'Do you provide 3D designs before starting work?', answer: 'Yes, we create detailed 3D visualizations and photo-realistic renderings for every project before execution begins. You can see exactly how your space will look, request changes, and approve the design before any work starts on-site.' },
        { question: 'Can you work within my budget without compromising quality?', answer: 'Absolutely. We offer flexible packages across different price points — from essential to premium. Our designers optimize material choices and layouts to maximize value within your budget. Luxury design doesn\'t have to mean expensive — it means smart planning.' },
        { question: 'Do you handle only design or the full project execution?', answer: 'We provide complete end-to-end service — from initial concept and 3D design to material procurement, factory production, site execution, installation, and final handover. One team manages everything, so you have a single point of contact throughout.' },
        { question: 'Is your interior design Vastu-compliant?', answer: 'Yes, we incorporate Vastu Shastra principles into our designs when requested. Our team is experienced in aligning room layouts, color schemes, furniture placement, and kitchen direction according to Vastu guidelines without compromising on modern aesthetics.' },
        { question: 'Do you offer EMI or financing options?', answer: 'Yes, we offer easy EMI options and flexible payment plans through our banking partners. You can start your dream interior project with a minimal upfront payment and pay the rest in comfortable monthly installments at attractive interest rates.' },
        { question: 'What areas in Chennai do you serve?', answer: 'We serve across Chennai including Adyar, Anna Nagar, T. Nagar, Velachery, OMR, ECR, Besant Nagar, Porur, Mylapore, Nungambakkam, Tambaram, Sholinganallur, and 30+ more areas. We also cover Kancheepuram, Chengalpattu, and parts of Tiruvallur district.' },
        { question: 'How do I get started with VBM Interior?', answer: 'Getting started is simple! Call us at +91 7397373587, click "Get Instant Quote", or WhatsApp us. We\'ll schedule a free home visit consultation within 24-48 hours. After understanding your needs, we provide a detailed proposal with 3D designs and transparent pricing.' },
    ];

    const welcomeRef = useScrollReveal();
    const galleryRef = useScrollReveal();
    const tabsRef = useScrollReveal();
    const affordableRef = useScrollReveal();
    const blogRef = useScrollReveal();
    const areasRef = useScrollReveal();
    const faqRef = useScrollReveal();

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
                    <video className="hero-video" autoPlay muted loop playsInline preload="metadata">
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
                    <div className="welcome-grid scroll-reveal" ref={welcomeRef}>
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
                        <div className="title-line-wrapper">
                            <h2>Why {' '}
                                <span className="dream-word">
                                    {chooseCycle.currentWord.split('').map((char, i) => (
                                        <span key={`${chooseCycle.currentWord}-${i}`} className={`char-letter ${chooseCycle.phase}`} style={{ animationDelay: `${i * 60}ms` }}>{char}</span>
                                    ))}
                                </span>
                                {' '} VBM Interior</h2>
                        </div>
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
                            0: { slidesPerView: 2, spaceBetween: 8 },
                            360: { slidesPerView: 3, spaceBetween: 8 },
                            480: { slidesPerView: 3, spaceBetween: 10 },
                            768: { slidesPerView: 4, spaceBetween: 10 },
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
                        <h2>Experience <span className="dream-word">
                            {luxuryCycle.currentWord.split('').map((char, i) => (
                                <span key={`${luxuryCycle.currentWord}-${i}`} className={`char-letter ${luxuryCycle.phase}`} style={{ animationDelay: `${i * 60}ms` }}>{char}</span>
                            ))}
                        </span> Living at an Affordable Price</h2>
                        <p>At VBM Interior, we believe luxury interior design in Chennai should be accessible to everyone. Our approach combines elegance and functionality while staying budget-friendly, so you can enjoy a beautifully curated home in Chennai and Tamil Nadu without the premium price tag.</p>
                        <button className="btn" onClick={onOpenModal}>Get Quote</button>
                    </div>
                    <div className="luxury-gallery scroll-reveal" ref={galleryRef}>
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
            <section className="section design-tabs-section scroll-reveal" ref={tabsRef}>
                <div className="container">
                    <div className="section-header-lined">
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
                    <div className="section-header-lined">
                        <h2>Affordable luxury home interiors</h2>
                        <p>Luxury interiors crafted to perfection at prices that suit every budget</p>
                    </div>
                    <div className="affordable-grid scroll-reveal" ref={affordableRef}>
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
                    <div className="section-header-lined">
                        <h2><span className="dream-word">
                                {dreamCycle.currentWord.split('').map((char, i) => (
                                    <span key={`${dreamCycle.currentWord}-${i}`} className={`char-letter ${dreamCycle.phase}`} style={{ animationDelay: `${i * 60}ms` }}>{char}</span>
                                ))}
                            </span> Home Interiors Made Easy</h2>
                        <p>Your journey from consultation to handover in 5 simple steps</p>
                    </div>

                    {/* Step headers with timeline */}
                    <div className="dream-steps-header">
                        {dreamHomeSteps.map((item, i) => (
                            <div className={`dream-step-label${i <= activeStep ? ' active' : ''}`} key={item.step} onClick={() => setActiveStep(i)}>
                                <span className="dream-step-num">Step {item.step}</span>
                                <span className="dream-step-duration">{item.duration}</span>
                            </div>
                        ))}
                    </div>

                    {/* Timeline connector */}
                    <div className="dream-timeline">
                        <div className="dream-timeline-line" />
                        <div className="dream-timeline-progress" style={{ width: `${activeStep * 20}%` }} />
                        {dreamHomeSteps.map((item, i) => (
                            <div className={`dream-timeline-dot${i <= activeStep ? ' active' : ''}`} key={item.step} />
                        ))}
                    </div>

                    {/* Step cards */}
                    <div className="dream-steps-grid">
                        {dreamHomeSteps.map((item, i) => (
                            <div className={`dream-step-card${i === activeStep ? ' active' : ''}${i < activeStep ? ' completed' : ''}`} key={item.step} onClick={() => setActiveStep(i)}>
                                <div className="dream-step-illustration">
                                    <img src={item.illustration} alt={item.title} loading="lazy" />
                                </div>
                                <h4 className="dream-step-title">{item.title}</h4>
                                <p className="dream-step-desc">{item.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center" style={{ marginTop: '2rem' }}>
                        <button onClick={onOpenModal} className="btn btn-primary">Get Free Estimate</button>
                    </div>
                </div>
            </section>

            {/* 11. Blog Posts — Design Guides */}
            <section className="section home-blog-section">
                <div className="container">
                    <div className="section-header-lined">
                        <h2>Home Interior Design Guides: Tips & Inspiration</h2>
                        <p>Stay updated with the latest design trends and ideas</p>
                    </div>
                    <div className="home-blog-layout scroll-reveal" ref={blogRef}>
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
                            {blogPostsData.slice(1, 4).map((post) => (
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
                    <div className="section-header-lined">
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
                    <div className="section-header-lined">
                        <h2>Frequently Asked Questions</h2>
                        <p>Find answers to common questions about our services</p>
                    </div>
                    <div className="scroll-reveal" ref={faqRef}>
                        <FAQAccordion items={faqItems} />
                    </div>
                </div>
            </section>

            {/* Areas We Serve */}
            <section className="section areas-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Areas We Serve in Chennai & Beyond</h2>
                        <p>Premium interior design services across Chennai, Kancheepuram, Chengalpattu, and nearby districts</p>
                    </div>
                    <div className="areas-grid scroll-reveal" ref={areasRef}>
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
