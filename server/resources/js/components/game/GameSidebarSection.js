import React from 'react';
import SpaceObjectCard from './SpaceObjectCard';

const GameSidebarSection = ({section, ...props}) => {
    return (
        <div className='mb-2'>
            <h6>{section.title}</h6>
            {
                section.content.map(item => {
                    switch (item.type) {
                        case "spaceObjectCard":
                            return (<SpaceObjectCard item={item}/>);
                    }
                })
            }
        </div>
    );
};

export default GameSidebarSection;