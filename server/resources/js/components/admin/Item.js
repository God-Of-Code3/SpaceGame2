import React from 'react';
import Block from '../Block';
import Card from '../Card';

const Item = ({showInfo, item, actions, ...props}) => {

    const [btns, setBtns] = useState(btns);

    return (
        <div className='col-4'>
            <Card
                title={showInfo.title ? item[showInfo.title] : ""}
                description={showInfo.description ? item[showInfo.description] : ""}
                
            ></Card>
        </div>
    );
};

export default Item;