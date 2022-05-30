import React from 'react';
import Block from '../Block';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';
import BackBtn from './BackBtn';

const ItemForm = ({item, content, setSelectedItem, ...props}) => {
    
    return (
        <div className="">
            <Block>
                <BackBtn onClick={() => { setSelectedItem({}); }}></BackBtn>
                <h4 className='mt-3 mb-3'>Редактирование</h4>
                <Form action={`/api/${content.api}/${item.id}`} method="POST">
                    {
                        content.createForm.fields.map(field =>
                            <Input name={field[0]} label={content.labels[field[0]]} type={field[1]} val={item[field[0]]} options={field[1] == 'select' ? field[2] : []}></Input>  
                        )
                    }
                    <Btn>Сохранить</Btn>
                </Form>
            </Block>
        </div>
    );
};

export default ItemForm;