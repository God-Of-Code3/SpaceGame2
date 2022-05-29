import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Block from '../Block';
import Card from '../Card';

const Item = ({api, items, item, actions, ...props}) => {

    const [btns, setBtns] = useState(btns);
    const nav = useNavigate();

    useEffect(() => {
        let bts = [];
        actions.forEach(action => {
            if (action == 'update') {
                bts.push({
                    title: 'Изменить',
                    type: 'primary',
                    onClick: () => {props.setSelectedItem(item)}
                });
            }

            if (action == 'page') {
                bts.push({
                    title: 'Подробнее',
                    type: 'success',
                    onClick: () => {
                        nav(`/content/${api}/${item.id}`);
                        window.location.reload();
                    }
                });
            }

            if (action == 'delete') {
                bts.push({
                    title: 'Удалить',
                    type: 'danger',
                    onClick: () => {props.removeItem(item)}
                });
            }
        });
        
        setBtns(bts);
    }, [item, actions]);

    return (
        <div className='col-4'>
            <Card
                title={items.showInfo.title ? item[items.showInfo.title] : ""}
                subtitle={items.showInfo.subtitle ? item[items.showInfo.subtitle] : ""}
                description={items.showInfo.description ? item[items.showInfo.description] : ""}
                btns={btns}
            ></Card>
        </div>
    );
};

export default Item;