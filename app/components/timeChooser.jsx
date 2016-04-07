import React from 'react';
import moment from 'moment'
import _ from 'lodash'

import { setBreakTime } from '../actions/AppActions'

let timeChoices = [
    { key: '5m', value: 5, display: '5 minutes' },
    { key: '10m', value: 10, display: '10 minutes' },
    { key: '20m', value: 20, display: '20 minutes' }
];

function renderItem(it) {

    let handler = () => {
        setBreakTime({minutesFromNow: it.value})
    }

    let style = {width: '8rem', cursor: 'pointer', marginTop: '0.5rem', marginBottom: '0.5rem'} ;
    return (
        <div className="ui button" key={it.key} style={style} onClick={handler}>
            {it.display}
        </div>);
}
export default class TimeChooser extends React.Component {


    render()  {
        return (
            <div>
                {_.map(timeChoices, renderItem)}
            </div>);

    }
}
