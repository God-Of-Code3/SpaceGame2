import React, { useEffect, useState } from 'react';
import AccordionTree from './AccordionTree';
import request from '../../api/Request';

const AccordionTreeRoot = ({content, reloadEvent, subj, ...props}) => {

    const [tree, setTree] = useState([]);

    useEffect(() => {
        console.log();
        request(`/api/${content.api}/`, {}, r => {
            setTree(r.content);
        }, "GET");
    }, [content]);

    return (
        <AccordionTree tree={tree}></AccordionTree>
    );
};

export default AccordionTreeRoot;