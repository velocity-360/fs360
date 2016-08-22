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

var connect = require("react-redux").connect;
var _utils = require("../../utils");

var TextUtils = _utils.TextUtils;
var api = _utils.api;
var Nav = require("../../components").Nav;
var Tutorial = (function (Component) {
	function Tutorial(props, context) {
		_classCallCheck(this, Tutorial);

		_get(Object.getPrototypeOf(Tutorial.prototype), "constructor", this).call(this, props, context);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.subscribe = this.subscribe.bind(this);
		this.state = {
			showLoader: false,
			visitor: {
				name: "",
				email: ""
			}
		};
	}

	_inherits(Tutorial, Component);

	_prototypeProperties(Tutorial, null, {
		updateVisitor: {
			value: function updateVisitor(event) {
				var updatedVisitor = Object.assign({}, this.state.visitor);
				updatedVisitor[event.target.id] = event.target.value;
				this.setState({
					visitor: updatedVisitor
				});
			},
			writable: true,
			configurable: true
		},
		subscribe: {
			value: function subscribe(event) {
				var _this = this;
				event.preventDefault();
				if (this.state.visitor.name.length == 0) {
					alert("Please enter your name.");
					return;
				}

				if (this.state.visitor.email.length == 0) {
					alert("Please enter your email.");
					return;
				}

				this.setState({ showLoader: true });

				var s = Object.assign({}, this.state.visitor);
				var parts = s.name.split(" ");
				s.firstName = parts[0];
				if (parts.length > 1) s.lastName = parts[parts.length - 1];

				var tutorial = this.props.tutorials[this.props.slug];
				s.source = tutorial.title;

				s.subject = "New Subscriber";
				s.confirmation = "Thanks for subscribing! Stay tuned for more tutorials, events and upcoming courses!";
				api.handlePost("/account/subscribe", s, function (err, response) {
					_this.setState({ showLoader: false });

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
				var tutorial = this.props.tutorials[this.props.slug];

				var posts = tutorial.posts.map(function (post, i) {
					var video = post.wistia.length == 0 ? null : React.createElement(
						"div",
						{ className: "wistia_embed wistia_async_" + post.wistia + " videoFoam=true", style: { height: 200, width: 356, marginTop: 12 } },
						" "
					);
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
										{ href: "/post/" + post.slug, style: { marginRight: 12 }, className: "btn btn-info" },
										React.createElement(
											"strong",
											null,
											post.title
										)
									)
								),
								React.createElement("hr", null),
								post.description,
								video,
								React.createElement("br", null),
								React.createElement("br", null),
								"Click ",
								React.createElement(
									"a",
									{ href: "/post/" + post.slug },
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
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
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
														{ href: "#newsletter" },
														"Newsletter"
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
												React.createElement("img", { style: { width: 280, background: "#fff", padding: 6, border: "1px solid #ddd", marginBottom: 12 }, src: "https://media-service.appspot.com/site/images/" + tutorial.image + "?crop=460", alt: "Velocity 360" }),
												React.createElement(
													"p",
													{ className: "about" },
													tutorial.description
												)
											)
										),
										React.createElement(
											"article",
											{ id: "curriculum", className: "overview", style: { marginTop: 20 } },
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
										),
										React.createElement(
											"article",
											{ id: "newsletter", className: "overview" },
											React.createElement(
												"div",
												{ className: "container" },
												React.createElement(
													"h2",
													{ style: { marginTop: 24 } },
													"Newsletter"
												),
												React.createElement(
													"div",
													{ className: "panel panel-default" },
													React.createElement(
														"div",
														{ className: "panel-body", style: { padding: 36 } },
														React.createElement(
															"h3",
															null,
															"Sign Up"
														),
														React.createElement("hr", null),
														React.createElement(
															"p",
															{ style: { marginBottom: 16 } },
															"Sign up below to recieve our newsletter, and to stay informed about upcoming tutorials, events, and courses."
														),
														React.createElement("input", { onChange: this.updateVisitor, id: "name", type: "name", style: { borderRadius: "0px !important", background: "#FEF9E7" }, className: "custom-input", placeholder: "Name" }),
														React.createElement("br", null),
														React.createElement("input", { onChange: this.updateVisitor, id: "email", type: "email", style: { borderRadius: "0px !important", background: "#FEF9E7" }, className: "custom-input", placeholder: "Email" }),
														React.createElement("br", null),
														React.createElement(
															"a",
															{ onClick: this.subscribe, href: "#", style: { marginRight: 12 }, className: "btn btn-info" },
															"Submit"
														)
													)
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

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser,
		tutorials: state.tutorialReducer.tutorials,
		loaderOptions: state.staticReducer.loaderConfig,
		faq: state.staticReducer.faq
	};
};


module.exports = connect(stateToProps)(Tutorial);