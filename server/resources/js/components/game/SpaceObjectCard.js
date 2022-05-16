import React from 'react';

const SpaceObjectCard = ({item, ...props}) => {
    return (
        <div className="mt-2">
            <div className="row flex-nowrap rounded border">
                <div className="col-3 bg-space center rounded-start">
                    {
                        item.image ? 
                    <img src={item.image} alt="ObjectImage" className="circle" style={{
                        width: '30px', 
                        height: '30px', 
                        background: item.color,
                        boxShadow: `0px 0px 20px ${item.color}`
                    }}/>
                        :
                    
                    <div className="circle" style={{
                        width: '30px', 
                        height: '30px', 
                        background: item.color,
                        boxShadow: `0px 0px 20px ${item.color}`
                    }}></div>

                    }
                </div>
                <div className="col-8 p-3">
                    <h6>{item.title}</h6>
                    <p className="text-secondary mt-1">{item.subtitle}</p>
                </div>
                <div className="col-1 p-0 pl-3 d-flex align-items-center justify-space-between bg-light rounded-end">
                    <i className="bi bi-chevron-right m-1"></i>
                </div>
            </div>
        </div>
    );
};

export default SpaceObjectCard;