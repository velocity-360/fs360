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
var connect = require("react-redux").connect;
var Loader = _interopRequire(require("react-loader"));

var Nav = _interopRequire(require("../../components/Nav"));

var Header = _interopRequire(require("../../components/Header"));

var Footer = _interopRequire(require("../../components/Footer"));

var RightSidebar = _interopRequire(require("../../components/RightSidebar"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var TextUtils = _interopRequire(require("../../utils/TextUtils"));

var api = _interopRequire(require("../../utils/APIManager"));

var QualifyingForm = _interopRequire(require("../../components/QualifyingForm"));

var Event = (function (Component) {
	function Event(props, context) {
		_classCallCheck(this, Event);

		_get(Object.getPrototypeOf(Event.prototype), "constructor", this).call(this, props, context);
		this.submitRequest = this.submitRequest.bind(this);
		this.toggleLoader = this.toggleLoader.bind(this);
		this.hideForm = this.hideForm.bind(this);
		this.state = {
			showLoader: false,
			showForm: false,
			courses: []
		};
	}

	_inherits(Event, Component);

	_prototypeProperties(Event, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				api.handleGet("/api/course", { type: "immersive" }, function (err, response) {
					if (err) {
						return;
					}

					var courses = response.courses;
					_this.setState({
						courses: courses
					});
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
		hideForm: {
			value: function hideForm() {
				this.setState({
					showForm: false
				});
			},
			writable: true,
			configurable: true
		},
		submitRequest: {
			value: function submitRequest(event) {
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
				var courses = this.state.courses.map(function (course, i) {
					return React.createElement(
						"div",
						{ key: course.id, className: "col-md-12 bottommargin" },
						React.createElement(
							"div",
							{ className: "team team-list clearfix" },
							React.createElement(
								"div",
								{ className: "team-image", style: { width: 150 } },
								React.createElement("img", { className: "img-circle", src: "https://media-service.appspot.com/site/images/" + course.image + "?crop=260", alt: "Velocity 360" })
							),
							React.createElement(
								"div",
								{ className: "team-desc" },
								React.createElement(
									"div",
									{ className: "team-title" },
									React.createElement(
										"h4",
										{ style: { fontWeight: 400 } },
										React.createElement(
											"a",
											{ href: "/course/" + course.slug },
											course.title
										)
									),
									React.createElement(
										"span",
										{ style: { color: "#444" } },
										course.dates
									),
									React.createElement(
										"span",
										{ style: { color: "#444" } },
										course.schedule
									)
								),
								React.createElement(
									"div",
									{ className: "team-content" },
									course.description
								)
							)
						)
					);
				});

				var event = this.props.events[this.props.slug];
				return React.createElement(
					"div",
					null,
					React.createElement(Nav, null),
					React.createElement(
						"section",
						{ id: "slider", className: "slider-parallax dark full-screen", style: { background: "url(\"/images/lounge.jpg\") center" } },
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
										event.title
									),
									React.createElement("img", { style: { width: 124, borderRadius: 62 }, src: "https://media-service.appspot.com/site/images/" + event.image + "?crop=260", alt: "Velocity 360" }),
									React.createElement(
										"span",
										{ "data-animate": "fadeInUp", "data-delay": "300" },
										event.date,
										" | ",
										event.time
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
							React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
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
									React.createElement("img", { style: { background: "#fff", float: "left", border: "1px solid #ddd", maxWidth: 260, padding: 6, marginRight: 12 }, className: "image_fade", src: "https://media-service.appspot.com/site/images/" + event.image + "?crop=260", alt: "Velocity 360" }),
									React.createElement("div", { dangerouslySetInnerHTML: { __html: TextUtils.convertToHtml(event.description) } }),
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
											event.date,
											React.createElement("br", null),
											"Time: ",
											event.time,
											React.createElement("br", null),
											"Location: ",
											event.address,
											React.createElement("br", null),
											React.createElement("hr", null),
											React.createElement(
												"a",
												{ target: "_blank", href: event.link, className: "btn btn-lg btn-danger btn-block nomargin" },
												"Attend"
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
					React.createElement(
						"section",
						{ style: { background: "#f9f9f9", paddingTop: 48, borderTop: "1px solid #ddd" } },
						React.createElement(
							"div",
							{ className: "heading-block center" },
							React.createElement(
								"h2",
								{ style: { fontWeight: 400 } },
								"Bootcamps"
							)
						),
						React.createElement(
							"div",
							{ className: "content-wrap", style: { paddingTop: 0 } },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								courses
							)
						)
					),
					React.createElement(QualifyingForm, { show: this.state.showForm, closeModal: this.hideForm, subject: event, toggleLoader: this.toggleLoader, endpoint: "/account/rsvp" }),
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
		events: state.eventReducer.events
	};
};

module.exports = connect(stateToProps)(Event);