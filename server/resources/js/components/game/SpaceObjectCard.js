import React from 'react';

const SpaceObjectCard = ({item, ...props}) => {
    return (
        <div className="card">
            <div className="row">
                <div className="col-md-3 bg-space center rounded">
                    <div className="circle" style={{
                        width: '30px', 
                        height: '30px', 
                        background: item.color,
                        boxShadow: `0px 0px 20px ${item.color}`
                    }}></div>
                </div>
                <div className="card-body col-md-9">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto, ratione!
                </div>
            </div>
        </div>
    );
};

export default SpaceObjectCard;