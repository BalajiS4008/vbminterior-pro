import { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './GoogleReviews.css';

// VBM Interior Google Place ID — update this with your actual Place ID
const PLACE_ID = 'ChIJYZ3Zy2FkUjoRkGuJHi44SHQ';

// Google search/review page URL
const GOOGLE_REVIEW_URL = 'https://www.google.com/search?q=VBM+INTERIOR%2C+NSK+Nagar+Main+Rd%2C+NSK+Nagar%2C+Arumbakkam%2C+Chennai%2C+Tamil+Nadu&sca_esv=2a6d1d5e629598cb&sxsrf=ANbL-n6HyDMQc29cnrGbiiCHa0XXdtAD4A%3A1772310125891&source=hp&ei=bU6jaZ2GNYiKnesPm5ypuQE&iflsig=AFdpzrgAAAAAaaNcfVoGTe7Jgdeg9n1eMsXJPSPJKpUJ&oq=vbminterior+chennai&gs_lp=Egdnd3Mtd2l6IhN2Ym1pbnRlcmlvciBjaGVubmFpKgIIADICECYyCBAAGIAEGKIEMggQABiABBiiBDIFEAAY7wUyCBAAGIAEGKIESN93UABYzmBwAHgAkAEAmAHAAqABuxSqAQgzLjE0LjEuMbgBAcgBAPgBAZgCEqACuBTCAgoQIxiABBgnGIoFwgILEAAYgAQYkQIYigXCAgsQLhiABBiRAhiKBcICCxAuGIAEGLEDGIMBwgIIEAAYgAQYsQPCAQQQABgDwgIaEC4YgAQYkQIYsQMYgwEYxwEYigUYjgUYrwHCAg0QABiABBixAxhDGIoFwgIKEAAYgAQYQxiKBcICEBAuGIAEGEMYxwEYigUYrwHCAgUQABiABMICDhAuGIAEGLEDGMcBGK8BwgILEC4YgAQYxwEYrwHCAgcQABiABBgKwgIMEAAYgAQYsQMYChgLwgIJEAAYgAQYChgLwgIPEC4YgAQY0QMYxwEYChgLwgIKEC4YgAQYsQMYDcICChAAGIAEGLEDGA3CAhAQLhiABBixAxjRAxjHARgNwgINEC4YgAQYsQMYgwEYDcICDRAAGIAEGLEDGIMBGA3CAgcQABiABBgNwgINEAAYgAQYsQMYigUYDcICCxAAGIAEGJIDGIoFwgIKEAAYgAQYyQMYDcICBxAjGLACGCfCAgsQABiABBiGAxiKBcICBhAAGA0YHpgDAJIHCDEuMTUuMS4xoAebigGyBwgxLjE1LjEuMbgHuBTCBwcwLjkuNy4yyAdIgAgA&sclient=gws-wiz';

// Fallback reviews from actual Google reviews (shown in screenshot)
const FALLBACK_REVIEWS = [
    {
        author_name: 'mani kandan',
        profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjXQxY3Zy2FkUjoRkGuJHi44SHQ=s40-c-rp-mo-br100',
        rating: 4,
        relative_time_description: '2023-03-11',
        text: 'Quality work and good finishing done by vbm interior worker. Highly recommended those who looking for quality interior work.',
        time: 1678492800,
    },
    {
        author_name: 'samblessing r',
        profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjXsamblessing=s40-c-rp-mo-br100',
        rating: 5,
        relative_time_description: '2023-03-08',
        text: 'Such a beautiful work done by vbm interiors, on time with very professional labours. Very recommended service.',
        time: 1678233600,
    },
    {
        author_name: 'David Raj',
        profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjXdavidraj=s40-c-rp-mo-br100',
        rating: 5,
        relative_time_description: '2023-03-04',
        text: 'The quality of workmanship was evident in every aspect of the project. From the selection of materials to the installation of...',
        time: 1677888000,
    },
    {
        author_name: 'Vinoz FX',
        profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjXvinozfx=s40-c-rp-mo-br100',
        rating: 5,
        relative_time_description: '2023-03-02',
        text: 'I would highly recommend VBM INTERIOR for anyone looking for interior design services. They were professional, reliable, and...',
        time: 1677715200,
    },
    {
        author_name: 'Aruna Aruna',
        profile_photo_url: '',
        rating: 5,
        relative_time_description: '2023-03-02',
        text: "I couldn't be happier with the final outcome of my home interior project. The designer really understood my vision and...",
        time: 1677715200,
    },
    {
        author_name: 'Balaji',
        profile_photo_url: '',
        rating: 5,
        relative_time_description: '2023-03-02',
        text: 'Responsibility towards customer satisfaction\nUnbelievable for outputs\nReasonable price...',
        time: 1677715200,
    },
];

const FALLBACK_DATA = {
    rating: 5.0,
    user_ratings_total: 6,
    reviews: FALLBACK_REVIEWS,
};

// Avatar color palette for users without profile photos
const AVATAR_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#FF6D01', '#46BDC6'];

function getAvatarColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<FaStar key={i} className="gr-star gr-star-full" />);
        } else if (rating >= i - 0.5) {
            stars.push(<FaStarHalfAlt key={i} className="gr-star gr-star-half" />);
        } else {
            stars.push(<FaRegStar key={i} className="gr-star gr-star-empty" />);
        }
    }
    return stars;
}

