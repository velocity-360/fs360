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

var DateUtils = _interopRequire(require("../../utils/DateUtils"));

var TextUtils = _interopRequire(require("../../utils/TextUtils"));

var PostPage = (function (Component) {
	function PostPage(props, context) {
		_classCallCheck(this, PostPage);

		_get(Object.getPrototypeOf(PostPage.prototype), "constructor", this).call(this, props, context);
		this.toggleEditing = this.toggleEditing.bind(this);
		this.editPost = this.editPost.bind(this);
		this.state = {
			showLoader: false,
			isEditing: false
		};
	}

	_inherits(PostPage, Component);

	_prototypeProperties(PostPage, null, {
		componentDidMount: {
			value: function componentDidMount() {
				if (this.props.posts[this.props.slug] != null) {
					return;
				}var url = "/api/post?slug=" + this.props.slug;
				api.handleGet(url, {}, function (err, response) {
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
				event.preventDefault();
				if (this.state.isEditing == false) {
					this.setState({ isEditing: true });
					return;
				}

				// commit changes
				var post = this.props.posts[this.props.slug];
				if (post == null) {
					return;
				}var url = "/api/post/" + post.id;
				var _this = this;
				api.handlePut(url, post, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.currentStore().dispatch(actions.postsRecieved([response.post]));
					_this.setState({ isEditing: false });
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
				if (this.state.isEditing == true) {
					title = React.createElement(
						"div",
						{ style: { padding: 10.5 } },
						React.createElement("input", { style: { border: "none", borderBottom: "1px solid #777", background: "#f5f5f5" }, type: "text", id: "title", onChange: this.editPost, placeholder: "Title", value: post.title }),
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
				} else {
					title = React.createElement(
						"h1",
						null,
						post.title
					);
					content = React.createElement("div", { style: { background: "#fff", padding: 24 }, dangerouslySetInnerHTML: { __html: TextUtils.convertToHtml(post.text) }, className: "panel-body" });
				}


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
								{ className: "entry clearfix" },
								React.createElement(
									"div",
									{ className: "container clearfix" },
									React.createElement(
										"div",
										{ className: "heading-block center" },
										title,
										btnEdit,
										React.createElement("img", { style: { border: "1px solid #ddd", background: "#fff", marginTop: 12 }, src: "https://media-service.appspot.com/site/images/" + post.image + "?crop=260", alt: "Velocity 360" })
									),
									React.createElement(
										"div",
										{ className: "entry-c" },
										React.createElement(
											"div",
											{ className: "entry-content" },
											React.createElement(
												"div",
												{ className: "panel panel-default", style: { background: "#f1f9f5" } },
												React.createElement(
													"ul",
													{ className: "entry-meta clearfix", style: { paddingLeft: 24, paddingTop: 10, paddingBottom: 16, borderBottom: "1px solid #eee" } },
													React.createElement(
														"li",
														null,
														React.createElement("i", { className: "icon-calendar3" }),
														" ",
														DateUtils.formattedDate(post.timestamp)
													),
													React.createElement(
														"li",
														null,
														React.createElement(
															"a",
															{ href: "#" },
															React.createElement("i", { className: "icon-user" }),
															" ",
															post.profile.name
														)
													),
													React.createElement(
														"li",
														null,
														React.createElement("i", { className: "icon-comments" }),
														" ",
														post.numReplies,
														" comments"
													)
												),
												content
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

	return PostPage;
})(Component);

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser,
		posts: state.postReducer.posts,
		loaderOptions: state.staticReducer.loaderConfig
	};
};

module.exports = connect(stateToProps)(PostPage);