import { useState } from 'react';
import './DesignTabs.css';

const DesignTabs = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="design-tabs">
            <div className="design-tabs-nav">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`design-tab-btn ${index === activeTab ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="design-tabs-content">
                <div className="design-tab-grid">
                    {tabs[activeTab].images.map((img, imgIndex) => (
                        <div key={imgIndex} className="design-tab-image">
                            <img src={img} alt={tabs[activeTab].alts?.[imgIndex] || tabs[activeTab].label} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DesignTabs;
