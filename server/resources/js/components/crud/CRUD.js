import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readAll } from '../../api/crud/read';
import Container from '../Container';
import Table from './Table';
import TableHeader from './TableHeader';

const CRUD = ({...props}) => {

    const {table} = useParams();

    // Getting all records
    const [page, setPage] = useState(0);
    const [records, setRecords] = useState([]);
    const [tableData, setTableData] = useState(false);

    const reload = () => readAll({table, setRecords, setTableData, page});
    useEffect(() => {
        reload();
    }, [table]);


    return (
        <Container>
            {
                tableData ? 
                <TableHeader tableData={tableData}></TableHeader>
                : ""
            }
            {
                (records && tableData) ? 
                <Table tableData={tableData} records={records}></Table>
                : ""
            }
            
        </Container>
    );
};

export default CRUD;