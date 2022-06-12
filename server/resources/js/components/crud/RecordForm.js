import React, { useEffect, useState } from 'react';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';
import request from '../../api/Request';

const RecordForm = ({table, tableData, edit=false, reload, setShowForm, parentTable, parentRecordId, ...props}) => {

    let [headers, setHeaders] = useState([]);
    const [additionalGetPatams, setAdditionalGetParams] = useState('');
    const [columns, setColumns] = useState(tableData.columns);
    const [values, setValues] = useState({});

    useEffect(() => {
        const hdrs = [];
        if (!edit || !tableData.getColumns) {
            for (let key in tableData.columns) {
                hdrs.push([tableData.columns[key][0], key]);
            }
            setAdditionalGetParams(parentTable ? `?${parentTable}=${parentRecordId}` : '');
            setHeaders(hdrs);
        } else {
            // getting special params
            request(tableData.getColumns + props.data['id'], {}, r => {
                for (let key in r.content.labels) {
                    hdrs.push([r.content.labels[key][0], key]);
                }
                setAdditionalGetParams(parentTable ? `?${parentTable}=${parentRecordId}` : '');
                setColumns(r.content.labels);
                setValues(r.content.values);
                setHeaders(hdrs);
            }, "GET");
        }
    }, [tableData, table, edit, props.data]);

    return (
        <div className="">
            <div role="button" className="text-danger text-bold" onClick={() => {setShowForm(false)}}>Закрыть</div>
            <Form action={`/api/${table}/${edit ? props.data['id'] : ''}${additionalGetPatams}`} method={edit ? "PATCH" : "POST"} callback={reload}>
                {
                    headers.map(header =>
                        <Input 
                            type={columns[header[1]][1]}
                            label={header[0]}
                            options={columns[header[1]][2] ? columns[header[1]][2] : []} 
                            name={header[1]} 
                            val={tableData.getColumns ? 
                                values[header[1]]
                                : ((props.data[header[1]] || props.data[header[1]] === 0) ? props.data[header[1]] : "clear" + Math.random())
                            }>
                        </Input>
                    )
                }
                <Btn>Сохранить</Btn>
            </Form>
        </div>
    );
};

export default RecordForm;