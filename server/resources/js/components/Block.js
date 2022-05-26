import React from 'react';

const Block = ({children, ...props}) => {
    return (
        <div className="bg-dark text-light p-4 rounded my-3">
            {children}
        </div>
    );
};

export default Block;