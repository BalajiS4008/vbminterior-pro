import './ImageAccordion.css';

const ImageAccordion = ({ panels }) => {
    return (
        <div className="image-accordion">
            {panels.map((panel, index) => (
                <div
                    key={index}
                    className="accordion-panel"
                    style={{ backgroundImage: `url(${panel.image})` }}
                >
                    <div className="accordion-panel-overlay">
                        <span className="accordion-panel-label">{panel.label}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageAccordion;
