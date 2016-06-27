"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// https://github.com/producthunt/chai-enzyme
// https://medium.com/airbnb-engineering/enzyme-javascript-testing-utilities-for-react-a417e5e5090f#.qkg55k2o7

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
// https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
// it('should update the src state on clicking fetch', function () {
//   const wrapper = mount(<Gravatar/>)
//   wrapper.setState({ email: 'hello@ifelse.io' })
//   wrapper.find('button').simulate('click')
//   expect(wrapper.state('email')).to.equal('hello@ifelse.io')
//   expect(wrapper.state('src')).to.equal(`http://gravatar.com/avatar/${md5('markthethomas@gmail.com')}?s=200`)
// })