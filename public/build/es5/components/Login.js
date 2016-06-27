"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var Login = (function (Component) {
	function Login(props, context) {
		_classCallCheck(this, Login);

		_get(Object.getPrototypeOf(Login.prototype), "constructor", this).call(this, props, context);
		this.hide = this.hide.bind(this);
		this.state = {
			isVisible: false,
			membershiptype: "basic"
		};
	}

	_inherits(Login, Component);

	_prototypeProperties(Login, null, {
		hide: {
			value: function hide() {
				this.props.hide();
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					Modal,
					{ bsSize: "sm", show: this.props.isVisible, onHide: this.hide },
					React.createElement(
						Modal.Body,
						{ style: { background: "#f9f9f9", padding: 24, borderRadius: 3 } },
						React.createElement(
							"div",
							{ style: { textAlign: "center" } },
							React.createElement("img", { style: { width: 96, borderRadius: 48, border: "1px solid #ddd", background: "#fff", marginBottom: 24 }, src: "/images/logo_round_green_260.png" })
						),
						React.createElement("input", { onChange: this.updateUserRegistration, id: "name", className: "form-control", style: { marginBottom: 12 }, type: "text", placeholder: "Name" }),
						React.createElement("input", { onChange: this.updateUserRegistration, id: "email", className: "form-control", style: { marginBottom: 12 }, type: "text", placeholder: "Email" }),
						React.createElement("input", { onChange: this.updateUserRegistration, id: "password", className: "form-control", style: { marginBottom: 12 }, type: "password", placeholder: "Password" }),
						React.createElement("input", { onChange: this.updateUserRegistration, id: "promoCode", className: "form-control", style: { marginBottom: 12 }, type: "text", placeholder: "Promo Code" }),
						React.createElement(
							"select",
							{ onChange: this.updateUserRegistration, id: "membershiptype", value: this.state.membershiptype, className: "form-control input-md not-dark" },
							React.createElement(
								"option",
								{ value: "basic" },
								"Basic"
							),
							React.createElement(
								"option",
								{ value: "premium" },
								"Premium"
							)
						),
						React.createElement(
							"div",
							{ style: { textAlign: "center", marginTop: 24 } },
							React.createElement(
								"a",
								{ onClick: this.register, href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Join"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Login;
})(Component);

module.exports = Login;