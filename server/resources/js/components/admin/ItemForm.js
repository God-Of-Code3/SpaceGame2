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
                            <Input name={field[0]} label={field[1]} type={field[2]} val={item[field[0]]}></Input>    
                        )
                    }
                    <Btn>Сохранить</Btn>
                </Form>
            </Block>
        </div>
    );
};

export default ItemForm;