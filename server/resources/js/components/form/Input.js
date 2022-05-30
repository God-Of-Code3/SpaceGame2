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

    console.log(props.options);

    return (
        <div className='d-block w-100'>
            
            {type != 'hidden' ? <label htmlFor={name}>{label}</label>: ""}
            {type != "select" ? 
                <input type={type ? type : "text"} id={name} name={name} value={value} onChange={e => setValue(e.target.value)} className="form-control text-light"/>
                :
                <select id={name} name={name} value={value} onChange={e => setValue(e.target.value)} className="form-control text-light">
                    {
                        props.options.map(option => 
                            <option value={option.value} selected={option.value == value}>{option.label}</option>
                        )
                    }
                </select>
            }
            
            {fieldErrors[name] ? fieldErrors[name].map(err => 
                <div className="text-danger">
                    {err}
                </div>
            ) : ""}
        </div>
    );
};

export default Input;