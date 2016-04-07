var _ = require('lodash')
var alt = require('../utils/alt');
var AppActions = require('../actions/AppActions');
import {
    sendStateChange
}
from '../utils/appWinIPC'
import moment from 'moment'
import i18n from '../utils/i18n'

import _debug from 'debug';
const debug = _debug('app:stores/AppStore.jsx');
const windowListAsJson = window.require('./utils/native-sgrab-helper').windowListAsJson

debug('loaded');

function filterList(list) {
    let windowList = _.filter(list, (it) => it.layer == 0);
    return _.filter(windowList, (it) => it.name !== 'Teasy 2.0')
}

class AppStore {
    constructor() {
        /* `this` is the statep */
        this.currentLiveWindow = 0
        this.currentLiveWindowData = {}
        this.currentLanguage = 'en';
        this.__ = i18n(this.currentLanguage)
        this.showTopBar = true;
        this.window = {
            size: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
        this.liveView = {
            time: {
                showTime: false,
                breakTime: undefined
            }
        }
        this.pointerSettings = {
            pointerActive: false,
            pointerPosition: [0.5, 0.5],
            pointerColor: "#FF0000",
            pointerSize: 30
        }
        this.mouseCoordinates = {
            x: 0,
            y: 0
        }
        this.currentSystemWindows = filterList(windowListAsJson());

        /* Bind the actions in AppActions */
        this.bindActions(AppActions)
    }

    _lookupWindow(wid) {
        return _.first(_.filter(this.currentSystemWindows, (it) => it.wid == wid))
    }

    _resetCurrentWindow() {
        this.currentLiveWindow = 0;
        this.currentLiveWindowData = undefined;
    }

    _updateCurrentLiveWindowUnconditional(wid) {
        this.currentLiveWindow = wid;
        this.currentLiveWindowData = this._lookupWindow(wid)
    }

    updateCurrentLiveWindow(wid) {
        this._updateCurrentLiveWindowUnconditional(wid);
        sendStateChange(this);
    }

    updateCurrentSystemWindows(list) {
        let windowList = filterList(list)
        this.currentSystemWindows = windowList;
        if(!_.isUndefined(this._lookupWindow(this.currentLiveWindow))) {
            this._updateCurrentLiveWindowUnconditional(this.currentLiveWindow);
        } else {
            this._resetCurrentWindow();
        }
        sendStateChange(this)
    }

    updateLiveViewTime(data) {
        this.liveView.time = _.assign(this.liveView.time, data)
        sendStateChange(this)
    }

    updateWindowSize(size) {
        this.window.size = size;
        sendStateChange(this)
    }

    updatePointerSettings(data) {
        this.pointerSettings = _.assign(this.pointerSettings, data);
        sendStateChange(this);
    }

    updateMouseCoordinates(coordinates) {
        this.mouseCoordinates = _.assign(this.mouseCoordinates, coordinates)
        if(this.currentLiveWindowData) {
            let { x: ox, y: oy } = this.currentLiveWindowData
            let { x: ax, y: ay } = this.mouseCoordinates
            let { width, height } = this.currentLiveWindowData
            let inx = false;
            let iny = false;
            if(ax > ox && ax < ox+width) {
                inx = true;
                this.pointerSettings.pointerPosition[0] = (ax-ox)/width;
            } else {
                inx = false;
                this.pointerSettings.pointerPosition[0] = 0
            }

            if(ay > oy && ay < oy+height) {
                iny = true;
                this.pointerSettings.pointerPosition[1] = (ay - oy) / height
            } else {
                iny = true;
                this.pointerSettings.pointerPosition[1] = 0
            }
            if(inx && iny) {
                this.pointerSettings.pointerActive = true
            } else {
                this.pointerSettings.pointerActive = false
            }

        }
        sendStateChange(this);
    }

    setBreakTime({
        minutesFromNow
    }) {
        this.updateLiveViewTime({breakTime: moment().add(minutesFromNow, "minute").format("HH:mm")})
    }

    clearBreakTime() {
        this.liveView.time.breakTime = undefined;
        // Shouldnt invoke sendStateChange?
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        this.__ = i18n(this.currentLanguage)
    }

    changeLanguage(language) {
        this.currentLanguage = language;
        this.__ = i18n(this.currentLanguage)
    }

    toggleShowTopBar() {
        this.showTopBar = !this.showTopBar;
        sendStateChange(this);
    }

}

module.exports = window.$s = alt.createStore(AppStore, 'AppStore');
