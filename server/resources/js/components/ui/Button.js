import React, { useContext } from 'react';
import request from '../../api/Request';
import { reloadContext } from '../Dashboard';
import Btn from '../form/Btn';

const Button = ({el, ...children}) => {
    const {reload} = useContext(reloadContext);
    return (
        <Btn cls={el.props.cls} onClick={() => {
            request(el.props.action, {}, r => {}, "GET");
            reload();
        }}>
            {el.props.text}
        </Btn>
    );
};

export default Button;