import React from 'react';

const Table = ({records, tableData, ...props}) => {

    const headers = [];
    for (let key in tableData.columns) {
        headers.push([tableData.columns[key], key]);
    }

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
                            </tr>    
                        )
                    }
                </tbody>
            </table>
        </div>
        
    );
};

export default Table;