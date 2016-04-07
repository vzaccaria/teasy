import _debug from 'debug';
const debug = _debug(__filename)
debug('loading ipc renderer')

var ipc = require('electron').ipcRenderer;

var { updateRemoteState } = require('../actions/LiveWinAppActions');


function listenToStateChange() {
    debug('registering to statechange')
    ipc.on('update-state', function(sender, state) {
        state = state.state
        debug('received updated state')
        debug(state)
        updateRemoteState(state);
    });
}

module.exports = {
    listenToStateChange
}

debug('loaded!')
