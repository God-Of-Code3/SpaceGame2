import React, { useEffect, useState } from 'react';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';
import request from '../../api/Request';

const RecordForm = ({table, tableData, edit=false, reload, setShowForm, parentTable, parentRecordId, ...props}) => {

    // Main fields
    const [fields, setFields] = useState({
        columns: tableData.columns,
        data: props.data
    });

    const reloadData = () => {

        if (edit && tableData.getColumns) {
            request(`${tableData.getColumns}${props.data.id}`, {}, r => {
                setFields({
                    columns: r.content.columns,
                    data: r.content.values
                });
            }, "GET");
            
        } else {
            setFields(lastFields => {return{
                columns: lastFields.columns,
                data: props.data
            }});
        }
    }

    useEffect(() => {
        reloadData();
    }, [props.data, edit]);

    // Additional get params
    const [additionalGetParams, setAdditionalParams] = useState("");
    useEffect(() => {
        setAdditionalParams(parentTable ? `?${parentTable}=${parentRecordId}` : '');
    }, [parentTable, parentRecordId]);

    return (
        <div className="">
            <div role="button" className="text-danger text-bold" onClick={() => {setShowForm(false)}}>Закрыть</div>
            <Form action={`/api/${table}/${edit ? props.data.id : ''}${additionalGetParams}`} method={edit ? "PATCH" : "POST"} callback={reload}>
                {
                    Object.keys(fields.columns).map(name => 
                        <Input 
                            name={name}
                            type={fields.columns[name][1]}
                            label={fields.columns[name][0]}
                            val={(fields.data[name] || fields.data[name] === 0) 
                                ? fields.data[name]
                                : "clear" + Math.random()}
                            options={fields.columns[name][2]}
                        ></Input>
                    )
                }
                <Btn>Сохранить</Btn>
            </Form>
        </div>
    );
};

export default RecordForm;