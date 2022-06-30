import React, { useEffect, useState } from 'react';
import Tabs from '../tabs/Tabs';

const TabsEl = ({el, ...props}) => {

    // useEffect(() => {
    //     // setTabs(el.children.map(tab => {

    //     //     const tabData = {
    //     //         title: tab.props.title,
    //     //         action: () => {}
    //     //     };
    //     //     console.log(tabData);
    //     //     return tabData;
    //     // }));
    //     console.log(909);
    // }, [el]);


    return (
        <Tabs tabs={el.children}></Tabs>
    );
};

export default TabsEl;