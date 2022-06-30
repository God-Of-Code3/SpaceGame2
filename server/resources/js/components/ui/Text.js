import React from 'react';

const Text = ({el, ...props}) => {
    return (
        <div>
            <p>{el.children}</p>
        </div>
    );
};

export default Text;