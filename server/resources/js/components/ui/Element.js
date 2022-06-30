import React from 'react';
import Block from './Block';
import Column from './Column';
import Row from './Row';
import Button from './Button';
import FormEl from './FormEl';
import TableEl from './TableEl';
import TabsEl from './TabsEl';
import TabEl from './TabEl';
import Text from './Text';
import H5 from './H5';

const els = {
    'row': Row,
    'column': Column,
    'block': Block,
    'button': Button,
    'form': FormEl,
    'table': TableEl,
    'tabs': TabsEl,
    'tab': TabEl,
    'text': Text,
    'h5': H5
};

export default els;