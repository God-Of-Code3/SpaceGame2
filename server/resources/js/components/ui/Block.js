import React from 'react';
import childrenMap, { subMap } from './childrenMap';

const Block = ({el, ...props}) => {
    return (
        <div className='bg-dark rounded p-3'>
            {
                el.props.title ? 
                <h4 className='mb-3'>{el.props.title}</h4>
                : ""
            }
            {
                childrenMap(el)
            }
            <div className="mt-3 d-flex gap-3">
                {
                    el.props.btns ? subMap(el.props.btns) : ""
                }
            </div>
            
        </div>
    );
};

export default Block;