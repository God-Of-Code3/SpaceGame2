import React, { useContext, useEffect, useState } from 'react';
import request from '../../api/Request';
import Btn from '../form/Btn';
import { recordFormContext } from './CRUD';
import RecordForm from './RecordForm';

const TableHeader = ({table, tableData, reload, parentTable, parentRecordId}) => {

    const {showForm, setShowForm, formData, setFormData} = useContext(recordFormContext);

    let btnProps = {
        'create': ['success', 'Создать', () => { setFormData({});setShowForm(true) }],
    }
    


    return (
        <div className="">
            <h2>{tableData.tableName}</h2>
            <div className="mt-3 d-flex gap-3">
                {
                    tableData.actions.filter(action => btnProps[action]).map(action => 
                        <Btn cls={btnProps[action][0]} onClick={btnProps[action][2]}>{btnProps[action][1]}</Btn>
                    )
                }
                {
                    tableData.customActions ? tableData.customActions.map(action => 
                        <Btn cls={action.type} onClick={() => { request(action.action, {}, r => reload(), "GET") }}>{action.text}</Btn>    
                    ) : ""
                }
            </div>
            
            {
                showForm ? 
                    <div className="mt-3 p-3 bg-dark rounded"><RecordForm parentTable={parentTable} parentRecordId={parentRecordId} setShowForm={setShowForm} table={table} tableData={tableData} edit={Object.keys(formData).length > 0} reload={reload} data={formData}></RecordForm></div>
                : ""
            }   
            
        </div>
    );
};

export default TableHeader;