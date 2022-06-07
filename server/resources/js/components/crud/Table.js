import React, {useContext} from 'react';
import { recordFormContext } from './CRUD';
import Btn from '../form/Btn';
import request from '../../api/Request';

const Table = ({records, table, reload, tableData, ...props}) => {

    const {showForm, setShowForm, formData, setFormData} = useContext(recordFormContext);

    const headers = [];
    for (let key in tableData.columns) {
        headers.push([tableData.columns[key][0], key]);
    }

    const actionBtnProps = {
        'delete': ['bi bi-trash', 'danger', record => 
            {
                request(`/api/${table}/${record.id}`, {}, r => {
                    reload();
                }, "DELETE");
            }, true
        ],
        'update': ['bi bi-pencil', 'primary', record => 
            {
                setShowForm(true);
                setFormData(record);
            }, false
        ]
    };

    return (
        <div className="mt-3 p-3 bg-dark rounded ">
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                    {
                        headers.map(header => 
                            <th>{header[0]}</th>
                        )
                    }
                    <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map(record => 
                            <tr>
                                {
                                    headers.map(header => 
                                        <td>{record[header[1]]}</td>
                                    )
                                }
                                <td>
                                    <div className="d-flex gap-2">
                                        {
                                            tableData.actions.filter(action => actionBtnProps[action]).map(action => 
                                                <Btn 
                                                    onClick={() => actionBtnProps[action][2](record)} 
                                                    cls={`${actionBtnProps[action][1]} btn-small`}
                                                    conf={actionBtnProps[action][3]}>
                                                    <i className={`${actionBtnProps[action][0]}`}></i>
                                                </Btn>
                                            )
                                        }
                                    </div>
                                    
                                </td>
                            </tr>    
                        )
                    }

                </tbody>
            </table>
        </div>
        
    );
};

export default Table;