import React, { useEffect } from 'react';
import { fieldErrorsContext } from './Form';
import { useContext } from 'react';

const Input = ({name, label, type, value, ...props}) => {
    const {fieldErrors} = useContext(fieldErrorsContext);

    useEffect(() => {
        console.log(fieldErrors, fieldErrors[name]);
    }, [fieldErrors])

    return (
        <div className='mb-4'>
            <label htmlFor={name}>{label}</label>
            <input type={type ? type : "text"} name={name} value={value} className="form-control text-light"/>
            {fieldErrors[name] ? fieldErrors[name].map(err => 
                <div className="text-danger">
                    {err}
                </div>
            ) : ""}
        </div>
    );
};

export default Input;