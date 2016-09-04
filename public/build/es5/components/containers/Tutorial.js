"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var ReactDOM = _interopRequire(require("react-dom"));

var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var Loader = _interopRequire(require("react-loader"));

var connect = require("react-redux").connect;
var _utils = require("../../utils");

var TextUtils = _utils.TextUtils;
var api = _utils.api;
var Nav = require("../../components").Nav;
var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var Tutorial = (function (Component) {
	function Tutorial(props, context) {
		_classCallCheck(this, Tutorial);

		_get(Object.getPrototypeOf(Tutorial.prototype), "constructor", this).call(this, props, context);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.subscribe = this.subscribe.bind(this);
		this.changeUnit = this.changeUnit.bind(this);
		this.findUnit = this.findUnit.bind(this);
		this.state = {
			showLoader: false,
			currentPost: "", // slug of the selected post
			tutorials: [],
			visitor: {
				name: "",
				email: ""
			}
		};
	}

	_inherits(Tutorial, Component);

	_prototypeProperties(Tutorial, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				var tutorial = this.props.tutorials[this.props.slug];
				if (tutorial.posts.length == 0) {
					return;
				}var firstPost = tutorial.posts[0];
				this.findUnit(firstPost.slug);

				var url = "/api/tutorial";
				api.handleGet(url, { status: "live" }, function (err, response) {
					if (err) return;

					var tutorials = response.tutorials;
					console.log("TUTORIALS: " + JSON.stringify(tutorials));
					_this.setState({
						tutorials: tutorials
					});
				});
			},
			writable: true,
			configurable: true
		},
		findUnit: {
			value: function findUnit(postSlug) {
				if (this.state.currentPost == postSlug) {
					return;
				}this.setState({ currentPost: postSlug });

				// check store first
				var selectedPost = this.props.posts[postSlug];
				if (selectedPost != null) {
					return;
				}var url = "/api/post";
				api.handleGet(url, { slug: postSlug }, function (err, response) {
					if (err) return;

					var posts = response.posts;
					store.currentStore().dispatch(actions.postsRecieved(posts));
				});
			},
			writable: true,
			configurable: true
		},
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
		changeUnit: {
			value: function changeUnit(event) {
				event.preventDefault();
				ReactDOM.findDOMNode(this).scrollIntoView();
				var postSlug = event.target.id;
				this.findUnit(postSlug);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _this = this;
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

				var units = tutorial.posts;
				var sidebar = units.map(function (post, i) {
					var borderTop = i == 0 ? "none" : "1px solid #ddd";
					var color = post.slug == _this.state.currentPost ? "#1ABC9C" : "#86939f";
					return React.createElement(
						"li",
						{ key: post.id, style: { borderTop: "1px solid #ddd", padding: 6 } },
						React.createElement(
							"a",
							{ id: post.slug, onClick: _this.changeUnit, href: "#top", style: { color: color } },
							i + 1,
							". ",
							post.title
						)
					);
				});

				var nextUnit = null;
				for (var i = 0; i < units.length; i++) {
					if (i == units.length - 1) // end
						break;

					var post = units[i];
					if (post.slug == this.state.currentPost) {
						nextUnit = units[i + 1];
						break;
					}
				}

				var nextUnitTitle = nextUnit == null ? "" : nextUnit.title;
				var nextUnitSlug = nextUnit == null ? "" : nextUnit.slug;
				var nextUnitLink = null;
				if (nextUnitSlug.length == 0) {
					nextUnitLink = React.createElement(
						"div",
						{ className: "panel-body", style: { padding: 36 } },
						React.createElement(
							"h2",
							{ style: style.header },
							"End of Tutorial, Congratulations!"
						)
					);
				} else {
					nextUnitLink = React.createElement(
						"div",
						{ className: "panel-body", style: { padding: 36 } },
						React.createElement(
							"h2",
							{ style: style.header },
							"Next Unit: ",
							React.createElement(
								"a",
								{ id: nextUnitSlug, onClick: this.changeUnit, href: "#" },
								nextUnitTitle
							)
						),
						React.createElement(
							"button",
							{ id: nextUnitSlug, onClick: this.changeUnit, className: "btn btn-info" },
							"View"
						)
					);
				}

				var selectedPost = this.props.posts[this.state.currentPost];
				var currentPostHtml = "";
				var currentPostTitle = "";
				if (selectedPost != null) {
					currentPostHtml = selectedPost.text;
					currentPostTitle = selectedPost.title;
				}

				var featured = this.state.tutorials.map(function (tutorial, i) {
					var price = tutorial.price == 0 ? "FREE" : "$" + tutorial.price;
					return React.createElement(
						"div",
						{ key: tutorial.id, className: "col-md-4" },
						React.createElement(
							"div",
							{ style: { width: 92 + "%", margin: "auto", background: "#f9f9f9", border: "1px solid #ddd", textAlign: "center", padding: 16, marginBottom: 32 } },
							React.createElement("img", { style: { width: 100, borderRadius: 50, marginBottom: 12 }, src: "https://media-service.appspot.com/site/images/" + tutorial.image + "?crop=460" }),
							React.createElement(
								"div",
								{ className: "fancy-title title-bottom-border" },
								React.createElement(
									"h3",
									{ style: { fontWeight: 400 } },
									React.createElement(
										"a",
										{ style: { color: "#444" }, href: "/tutorial/" + tutorial.slug },
										tutorial.title
									)
								)
							),
							React.createElement(
								"h5",
								{ style: { marginBottom: 0, fontWeight: 200 } },
								tutorial.posts.length,
								" units",
								React.createElement(
									"span",
									{ style: { margin: 10 } },
									"|"
								),
								price
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
											{ style: style.sidebar },
											React.createElement(
												"div",
												{ style: { textAlign: "center", background: "#f9f9f9", padding: 12 } },
												React.createElement(
													"h4",
													{ style: { marginBottom: 6 } },
													"Units"
												)
											),
											React.createElement(
												"ul",
												null,
												sidebar,
												React.createElement(
													"li",
													{ style: { borderTop: "1px solid #ddd", padding: 6 } },
													React.createElement(
														"div",
														{ style: { paddingTop: 16 } },
														React.createElement(
															"a",
															{ href: "#newsletter" },
															"Newsletter"
														),
														React.createElement(
															"p",
															{ style: { marginBottom: 16, fontSize: 13 } },
															"Sign up to our newsletter to stay informed about upcoming tutorials, events, and courses."
														),
														React.createElement("input", { onChange: this.updateVisitor, id: "name", type: "name", style: style.input, className: "custom-input", placeholder: "Name" }),
														React.createElement("br", null),
														React.createElement("input", { onChange: this.updateVisitor, id: "email", type: "email", style: style.input, className: "custom-input", placeholder: "Email" }),
														React.createElement("br", null),
														React.createElement(
															"a",
															{ onClick: this.subscribe, href: "#", style: { marginRight: 12, color: "#fff" }, className: "btn btn-info" },
															"Submit"
														)
													)
												)
											)
										)
									),
									React.createElement(
										"div",
										{ className: "content", style: { background: "#f9f9f9", paddingTop: 22 } },
										React.createElement(
											"article",
											{ id: "misc", className: "overview", style: style.article },
											React.createElement(
												"div",
												{ className: "container" },
												React.createElement(
													"div",
													{ className: "panel panel-default" },
													React.createElement(
														"div",
														{ className: "panel-body", style: style.panelBody },
														React.createElement(
															"h2",
															{ style: style.header },
															currentPostTitle
														)
													),
													React.createElement("div", { dangerouslySetInnerHTML: { __html: TextUtils.convertToHtml(currentPostHtml) }, className: "panel-body", style: { padding: 36 } }),
													nextUnitLink
												),
												React.createElement("br", null),
												React.createElement("br", null),
												React.createElement(
													"div",
													{ className: "panel panel-default" },
													React.createElement(
														"div",
														{ className: "panel-body", style: style.panelBody },
														React.createElement(
															"h2",
															{ style: style.header },
															"Featured Tutorials"
														),
														React.createElement("hr", null),
														featured
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

var style = {
	header: {
		marginBottom: 0,
		marginTop: 0 },

	panelBody: {
		padding: 36,
		borderBottom: "1px solid #ddd"
	},
	sidebar: {
		padding: 16,
		background: "#fff",
		border: "1px solid #ddd"
	},
	input: {
		borderRadius: "0px !important",
		background: "#FEF9E7"
	},
	article: {
		marginTop: 40
	}
};

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser,
		tutorials: state.tutorialReducer.tutorials,
		posts: state.postReducer.posts,
		loaderOptions: state.staticReducer.loaderConfig,
		faq: state.staticReducer.faq };
};


module.exports = connect(stateToProps)(Tutorial);
//			store.currentStore().dispatch(actions.postsRecieved(posts))