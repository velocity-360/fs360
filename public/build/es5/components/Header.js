"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Loader = _interopRequire(require("react-loader"));

var connect = require("react-redux").connect;
var _utils = require("../utils");

var api = _utils.api;
var TrackingManager = _utils.TrackingManager;
var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var Header = (function (Component) {
	function Header(props, context) {
		_classCallCheck(this, Header);

		_get(Object.getPrototypeOf(Header.prototype), "constructor", this).call(this, props, context);
		this.submitInfoRequest = this.submitInfoRequest.bind(this);
		this.toggleLoader = this.toggleLoader.bind(this);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.submitSyllabusRequest = this.submitSyllabusRequest.bind(this);
		this.validate = this.validate.bind(this);
		this.state = {
			showLoader: false,
			visitor: {
				name: "",
				email: "",
				subject: "Syllabus Request"
			}
		};
	}

	_inherits(Header, Component);

	_prototypeProperties(Header, null, {
		toggleLoader: {
			value: function toggleLoader(show) {
				this.setState({
					showLoader: show
				});
			},
			writable: true,
			configurable: true
		},
		submitInfoRequest: {
			value: function submitInfoRequest(event) {
				event.preventDefault();
				this.setState({
					showForm: true
				});
			},
			writable: true,
			configurable: true
		},
		submitSyllabusRequest: {
			value: function submitSyllabusRequest(event) {
				var _this = this;
				event.preventDefault();
				var missingField = this.validate(this.state.visitor, false);
				if (missingField != null) {
					alert("Please enter your " + missingField);
					return;
				}

				var pkg = Object.assign({}, this.state.visitor);
				var parts = pkg.name.split(" ");
				pkg.firstName = parts[0];
				if (parts.length > 1) pkg.lastName = parts[parts.length - 1];

				pkg.pdf = "FundamentalsBootcamp.pdf";
				pkg.course = "Full Stack Immersive";
				pkg.subject = "Syllabus Request";
				pkg.confirmation = "Thanks for your interest! Check your email shortly for a direct download link to the syllabus.";

				this.setState({ showLoader: true });
				api.handlePost("/account/syllabus", pkg, function (err, response) {
					_this.setState({ showLoader: false });
					if (err) {
						alert(err.message);
						return;
					}

					alert(response.message);
					var tracker = new TrackingManager(); // this is a singelton so no need to reset page info:
					tracker.updateTracking(function (err, response) {
						if (err) {
							console.log("ERROR: " + JSON.stringify(err));
							return;
						}
					});
				});
			},
			writable: true,
			configurable: true
		},
		validate: {
			value: function validate(profile, withPassword) {
				if (profile.name.length == 0) {
					return "Name";
				}if (profile.email.length == 0) {
					return "Email";
				}if (profile.email.indexOf("@") == -1) {
					// invalid email
					return "valid email address";
				}if (withPassword == false) {
					return null;
				}if (profile.password.length == 0) {
					return "Password";
				}return null // this is successful
				;
			},
			writable: true,
			configurable: true
		},
		updateVisitor: {
			value: function updateVisitor(event) {
				var updatedVisitor = Object.assign({}, this.state.visitor);
				updatedVisitor[event.target.id] = event.target.value;
				this.setState({
					visitor: updatedVisitor
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"section",
					{ id: "slider", className: "dark full-screen", style: { background: "url(\"/images/joe_blue_2.png\") center", overflow: "visible" }, "data-height-lg": "600", "data-height-md": "600", "data-height-sm": "600", "data-height-xs": "600", "data-height-xxs": "600" },
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(
						"div",
						{ className: "vertical-middle" },
						React.createElement(
							"div",
							{ className: "heading-block center nobottomborder" },
							React.createElement(
								"h1",
								{ style: { textTransform: "none" }, "data-animate": "fadeInUp" },
								"Become a Full Stack Developer"
							),
							React.createElement(
								"span",
								{ style: { fontWeight: 400 }, "data-animate": "fadeInUp", "data-delay": "300" },
								"Velocity 360 is the only coding bootcamp that trains students for the future of software - Node, React, and React Native."
							)
						),
						React.createElement(
							"div",
							{ style: { padding: 24, color: "#fff", textAlign: "center" } },
							"Next Cohort Begins October 3rd",
							React.createElement("br", null),
							React.createElement("br", null),
							React.createElement("input", { id: "name", onChange: this.updateVisitor, style: style.input, type: "text", className: "form-control input-lg not-dark", placeholder: "Name" }),
							React.createElement("input", { id: "email", onChange: this.updateVisitor, style: style.input, type: "text", className: "form-control input-lg not-dark", placeholder: "Email" }),
							React.createElement(
								"button",
								{ onClick: this.submitSyllabusRequest, className: "btn btn-lg btn-info nomargin", value: "submit", type: "submit" },
								"Request Syllabus"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Header;
})(Component);

var style = {
	input: {
		maxWidth: 280,
		margin: "auto",
		marginBottom: 16
	}
};

var stateToProps = function (state) {
	return {
		loaderOptions: state.staticReducer.loaderConfig
	};
};

module.exports = connect(stateToProps)(Header);