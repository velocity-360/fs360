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
var Loader = _interopRequire(require("react-loader"));

var Nav = _interopRequire(require("../../components/Nav"));

var Header = _interopRequire(require("../../components/Header"));

var Footer = _interopRequire(require("../../components/Footer"));

var RightSidebar = _interopRequire(require("../../components/RightSidebar"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var TextUtils = _interopRequire(require("../../utils/TextUtils"));

var api = _interopRequire(require("../../api/api"));

var Event = (function (Component) {
	function Event(props, context) {
		_classCallCheck(this, Event);

		_get(Object.getPrototypeOf(Event.prototype), "constructor", this).call(this, props, context);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.submitRequest = this.submitRequest.bind(this);
		this.state = {
			showLoader: false,
			visitor: {
				name: "",
				email: ""
			}
		};
	}

	_inherits(Event, Component);

	_prototypeProperties(Event, null, {
		updateVisitor: {
			value: function updateVisitor(event) {
				event.preventDefault();
				var s = Object.assign({}, this.state.visitor);
				s[event.target.id] = event.target.value;
				s.event = this.props.event.title;
				this.setState({
					visitor: s
				});
			},
			writable: true,
			configurable: true
		},
		submitRequest: {
			value: function submitRequest(event) {
				event.preventDefault();

				if (this.state.visitor.name.length == 0) {
					alert("Please enter your name.");
					return;
				}

				if (this.state.visitor.email.length == 0) {
					alert("Please enter your email.");
					return;
				}

				var s = Object.assign({}, this.state.visitor);
				var parts = s.name.split(" ");
				s.firstName = parts[0];
				if (parts.length > 1) s.lastName = parts[parts.length - 1];

				var _this = this;
				api.handlePost("/api/rsvp", s, function (err, response) {
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
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
					React.createElement(Nav, null),
					React.createElement(
						"section",
						{ id: "slider", className: "slider-parallax dark full-screen", style: { background: "url(\"/images/lounge.jpg\") center" } },
						React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"div",
								{ className: "vertical-middle" },
								React.createElement(
									"div",
									{ className: "heading-block center nobottomborder" },
									React.createElement(
										"h1",
										{ "data-animate": "fadeInUp" },
										this.props.event.title
									),
									React.createElement("img", { style: { width: 124, borderRadius: 62 }, src: "https://media-service.appspot.com/site/images/" + this.props.event.image + "?crop=260", alt: "Velocity 360" }),
									React.createElement(
										"span",
										{ "data-animate": "fadeInUp", "data-delay": "300" },
										this.props.event.date,
										" | ",
										this.props.event.time
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						{ id: "content" },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "col_two_third bottommargin-sm" },
									React.createElement(
										"div",
										{ className: "fancy-title title-bottom-border" },
										React.createElement(
											"h2",
											{ style: { fontWeight: 400 } },
											"Details"
										)
									),
									React.createElement("img", { style: { background: "#fff", float: "left", border: "1px solid #ddd", maxWidth: 260, padding: 6, marginRight: 12 }, className: "image_fade", src: "https://media-service.appspot.com/site/images/" + this.props.event.image + "?crop=260", alt: "Velocity 360" }),
									React.createElement("div", { dangerouslySetInnerHTML: { __html: TextUtils.convertToHtml(this.props.event.description) } }),
									React.createElement(
										"div",
										{ style: { marginTop: 64 }, className: "fancy-title title-bottom-border" },
										React.createElement(
											"h2",
											{ style: { fontWeight: 400 } },
											"Register"
										)
									),
									React.createElement(
										"div",
										{ className: "col_half panel panel-default" },
										React.createElement(
											"div",
											{ style: { backgroundColor: "#f1f9f5", textAlign: "left" }, className: "panel-heading" },
											"RSVP"
										),
										React.createElement(
											"div",
											{ className: "panel-body", style: { textAlign: "left" } },
											"Date: ",
											this.props.event.date,
											React.createElement("br", null),
											"Time: ",
											this.props.event.time,
											React.createElement("br", null),
											"Fee: $",
											this.props.event.fee,
											React.createElement("hr", null),
											React.createElement("input", { type: "text", id: "name", onChange: this.updateVisitor, placeholder: "Name", className: "form-control", style: { background: "#f9f9f9" } }),
											React.createElement("br", null),
											React.createElement("input", { type: "text", id: "email", onChange: this.updateVisitor, placeholder: "Email", className: "form-control", style: { background: "#f9f9f9" } }),
											React.createElement("br", null),
											React.createElement(
												"a",
												{ onClick: this.submitRequest, href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
												"Submit"
											)
										)
									),
									React.createElement(
										"div",
										{ className: "col_half col_last" },
										React.createElement("img", { style: { marginBottom: 6 }, src: "/images/wework.jpg" }),
										React.createElement(
											"i",
											{ style: { fontWeight: 100 } },
											"* All events are held at our WeWork Location on 28th Street."
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm hidden-xs col_last", style: { borderLeft: "1px solid #ddd", padding: 36 } },
									React.createElement(RightSidebar, null)
								)
							)
						)
					),
					React.createElement(Footer, null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Event;
})(Component);




var stateToProps = function (state) {
	return {
		loaderOptions: state.staticReducer.loaderConfig,
		currentUser: state.profileReducer.currentUser,
		courses: state.courseReducer.courseArray,
		posts: state.postReducer.postsArray,
		event: state.eventReducer.eventArray[0]
	};
};

module.exports = connect(stateToProps)(Event);