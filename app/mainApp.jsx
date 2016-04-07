import __ from "gl-react"
import React from 'react';
import ReactDOM from 'react-dom'
import AppContainer from './containers/AppContainer';
import { updateWindowSize, updateMouseCoordinates } from './actions/AppActions';
var ipc = require('electron').ipcRenderer;

function listenToMouseCoordinatesChange() {
    ipc.on('update-coordinates', function(sender, coordinates) {
        updateMouseCoordinates(coordinates);
    });
}

//        debug(`Received updated coordinates ${coordinates}`)

import '../semantic/src/semantic.less';
import './styles/blink.less';

import _debug from 'debug';
const debug = _debug('app:mainApp');

window.$mine = { }
window.$mine.enableDebugAll  = () => { _debug.enable('app:*') }
window.$mine.disableDebugAll = () => { _debug.disable('app:*') }

//window.$mine.enableDebugAll()
window.$mine.disableDebugAll()

function attachListeners() {
    listenToMouseCoordinatesChange();
    window.addEventListener('resize', function() {
        debug("resize invoked");
        updateWindowSize({width: window.innerWidth, height: window.innerHeight})
    }, true);

    window.addEventListener('load', function() {
        debug("load invoked");
        updateWindowSize({width: window.innerWidth, height: window.innerHeight})
    }, true);
}



ReactDOM.render(<AppContainer/>, document.getElementById('react-root'));

attachListeners()
