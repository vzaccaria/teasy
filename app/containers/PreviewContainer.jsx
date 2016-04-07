import React from 'react';
import _ from 'lodash'

import AppStore from '../stores/AppStore'
import { getPreviewSize } from '../styles/Layout'
import AppActions from '../actions/AppActions'
import Loader from '../components/loader'
import Message from '../components/message'
import PreviewWindow from '../components/previewWindow';

// Debug..

import _debug from 'debug';
const debug = _debug('app:containers/PreviewContainer');

const shouldShowWindow = (state) => {
    return (!_.isNull(state) && !_.isUndefined(state) && state.currentLiveWindow !== 0)
}

const windowNotSet = (state) => {
    return (!_.isNull(state) && !_.isUndefined(state) && state.currentLiveWindow === 0)
}


export default class PreviewContainer extends React.Component {

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


    render() {
        debug('rendering container');
        if(shouldShowWindow(this.state)) {
            let { width, height } = getPreviewSize(this.state.window.size);
            if(width > 0 && height > 0) {
                return <PreviewWindow state={this.state} />
            } else {
                return <div />
            }
        } else {
            if(windowNotSet(this.state)) {
                let { __ } = this.state
                let { width, height } = getPreviewSize(this.state.window.size);

                return <Message width={width}
                                height={height}
                                title={__('noWindowSelected')}
                                message={__('chooseAWindowFromTheLeft')} />

            } else {
                return <Loader inverted="1" message="Fetching windows" />
            }
        }
    }
}
