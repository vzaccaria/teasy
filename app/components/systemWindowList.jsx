import React from 'react';
import _ from 'lodash'

import SystemWindowListItem from './systemWindowListItem';
import Loader from './loader';
import { updateCurrentSystemWindows } from '../actions/AppActions'
import AppStore from '../stores/AppStore'

import _debug from 'debug';
const debug = _debug('app:components/systemWindowList');

const windowListAsJson = window.require('./utils/native-sgrab-helper').windowListAsJson

import { updateWindowListTime } from '../utils/config';

debug('loaded');

function updateSystemWindows() {
    updateCurrentSystemWindows(windowListAsJson());
}

function setupWindowListHelper() {
    setInterval( updateSystemWindows, updateWindowListTime )
}

const validState = (state) => {
    return (state !== null)
}

setupWindowListHelper();

export default class SystemWindowList extends React.Component {
    constructor() {
        super();
        AppStore.getState();
    }

    onStoreChange(state) {
        this.setState(state)
    }

    componentDidMount() {
        AppStore.listen(this.onStoreChange.bind(this))
    }

    componentWillUnmount() {
        AppStore.unlisten(this.onStoreChange.bind(this))
    }

    shouldComponentUpdate(np, ns) {
        var propsChanged  = !_.isEqual(np, this.props);
        var stateChanged = !_.isEqual(ns, this.state);
        return propsChanged || stateChanged;

    }

    render()  {
        debug("Rendering state");
        debug(this.state);

        if(validState(this.state)) {
            let { __, currentSystemWindows, currentLiveWindow } = this.state;
            let renderedItems = _.map(currentSystemWindows, (it, idx) => {
                var selected = (it.wid === currentLiveWindow) ? "true" : "false"
                return (
                    <SystemWindowListItem item={it} key={idx} selected={selected}/>
                )});

            return(
                <div className="ui items">{renderedItems}</div>
            );
        } else {
            return <div />
        }
    }
}
