import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import formImg from '../assets/images/formimg.png';
import './ContactModal.css';

const ContactModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        propertySize: '',
        timeline: '',
        location: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch('https://hook.eu1.make.com/y44zzssqgkko8mp3k78xianylbfve7qq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    propertySize: formData.propertySize,
                    startTimeline: formData.timeline,
                    email: formData.email,
                    contactNumber: formData.phone,
                    location: formData.location,
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', propertySize: '', timeline: '', location: '' });
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const propertySizes = ['2BHK', '3BHK', '4BHK', '5+ BHK/Villa/Penthouse', 'Other'];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    <FaTimes />
                </button>

                {/* Left: Image */}
                <div className="modal-image">
                    <img
                        src={formImg}
                        alt="Interior Design"
                    />
                </div>

                {/* Right: Form */}
                <div className="modal-form-side">
                    <h2>Get A Free Design Consultation.</h2>

                    <form onSubmit={handleSubmit} className="modal-form">
                        <div className="form-group">
                            <label className="form-label-bold">What is the size of the Property?</label>
                            <div className="radio-group">
                                {propertySizes.map((size) => (
                                    <label key={size} className="radio-option">
                                        <input
                                            type="radio"
                                            name="propertySize"
                                            value={size}
                                            checked={formData.propertySize === size}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="radio-label">{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label-bold" htmlFor="timeline">When do you want this work to start?</label>
                            <select
                                id="timeline"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select timeline</option>
                                <option value="Immediately">Immediately</option>
                                <option value="In a Month">In a Month</option>
                                <option value="Within two months">Within two months</option>
                                <option value="After 3 months">After 3 months</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label-bold" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label-bold" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label-bold" htmlFor="phone">Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label-bold" htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {submitStatus === 'success' && (
                            <div className="alert alert-success">
                                Thank you! Your request has been sent successfully.
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="alert alert-error">
                                Oops! Something went wrong. Please try again.
                            </div>
                        )}

                        <button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
