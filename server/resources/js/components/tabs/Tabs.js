import React, { useEffect } from 'react';

const Tabs = ({ ...props}) => {
    
    return (
        <ul className="nav nav-pills mt-4">
            {
                props.tabs.map(tab => 
                    <li className="nav-item">
                        <div role="button" className={`nav-link ${tab.active ? 'active' : ''} text-light`} onClick={() => tab.action(tab)}>{tab.title}</div>
                    </li>
                )
            }
        </ul>
    );
};

export default Tabs;