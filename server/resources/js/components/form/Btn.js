import React from 'react';

const Btn = ({children, ...props}) => {
    return (
        <button className={`mt-4 btn btn-${props.cls ? props.cls : "primary"}`} onClick={props.onClick}>{children}</button>
    );
};

export default Btn;