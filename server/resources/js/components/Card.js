import React from 'react';

const Card = ({title, description="", btns=[], image="", ...props}) => {
    return (
        <div className="card text-white bg-dark ">
            <div className="card-body">
                {
                    title ? <h5 className="card-title">{title}</h5> : ""
                }

                {
                    description ? <p className="card-text mt-3">{description}</p> : ""
                }
            </div>
        </div>
    );
};

export default Card;