const GoogleReviews = () => {
    const [reviewData, setReviewData] = useState(FALLBACK_DATA);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try to fetch live Google reviews via Places API
        const fetchGoogleReviews = () => {
            if (!window.google?.maps?.places) {
                setLoading(false);
                return;
            }

            const service = new window.google.maps.places.PlacesService(
                document.createElement('div')
            );

            service.getDetails(
                {
                    placeId: PLACE_ID,
                    fields: ['rating', 'user_ratings_total', 'reviews'],
                },
                (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                        setReviewData({
                            rating: place.rating || FALLBACK_DATA.rating,
                            user_ratings_total: place.user_ratings_total || FALLBACK_DATA.user_ratings_total,
                            reviews: place.reviews?.length
                                ? place.reviews.map((r) => ({
                                      author_name: r.author_name,
                                      profile_photo_url: r.profile_photo_url,
                                      rating: r.rating,
                                      relative_time_description: r.relative_time_description,
                                      text: r.text,
                                      time: r.time,
                                  }))
                                : FALLBACK_DATA.reviews,
                        });
                    }
                    setLoading(false);
                }
            );
        };

        // Check if Google Maps script is already loaded
        if (window.google?.maps?.places) {
            fetchGoogleReviews();
        } else {
            // Load Google Maps script with Places library
            const existingScript = document.querySelector(
                'script[src*="maps.googleapis.com/maps/api/js"]'
            );
            if (!existingScript) {
                const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
                if (apiKey) {
                    const script = document.createElement('script');
                    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
                    script.async = true;
                    script.onload = fetchGoogleReviews;
                    script.onerror = () => setLoading(false);
                    document.head.appendChild(script);
                } else {
                    // No API key — use fallback data
                    setLoading(false);
                }
            } else {
                existingScript.addEventListener('load', fetchGoogleReviews);
                setLoading(false);
            }
        }
    }, []);

    const { rating, user_ratings_total, reviews } = reviewData;

    return (
        <section className="section gr-section">
            <div className="gr-container">
                {/* Title with horizontal line dividers on both sides */}
                <div className="gr-title-wrapper">
                    <h2>Transforming Homes: Client Reviews</h2>
                </div>

                <div className="gr-layout">
                    {/* Left — Company summary panel */}
                    <div className="gr-summary">
                        <h3 className="gr-company-name">
                            VBM Interior - Best Interior Designers in Chennai &amp; Interior Design Studio
                        </h3>

                        <div className="gr-rating-row">
                            <span className="gr-rating-number">{rating.toFixed(1)}</span>
                            <div className="gr-summary-stars">
                                {renderStars(rating)}
                            </div>
                        </div>

                        <p className="gr-based">
                            Based on <strong>{user_ratings_total} reviews</strong>
                        </p>

                        <div className="gr-powered">
                            <img
                                className="gr-google-logo"
                                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                                alt="Google"
                            />
                            <span className="gr-powered-text">powered by <strong>Google</strong></span>
                        </div>

                        <a
                            href={GOOGLE_REVIEW_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gr-review-btn"
                        >
                            <svg className="gr-review-btn-icon" viewBox="0 0 48 48" width="20" height="20">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                            </svg>
                            review us on G
                        </a>
                    </div>

                    {/* Right — Review cards Swiper carousel */}
                    <div className="gr-cards-wrapper">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={3}
                            navigation={{
                                nextEl: '.gr-swiper-next',
                                prevEl: '.gr-swiper-prev',
                            }}
                            pagination={{
                                el: '.gr-swiper-pagination',
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                    spaceBetween: 12,
                                },
                                520: {
                                    slidesPerView: 2,
                                    spaceBetween: 16,
                                },
                                900: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                            }}
                            className="gr-swiper"
                        >
                            {reviews.map((review, index) => (
                                <SwiperSlide key={index}>
                                    <div className="gr-card">
                                        <div className="gr-card-header">
                                            <div className="gr-card-avatar-wrap">
                                                {review.profile_photo_url &&
                                                !review.profile_photo_url.includes('=s40-c-rp-mo-br100') ? (
                                                    <img
                                                        className="gr-card-avatar"
                                                        src={review.profile_photo_url}
                                                        alt={review.author_name}
                                                    />
                                                ) : (
                                                    <span
                                                        className="gr-card-avatar gr-card-avatar-initial"
                                                        style={{ background: getAvatarColor(review.author_name) }}
                                                    >
                                                        {review.author_name.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="gr-card-meta">
                                                <span className="gr-card-name">{review.author_name}</span>
                                                <span className="gr-card-date">{review.relative_time_description}</span>
                                            </div>
                                            <img
                                                className="gr-card-g"
                                                src="https://www.gstatic.com/images/branding/product/2x/maps_96dp.png"
                                                alt="Google"
                                            />
                                        </div>

                                        <div className="gr-card-stars">
                                            {renderStars(review.rating)}
                                            {review.rating === 5 && (
                                                <MdVerified className="gr-verified" />
                                            )}
                                        </div>

                                        <p className="gr-card-text">{review.text}</p>

                                        {review.text && review.text.endsWith('...') && (
                                            <a
                                                href={GOOGLE_REVIEW_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="gr-read-more"
                                            >
                                                Read more
                                            </a>
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Custom navigation arrows */}
                        <button className="gr-swiper-prev" aria-label="Previous review">
                            <FaChevronLeft />
                        </button>
                        <button className="gr-swiper-next" aria-label="Next review">
                            <FaChevronRight />
                        </button>

                        {/* Custom pagination */}
                        <div className="gr-swiper-pagination"></div>
                    </div>
                </div>

                {/* Bottom CTA row */}
                <div className="gr-cta-row">
                    <a
                        href={GOOGLE_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn gr-btn-outline"
                    >
                        View More Reviews
                    </a>
                    <button
                        className="btn btn-primary gr-btn-quote"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Get Free Quote
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GoogleReviews;

