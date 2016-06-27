"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// https://github.com/producthunt/chai-enzyme

var Register = _interopRequire(require("../components/Register"));

var _enzyme = require("enzyme");

var mount = _enzyme.mount;
var shallow = _enzyme.shallow;



describe("Register", function () {
  it("shows membership type", function () {
    var component = shallow(React.createElement(Register, { membershipType: "basic" }));
    //    console.log(component.html())

    expect(component.find("h4")).to.have.length(1);
    expect(component.find("h4")).to.have.text("Basic Membership");
  });

});