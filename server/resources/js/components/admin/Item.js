import React, { useEffect, useState } from 'react';
import Block from '../Block';
import Card from '../Card';

const Item = ({showInfo, item, actions, ...props}) => {

    const [btns, setBtns] = useState(btns);

    useEffect(() => {
        let bts = [];
        actions.forEach(action => {
            if (action == 'getOne') {
                bts.push({
                    title: 'Подробнее',
                    type: 'primary',
                    onClick: () => {console.log('go', action)}
                });
            }

            if (action == 'delete') {
                bts.push({
                    title: 'Удалить',
                    type: 'danger',
                    onClick: () => {console.log('del', action)}
                });
            }
        });
        setBtns(bts);
    }, []);

    return (
        <div className='col-4'>
            <Card
                title={showInfo.title ? item[showInfo.title] : ""}
                description={showInfo.description ? item[showInfo.description] : ""}
                btns={btns}
            ></Card>
        </div>
    );
};

export default Item;