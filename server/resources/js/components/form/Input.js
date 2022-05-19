import React from 'react';

const Input = ({name, label, type, value, ...props}) => {
    return (
        <div className='mb-4'>
            <label htmlFor={name}>{label}</label>
            <input type={type ? type : "text"} name={name} value={value} className="form-control text-light"/>
        </div>
    );
};

export default Input;