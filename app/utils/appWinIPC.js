import _debug from 'debug';
const debug = _debug(__filename)
debug('loading ipc renderer')

var ipc = require('electron').ipcRenderer;


function sendStateChange(state) {
    ipc.send('update-state', { state });
}

module.exports = {
    sendStateChange
}

debug('loaded!')
