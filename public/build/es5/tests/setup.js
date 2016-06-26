"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var expect = require("chai").expect;
var jsdom = _interopRequire(require("jsdom"));

var doc = jsdom.jsdom("<!doctype html><html><body></body></html>");
var win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach(function (key) {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

global.React = React;
global.expect = expect;