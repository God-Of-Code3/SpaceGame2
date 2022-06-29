import React from 'react';

const TableEl = ({el, ...props}) => {
    return (
        <div className="table">
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        {
                            el.props.headers.map(header => 
                                <td>{header}</td>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        el.props.body.map(row => 
                            <tr>
                                {
                                    row.map(ch => 
                                        <td>{ch}</td>
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

export default TableEl;