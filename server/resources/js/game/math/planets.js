const compTypes = {
    'ice': 'Ледяная',
    'rock': 'Железно-каменная',
    'gase': 'Газовая'
}

const compTypeToText = (compType, temperature, mass) => {
    return compTypes[compType];
}

export {compTypeToText}