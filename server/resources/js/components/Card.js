import React from 'react';
import Btn from './form/Btn';

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

                {
                    btns ? <div className="d-flex gap-1">
                        {
                           btns.map(btn => <Btn cls={btn.type} onClick={btn.onClick}>{btn.title}</Btn>) 
                        }
                    </div> : ""
                    
                }
            </div>
        </div>
    );
};

export default Card;