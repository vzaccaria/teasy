const GL = require("gl-react");
const React = require("react");

import $ from 'jquery'

import ndarray from 'ndarray';
import _ from 'lodash'
import { GLDisplayUintBuf } from './GLDisplayUintBuf';
const { Surface } = require("gl-react-dom");


let GLSurfaceCanvas = React.createClass({

    shouldComponentUpdate: function(np, ns) {
        if(this.props.framenumber !== np.framenumber) {
            return true
        } else {
            return false
        }
    },

    render: function()  {
        let thisWindowSize  = {
            width: parseInt(this.props.width),
            height: parseInt(this.props.height)
        }
        return (
            <Surface {...thisWindowSize} className="canvasparent0">
                <GLDisplayUintBuf {...thisWindowSize} image={this.props.buf} />
            </Surface>
        );
    }

});


module.exports = { GLSurfaceCanvas }
