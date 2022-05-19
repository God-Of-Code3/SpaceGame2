import React from 'react';

const Form = ({action, children, ...props}) => {
    return (
        <form action="#" onSubmit={(e) => action(e)}>
            {children}
        </form>
    );
};

export default Form;