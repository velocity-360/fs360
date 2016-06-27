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

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var ProjectView = _interopRequire(require("../../components/ProjectView"));

var EditProject = _interopRequire(require("../../components/EditProject"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var DateUtils = _interopRequire(require("../../utils/DateUtils"));

var TextUtils = _interopRequire(require("../../utils/TextUtils"));

var Project = (function (Component) {
	function Project(props, context) {
		_classCallCheck(this, Project);

		_get(Object.getPrototypeOf(Project.prototype), "constructor", this).call(this, props, context);
		this.toggleEditing = this.toggleEditing.bind(this);
		this.state = {
			showLoader: false,
			isEditing: false };
	}

	_inherits(Project, Component);

	_prototypeProperties(Project, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var url = "/api/project?slug=" + this.props.slug;
				api.handleGet(url, {}, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					console.log(JSON.stringify(response));
					store.dispatch(actions.projectsRecieved(response.projects));
				});
			},
			writable: true,
			configurable: true
		},
		toggleEditing: {
			value: function toggleEditing(event) {
				event.preventDefault();
				console.log("toggleEditing: " + this.state.isEditing);
				var isEditing = !this.state.isEditing;
				this.setState({
					isEditing: isEditing
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var content = this.props.project == null ? "" : React.createElement(ProjectView, { project: this.props.project });

				return React.createElement(
					"div",
					{ style: { background: "#f5f5f5" } },
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
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
												"Intro",
												React.createElement("span", null),
												React.createElement("div", { className: "timeline-divider" })
											),
											content
										),
										React.createElement(
											"div",
											{ className: "entry clearfix" },
											React.createElement(
												"div",
												{ className: "entry-timeline" },
												"Intro",
												React.createElement("span", null),
												React.createElement("div", { className: "timeline-divider" })
											),
											React.createElement(
												"div",
												{ className: "panel panel-default", style: { padding: 36 } },
												React.createElement(
													"h3",
													null,
													"Comments"
												),
												React.createElement("hr", null),
												this.props.project.description,
												React.createElement("br", null)
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

	return Project;
})(Component);

var stateToProps = function (state) {
	var projects = state.projectReducer.projectsArray;
	//	console.log('STATE TO PROPS: '+JSON.stringify(projects))

	return {
		currentUser: state.profileReducer.currentUser,
		project: projects.length == 0 ? state.projectReducer.emptyProject : projects[0],
		loaderOptions: state.staticReducer.loaderConfig
	};
};

module.exports = connect(stateToProps)(Project);