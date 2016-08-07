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
var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var QualifyingForm = _interopRequire(require("../components/QualifyingForm"));

var Header = (function (Component) {
	function Header(props, context) {
		_classCallCheck(this, Header);

		_get(Object.getPrototypeOf(Header.prototype), "constructor", this).call(this, props, context);
		this.submitInfoRequest = this.submitInfoRequest.bind(this);
		this.hideForm = this.hideForm.bind(this);
		this.toggleLoader = this.toggleLoader.bind(this);
		this.state = {
			showLoader: false,
			showForm: false
		};
	}

	_inherits(Header, Component);

	_prototypeProperties(Header, null, {
		hideForm: {
			value: function hideForm() {
				this.setState({
					showForm: false
				});
			},
			writable: true,
			configurable: true
		},
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
		render: {
			value: function render() {
				var nextEvent = this.props.events[0];
				var rsvp = nextEvent.status == "open" ? React.createElement(
					"a",
					{ href: "/event/" + nextEvent.slug, style: { marginRight: 0 }, className: "button button-3d button-mini button-rounded button-teal" },
					"Details"
				) : React.createElement(
					"a",
					{ href: "/event/" + nextEvent.slug, style: { marginRight: 0 }, className: "button button-3d button-mini button-rounded button-red" },
					"Sold Out"
				);

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
										{ style: { fontWeight: 200, marginBottom: 0, fontSize: 12 } },
										React.createElement(
											"a",
											{ href: "/event/" + nextEvent.slug },
											nextEvent.title
										)
									),
									React.createElement(
										"span",
										{ style: { fontWeight: 100, fontSize: 12, color: "#444" } },
										nextEvent.date,
										", ",
										nextEvent.time
									),
									React.createElement("br", null),
									rsvp
								)
							),
							React.createElement("div", { className: "line", style: { margin: "15px 0 30px" } }),
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
					),
					React.createElement(QualifyingForm, { show: this.state.showForm, closeModal: this.hideForm, subject: nextEvent, toggleLoader: this.toggleLoader, endpoint: "/account/rsvp" })
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