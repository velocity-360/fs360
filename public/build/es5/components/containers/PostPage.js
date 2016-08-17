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

var Nav = _interopRequire(require("../../components/Nav"));

var Footer = _interopRequire(require("../../components/Footer"));

var RightSidebar = _interopRequire(require("../../components/RightSidebar"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var DateUtils = _interopRequire(require("../../utils/DateUtils"));

var TextUtils = _interopRequire(require("../../utils/TextUtils"));

var api = _interopRequire(require("../../utils/APIManager"));

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
				api.handleGet(url, null, function (err, response) {
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
				}var url = "/api/post/" + post.id;
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
						"div",
						{ className: "fancy-title title-bottom-border" },
						React.createElement(
							"h2",
							{ style: { fontWeight: 400 } },
							post.title
						)
					);

					content = React.createElement(
						"div",
						{ style: { background: "#fff", padding: 24 } },
						React.createElement(
							"div",
							{ style: { textAlign: "center" } },
							image
						),
						React.createElement("div", { dangerouslySetInnerHTML: { __html: TextUtils.convertToHtml(post.text) }, className: "panel-body" }),
						React.createElement(
							"div",
							{ style: { width: "50%", minWidth: 240 } },
							video
						)
					);
				}

				var courses = this.props.courses.map(function (course, i) {
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
				});

				return React.createElement(
					"div",
					{ className: "clearfix" },
					React.createElement(Nav, { headerStyle: "dark" }),
					React.createElement(
						"section",
						null,
						React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "col_two_third bottommargin-sm" },
									title,
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
												btnEdit,
												content
											)
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm hidden-xs col_last", style: { borderLeft: "1px solid #ddd", padding: 36 } },
									React.createElement(RightSidebar, null)
								)
							)
						)
					),
					React.createElement(
						"section",
						{ style: { background: "#f9f9f9", paddingTop: 48, borderTop: "1px solid #ddd" } },
						React.createElement(
							"div",
							{ className: "heading-block center" },
							React.createElement(
								"h2",
								{ style: { fontWeight: 400 } },
								"Bootcamps"
							)
						),
						React.createElement(
							"div",
							{ className: "content-wrap", style: { paddingTop: 0 } },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								courses
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
		loaderOptions: state.staticReducer.loaderConfig,
		posts: state.postReducer.posts,
		courses: state.courseReducer.courseArray
	};
};

module.exports = connect(stateToProps)(PostPage);