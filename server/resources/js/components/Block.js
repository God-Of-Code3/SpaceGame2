import React from 'react';

const Block = ({children, ...props}) => {
    return (
        <div className="bg-dark text-light p-4 rounded mt-5">
            {children}
        </div>
    );
};

export default Block;