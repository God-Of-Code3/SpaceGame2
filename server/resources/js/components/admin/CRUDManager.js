import React from 'react';
import CreateForm from './CreateForm';

const CRUDManager = ({children, content, ...props}) => {

    return (
        <div className='mt-5'>
            {/* Rendering creating form */}
            {content.actions.includes('create') ? 
                <CreateForm content={content}></CreateForm>
                : ""
            }
            {/* Rendering item list */}
            {

            }
        </div>    
    );
};

export default CRUDManager;