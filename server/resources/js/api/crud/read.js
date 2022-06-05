import request from "../Request"

const readAll = ({table, page, setRecords, setTableData}) => {
    request(`/api/${table}/?page=${page}`, {}, r => {
        setRecords(r.content.records.data);
        setTableData(r.content.tableData);
    }, "GET");
}

export {readAll};