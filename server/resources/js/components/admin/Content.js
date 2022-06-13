import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import request from '../../api/Request';
import Container from '../Container';
import Btn from '../form/Btn';

const Content = () => {

    const nav = useNavigate();
    const [tables, setTables] = useState([]);

    useEffect(() => {
        request('/api/getTables', {}, r => {
            setTables(r.content);
        }, "GET");
    }, []);

    const openTable = (table) => {
        nav(`/content/crud/${table}`);
    }

    return (
        <div>
            <Container>
                <h1>Таблицы</h1>
                {
                    tables ?
                        <div className="row mt-4">
                            {
                                tables.map(table => 
                                    <div className="col-4 mt-4">
                                        <div className="bg-dark rounded p-3">
                                            <h4 className='mb-3'>{table.title}</h4>
                                            <Btn onClick={() => openTable(table.table)}>Перейти</Btn>
                                        </div>
                                        
                                    </div>    
                                )
                            }
                        </div>
                        
                    : ""
                }
            </Container>
        </div>
    );
};

export default Content;