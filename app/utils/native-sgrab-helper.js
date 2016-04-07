"use strict";

var nativeSgrabHelper = require("bindings")("nativeSgrabHelper");
var _ = require("lodash");

function windowListAsJson() {
    return JSON.parse(nativeSgrabHelper.windowList());
}

function getForefrontWindow() {
    var list = windowListAsJson();
    return _.first(_.filter(list, function (it) {
        return it.layer == 0;
    }));
}

function getForefrontWindowBuffer() {
    return nativeSgrabHelper.getImageBuffer(getForefrontWindow().wid);
}

module.exports = {
    nativeSgrabHelper: nativeSgrabHelper, windowListAsJson: windowListAsJson, getForefrontWindow: getForefrontWindow, getForefrontWindowBuffer: getForefrontWindowBuffer
};
