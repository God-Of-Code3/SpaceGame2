import React from 'react';
import childrenMap from './childrenMap';

const Column = ({el, children, ...props}) => {
    return (
        <div className={`col-${el.props.columns}`}>
            {
                childrenMap(el)
            }
        </div>
    );
};

export default Column;