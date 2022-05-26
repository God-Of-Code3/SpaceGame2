import React from 'react';
import request from '../../api/Request';
import Block from '../Block';
import Btn from '../form/Btn';

const SpaceObjectTypePanel = ({universe, onClick=()=>{}, reload=()=>{}, ...children}) => {

    const remove = () => {
        request(`/api/universe/${universe.id}`, {}, r => {
            reload();
        }, "DELETE");
    }

    return (
        <Block>
            <h3>{universe.name}</h3>
            <p className='mt-2'>{universe.description}</p>
            <div className="d-flex gap-1">
                
                <Btn onClick={() => {onClick(universe.id)}}>Edit</Btn>
                <Btn cls={"danger"} onClick={remove}>Remove</Btn>
            </div>
        </Block>
    );
};

export default SpaceObjectTypePanel;