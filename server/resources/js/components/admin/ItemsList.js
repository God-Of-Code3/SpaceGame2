import React, { useEffect, useState } from 'react';
import request from '../../api/Request';
import Item from './Item';

const ItemsList = ({content, ...props}) => {
    
    const [items, setItems] = useState([]);

    useEffect(() => {
        request(`/api/${content.api}/`, {}, r => {
            setItems(r.content);
        }, "GET");
    }, [content]);

    return (
        <div className="mt-5">
            <h3 className='mb-3'>{content.items.title}</h3>
            <div className='row gy-3'>
                {
                    items.map(item => 
                        <Item showInfo={content.items.showInfo} item={item} actions={content.actions}></Item>
                    )
                }
            </div>
        </div>
        
    );
};

export default ItemsList;