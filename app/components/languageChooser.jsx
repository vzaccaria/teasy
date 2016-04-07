import React from 'react';
import _ from 'lodash'

import { changeLanguage } from '../actions/AppActions'

let languageChoices = [
    { key: 'us', value: 'en', display: 'English' },
    { key: 'it', value: 'it', display: 'Italiano' }
];

function renderItem(it) {
    let style = {cursor: 'pointer', marginTop: '0.5rem', marginBottom: '0.5rem'} ;
    return (
        <div className="ui button" key={it.key} style={style} onClick={() => changeLanguage(it.value)}>
            {it.display}
        </div>);
}

class LanguageChooser extends React.Component {


    render()  {
        return (
            <div>
                {_.map(languageChoices, renderItem)}
            </div>);

    }
}

function getLanguageFlag(language) {
    return _.head(_.filter(languageChoices, (i) => i.value === language)).key;
}

module.exports = { LanguageChooser, getLanguageFlag }
