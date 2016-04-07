var alt = require('../utils/alt');
var LiveWinAppActions = require('../actions/LiveWinAppActions');
import i18n from '../utils/i18n'

import _ from 'lodash'

import _debug from 'debug';
const debug = _debug('app:stores/LiveWinAppStore.jsx');

debug('loaded');

class LiveWinAppStore {
    constructor() {
        /* `this` is the state */
        this.remoteState = {}
        this.window = {
            size: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        /* Bind the actions in LiveWinAppActions */
        this.bindActions(LiveWinAppActions)
    }


    updateRemoteState(state) {
        debug(state)
        this.remoteState = state
        this.remoteState.__ = i18n(this.remoteState.currentLanguage)
    }

    updateWindowSize(size) {
        this.window.size = size
    }
}

module.exports = window.$s = alt.createStore(LiveWinAppStore, 'LiveWinAppStore');
