import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { readAll } from '../../api/crud/read';
import Container from '../Container';
import Pagination from './Pagination';
import Table from './Table';
import TableHeader from './TableHeader';

const recordFormContext = React.createContext();

const CRUD = ({...props}) => {

    const {table} = useParams();

    // Getting all records
    const [page, setPage] = useState(0);
    const [records, setRecords] = useState([]);
    const [tableData, setTableData] = useState(false);
    const [pagination, setPagination] = useState(0);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});

    const reload = () => {
        setFormData({});
        readAll({table, setRecords, setTableData, page, setPagination})
    };
    useEffect(() => {
        reload();
    }, [table, page]);


    return (
        <Container>
            <recordFormContext.Provider value={{showForm, setShowForm, formData, setFormData}}>
                {
                    tableData ? 
                    <TableHeader formData={formData} reload={reload} table={table} tableData={tableData}></TableHeader>
                    : ""
                }
                {
                    (records && tableData) ? 
                    <Table tableData={tableData} reload={reload} table={table} records={records}></Table>
                    : ""
                }
                {
                    (records && pagination) ?
                    <Pagination page={page} pagination={pagination} setPage={setPage}></Pagination>
                    : ""
                }
            </recordFormContext.Provider>
        </Container>
    );
};

export default CRUD;
export {recordFormContext};