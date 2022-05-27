import React from 'react';
import CreateForm from './CreateForm';
import ItemsList from './ItemsList';

const CRUDManager = ({children, content, ...props}) => {

    return (
        <div className='mt-5'>
            {/* Rendering creating form */}
            {content.actions.includes('create') ? 
                <CreateForm content={content}></CreateForm>
                : ""
            }
            {/* Rendering item list */}
            {content.actions.includes('get') ? 
                <ItemsList content={content}></ItemsList>
                : ""
            }
        </div>    
    );
};

export default CRUDManager;