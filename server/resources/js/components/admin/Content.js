import React, { useEffect, useState} from 'react';
import Container from '../Container';
import Tabs from '../tabs/Tabs';
import request from '../../api/Request';

const Content = () => {

    // Getting tabs
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        request('/api/crud-controls/get-tabs', {}, r => {
            const tbs = [];
            for (let key in r.content) {
                tbs.push({
                    title: r.content[key]['title'],
                    props: r.content[key],
                    action: tab => {
                        // Getting api info
                        request(`/api/${tab.props.api}/getInfo`, {}, r => {

                            console.log({...tab.props, info: r.content});
                            setCurrentTab({...tab.props, info: r.content});
                        }, "GET")
                    }
                });
            }
            tbs[0].active = true;
            setCurrentTab(tbs[0].props);
            setTabs(tbs);
        }, "GET");
    }, []);

    // Current tab
    const [currentTab, setCurrentTab] = useState({});


    return (
        <Container>
            <h1>Управление контентом</h1>
            <Tabs tabs={tabs}></Tabs>
            
        </Container>
    );
};

export default Content;