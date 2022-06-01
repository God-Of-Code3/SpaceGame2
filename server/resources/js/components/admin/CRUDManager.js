import React from 'react';
import CreateForm from './CreateForm';
import ItemsList from './ItemsList';
import { useState } from 'react';
import AccordionTreeRoot from './AccordionTreeRoot';

const CRUDManager = ({children, content, setContent, subj, ...props}) => {

    const [reload, setReload] = useState(false);

    return (
        <div className='mt-5'>
            {/* Rendering creating form */}
            {content.createForm ? 
                <CreateForm setContent={setContent} content={content} setReload={setReload} subj={subj}></CreateForm>
                : ""
            }
            {/* Rendering item list */}
            {content.items ? 
                <ItemsList setContent={setContent} content={content} reloadEvent={reload} subj={subj}></ItemsList>
                : ""
            }
            {/* Rendering tree */}
            {
                content.tree ?
                    <AccordionTreeRoot content={content} reloadevent={reload} subj={subj}></AccordionTreeRoot>
                : ""
            }
        </div>    
    );
};

export default CRUDManager;