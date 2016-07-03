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

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var stripe = _interopRequire(require("../../utils/StripeUtils"));

var DateUtils = _interopRequire(require("../../utils/DateUtils"));

var TextUtils = _interopRequire(require("../../utils/TextUtils"));

var Project = (function (Component) {
	function Project(props, context) {
		_classCallCheck(this, Project);

		_get(Object.getPrototypeOf(Project.prototype), "constructor", this).call(this, props, context);
		this.purchase = this.purchase.bind(this);
		this.configureStripe = this.configureStripe.bind(this);
		this.state = {
			showLoader: false };
	}

	_inherits(Project, Component);

	_prototypeProperties(Project, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				var url = "/api/project?slug=" + this.props.slug;
				api.handleGet(url, {}, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					console.log(JSON.stringify(response));
					// if (response.projects.length > 0){
					// 	var project = response.projects[0]
					// 	_this.configureStripe(project)
					// }

					store.dispatch(actions.projectsRecieved(response.projects));
				});
			},
			writable: true,
			configurable: true
		},
		configureStripe: {
			value: function configureStripe(project) {
				console.log("configureStripe: " + this.props.currentUser.accountType);
				var price = this.props.currentUser.accountType == "premium" ? project.premiumPrice : project.price;
				var text = "$" + price + ".00";
				var _this = this;
				stripe.initializeWithText(text, function (token) {
					_this.setState({ showLoader: true });

					api.submitStripeCharge(token, project, price, function (err, response) {
						if (err) {
							alert(err.message);
							_this.setState({ showLoader: false });
							return;
						}

						window.location.href = "/account";
					});
				});
			},
			writable: true,
			configurable: true
		},
		purchase: {
			value: function purchase(event) {
				event.preventDefault();

				// TODO: check if user logged in, if so check if premium
				var text = this.props.project.title + ", $" + this.props.project.price;
				stripe.showModalWithText(text);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				if (this.props.project.id != null) this.configureStripe(this.props.project);


				var tags = this.props.project.tags.map(function (tag, i) {
					return React.createElement(
						"a",
						{ key: i, href: "#" },
						tag
					);
				});

				var units = this.props.project.units.map(function (unit, i) {
					return React.createElement(
						"div",
						{ key: i, className: "entry clearfix" },
						React.createElement(
							"div",
							{ className: "entry-timeline" },
							"Unit",
							React.createElement(
								"span",
								null,
								i + 1
							),
							React.createElement("div", { className: "timeline-divider" })
						),
						React.createElement(
							"div",
							{ className: "panel panel-default", style: { padding: 36 } },
							React.createElement("img", { style: { float: "right", marginRight: 12, width: 72 }, src: "https://media-service.appspot.com/site/images/" + unit.icon + "?crop=260" }),
							React.createElement(
								"h3",
								{ style: { marginBottom: 6 } },
								unit.topic
							),
							React.createElement("br", null),
							React.createElement("hr", null),
							unit.description,
							React.createElement("br", null)
						)
					);
				});

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
											React.createElement(
												"div",
												{ className: "panel panel-default", style: { padding: 36 } },
												React.createElement("img", { style: { width: 120, marginBottom: 16, float: "left", marginRight: 24 }, src: "https://media-service.appspot.com/site/images/" + this.props.project.image + "?crop=420" }),
												React.createElement(
													"h2",
													null,
													this.props.project.title
												),
												React.createElement("hr", null),
												React.createElement(
													"div",
													{ className: "tagcloud clearfix" },
													tags
												),
												React.createElement("div", { className: "clearfix" }),
												React.createElement(
													"p",
													null,
													this.props.project.description
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
												React.createElement(
													"span",
													null,
													"Purchase"
												),
												React.createElement("div", { className: "timeline-divider" })
											),
											React.createElement(
												"div",
												{ className: "panel panel-default", style: { padding: 36 } },
												React.createElement(
													"h2",
													null,
													"Purchase"
												),
												React.createElement("hr", null),
												React.createElement("div", { className: "clearfix" }),
												React.createElement(
													"div",
													{ className: "row" },
													React.createElement(
														"div",
														{ className: "col-md-8" },
														React.createElement(
															"a",
															{ onClick: this.purchase, href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
															"Purchase"
														),
														React.createElement("br", null)
													),
													React.createElement(
														"div",
														{ className: "col-md-4" },
														React.createElement("div", { style: { background: "#f9f9f9", padding: 12, border: "1px solid #ddd" } })
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