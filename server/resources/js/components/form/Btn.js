import React from 'react';

const Btn = ({children, conf=false, ...props}) => {
    return (
        <button className={`btn btn-${props.cls ? props.cls : "primary"}`} onClick={!conf ? props.onClick : () => {
            if (confirm("Вы уверены?")) {
                props.onClick();
            }
        }}>{children}</button>
    );
};

export default Btn;