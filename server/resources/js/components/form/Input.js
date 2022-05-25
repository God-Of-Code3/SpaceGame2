import React, { useEffect, useState } from 'react';
import { fieldErrorsContext } from './Form';
import { useContext } from 'react';

const Input = ({name, label, type, val, ...props}) => {
    const {fieldErrors} = useContext(fieldErrorsContext);

    const [value, setValue] = useState("");

    useEffect(() => {
    }, [fieldErrors])

    useEffect(() => {
        setValue(val);
    }, [val]);

    return (
        <div className='d-block w-100'>
            <label htmlFor={name}>{label}</label>
            <input type={type ? type : "text"} name={name} value={value} onChange={e => setValue(e.target.value)} className="form-control text-light"/>
            {fieldErrors[name] ? fieldErrors[name].map(err => 
                <div className="text-danger">
                    {err}
                </div>
            ) : ""}
        </div>
    );
};

export default Input;