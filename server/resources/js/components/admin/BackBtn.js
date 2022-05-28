import React from 'react';

const BackBtn = ({onClick, ...props}) => {
    return (
        <div>
            <b className="text-danger" role="button" onClick={onClick}><i className="bi bi-arrow-left"></i> Назад</b>
        </div>
    );
};

export default BackBtn;