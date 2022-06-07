import React, { useEffect, useState } from 'react';

const Pagination = ({page, setPage, pagination}) => {

    const [btns, setBtns] = useState([]);

    useEffect(() => {
        let bts = [];
        for (let i = 0; i < pagination; i ++) {
            bts.push([i + 1, () => setPage(i), page == i ? 'active' : '']);
        }
        setBtns(bts);
    }, [page, pagination]);

    const nextPage = () => page < pagination - 1 ? setPage(page => page + 1) : "";
    const prevPage = () => page > 0 ? setPage(page => page - 1) : "";

    return (
        <nav className='mt-4' aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
                <li role="button" class={`page-item ${page <= 0 ? "disabled" : ""}`} onClick={prevPage}>
                    <a class="page-link"><span aria-hidden="true">&laquo;</span></a>
                </li>
                {
                    btns.map(btn => 
                        <li role="button" class={`bg-dark page-item ${btn[2]}`} onClick={() => btn[1]()}><a class="page-link">{btn[0]}</a></li>
                    )
                }
                <li role="button" class={`page-item ${page >= pagination - 1 ? "disabled" : ""}`} onClick={nextPage}>
                    <a class="page-link" href="#"><span aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;