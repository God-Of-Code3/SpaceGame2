import React from 'react';

const Container = ({children, ...props}) => {
    return (
        <div className='container container-md text-light'>
            {children}
        </div>
    );
};

export default Container;