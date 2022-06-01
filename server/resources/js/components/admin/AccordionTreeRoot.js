import React from 'react';
import AccordionTree from './AccordionTree';

const AccordionTreeRoot = ({content, reloadEvent, subj, ...props}) => {
    return (
        <AccordionTree tree={[
            {
                title: 'Солнце',
                contentTitle: 'Совновная информация',
                childrenTitle: 'Информация об объектах системы',
                content: [
                    {
                        'param': 'Температура',
                        'value': 3400,
                    }
                ],
                children: [
                    {
                        title: 'Земля',
                        contentTitle: 'Совновная информация',
                        childrenTitle: 'Информация об объектах системы',
                        content: [
                            {
                                'param': 'Температура',
                                'value': 5000,
                            }
                        ]
                    },
                    {
                        title: 'Марс',
                        contentTitle: 'Совновная информация',
                        childrenTitle: 'Информация об объектах системы',
                        content: [
                            {
                                'param': 'Температура',
                                'value': 5000,
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Невар',
                contentTitle: 'Совновная информация',
                childrenTitle: 'Информация об объектах системы',
                content: [
                    {
                        'param': 'Температура',
                        'value': 5000,
                    }
                ],
                children: [
                    {
                        title: 'Желанная',
                        content: [
                            {
                                'param': 'Температура',
                                'value': 5000,
                            }
                        ]
                    },
                ]
            },
        ]}></AccordionTree>
    );
};

export default AccordionTreeRoot;