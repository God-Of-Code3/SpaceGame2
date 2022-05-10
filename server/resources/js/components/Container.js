import React from 'react';

const Container = ({children, ...props}) => {
    return (
        <div className='container container-md'>
            {children}
        </div>
    );
};

export default Container;