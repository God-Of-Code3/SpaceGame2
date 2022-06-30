import React from 'react';

const H5 = ({el, ...props}) => {
    return (
        <h5>{el.children}</h5>
    );
};

export default H5;