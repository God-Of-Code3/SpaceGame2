import React, { useEffect } from 'react';
import { useState } from 'react';
import Btn from '../form/Btn';
import Input from '../form/Input';
import ItemForm from '../ItemForm';

const AccordionTree = ({tree, ...props}) => {
    let id = Math.random();

    const [opened, setOpened] = useState({});
    const [openedForms, setOpenedForms] = useState({});

    useEffect(() => {
        setOpened(tree.map(el => 0));
        setOpenedForms(tree.map(el => 0));
    }, [tree]);

    const toggleItem = i => {
        setOpened(opened => opened.map((child, j ) => i == j ? !child : child));
    };

    const toggleItemForm = (i, type, id) => {
        setOpenedForms(openedForms => openedForms.map((child, j ) => i == j ? !child : child));
    }

    console.log(tree);

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
                                        <h4 className="">{child.contentTitle}:</h4>
                                        <div className="">
                                            <div className="d-flex gap-1 mb-4">
                                                <Btn onClick={() => alert('edit')}>Изменить</Btn>
                                                <Btn cls='danger' onClick={() => alert('edit')}>Удалить</Btn>
                                            </div>
                                            {
                                                openedForms ? 
                                                <ItemForm itemType={child.type} id={child.id} edit={true}></ItemForm>
                                                : ""
                                            }
                                            <table className="table table-dark">
                                                <thead>
                                                    <tr>
                                                        <th>Характеристика</th>
                                                        <th>Значение</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {child.content.map(ch => <tr><td>{ch.param}</td><td>{ch.value}</td></tr>)}
                                                </tbody>
                                            </table>
                                            
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