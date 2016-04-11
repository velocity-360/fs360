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
var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var CourseCard = _interopRequire(require("../../components/CourseCard"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var Courses = (function (Component) {
	function Courses(props, context) {
		_classCallCheck(this, Courses);

		_get(Object.getPrototypeOf(Courses.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(Courses, Component);

	_prototypeProperties(Courses, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {


				var endpoint = "/api/course";
				if (this.props.params == null) {
					api.handleGet(endpoint, {}, function (err, response) {
						if (err) {
							alert(response.message);
							return;
						}

						store.dispatch(actions.coursesRecieved(response.courses));
					});
					return;
				}

				// TODO: move this to api.js soon
				endpoint = endpoint + "?";
				var keys = Object.keys(this.props.params);
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					endpoint = endpoint + key;
					endpoint = endpoint + "=";
					endpoint = endpoint + this.props.params[key];
				}

				console.log("ENDPOINT == " + endpoint);
				api.handleGet(endpoint, {}, function (err, response) {
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
		render: {
			value: function render() {
				var courseList = this.props.courses.map(function (course) {
					return React.createElement(CourseCard, { key: course.id, course: course });
				});

				return React.createElement(
					"div",
					{ style: { background: "#f5f5f5" } },
					React.createElement(Sidebar, null),
					React.createElement(
						"section",
						{ id: "content" },
						React.createElement(
							"div",
							{ className: "content-wrap", style: { background: "#f5f5f5" } },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "postcontent nobottommargin col_last" },
									React.createElement(
										"div",
										{ className: "entry clearfix" },
										React.createElement(
											"div",
											{ className: "entry-content" },
											React.createElement(
												"div",
												{ className: "col_half" },
												React.createElement(
													"h2",
													{ style: { marginBottom: 0 } },
													"Videos"
												),
												React.createElement(
													"p",
													null,
													"Description"
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
													React.createElement("hr", null),
													React.createElement(
														"a",
														{ href: "#", onClick: this.openModal, style: { marginRight: 12 }, className: "button button-border button-dark button-rounded noleftmargin" },
														"Apply"
													)
												)
											)
										)
									),
									React.createElement(
										"div",
										{ id: "posts", className: "events small-thumbs" },
										courseList
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

	return Courses;
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state));

	return {
		currentUser: state.profileReducer.currentUser,
		courses: state.courseReducer.courseArray };
};


module.exports = connect(stateToProps)(Courses);