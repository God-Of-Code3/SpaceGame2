import request from "../Request"

const readAll = ({table, page, setRecords, setTableData, setPagination}) => {
    request(`/api/${table}/?page=${page + 1}`, {}, r => {
        setRecords(r.content.records.data);
        setTableData(r.content.tableData);
        setPagination(Math.ceil(r.content.records.total / r.content.records.per_page));
    }, "GET");
}

export {readAll};