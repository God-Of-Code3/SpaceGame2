import React, { useEffect, useState } from 'react';
import childrenMap from '../ui/childrenMap';

const Tabs = ({ ...props}) => {
    
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="">
            <ul className="nav nav-tabs mt-4 mb-2">
                {
                    props.tabs.map((tab, i) => {
                        return <li key={`tab_${i}`} className="nav-item">
                            <div role="button" className={`nav-link ${activeTab == i ? 'active' : ''} text-light`} onClick={() => setActiveTab(i)}>{tab.props.title}</div>
                        </li>

                        }
                    )
                }
            </ul>
            {
                props.tabs ? 
                    childrenMap(props.tabs[activeTab])
                : ""
            }    
        </div>
        
    );
};

export default Tabs;