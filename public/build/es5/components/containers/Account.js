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
var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var Dropzone = _interopRequire(require("react-dropzone"));

var Loader = _interopRequire(require("react-loader"));

var TextUtils = _interopRequire(require("../../utils/TextUtils"));

var CourseCard = _interopRequire(require("../../components/CourseCard"));

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var api = _interopRequire(require("../../utils/APIManager"));

var Account = (function (Component) {
	function Account(props, context) {
		_classCallCheck(this, Account);

		_get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this, props, context);
		this.uploadProfileImage = this.uploadProfileImage.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
		this.updateCurrentUser = this.updateCurrentUser.bind(this);
		this.state = {
			showLoader: false
		};
	}

	_inherits(Account, Component);

	_prototypeProperties(Account, null, {
		componentDidMount: {
			value: function componentDidMount() {
				api.handleGet("/api/course", { subscribers: this.props.profile.id }, function (err, response) {
					console.log("Fetch Courses: " + JSON.stringify(response));
					if (err) {
						return;
					}

					store.currentStore().dispatch(actions.coursesRecieved(response.courses));
				});
			},
			writable: true,
			configurable: true
		},
		uploadProfileImage: {
			value: function uploadProfileImage(files) {
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

					var updatedUser = Object.assign({}, _this.props.profile);
					updatedUser.image = response.id;
					store.currentStore().dispatch(actions.updateCurrentUser(updatedUser));
				});
			},
			writable: true,
			configurable: true
		},
		updateCurrentUser: {
			value: function updateCurrentUser(event) {
				event.preventDefault();
				var updatedUser = Object.assign({}, this.props.profile);
				updatedUser[event.target.id] = event.target.value;
				store.currentStore().dispatch(actions.updateCurrentUser(updatedUser));
			},
			writable: true,
			configurable: true
		},
		updateProfile: {
			value: function updateProfile(event) {
				event.preventDefault();

				var profile = Object.assign({}, this.props.profile);
				profile.tags = TextUtils.stringToArray(profile.tagString, ",");

				var endpoint = "/api/profile/" + profile.id;
				api.handlePut(endpoint, profile, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.currentStore().dispatch(actions.currentUserRecieved(response.profile));
					alert("Profile Updated");
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var courseList = this.props.courses.map(function (course) {
					return React.createElement(CourseCard, { key: course.id, course: course });
				});

				return React.createElement(
					"div",
					null,
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(Sidebar, null),
					React.createElement(
						"section",
						{ id: "content" },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "postcontent nobottommargin clearfix" },
									React.createElement(
										"div",
										{ className: "tabs clearfix", id: "tab-1" },
										React.createElement(
											"ul",
											{ className: "tab-nav clearfix" },
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#tabs-4" },
													"Courses"
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#tabs-2" },
													"Profile"
												)
											)
										),
										React.createElement(
											"div",
											{ className: "tab-container" },
											React.createElement(
												"div",
												{ className: "tab-content clearfix", id: "tabs-4" },
												React.createElement(
													"div",
													{ id: "posts", className: "events small-thumbs" },
													courseList
												)
											),
											React.createElement(
												"div",
												{ className: "tab-content clearfix", id: "tabs-2" },
												React.createElement(
													"div",
													{ id: "contact-form-overlay", className: "clearfix" },
													React.createElement("div", { id: "contact-form-result", "data-notify-type": "success", "data-notify-msg": "<i className=icon-ok-sign></i> Message Sent Successfully!" }),
													React.createElement(
														"form",
														{ className: "nobottommargin", id: "template-contactform", name: "template-contactform", action: "", method: "post" },
														React.createElement(
															"div",
															{ className: "col_half" },
															React.createElement(
																"label",
																null,
																"First Name"
															),
															React.createElement("input", { type: "text", onChange: this.updateCurrentUser, id: "firstName", value: this.props.profile.firstName, className: "form-control" })
														),
														React.createElement(
															"div",
															{ className: "col_half col_last" },
															React.createElement(
																"label",
																null,
																"Last Name"
															),
															React.createElement("input", { type: "text", onChange: this.updateCurrentUser, id: "lastName", value: this.props.profile.lastName, className: "form-control" })
														),
														React.createElement("div", { className: "clear" }),
														React.createElement(
															"div",
															{ className: "col_half" },
															React.createElement(
																"label",
																null,
																"Username"
															),
															React.createElement("input", { type: "text", onChange: this.updateCurrentUser, id: "username", value: this.props.profile.username, className: "form-control" })
														),
														React.createElement(
															"div",
															{ className: "col_half col_last" },
															React.createElement(
																"label",
																null,
																"GitHub"
															),
															React.createElement("input", { type: "text", onChange: this.updateCurrentUser, id: "githubId", value: this.props.profile.githubId, className: "form-control", placeholder: "e.g. https://github.com/fullstack360" })
														),
														React.createElement(
															"div",
															{ className: "col_half" },
															React.createElement(
																"label",
																{ "for": "template-contactform-message" },
																"Profile Image"
															),
															React.createElement(
																Dropzone,
																{ style: { width: 100 + "%", marginBottom: 24, background: "#fff", border: "1px solid #ddd" }, onDrop: this.uploadProfileImage },
																React.createElement(
																	"div",
																	{ style: { padding: 24 } },
																	this.props.profile.image.length == 0 ? null : React.createElement("img", { style: { width: 64, border: "1px solid #ddd", marginRight: 6 }, src: "https://media-service.appspot.com/site/images/" + this.props.profile.image + "?crop=120" }),
																	"Drop file here, or click to select image to upload."
																)
															)
														),
														React.createElement(
															"div",
															{ className: "col_half col_last" },
															React.createElement(
																"label",
																null,
																"Skills"
															),
															React.createElement("input", { type: "text", onChange: this.updateCurrentUser, id: "tagString", value: this.props.profile.tagString, className: "form-control", placeholder: "iOS, Python, git..." })
														),
														React.createElement("div", { className: "clear" }),
														React.createElement(
															"div",
															{ className: "col_full" },
															React.createElement(
																"label",
																{ "for": "template-contactform-message" },
																"Bio ",
																React.createElement(
																	"small",
																	null,
																	"*"
																)
															),
															React.createElement("textarea", { className: "form-control", onChange: this.updateCurrentUser, id: "bio", value: this.props.profile.bio, rows: "6", cols: "30" })
														),
														React.createElement(
															"div",
															{ className: "col_full" },
															React.createElement(
																"button",
																{ onClick: this.updateProfile, className: "button button-border button-dark button-rounded noleftmargin", type: "submit" },
																"Update"
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
					),
					React.createElement(Footer, null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Account;
})(Component);

var stateToProps = function (state) {
	return {
		profile: state.profileReducer.currentUser,
		loaderOptions: state.staticReducer.loaderConfig,
		courses: state.courseReducer.courseArray
	};
};

module.exports = connect(stateToProps)(Account);