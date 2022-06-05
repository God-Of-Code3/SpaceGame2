import React, { useEffect, useState } from 'react';
import Form from './form/Form';
import Btn from './form/Btn';
import Input from './form/Input';
import request from '../api/Request';

const ItemForm = ({itemType, id, edit, ...props}) => {
     
    const [content, setContent] = useState({});
    const [item, setItem] = useState({});

    useEffect(() => {
        request(`/api/${itemType}/getInfo`, {}, r => {
            setContent(r.content);
            if (edit) {
                request(`/api/${itemType}/${id}`, {}, r2 => {
                    setItem(r2.content);
                }, "GET");
            }
            
        }, "GET");
    }, [itemType]);

    return (
        <Form to={edit ? `/api/${itemType}/${id}` : `/api/${itemType}/`} method={`POST`}>
            {
                content.createForm ? 
                content.createForm.fields.map(field => 
                    <Input key={field[0]} name={field[0]} label={content.labels[field[0]]} type={field[1]} options={field[1] == 'select' ? field[2] : []} val={item[field[0]]}></Input>    
                ) : ""
            }
            <Btn>{edit ? "Сохранить" : "Создать"}</Btn>
        </Form>
    );
};

export default ItemForm;