import React, { useEffect } from 'react';
import { useState } from 'react';

const AccordionTree = ({tree, ...props}) => {
    let id = Math.random();

    const [opened, setOpened] = useState({});

    useEffect(() => {
        setOpened(tree.map(el => 0));
    }, [tree]);

    const toggleItem = i => {
        setOpened(opened => opened.map((child, j) => i == j ? !child : child));
    };

    return (
        <div className='accordion accordion-flush' id={`accordion-${id}`}>
            {
                tree.map((child, i) => 
                    <div className="accordion-item">
                        <h2 className={`accordion-header border-bottom border-primary`}>
                            <button className={`accordion-button text-light ${!opened[i] ? 'collapsed' : ''}  ${opened[i] ? 'bg-primary' : 'bg-dark'}`} type="button" onClick={() => toggleItem(i)}>{child.title}</button>
                        </h2>
                        <div className={`accordion-collapse collapse ${opened[i] ? 'show' : ''}`}>
                            <div className="accordion-body border border-secondary text-light">
                                    <div className="">
                                        <h4 className="mb-3">{child.contentTitle}:</h4>
                                        <div className="">
                                            
                                            {child.content.map(ch => <p><b>{ch.param}</b>: {ch.value}</p>)}
                                        </div>
                                    </div>
                                    {child.children ? 
                                    <div className="mt-5">
                                        <h4 className="mb-3">{child.childrenTitle}:</h4>
                                        <AccordionTree tree={child.children}></AccordionTree>
                                    </div> : ""}
                                    
                                    
                            </div>
                        </div>
                    </div>
                )
            }
            
        </div>
    );
};

export default AccordionTree;