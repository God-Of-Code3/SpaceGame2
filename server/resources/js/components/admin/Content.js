import React, { useEffect, useState } from 'react';
import Container from '../Container';
import request from '../../api/Request';
import Block from '../Block';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';
import UniversePanel from './UniversePanel';
import UniversesList from './UniversesList';
import UniverseInfo from './UniverseInfo';

const Content = () => {


    const [content, setContent] = useState({
        type: 'universes',
        props: {}
    });

    const backs = {
        universes: null,
        universe: "universes"
    }

    const contentComponents = {
        universes: UniversesList,
        universe: UniverseInfo,
    };
    
    const reloadContent = () => {
        
        
    }

    useEffect(() => {
        reloadContent();
    }, []);

    return (
        <Container>
            {
                backs[content.type] ? 
                    <p className='fs-5 text-danger fw-bold mb-2' role={"button"} onClick={() => {setContent({type: backs[content.type], props: content.props})}}><i className="bi bi-arrow-left-short"></i> Back</p>
                : ""
            }
            
            {
                contentComponents[content.type]({reloadContent, setContent, content})
            }
        </Container>
    );
};

export default Content;