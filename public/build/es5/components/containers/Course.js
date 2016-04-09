"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var CourseSection = _interopRequire(require("../../components/CourseSection"));

//import Testimonial from '../../components/Testimonial'
var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var Course = (function (Component) {
	function Course(props, context) {
		_classCallCheck(this, Course);

		// this.updateUserRegistration = this.updateUserRegistration.bind(this)
		// this.register = this.register.bind(this)
		_get(Object.getPrototypeOf(Course.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(Course, Component);

	_prototypeProperties(Course, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				api.handleGet("/api/course?slug=" + this.props.slug, {});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var units = this.props.course.units.map(function (unit, i) {
					return React.createElement(CourseSection, { key: unit.index, unit: unit });
				});

				return React.createElement(
					"div",
					null,
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
													React.createElement("img", { className: "image_fade", src: "/images/blog/standard/17.jpg", alt: "Standard Post with Image" })
												)
											),
											React.createElement(
												"div",
												{ className: "entry-title" },
												React.createElement(
													"h2",
													null,
													this.props.course.title
												)
											),
											React.createElement(
												"div",
												{ className: "entry-content" },
												React.createElement(
													"div",
													{ className: "col_half" },
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
														{ className: "panel-heading" },
														"Panel heading without title"
													),
													React.createElement(
														"div",
														{ className: "panel-body" },
														"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, esse, velit, eaque officiis mollitia inventore ipsum minus quo itaque provident error adipisci quisquam ratione assumenda at illo doloribus beatae totam?"
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
														React.createElement("hr", null)
													)
												)
											)
										)
									)
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

	return Course;
})(Component);

var stateToProps = function (state) {
	console.log("STATE TO PROPS: " + JSON.stringify(state));
	var keys = Object.keys(state.courseReducer.courses);


	return {
		currentUser: state.profileReducer.currentUser,
		course: state.courseReducer.courses[keys[0]],
		testimonials: state.staticReducer.testimonials
	};
};


module.exports = connect(stateToProps)(Course);
// var course = this.props.courses[this.props.slug]
// this.setState({
// 	course: course
// });