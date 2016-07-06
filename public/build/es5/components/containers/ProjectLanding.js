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
var ProjectCard = _interopRequire(require("../../components/ProjectCard"));

var Header = _interopRequire(require("../../components/Header"));

var Register = _interopRequire(require("../../components/Register"));

var Nav = _interopRequire(require("../../components/Nav"));

var Footer = _interopRequire(require("../../components/Footer"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var stripe = _interopRequire(require("../../utils/StripeUtils"));

var api = _interopRequire(require("../../api/api"));

var Landing = (function (Component) {
	function Landing(props, context) {
		_classCallCheck(this, Landing);

		_get(Object.getPrototypeOf(Landing.prototype), "constructor", this).call(this, props, context);
		this.state = {};
	}

	_inherits(Landing, Component);

	_prototypeProperties(Landing, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				api.handleGet("/api/project", null, function (err, response) {
					if (err) {
						return;
					}

					store.dispatch(actions.projectsRecieved(response.projects));
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var projectList = this.props.projects.map(function (project, i) {
					return React.createElement(ProjectCard, { key: project.id, project: project });
				});

				return React.createElement(
					"div",
					null,
					React.createElement(Nav, null),
					React.createElement(Header, null),
					React.createElement(
						"section",
						{ style: { background: "#f9f9f9", borderBottom: "1px solid #ddd" } },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "promo promo-dark promo-full landing-promo header-stick" },
								React.createElement(
									"div",
									{ className: "container clearfix" },
									React.createElement(
										"h3",
										null,
										"Build Real Products"
									),
									React.createElement(
										"span",
										null,
										"Velocity 360 is the only coding bootcamp that uses real ",
										React.createElement("br", null),
										"projects from local startups to teach students."
									)
								)
							),
							React.createElement(
								"div",
								{ className: "container clearfix", style: { paddingTop: 64 } },
								projectList,
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm col_last" },
									React.createElement(
										"div",
										{ className: "widget clearfix", style: { borderRadius: 2, padding: 24, textAlign: "center", border: "1px solid #ddd", background: "#F9FCFF" } },
										React.createElement(
											"h4",
											null,
											"Featured App"
										),
										React.createElement("img", { style: { width: 128, border: "1px solid #ddd" }, src: "/images/radius.png", alt: "Velocity 360" }),
										React.createElement(
											"h3",
											{ style: { marginBottom: 6, marginTop: 9 } },
											React.createElement(
												"a",
												{ href: "/project/123" },
												"Radius"
											)
										),
										React.createElement("hr", null),
										React.createElement(
											"strong",
											null,
											"iOS App"
										),
										React.createElement("br", null),
										React.createElement(
											"p",
											null,
											"Radius is a job-searching app aimed at part time workers, students, and short term service providers like dog-walkers or furniture movers. It utilizes the GPS functionality on the iPhone to find jobs nearby and also to find workers in the area."
										),
										React.createElement(
											"div",
											{ className: "tagcloud" },
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"iOS"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"Node JS"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"REST API"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"JavaScript"
											)
										)
									)
								)
							)
						)
					),
					React.createElement(Register, null),
					React.createElement(Footer, null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Landing;
})(Component);

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser,
		projects: state.projectReducer.projectsArray
	};
};

module.exports = connect(stateToProps)(Landing);