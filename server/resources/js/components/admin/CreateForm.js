import React from 'react';
import Block from '../Block';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';


const CreateForm = ({content, setReload, subj, ...props}) => {

    const to = subj.subjType ? `/api/${content.api}/${subj.subjType}/${subj.subjId}` : `/api/${content.api}`;
    
    return (
        <div className="">
            <h3 className='mb-4'>{content.createForm.title}</h3>
            <Block>
                <Form action={to} method="POST" callback={() => {setReload(rel => !rel);}}>
                    {
                        content.createForm.fields.map(field => 
                            <Input name={field[0]} label={content.labels[field[0]]} type={field[1]} options={field[1] == 'select' ? field[2] : []}></Input>    
                        )
                    }
                    {
                        subj.subjId ? 
                        <Input name={`${subj.subjType}_id`} type="hidden" val={subj.subjId}></Input>
                        : ""
                    }
                    <Btn>Сохранить</Btn>
                </Form>
            </Block>
        </div>
        
    );
};

export default CreateForm;