import React, { useEffect, useState} from 'react';
import Container from '../Container';
import Tabs from '../tabs/Tabs';
import request from '../../api/Request';
import CRUDManager from './CRUDManager';

const Content = () => {

    // Tabs state
    const [tabs, setTabs] = useState([]);

    // Current tab
    const [currentTab, setCurrentTab] = useState({});

    // Current content
    const [content, setContent] = useState({});


    // Open tab function
    useEffect(() => {
        if (Object.keys(currentTab).length > 0) {
            // Setting active tab
            
            setTabs(tbs => tbs.map(tb => {return {
                title: tb.title,
                props: tb.props,
                active: tb.title == currentTab.title,
                action: tb => setCurrentTab(tb)
            }}));


            // Getting api info
            request(`/api/${currentTab.props.api}/getInfo`, {}, r => {
                // setCurrentTab({...tab.props, info: r.content});
                setContent(r.content);
            }, "GET");
        }
    }, [currentTab]);

    // Tabs control
    useEffect(() => {
        request('/api/crud-controls/get-tabs', {}, r => {
            const tbs = [];
            for (let key in r.content) {
                tbs.push({
                    title: r.content[key]['title'],
                    props: r.content[key],
                    action: tab => {
                        // console.log(tab);
                        setCurrentTab(tab);
                    }
                });
            }
            tbs[0].active = true;
            setTabs(tbs);
            setCurrentTab(tbs[0]);
        }, "GET");
    }, []);



    return (
        <Container>
            <h1>Управление контентом</h1>
            <Tabs tabs={tabs}></Tabs>
            {
                Object.keys(content).length > 0 ?
                    <CRUDManager content={content}></CRUDManager>
                : ""
            }
            
        </Container>
    );
};

export default Content;