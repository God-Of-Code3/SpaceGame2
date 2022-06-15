import React from 'react';
import childrenMap from './childrenMap';

const Row = ({el, ...props}) => {
    return (
        <div className='row'>
            {
                childrenMap(el)
            }
        </div>
    );
};

export default Row;