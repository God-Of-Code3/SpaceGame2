import React, { useEffect, useState} from 'react';
import Container from '../Container';
import Tabs from '../tabs/Tabs';
import request from '../../api/Request';
import CRUDManager from './CRUDManager';
import { useParams } from 'react-router-dom';

const Content = ({...props}) => {

    // Title
    const [title, setTitle] = useState("Управление контентом");

    // URL options
    const [subj, setSubj] = useState(useParams());

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
        const loadTabs = (array) => {
            const tbs = [];
            for (let key in array) {
                tbs.push({
                    title: array[key]['title'],
                    props: array[key],
                    action: tab => {
                        setCurrentTab(tab);
                    }
                });
            }
            tbs[0].active = true;
            setTabs(tbs);
            setCurrentTab(tbs[0]);
        }

        const getTabsUrl = subj.subjType ? `/api/${subj.subjType}/getInfo` : '/api/crud-controls/get-tabs';

        request(getTabsUrl, {}, r => {
            loadTabs(subj.subjType ? r.content.page.tabs : r.content);
            setTitle(subj.subjType ? r.content.page.title : title);
        }, "GET");
    }, []);


    return (
        <Container>
            <h1>{title}</h1>
            <Tabs tabs={tabs}></Tabs>
            {
                Object.keys(content).length > 0 ?
                    <CRUDManager setContent={setContent} content={content}></CRUDManager>
                : ""
            }
            
        </Container>
    );
};

export default Content;