/* eslint no-path-concat: 0, func-names:0 */
var app = require('app');
var BrowserWindow = require('browser-window');
//var getAppWindowStyle = require('./app/styles/Layout').getAppWindowStyle

var _ = require('lodash')

require('electron-debug')();
require('crash-reporter').start();

var ipc = require('electron').ipcMain

var mainWindow = null;
var liveWindow = null;

var mouseRefreshTime = require('./app/utils/config').mouseRefreshTime;


app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit();
});

function byPassWidChange(w2) {
    ipc.on('update-state', function(event, arg) {
        w2.webContents.send('update-state', arg);
    })
}

function registerMouseHandler(f) {
    var electronScreen = require('screen')
    setInterval(function() {
        f(electronScreen.getCursorScreenPoint())
    }, mouseRefreshTime)
}

function getSecondDisplay() {
    /* This should be  here until we dont update electron */
    var electronScreen = require('screen')
    var displays = electronScreen.getAllDisplays();
    var found = _.find(displays, function(it) {
        return (it.bounds.x !== 0 || it.bounds.y !== 0);
    })
    if (_.isUndefined(found)) {
        return {
            x: 0,
            y: 0
        }
    } else {
        return {
            x: found.bounds.x,
            y: found.bounds.y,
            fullscreen: true
        }
    }


}

function setupLiveWindow() {
    var wnd = {
        width: 800,
        height: 600
    }
    wnd = _.assign(wnd, getSecondDisplay());

    liveWindow = new BrowserWindow(wnd)

    if (process.env.HOT) {
        liveWindow.loadURL('file://' + __dirname + '/app/hot-dev-liveWin.html');
    } else {
        liveWindow.loadURL('file://' + __dirname + '/app/liveWin.html');
    }
    liveWindow.on('closed', function() {
        liveWindow = null;
    })
    if (process.env.NODE_ENV === 'development') {
        //        liveWindow.openDevTools();
    }
    byPassWidChange(liveWindow);
}

function setupMainWindow() {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 800
    });

    if (process.env.HOT) {
        mainWindow.loadURL('file://' + __dirname + '/app/hot-dev-app.html');
    } else {
        mainWindow.loadURL('file://' + __dirname + '/app/app.html');
    }

    mainWindow.setAlwaysOnTop(true);

    mainWindow.setResizable(false);

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    registerMouseHandler(function(coord) {
        mainWindow.webContents.send('update-coordinates', coord)
    })

    if (process.env.NODE_ENV === 'development') {
        //        mainWindow.openDevTools();
    }
}


app.on('ready', function() {
    setupMainWindow();
    setupLiveWindow();
});
