import React, { createContext, useState } from 'react';
import { fetchForm } from '../../api/FormHandler';

export const fieldErrorsContext = createContext();

const Form = ({action, callback, children, ...props}) => {

    const [messages, setMessages] = useState([]);
    const [fieldErrors, setFieldErrors] = useState({});
    return (
        <form action="#" onSubmit={e => {
                e.preventDefault();
                fetchForm(action, "POST", e.target, messages, setMessages, setFieldErrors, callback);
            }}>
            <fieldErrorsContext.Provider value={{fieldErrors, setFieldErrors}}>
                
                {children}
            </fieldErrorsContext.Provider>
            <div className="mt-3">
                {
                    messages 
                    ? messages.map(msg => {
                        let cls = {
                            'error': 'danger',
                            'warning': 'warning',
                            'success': 'success',
                            'primary': 'primary'
                        }[msg.type] || 'primary';
                        
                        return <div key={msg.key} className={`mt-2 alert alert-${cls} alert-dismissible fade show `} role='alert'>
                            {msg.text}
                            <button type="button" className="btn-close" data-dismiss="alert" aria-label="Close" onClick={() => setMessages(messages.filter(mes => mes.key != msg.key))}>
                            </button>
                        </div>
                    }) 
                    : ""
                }
            </div>
            
        </form>
    );
};

export default Form;