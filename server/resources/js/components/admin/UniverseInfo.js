import React, { useEffect, useState } from 'react';
import request from '../../api/Request';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';
import Block from '../Block';

const UniverseInfo = ({reloadContent, setContent, content, ...props}) => {

    const [universeData, setUniverseData] = useState({});

    const reload = (r) => {
        request(`/api/universe/${content.props.universeId}`, {}, r => {
            setUniverseData(r.content);
        }, "GET");
    }

    useEffect(reload, [content]);

    return (
        <div>
            <h1>Universe: {universeData ? universeData.name : "..."}</h1>
            <Block>
                <Form action={`/api/universe/${universeData.id}`} callback={reload} method="POST">
                    <div className="row w-100">
                        <div className="col-4">
                            <Input name="name" label="Name:" val={universeData.name}></Input>
                        </div>
                        <div className="col-5">
                            <Input name="description" label="Description:" val={universeData.description}></Input>
                        </div>
                        <div className="col-3">
                            <Btn>Save universe</Btn>
                        </div>
                    </div>
                </Form>
            </Block>
        </div>
    );
};

export default UniverseInfo;