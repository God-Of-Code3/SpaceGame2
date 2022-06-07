import React, { useEffect, useState } from 'react';
import Form from '../form/Form';
import Input from '../form/Input';
import Btn from '../form/Btn';

const RecordForm = ({table, tableData, edit=false, data={}, reload, setShowForm}) => {

    let [headers, setHeaders] = useState([]);

    useEffect(() => {
        const hdrs = [];
        for (let key in tableData.columns) {
            hdrs.push([tableData.columns[key][0], key]);
        }

        setHeaders(hdrs);

    }, [tableData, table]);

    return (
        <div className="">
            <div role="button" className="text-danger text-bold" onClick={() => {setShowForm(false)}}>Закрыть</div>
            <Form action={`/api/${table}/${edit ? data['id'] : ''}`} method={edit ? "PATCH" : "POST"} callback={reload}>
                {
                    headers.map(header =>
                        <Input 
                            type={tableData.columns[header[1]][1]}
                            label={header[0]}
                            options={tableData.columns[header[1]][2] ? tableData.columns[header[1]][2] : []} 
                            name={header[1]} 
                            val={data[header[1]]}>
                        </Input>
                    )
                }
                <Btn>Сохранить</Btn>
            </Form>
        </div>
    );
};

export default RecordForm;