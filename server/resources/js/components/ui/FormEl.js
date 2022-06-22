import React from 'react';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';
import { useContext } from 'react';
import { reloadContext } from '../Dashboard';

const FormEl = ({el, ...props}) => {
    const {reload} = useContext(reloadContext);

    return (
        <Form callback={r => reload()} action={el.props.action} method={"POST"}>
            {
                el.props.fields.map(field => 
                    <Input name={field.name} label={field.label} type={field.type} val={field.value}></Input>    
                )
            }
            <Btn>{el.props.btnText}</Btn>
        </Form>
    );
};

export default FormEl;