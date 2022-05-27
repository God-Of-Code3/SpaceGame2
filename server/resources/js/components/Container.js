import React from 'react';

const Container = ({children, ...props}) => {
    return (
        <div className="wrapper">
            <div className='container container-md text-light'>
                {children}
            </div>
        </div>
        
    );
};

export default Container;