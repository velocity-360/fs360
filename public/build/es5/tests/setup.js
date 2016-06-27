"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// https://github.com/producthunt/chai-enzyme

var React = _interopRequire(require("react"));

var _chai = require("chai");

var chai = _interopRequire(_chai);

var expect = _chai.expect;
var jsdom = _interopRequire(require("jsdom"));

var chaiEnzyme = _interopRequire(require("chai-enzyme"));

chai.use(chaiEnzyme()); // Note the invocation at the end


var doc = jsdom.jsdom("<!doctype html><html><head></head><body></body></html>");
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