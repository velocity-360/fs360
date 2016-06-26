"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Nav = _interopRequire(require("../components/Nav"));

var _enzyme = require("enzyme");

var mount = _enzyme.mount;
var shallow = _enzyme.shallow;
var store = _interopRequire(require("../stores/store"));

var testStore = _interopRequire(require("../tests/testStore"));




describe("Nav", function () {
  it("shows login link", function () {
    var element = mount(React.createElement(Nav, { store: store }));
    //    console.log(element.html())

    expect(element.find(".user")).to.have.length(0);
    expect(element.find(".login")).to.have.length(1);
  });

  it("shows current user name", function () {
    var element = mount(React.createElement(Nav, { store: testStore }));
    //    console.log(element.html())

    expect(element.find(".user")).to.have.length(1);
  });
});