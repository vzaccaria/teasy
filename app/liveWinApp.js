import __ from "gl-react"
import React from 'react';
import ReactDOM from 'react-dom';
import LiveWinContainer from './containers/LiveWinContainer';
import { updateWindowSize } from './actions/LiveWinAppActions';
import { listenToStateChange } from './utils/liveWinIPC';
import _debug from 'debug';
import '../semantic/src/semantic.less';
import './styles/blink.less';


const debug = _debug('app:liveWinApp');
debug('Live w. started');
debug(listenToStateChange)

window.$mine = { }
window.$mine.enableDebugAll  = () => { _debug.enable('app:*') }
window.$mine.disableDebugAll = () => { _debug.disable('app:*') }
window.$mine.enableDebugAll()

function registerListeners() {
    debug('registering listener..')
    listenToStateChange();
    window.addEventListener('resize', function() {
        updateWindowSize({width: window.innerWidth, height: window.innerHeight})
    }, true)
}


ReactDOM.render(<LiveWinContainer/>, document.getElementById('react-live-win-root'));

registerListeners()
