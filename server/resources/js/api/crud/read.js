import request from "../Request"

const readAll = ({table, page, setRecords, setTableData, setPagination, parentTable, parentRecordId}) => {
    console.log();
    const additionalGetPatams = parentTable ? `&${parentTable}=${parentRecordId}` : '';
    request(`/api/${table}/?page=${page + 1}${additionalGetPatams}`, {}, r => {
        setRecords(r.content.records.data);
        setTableData(r.content.tableData);
        setPagination(Math.ceil(r.content.records.total / r.content.records.per_page));
    }, "GET");
}

export {readAll};