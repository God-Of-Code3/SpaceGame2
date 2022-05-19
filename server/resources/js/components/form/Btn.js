import React from 'react';

const Btn = ({children, ...props}) => {
    return (
        <button className="mt-4 btn btn-primary">{children}</button>
    );
};

export default Btn;