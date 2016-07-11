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
var Dropzone = _interopRequire(require("react-dropzone"));

var Loader = _interopRequire(require("react-loader"));

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var Post = _interopRequire(require("../../components/Post"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var Feed = (function (Component) {
	function Feed(props, context) {
		_classCallCheck(this, Feed);

		_get(Object.getPrototypeOf(Feed.prototype), "constructor", this).call(this, props, context);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.updatePost = this.updatePost.bind(this);
		this.submitPost = this.submitPost.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.state = {
			showLoader: false,
			showModal: false,
			post: {
				title: "",
				link: "",
				text: "",
				wistia: "",
				image: ""
			}
		};
	}

	_inherits(Feed, Component);

	_prototypeProperties(Feed, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				if (this.props.posts.length > 0) {
					return;
				}api.handleGet("/api/post", {}, function (err, response) {
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
		openModal: {
			value: function openModal(event) {
				event.preventDefault();
				this.setState({
					showModal: true
				});
			},
			writable: true,
			configurable: true
		},
		closeModal: {
			value: function closeModal() {
				this.setState({
					showModal: false
				});
			},
			writable: true,
			configurable: true
		},
		uploadImage: {
			value: function uploadImage(files) {
				this.setState({
					showLoader: true
				});

				var _this = this;
				api.upload(files[0], function (err, response) {
					_this.setState({
						showLoader: false
					});

					if (err) {
						alert(response.message);
						return;
					}

					var post = Object.assign({}, _this.state.post);
					post.image = response.id;
					_this.setState({
						post: post
					});
				});
			},
			writable: true,
			configurable: true
		},
		updatePost: {
			value: function updatePost(event) {
				event.preventDefault();

				var post = Object.assign({}, this.state.post);
				post[event.target.id] = event.target.value;
				this.setState({
					post: post
				});
			},
			writable: true,
			configurable: true
		},
		submitPost: {
			value: function submitPost(event) {
				event.preventDefault();
				var _this = this;
				var post = Object.assign({}, this.state.post);

				api.handlePost("/api/post", post, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.currentStore().dispatch(actions.postCreated(response.post));
					_this.setState({
						showModal: false });
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var postList = this.props.posts.map(function (post) {
					return React.createElement(Post, { key: post.id, post: post });
				});

				var btnSubmit = this.props.currentUser.id == null ? null : React.createElement(
					"a",
					{ onClick: this.openModal, id: "bootcamp", href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
					"Submit Post"
				);

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
									{ className: "heading-block center" },
									React.createElement(
										"h1",
										null,
										"Blog"
									),
									btnSubmit
								),
								React.createElement(
									"div",
									{ className: "postcontent nobottommargin clearfix" },
									React.createElement(
										"div",
										{ id: "posts", className: "small-thumbs" },
										postList
									)
								)
							)
						)
					),
					React.createElement(
						Modal,
						{ show: this.state.showModal, onHide: this.closeModal, bsSize: "large" },
						React.createElement(
							Modal.Header,
							{ closeButton: true, style: { textAlign: "center", padding: 12 } },
							React.createElement(
								"h3",
								null,
								"Submit Post"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "col-md-6" },
									React.createElement("input", { onChange: this.updatePost, value: this.state.post.title, id: "title", className: "form-control", type: "text", placeholder: "Title" }),
									React.createElement("br", null),
									React.createElement("input", { onChange: this.updatePost, value: this.state.post.link, id: "link", className: "form-control", type: "text", placeholder: "http://" }),
									React.createElement("br", null),
									React.createElement("input", { onChange: this.updatePost, value: this.state.post.wistia, id: "wistia", className: "form-control", type: "text", placeholder: "Video" }),
									React.createElement("br", null),
									React.createElement(
										Dropzone,
										{ style: { width: 100 + "%", marginBottom: 24, background: "#fff", border: "1px dotted #ddd" }, onDrop: this.uploadImage },
										React.createElement(
											"div",
											{ style: { padding: 24 } },
											this.state.post.image.length == 0 ? null : React.createElement("img", { style: { width: 64, border: "1px solid #ddd", marginRight: 6 }, src: "https://media-service.appspot.com/site/images/" + this.state.post.image + "?crop=120" }),
											"Drop file here, or click to select image to upload."
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col-md-6" },
									React.createElement("textarea", { onChange: this.updatePost, value: this.state.post.text, id: "text", className: "form-control", placeholder: "Text", style: { minHeight: 260 } }),
									React.createElement("br", null)
								)
							)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ onClick: this.submitPost, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Submit"
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

	return Feed;
})(Component);

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser,
		posts: state.postReducer.postsArray,
		loaderOptions: state.staticReducer.loaderConfig
	};
};


module.exports = connect(stateToProps)(Feed);
// console.log('updatePost: ')