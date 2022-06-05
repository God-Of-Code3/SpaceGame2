import React, { useEffect } from 'react';
import Btn from '../form/Btn';

const TableHeader = ({tableData}) => {

    const btnProps = {
        'create': ['success', 'Создать'],
    }

    useEffect(() => {
        console.log(tableData.actions.filter(action => btnProps[action]));
    }, [tableData]);

    return (
        <div className="">
            <h2>{tableData.tableName}</h2>
            <div className="d-flex gap-3">
                {
                    tableData.actions.filter(action => btnProps[action]).map(action => 
                        <Btn cls={btnProps[action][0]}>{btnProps[action][1]}</Btn>
                    )
                }
            </div>
        </div>
    );
};

export default TableHeader;