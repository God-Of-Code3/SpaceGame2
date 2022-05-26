import React, { useEffect, useState } from 'react';
import request from '../../api/Request';
import Block from '../Block';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';
import UniversePanel from './UniversePanel';

const UniversesList = ({reloadContent, setContent, content, ...props}) => {
    const [universes, setUniverses] = useState([]);

    const reload = () => {
        request('api/universe/', {}, r => {
            setUniverses(r.content);
        }, "GET");
    }

    const editUniverse = (id) => {
        setContent({
            type: 'universe',
            props: {
                universeId: id
            }
        });
    }

    useEffect(reload, [content]);

    return (
        <div className="">
            <h1>Content</h1>
            <Block>
                <h3>Types, props management </h3>
                <div className="d-flex gap-3">
                        <Btn onClick={() => {
                            setContent({
                                type: 'spaceObjectTypes'
                            });
                        }}>Edit types</Btn>
                    <Btn onClick={() => {
                            setContent({
                                type: 'spaceObjectPropTypes'
                            });
                        }}>Edit prop types</Btn>

                </div>
                
            </Block>
            <br />
            <h2>Universes</h2>
            <Block>
                <h3>Creating new universe</h3>
                <br />
                <Form action="/api/universe" callback={reload}>
                    <div className="row w-100">
                        <div className="col-4">
                            <Input name="name" label="Name:"></Input>
                        </div>
                        <div className="col-5">
                            <Input name="description" label="Description:"></Input>
                        </div>
                        <div className="col-3">
                            <Btn>Create universe</Btn>
                        </div>
                    </div>
                </Form>
            </Block>
            <div className="row">

                {
                    universes.length > 0 ? 
                    universes.map(universe => 
                        <div className="col-4"><UniversePanel reload={reload} universe={universe} key={universe.id} onClick={editUniverse}></UniversePanel></div>
                    ) : null
                }
            </div>
        </div>
        
    );
};

export default UniversesList;