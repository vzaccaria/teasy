const GL = require("gl-react");
const React = require('react');

import $ from 'jquery';
let color = require('color');

import ndarray from 'ndarray';
import _ from 'lodash'
import { GLDisplayUintBuf } from './GLDisplayUintBuf';
import Loader from './loader'
const { Surface } = require("gl-react-dom");
import { GLSurfaceCanvas } from './GLSurfaceCanvas';

const nsh = window.require('./utils/native-sgrab-helper');

window.grabHelper = nsh;

import _debug from 'debug';
const debug = _debug('app:components/windowCapture');

function getWindowBufferFromWid(wid, width, height) {
    window.$mine.currentLiveWindowData = nsh.nativeSgrabHelper.getImageBufferResized(wid, width, height);
    return window.$mine.currentLiveWindowData;
}



debug('loaded');


function remapRelativePosition(pos, resInfo) {
    let [ rx, ry ] = pos;
    let { borderSizeLeft, borderSizeTop, innerWidth, innerHeight, borderSizeBottom, borderSizeRight } = resInfo;
    let ax = ((rx * innerWidth) + borderSizeLeft);
    //(innerWidth + borderSizeLeft + borderSizeRight);
    let ay = ((ry * innerHeight) + borderSizeTop);
    //(innerHeight + borderSizeTop + borderSizeBottom);
    return [ax, ay]
}

import { refreshRates, maxImageRefreshTime } from '../utils/config';

let WindowCapture = React.createClass({

    refreshImageBuffer: function() {
        if(this.state.mounted) {
            let width = parseInt(this.props.width);
            let height = parseInt(this.props.height);
            let wid = parseInt(this.props.wid);

            debug({width, height, wid});
            let { buf, cols, rows, resizeInfo } = getWindowBufferFromWid(wid, width, height);
            debug({cols, rows});
            this.setState({
                buf: ndarray(buf, [rows, cols, 4]).transpose(1,0),
                width: cols,
                height: rows,
                resizeInfo: resizeInfo,
                framenumber: this.state.framenumber + 1
            });
        }
    },

    getInitialState: function() {
        return {
            buf: undefined,
            width: 1,
            height: 1,
            mounted: true,
            throttledRefreshImage: _.throttle(this.refreshImageBuffer,maxImageRefreshTime),
            framenumber: 0
        };
    },

    componentDidMount: function() {
        setInterval(this.state.throttledRefreshImage, refreshRates[this.props.type]);
        this.state.throttledRefreshImage()
    },

    componentWillUnmount: function() {
        this.state.mounted = false;
    },

    componentWillReceiveProps: function(props) {
        this.state.throttledRefreshImage(props, false);
    },

    shouldComponentUpdate: function(np, ns) {
        var bufChanged   = _.isUndefined(this.state.buf) && !_.isUndefined(ns.buf);
        var propsChanged = (np.width !== this.props.width) ||
                           (np.height !== this.props.height)
            var pointerChanged = (this.props.type === "live" && (
                (np.pointerPosition[0] !== this.props.pointerPosition[0]) ||
                (np.pointerPosition[1] !== this.props.pointerPosition[1])))
            var framenumberChanged  = ns.framenumber !== this.state.framenumber;
        var shouldUpdate = (propsChanged || bufChanged || framenumberChanged || pointerChanged);
        return shouldUpdate;
    },

    render: function()  {
        let thisWindowSize  = {
            width: parseInt(this.props.width),
            height: parseInt(this.props.height)
        }
        if(_.isUndefined(this.state.buf)) {
            return (<Loader style={thisWindowSize} message="Rendering.." />);
        } else {
            let current    = _.get(this.props, "iscurrent", false);
            let active     = _.get(this.props, "pointerActive", false);
            let position   = _.get(this.props, "pointerPosition", [1, 0]);
            let pcolor     = _.get(this.props, "pointerColor", 0.9);
            let size       = _.get(this.props, "pointerSize", 1);
            if(this.props.type === "preview") {
                size = size / 2
            }
            let shouldShow = current && active;
            let rectStyle  = {};

            if(shouldShow) {
                position = remapRelativePosition(position, this.state.resizeInfo);
                rectStyle = {
                    width:  `${size}px`,
                    height: `${size}px`,
                    position: 'absolute',
                    backgroundColor: pcolor,
                    left: position[0] - size/2,
                    top: position[1] - size/2,
                    zIndex: 1,
                    borderRadius: '50%'
                }
            }

            return (
                <div>
                    {shouldShow ? <div className="blink" style={rectStyle}> </div> : ""}
                    <GLSurfaceCanvas {...thisWindowSize} framenumber={this.state.framenumber} buf={this.state.buf} />
                </div>
            );
        }
    }

});


module.exports = { WindowCapture }
