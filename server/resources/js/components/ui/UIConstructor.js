import React from 'react';
import els from './Element';

const UIConstructor = ({title, elements}) => {
    return (
        <div className="">
            <h1 className='mb-5'>{title}</h1>
            {
                elements.map(ch => 
                    els[ch.element]({el: ch})   
                )
            }
        </div>
    );
};

export default UIConstructor;