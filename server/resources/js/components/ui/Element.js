import React from 'react';
import Block from './Block';
import Column from './Column';
import Row from './Row';
import Button from './Button';
import FormEl from './FormEl';
import TableEl from './TableEl';

const els = {
    'row': Row,
    'column': Column,
    'block': Block,
    'button': Button,
    'form': FormEl,
    'table': TableEl,
};

export default els;