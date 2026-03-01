import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './FAQAccordion.css';

const FAQAccordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-accordion">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`faq-accordion-item ${openIndex === index ? 'open' : ''}`}
                    onClick={() => toggle(index)}
                >
                    <div className="faq-accordion-question">
                        <h4>{item.question}</h4>
                        <FaChevronDown className="faq-chevron" />
                    </div>
                    <div className="faq-accordion-answer">
                        <p>{item.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQAccordion;
