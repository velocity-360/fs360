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
var api = _interopRequire(require("../utils/APIManager"));

var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var Header = (function (Component) {
	function Header(props, context) {
		_classCallCheck(this, Header);

		_get(Object.getPrototypeOf(Header.prototype), "constructor", this).call(this, props, context);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.submitInfoRequest = this.submitInfoRequest.bind(this);
		this.validate = this.validate.bind(this);
		this.state = {
			showLoader: false,
			visitor: {
				name: "",
				email: "",
				phone: "",
				referral: "Landing Page"
			}
		};
	}

	_inherits(Header, Component);

	_prototypeProperties(Header, null, {
		componentDidMount: {
			value: function componentDidMount() {},
			writable: true,
			configurable: true
		},
		updateVisitor: {
			value: function updateVisitor(event) {
				event.preventDefault();

				var visitor = Object.assign({}, this.state.visitor);
				visitor[event.target.id] = event.target.value;
				this.setState({
					visitor: visitor
				});
			},
			writable: true,
			configurable: true
		},
		submitInfoRequest: {
			value: function submitInfoRequest(event) {
				event.preventDefault();

				var missingField = this.validate(this.state.visitor, false);
				if (missingField != null) {
					alert("Please enter your " + missingField);
					return;
				}

				this.setState({
					showLoader: true
				});

				var pkg = Object.assign({}, this.state.visitor);
				var parts = pkg.name.split(" ");
				pkg.firstName = parts[0];
				if (parts.length > 1) pkg.lastName = parts[parts.length - 1];

				var nextEvent = this.props.events[0];
				pkg.date = nextEvent.date;
				pkg.event = nextEvent.title;

				var _this = this;
				api.handlePost("/api/rsvp", pkg, function (err, response) {
					_this.setState({
						showLoader: false
					});

					if (err) {
						alert(err.message);
						return;
					}

					alert(response.message);
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
		render: {
			value: function render() {
				var nextEvent = this.props.events[0];

				return React.createElement(
					"section",
					{ id: "slider", style: { background: "url(\"/images/joe_light_blue.png\") center", overflow: "visible" }, "data-height-lg": "450", "data-height-md": "450", "data-height-sm": "600", "data-height-xs": "600", "data-height-xxs": "600" },
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement("br", null),
					React.createElement(
						"div",
						{ className: "container clearfix" },
						React.createElement(
							"form",
							{ action: "#", method: "post", role: "form", className: "landing-wide-form landing-form-overlay dark clearfix" },
							React.createElement(
								"div",
								{ className: "heading-block nobottommargin nobottomborder" },
								React.createElement(
									"h4",
									null,
									"Attend Next Workshop"
								)
							),
							React.createElement(
								"div",
								{ style: { border: "1px solid #ddd", background: "#f9f9f9", marginBottom: 16, marginTop: 16 } },
								React.createElement("img", { style: { width: 104, float: "left", marginRight: 12 }, src: "https://media-service.appspot.com/site/images/" + nextEvent.image + "?crop=260", alt: "Velocity 360" }),
								React.createElement(
									"div",
									{ style: { padding: 12, height: 104, textAlign: "right" } },
									React.createElement(
										"h5",
										{ style: { fontWeight: 200, marginBottom: 0 } },
										React.createElement(
											"a",
											{ href: "/event/" + nextEvent.slug },
											nextEvent.title
										)
									),
									React.createElement(
										"span",
										{ style: { fontWeight: 100, fontSize: 14, color: "#444" } },
										nextEvent.date
									),
									React.createElement("br", null),
									React.createElement(
										"a",
										{ href: "/event/" + nextEvent.slug, style: { marginRight: 0 }, className: "button button-3d button-mini button-rounded button-teal" },
										"Details"
									)
								)
							),
							React.createElement("div", { className: "line", style: { margin: "15px 0 30px" } }),
							React.createElement(
								"div",
								{ className: "col_full" },
								React.createElement("input", { onChange: this.updateVisitor, id: "name", type: "text", className: "form-control input-lg not-dark", placeholder: "Name" })
							),
							React.createElement(
								"div",
								{ className: "col_full" },
								React.createElement("input", { onChange: this.updateVisitor, id: "email", type: "text", className: "form-control input-lg not-dark", placeholder: "Email" })
							),
							React.createElement(
								"div",
								{ className: "col_full nobottommargin" },
								React.createElement(
									"button",
									{ onClick: this.submitInfoRequest, className: "btn btn-lg btn-danger btn-block nomargin", value: "submit" },
									"RSVP"
								)
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

var stateToProps = function (state) {
	return {
		loaderOptions: state.staticReducer.loaderConfig,
		events: state.eventReducer.eventArray
	};
};

module.exports = connect(stateToProps)(Header);