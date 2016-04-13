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

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var CourseSection = _interopRequire(require("../../components/CourseSection"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var IOSHighSchool = (function (Component) {
	function IOSHighSchool(props, context) {
		_classCallCheck(this, IOSHighSchool);

		_get(Object.getPrototypeOf(IOSHighSchool.prototype), "constructor", this).call(this, props, context);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = {
			showLoader: false,
			showModal: false };
	}

	_inherits(IOSHighSchool, Component);

	_prototypeProperties(IOSHighSchool, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				api.handleGet("/api/course?slug=first-course", {}, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.dispatch(actions.coursesRecieved(response.courses));
				});
			},
			writable: true,
			configurable: true
		},
		openModal: {
			value: function openModal(event) {
				event.preventDefault();
				this.setState({ showModal: true });
			},
			writable: true,
			configurable: true
		},
		closeModal: {
			value: function closeModal() {
				this.setState({ showModal: false });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _course = this.props.course;
				var units = this.props.course.units.map(function (unit, i) {
					return React.createElement(CourseSection, { key: unit.index, unit: unit, course: _course });
				});



				return React.createElement(
					"div",
					null,
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(Sidebar, null),
					React.createElement(
						"section",
						{ id: "content", style: { backgroundColor: "#F5F5F5" } },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "postcontent nobottommargin col_last clearfix" },
									React.createElement(
										"div",
										{ id: "posts", className: "post-timeline clearfix" },
										React.createElement("div", { className: "timeline-border" }),
										React.createElement(
											"div",
											{ className: "entry clearfix" },
											React.createElement(
												"div",
												{ className: "entry-timeline" },
												"10",
												React.createElement(
													"span",
													null,
													"Feb"
												),
												React.createElement("div", { className: "timeline-divider" })
											),
											React.createElement(
												"div",
												{ className: "entry-image" },
												React.createElement(
													"a",
													{ href: "images/blog/full/17.jpg", "data-lightbox": "image" },
													React.createElement("img", { className: "image_fade", src: "/images/hacking-2.jpg", alt: "Standard Post with Image" })
												)
											),
											React.createElement(
												"div",
												{ className: "entry-content" },
												React.createElement(
													"div",
													{ className: "col_half" },
													React.createElement(
														"h2",
														{ style: { marginBottom: 0 } },
														this.props.course.title
													),
													React.createElement(
														"p",
														null,
														this.props.course.description
													)
												),
												React.createElement(
													"div",
													{ className: "col_half panel panel-default col_last" },
													React.createElement(
														"div",
														{ style: { backgroundColor: "#f1f9f5" }, className: "panel-heading" },
														"Details"
													),
													React.createElement(
														"div",
														{ className: "panel-body" },
														this.props.course.dates,
														React.createElement("br", null),
														this.props.course.schedule,
														React.createElement("br", null),
														"Tuition: $",
														this.props.course.tuition,
														React.createElement("br", null),
														"Depost: $",
														this.props.course.deposit,
														React.createElement("hr", null),
														React.createElement(
															"a",
															{ href: "#", onClick: this.openModal, style: { marginRight: 12 }, className: "button button-border button-dark button-rounded noleftmargin" },
															"Apply"
														),
														React.createElement(
															"a",
															{ href: "#", onClick: this.openModal, className: "button button-border button-dark button-rounded noleftmargin" },
															"Request Syllabus"
														)
													)
												)
											)
										),
										units,
										React.createElement(
											"div",
											{ className: "entry clearfix" },
											React.createElement(
												"div",
												{ className: "entry-timeline" },
												"Unit",
												React.createElement(
													"span",
													null,
													"!"
												),
												React.createElement("div", { className: "timeline-divider" })
											),
											React.createElement(
												"div",
												{ className: "entry-image" },
												React.createElement(
													"div",
													{ className: "panel panel-default" },
													React.createElement(
														"div",
														{ className: "panel-body", style: { padding: 36 } },
														React.createElement(
															"h2",
															null,
															"Sign Up"
														),
														React.createElement("hr", null),
														"Ready to take the plunge? Need more information? Request a syllabus below or begin the application process.",
														React.createElement(
															"a",
															{ onClick: this.openModal, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
															"Apply"
														),
														React.createElement(
															"a",
															{ onClick: this.openModal, href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
															"Request Syllabus"
														)
													)
												)
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						Modal,
						{ show: this.state.showModal, onHide: this.closeModal },
						React.createElement(
							Modal.Header,
							{ closeButton: true, style: { textAlign: "center", padding: 12 } },
							React.createElement(
								"h2",
								null,
								"Request Syllabus"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement("input", { className: "form-control", type: "text", id: "name", placeholder: "Name" }),
							React.createElement("br", null),
							React.createElement("input", { className: "form-control", type: "text", id: "email", placeholder: "Email" }),
							React.createElement("br", null)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Submit"
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

	return IOSHighSchool;
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state));
	var keys = Object.keys(state.courseReducer.courses);

	return {
		currentUser: state.profileReducer.currentUser,
		course: state.courseReducer.courses[keys[0]],
		testimonials: state.staticReducer.testimonials,
		loaderOptions: state.staticReducer.loaderConfig
	};
};


module.exports = connect(stateToProps)(IOSHighSchool);