import React from 'react';

import { WindowCapture } from './windowCaptureGLReact.jsx';
import AppActions from '../actions/AppActions'
import S from 'string';
import Radium from 'radium'
import color from 'color'
import _ from 'lodash'
import { dividerGray } from '../styles/Layout'

import _debug from 'debug';
const debug = _debug('app:components/systemWindowListItem');

debug('lodaded');

function getStyle(props, state) {
    var baseState = {
        background: color("#FFFFFF").hexString(),
        boxSizing: 'border-box',
        padding: '1rem',
        margin: '0',
        borderBottom: `1px solid ${dividerGray}`
    }
    var selectedState = {
        background: color("#FFFFFF").darken(0.03).hexString(),
    }
    var style = []
    if(props.selected === "true") {
        style = [ baseState, selectedState ]
    } else {
        style = [ baseState ]
    }
    return style;
}

@Radium
export default class SystemWindowListItem extends React.Component {

    clicked() {
        debug("Item clicked!!");
        AppActions.updateCurrentLiveWindow(this.props.item.wid);
    }

    shouldComponentUpdate(np, ns) {
        var propsChanged  = !_.isEqual(np, this.props);
        var stateChanged = !_.isEqual(ns, this.state);
        return propsChanged || stateChanged;
    }

    render() {
        var shortName = S(this.props.item.name).truncate(30).s;
        var style = getStyle(this.props, this.state);
        return (
            <div style={style} className="item" onClick={this.clicked.bind(this)}>
                <div className="ui tiny image">
                    <WindowCapture key={this.props.key} width="80" height="45" wid={this.props.item.wid} type="screenshot" />
                </div>
                <div className="middle aligned content">
                    <div className="header"> {this.props.item.owner} </div>
                    <div className="meta" style={{fontSize: "0.8rem"}}>
                        {shortName} -
                        {this.props.item.wid}
                    </div>
                </div>
            </div>
        );
    }
}

// <div> {this.props.item.owner} </div>
// <div> {this.props.item.layer} </div>
