import React from 'react';
import Block from '../Block';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';


const CreateForm = ({content, setReload, ...props}) => {
    return (
        <div className="">
            <h3 className='mb-4'>{content.createForm.title}</h3>
            <Block>
                <Form action={`/api/${content.api}/`} method="POST" callback={() => {setReload(rel => !rel);}}>
                    {
                        content.createForm.fields.map(field => 
                            <Input name={field[0]} label={field[1]} type={field[2]}></Input>    
                        )
                    }
                    <Btn>Сохранить</Btn>
                </Form>
            </Block>
        </div>
        
    );
};

export default CreateForm;