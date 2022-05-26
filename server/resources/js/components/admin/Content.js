import React, { useEffect, useState} from 'react';
import Container from '../Container';
import Tabs from '../tabs/Tabs';
import request from '../../api/Request';

const Content = () => {

    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        request('/api/crud-controls/get-tabs', {}, r => {
            const tbs = [];
            for (let key in r.content) {
                tbs.push({
                    title: r.content[key]['title'],
                    action: ()=>console.log(909090)
                });
            }
            tbs[0].active = true;
            setTabs(tbs);
        }, "GET");
    }, []);

    return (
        <Container>
            <h1>Управление контентом</h1>
            <Tabs tabs={tabs}></Tabs>
        </Container>
    );
};

export default Content;