"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var Loader = _interopRequire(require("react-loader"));

var Dropzone = _interopRequire(require("react-dropzone"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var _components = require("../../components");

var Footer = _components.Footer;
var Nav = _components.Nav;
var _utils = require("../../utils");

var TextUtils = _utils.TextUtils;
var DateUtils = _utils.DateUtils;
var api = _utils.api;
var PostPage = (function (Component) {
	function PostPage(props, context) {
		_classCallCheck(this, PostPage);

		_get(Object.getPrototypeOf(PostPage.prototype), "constructor", this).call(this, props, context);
		this.toggleEditing = this.toggleEditing.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.editPost = this.editPost.bind(this);
		this.updatePost = this.updatePost.bind(this);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.subscribe = this.subscribe.bind(this);
		this.state = {
			showLoader: false,
			isEditing: false,
			visitor: {
				name: "",
				email: ""
			}
		};
	}

	_inherits(PostPage, Component);

	_prototypeProperties(PostPage, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var url = "/api/post";
				api.handleGet(url, { limit: 3, isPublic: "yes" }, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.currentStore().dispatch(actions.postsRecieved(response.posts));
				});
			},
			writable: true,
			configurable: true
		},
		uploadImage: {
			value: function uploadImage(files) {
				var _this = this;
				this.setState({ showLoader: true });

				api.upload(files[0], function (err, response) {
					_this.setState({
						showLoader: false
					});

					if (err) {
						alert(response.message);
						return;
					}

					var post = _this.props.posts[_this.props.slug];
					var updatedPost = Object.assign({}, post);
					updatedPost.images.push(response.id);
					_this.updatePost(post, null);
				});
			},
			writable: true,
			configurable: true
		},
		editPost: {
			value: function editPost(event) {
				event.preventDefault();
				var post = this.props.posts[this.props.slug];
				if (post == null) {
					return;
				}var updatedPost = Object.assign({}, post);
				updatedPost[event.target.id] = event.target.value;
				store.currentStore().dispatch(actions.postEdited(updatedPost));
			},
			writable: true,
			configurable: true
		},
		toggleEditing: {
			value: function toggleEditing(event) {
				var _this = this;
				event.preventDefault();
				if (this.state.isEditing == false) {
					this.setState({ isEditing: true });
					return;
				}

				// commit changes
				var post = this.props.posts[this.props.slug];
				if (post == null) {
					return;
				}this.updatePost(post, function () {
					_this.setState({ isEditing: false });
				});
			},
			writable: true,
			configurable: true
		},
		updatePost: {
			value: function updatePost(post, callback) {
				var url = "/api/post/" + post.id;
				api.handlePut(url, post, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.currentStore().dispatch(actions.postsRecieved([response.post]));
					if (callback == null) return;

					callback();
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

				var post = this.props.posts[this.props.slug];
				s.source = post.title;

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
				var post = this.props.posts[this.props.slug];
				var btnEdit = null;

				if (this.state.isEditing == true) {
					btnEdit = React.createElement(
						"div",
						null,
						React.createElement(
							"button",
							{ onClick: this.toggleEditing, className: "button button-border button-dark button-rounded noleftmargin" },
							"Done"
						)
					);
				} else {
					if (this.props.currentUser.id != null) {
						if (post.profile.id != null) {
							if (this.props.currentUser.id == post.profile.id) {
								// author of post
								btnEdit = React.createElement(
									"div",
									null,
									React.createElement(
										"button",
										{ onClick: this.toggleEditing, className: "button button-border button-dark button-rounded noleftmargin" },
										"Edit"
									)
								);
							}
						}
					}
				}

				var title = null;
				var content = null;
				var upload = null;
				var image = post.image.length == 0 ? null : React.createElement("img", { style: { border: "1px solid #ddd", background: "#fff", marginTop: 12 }, src: "https://media-service.appspot.com/site/images/" + post.image + "?crop=260", alt: "Velocity 360" });
				var video = post.wistia.length == 0 ? null : React.createElement(
					"div",
					{ className: "wistia_embed wistia_async_" + post.wistia + " videoFoam=true", style: { height: 100, width: 178, marginTop: 12 } },
					" "
				);

				if (this.state.isEditing == true) {
					title = React.createElement(
						"div",
						{ style: { padding: 10.5 } },
						React.createElement("input", { style: { border: "none", borderBottom: "1px solid #777", background: "#f5f5f5" }, type: "text", id: "title", onChange: this.editPost, placeholder: "Title", value: post.title }),
						React.createElement("br", null),
						React.createElement("input", { style: { border: "none", borderBottom: "1px solid #777", background: "#f5f5f5" }, type: "text", id: "isPublic", onChange: this.editPost, placeholder: "Public", value: post.isPublic }),
						React.createElement("br", null)
					);

					content = React.createElement(
						"div",
						{ style: { background: "#fff", padding: 24 }, className: "panel-body" },
						React.createElement(
							"textarea",
							{ id: "text", onChange: this.editPost, placeholder: "Text", style: { padding: 0, width: "100%", border: "1px solid #ddd", background: "#f9f9f9", minHeight: 360 }, className: "panel-body" },
							post.text
						)
					);

					var images = post.images.map(function (image, i) {
						return React.createElement(
							"div",
							{ key: image, className: "col-md-4" },
							React.createElement(
								"div",
								{ style: { padding: 4 } },
								React.createElement("img", { src: "https://media-service.appspot.com/site/images/" + image + "?crop=260" })
							)
						);
					});

					upload = React.createElement(
						"div",
						null,
						React.createElement(
							"div",
							{ className: "col_half" },
							React.createElement(
								Dropzone,
								{ style: { width: 100 + "%", marginBottom: 24, background: "#f9f9f9", border: "1px solid #ddd" }, onDrop: this.uploadImage },
								React.createElement(
									"div",
									{ style: { padding: 24 } },
									"Upload Images Here."
								)
							)
						),
						React.createElement(
							"div",
							{ className: "col_half col_last" },
							React.createElement(
								"div",
								{ className: "row" },
								images
							)
						)
					);
				} else {
					content = React.createElement(
						"div",
						{ className: "panel panel-default" },
						React.createElement(
							"div",
							{ className: "panel-body", style: style.panelBody },
							React.createElement(
								"h2",
								{ style: style.header },
								post.title
							)
						),
						React.createElement("div", { dangerouslySetInnerHTML: { __html: TextUtils.convertToHtml(post.text) }, className: "panel-body", style: { padding: 36 } }),
						React.createElement(
							"div",
							{ style: { width: "50%", minWidth: 240 } },
							video
						)
					);
				}

				var courses = this.props.courses.map(function (course, i) {
					if (course.type != "online") {
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
					}
				});

				var recentPosts = this.props.postsArray.map(function (recentPost, i) {
					var image = recentPost.image.indexOf("http") == -1 ? "https://media-service.appspot.com/site/images/" + recentPost.image + "?crop=128" : recentPost.image;
					var link = recentPost.link.length == 0 ? "/post/" + recentPost.slug : recentPost.link;
					return React.createElement(
						"div",
						{ key: recentPost.id, className: "clearfix", style: { marginTop: 16, lineHeight: "4px" } },
						React.createElement("img", { style: style.icon, src: image }),
						React.createElement(
							"a",
							{ href: link, style: { color: "#444" } },
							TextUtils.truncateText(recentPost.title, 28)
						),
						React.createElement("br", null),
						React.createElement(
							"span",
							{ style: { fontSize: 12, color: "#999" } },
							recentPost.profile.name
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
										{ style: { background: "#fff", minHeight: 750, borderRight: "1px solid #ddd" } },
										React.createElement(
											"nav",
											{ style: { width: "100%", padding: 32 } },
											React.createElement(
												"h4",
												{ style: { marginBottom: 0 } },
												"Recent Posts"
											),
											React.createElement("hr", { style: { marginTop: 6 } }),
											recentPosts,
											React.createElement(
												"div",
												{ style: { padding: 20, background: "#f9f9f9", marginTop: 24 } },
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
												btnEdit,
												content
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

	return PostPage;
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
	},
	icon: {
		float: "left",
		width: 42,
		height: 42,
		borderRadius: 21,
		marginRight: 12
	}
};

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser,
		loaderOptions: state.staticReducer.loaderConfig,
		posts: state.postReducer.posts,
		postsArray: state.postReducer.postsArray,
		courses: state.courseReducer.courseArray
	};
};

module.exports = connect(stateToProps)(PostPage);