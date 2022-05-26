import React, { useEffect, useState } from 'react';
import Block from '../Block';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';
import request from '../../api/Request';

const SpaceObjectTypes = ({reloadContent, setContent, content, ...props}) => {

    const [spaceObjectTypes, setSpaceObjectTypes] = useState([]);

    const reload = () => {
        request('/api/space-object-types', {}, r => {
            console.log(r);
            setSpaceObjectTypes(r.content);
        }, "GET");
        console.log(spaceObjectTypes);
    }
    
    useEffect(reload, [content]);

    return (
        <div>
            <h2>Space object types</h2>
            <Block>
                <h3>Creating new space object type</h3>
                <br />
                <Form action="/api/space-object-types/" callback={reload} method="POST">
                    <div className="row w-100">
                        <div className="col-3">
                            <Input name="name" label="Name:"></Input>
                        </div>
                        <div className="col-3">
                            <Input name="runame" label="Russian Name:"></Input>
                        </div>
                        <div className="col-3">
                            <Input name="description" label="Description:"></Input>
                        </div>
                        <div className="col-3">
                            <Btn>Create space object type</Btn>
                        </div>
                    </div>
                </Form>
            </Block>
            <div className="row">

                {
                    spaceObjectTypes.length > 0 ? 
                    spaceObjectTypes.map(spaceObjectType => 
                        <div className="col-4">{spaceObjectType.name}</div>
                    ) : null
                }
            </div>
        </div>
    );
};

export default SpaceObjectTypes;