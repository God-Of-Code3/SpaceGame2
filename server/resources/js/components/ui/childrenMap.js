import els from "./Element";


const childrenMap = el => el.children.map(ch => 
    els[ch.element]({el: ch})   
);

const subMap = arr => arr.map(ch => els[ch.element]({el: ch}))


export default childrenMap;
export {subMap};