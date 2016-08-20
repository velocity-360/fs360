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

var _utils = require("../../utils");

var TextUtils = _utils.TextUtils;
var api = _utils.api;
var _components = require("../../components");

var Nav = _components.Nav;
var Footer = _components.Footer;
var CourseCard = _components.CourseCard;
var RightSidebar = _components.RightSidebar;
var Register = _components.Register;
var Tutorial = (function (Component) {
	function Tutorial(props, context) {
		_classCallCheck(this, Tutorial);

		_get(Object.getPrototypeOf(Tutorial.prototype), "constructor", this).call(this, props, context);
		this.state = {
			tutorial: {
				title: "",
				description: "",
				image: "",
				posts: []
			}
		};
	}

	_inherits(Tutorial, Component);

	_prototypeProperties(Tutorial, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				var params = { slug: this.props.slug };
				api.handleGet("/api/tutorial", params, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					console.log(JSON.stringify(response));
					var tutorials = response.tutorials;
					if (tutorials.length == 0) {
						return;
					}


					var tutorial = tutorials[0];
					_this.setState({
						tutorial: tutorial
					});
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var tutorial = this.state.tutorial;
				var posts = tutorial.posts.map(function (post, i) {
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
							{ className: "panel panel-default", style: { maxWidth: 600 } },
							React.createElement(
								"div",
								{ className: "panel-body", style: { padding: 36 } },
								React.createElement(
									"h3",
									null,
									React.createElement(
										"a",
										{ href: "#", style: { marginRight: 12 }, className: "btn btn-info" },
										React.createElement(
											"strong",
											null,
											post.title
										)
									)
								),
								React.createElement("hr", null),
								post.description,
								React.createElement(
									"div",
									{ className: "wistia_embed wistia_async_" + post.wistia + " videoFoam=true", style: { height: 200, width: 356, marginTop: 12 } },
									" "
								),
								React.createElement("br", null),
								"Click ",
								React.createElement(
									"a",
									{ href: "#" },
									"HERE"
								),
								" to view full post."
							)
						)
					);
				});

				return React.createElement(
					"div",
					{ id: "wrapper", className: "clearfix", style: { background: "#f9f9f9" } },
					React.createElement(Nav, { headerStyle: "dark" }),
					React.createElement(
						"section",
						null,
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ id: "lpf-content" },
								React.createElement(
									"main",
									null,
									React.createElement(
										"div",
										{ className: "aside-toggle" },
										React.createElement("div", null)
									),
									React.createElement(
										"aside",
										{ style: { background: "#f9f9f9" } },
										React.createElement(
											"nav",
											{ style: { padding: 16, background: "#fff", border: "1px solid #ddd" } },
											React.createElement(
												"ul",
												null,
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "#introduction" },
														"Overview"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "#curriculum" },
														"Curriculum"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "#subscribe" },
														"Subscribe"
													)
												)
											)
										)
									),
									React.createElement(
										"div",
										{ className: "content", style: { background: "#f9f9f9" } },
										React.createElement(
											"article",
											{ id: "introduction", className: "overview" },
											React.createElement(
												"div",
												{ className: "container" },
												React.createElement(
													"h2",
													null,
													tutorial.title
												),
												React.createElement("hr", null),
												React.createElement(
													"p",
													{ className: "about" },
													tutorial.description
												),
												React.createElement(
													"div",
													{ className: "container" },
													React.createElement(
														"div",
														{ className: "image" },
														React.createElement("img", { style: { width: 280, background: "#fff", padding: 6, border: "1px solid #ddd" }, src: "https://media-service.appspot.com/site/images/" + tutorial.image + "?crop=460", alt: "Velocity 360" })
													),
													React.createElement(
														"div",
														{ className: "text" },
														tutorial.description
													)
												)
											)
										),
										React.createElement(
											"article",
											{ id: "curriculum", className: "overview" },
											React.createElement(
												"h2",
												null,
												"Curriculum"
											),
											React.createElement(
												"div",
												{ className: "postcontent clearfix", style: { paddingBottom: 64 } },
												React.createElement(
													"div",
													{ id: "posts", className: "post-timeline clearfix" },
													React.createElement("div", { className: "timeline-border" }),
													posts
												)
											)
										)
									)
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

	return Tutorial;
})(Component);

module.exports = Tutorial;