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

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var ProjectCard = _interopRequire(require("../../components/ProjectCard"));

var api = _interopRequire(require("../../api/api"));

var Account = (function (Component) {
	function Account(props, context) {
		_classCallCheck(this, Account);

		_get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this, props, context);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.updateProject = this.updateProject.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.uploadProfileImage = this.uploadProfileImage.bind(this);
		this.submitProject = this.submitProject.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
		this.updateCurrentUser = this.updateCurrentUser.bind(this);
		this.state = {
			showLoader: false,
			showModal: false,
			selectedProject: null,
			project: {
				title: "",
				description: "",
				image: "tHyPScSk", // blue logo
				link: "",
				tagString: ""
			}
		};
	}

	_inherits(Account, Component);

	_prototypeProperties(Account, null, {
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

					var project = Object.assign({}, _this.state.project);
					project.image = response.id;
					_this.setState({
						project: project
					});
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
		updateProject: {
			value: function updateProject(event) {
				event.preventDefault();
				var proj = Object.assign({}, this.state.project);
				proj[event.target.id] = event.target.value;
				this.setState({
					project: proj
				});
			},
			writable: true,
			configurable: true
		},
		submitProject: {
			value: function submitProject(event) {
				event.preventDefault();
				var proj = Object.assign({}, this.state.project);
				proj.tags = TextUtils.stringToArray(this.state.project.tagString, ",");
				proj.profile = {
					id: this.props.profile.id,
					image: this.props.profile.image,
					name: this.props.profile.username
				};

				this.setState({
					showLoader: true
				});

				api.handlePost("/api/project", proj, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					//			console.log('PROJECT CREATED: '+JSON.stringify(response))
					window.location.href = "/project/" + response.project.slug;
				});
			},
			writable: true,
			configurable: true
		},
		updateCurrentUser: {
			value: function updateCurrentUser(event) {
				//		console.log('updateCurrentUser: '+event.target.id)
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
				var projectList = null;
				if (this.props.projects != null) {
					projectList = this.props.projects.map(function (project, i) {
						return React.createElement(ProjectCard, { key: project.id, project: project });
					});
				}

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
																	this.state.project.image.length == 0 ? null : React.createElement("img", { style: { width: 64, border: "1px solid #ddd", marginRight: 6 }, src: "https://media-service.appspot.com/site/images/" + this.props.profile.image + "?crop=120" }),
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
											),
											React.createElement(
												"div",
												{ className: "tab-content clearfix", id: "tabs-4" },
												this.props.profile.id == null ? null : React.createElement(
													"a",
													{ style: { marginRight: 12, marginBottom: 24 }, onClick: this.openModal, href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
													"Add Project"
												),
												React.createElement(
													"div",
													{ className: "row" },
													projectList
												)
											)
										)
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
								"Project"
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
									React.createElement("input", { onChange: this.updateProject, id: "title", value: this.state.project.title, className: "form-control", type: "text", placeholder: "Title" }),
									React.createElement("br", null),
									React.createElement("input", { onChange: this.updateProject, id: "link", value: this.state.project.link, className: "form-control", type: "text", placeholder: "http://" }),
									React.createElement("br", null),
									React.createElement("input", { onChange: this.updateProject, id: "tagString", value: this.state.project.tagString, className: "form-control", type: "text", placeholder: "Python, iOS, JavaScript, etc." }),
									React.createElement("br", null),
									React.createElement(
										Dropzone,
										{ style: { width: 100 + "%", marginBottom: 24, background: "#fff", border: "1px dotted #ddd" }, onDrop: this.uploadImage },
										React.createElement(
											"div",
											{ style: { padding: 24 } },
											this.state.project.image.length == 0 ? null : React.createElement("img", { style: { width: 64, border: "1px solid #ddd", marginRight: 6 }, src: "https://media-service.appspot.com/site/images/" + this.state.project.image + "?crop=120" }),
											"Drop file here, or click to select image to upload."
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col-md-6" },
									React.createElement("textarea", { onChange: this.updateProject, id: "description", value: this.state.project.description, className: "form-control", placeholder: "Text", style: { minHeight: 260 } }),
									React.createElement("br", null)
								)
							)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ onClick: this.submitProject, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
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

	return Account;
})(Component);

var stateToProps = function (state) {
	var currentUser = state.profileReducer.currentUser;
	var projectsArray = state.projectReducer.projectsArray;

	if (projectsArray == null && currentUser.id != null) {
		api.handleGet("/api/project?profile.id=" + currentUser.id, {}, function (err, response) {
			if (err) {
				return;
			}

			//			console.log('FETCH PROJECTS: '+JSON.stringify(response))
			store.dispatch(actions.projectsRecieved(response.projects));
		});
	}

	return {
		profile: currentUser,
		projects: projectsArray,
		loaderOptions: state.staticReducer.loaderConfig
	};
};

module.exports = connect(stateToProps)(Account);