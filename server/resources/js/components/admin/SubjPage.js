import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../api/Request';

const SubjPage = ({...props}) => {

    // Getting subject
    const [subj, setSubj] = useState(useParams());

    // Info
    const [info, setInfo] = useState({});

    // Getting subject information
    useEffect(() => {
        request(`/api/${subj.subjType}/getInfo`, {}, r => {
            setInfo(r.content);
        }, "GET");
    }, [subj]);
    


    return (
        <div>
            
        </div>
    );
};

export default SubjPage;