import React from 'react';
import moment from 'moment'
import _ from 'lodash'
import color from 'color'

import { updatePointerSettings } from '../actions/AppActions'

let colorChoices = (alpha) => { return [
    { key: 'red'   , value: color("#D33131").alpha(alpha).rgbaString() } ,
    { key: 'green' , value: color("#D33131").alpha(alpha).rotate(120).rgbaString() } ,
    { key: 'blue'  , value: color("#D33131").alpha(alpha).rotate(240).rgbaString() },
    { key: 'yellow', value: color("yellow").alpha(alpha).rgbaString() }
];}

let sizeChoices = [
    { key: 'small'   , value:  10 } ,
    { key: 'medium'  , value:  30 } ,
    { key: 'large'   , value:  45 }
];

function renderItem(it) {

    let handler = () => {
        updatePointerSettings({pointerColor: it.value})
    }

    let style = {
        width: '20px',
        height: '20px',
        cursor: 'pointer',
        margin: '0.3rem',
        borderRadius: '50%',
        background: it.value,
        display: 'inline-block'
    }
    return (
        <div key={it.key} style={style} onClick={handler} />
    );
}

function renderItemSize(it) {

    let handler = () => {
        updatePointerSettings({pointerSize: it.value})
    }

    let style = {
        width:  it.value,
        height: it.value,
        cursor: 'pointer',
        margin: '0.3rem',
        borderRadius: '50%',
        background: 'black',
        display: 'inline-block'
    }
    return (
        <div key={it.key} style={style} onClick={handler} />
    );
}

export default class ColorChooser extends React.Component {

    render()  {
        let alphas = [0.5, 0.7, 1.0];
        let ranges = _.map(alphas, (alpha) => {
            let itemsPerAlpha = _.map(colorChoices(alpha), renderItem)
                return (
                    <div>{itemsPerAlpha}</div>
                )});
        return (
            <div>
                <div>Color:</div>
                {ranges}
                <div>Size:</div>
                {_.map(sizeChoices, renderItemSize)}
            </div>);

    }
}
