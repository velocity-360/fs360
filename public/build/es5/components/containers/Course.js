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
var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var CourseSection = _interopRequire(require("../../components/CourseSection"));

var Application = _interopRequire(require("../../components/Application"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var stripe = _interopRequire(require("../../utils/StripeUtils"));

var api = _interopRequire(require("../../api/api"));

var Course = (function (Component) {
	function Course(props, context) {
		_classCallCheck(this, Course);

		_get(Object.getPrototypeOf(Course.prototype), "constructor", this).call(this, props, context);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.showLogin = this.showLogin.bind(this);
		this.login = this.login.bind(this);
		this.updateLogin = this.updateLogin.bind(this);
		this.openStripeModal = this.openStripeModal.bind(this);
		this.updateSyllabusRequest = this.updateSyllabusRequest.bind(this);
		this.submitApplication = this.submitApplication.bind(this);
		this.syllabusRequest = this.syllabusRequest.bind(this);
		this.state = {
			showLoader: false,
			showModal: false,
			showLogin: false,
			showConfirmation: false,
			syllabusRequest: {
				name: "",
				email: "",
				course: ""
			}
		};
	}

	_inherits(Course, Component);

	_prototypeProperties(Course, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				api.handleGet("/api/course?slug=" + this.props.slug, {}, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					var course = response.courses[0];
					if (course.type == "online") {
						// for videos, show subscription prompt:
						stripe.initialize(function (token) {
							_this.setState({ showLoader: true });
							api.submitStripeToken(token, function () {
								api.handleGet("/account/currentuser", {}, function (err, response) {
									_this.setState({ showLoader: false });
									if (err) {
										alert(response.message);
										return;
									}

									store.dispatch(actions.currentUserRecieved(response.profile));
								});
							});
						});
					} else {
						stripe.initializeWithText("Submit Deposit", function (token) {
							_this.setState({ showLoader: true });

							api.submitStripeCharge(token, _this.props.course.id, _this.props.course.deposit, function () {
								api.handleGet("/account/currentuser", {}, function (err, response) {
									_this.setState({
										showConfirmation: true,
										showLoader: false
									});
								});
							});
						});
					}

					store.dispatch(actions.coursesRecieved(response.courses));
				});
			},
			writable: true,
			configurable: true
		},
		openModal: {
			value: function openModal(event) {
				//		console.log('OPEN MODAL')
				event.preventDefault();
				this.setState({ showModal: true });
			},
			writable: true,
			configurable: true
		},
		updateSyllabusRequest: {
			value: function updateSyllabusRequest(event) {
				var s = Object.assign({}, this.state.syllabusRequest);
				s[event.target.id] = event.target.value;
				s.course = this.props.course.title;
				this.setState({
					syllabusRequest: s
				});
			},
			writable: true,
			configurable: true
		},
		syllabusRequest: {
			value: function syllabusRequest(event) {
				event.preventDefault();

				this.setState({
					showModal: false,
					showLoader: true
				});

				var _this = this;
				api.handlePost("/api/syllabus", _this.state.syllabusRequest, function (err, response) {
					_this.setState({
						showLoader: false
					});

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
		closeModal: {
			value: function closeModal() {
				this.setState({
					showModal: false,
					showLogin: false,
					showConfirmation: false
				});
			},
			writable: true,
			configurable: true
		},
		showLogin: {
			value: function showLogin(event) {
				event.preventDefault();
				this.setState({ showLogin: true });
			},
			writable: true,
			configurable: true
		},
		updateLogin: {
			value: function updateLogin(event) {
				event.preventDefault();

				var updatedUser = Object.assign({}, this.props.currentUser);
				updatedUser[event.target.id] = event.target.value;
				store.dispatch(actions.updateCurrentUser(updatedUser));
			},
			writable: true,
			configurable: true
		},
		login: {
			value: function login(event) {
				event.preventDefault();
				this.setState({
					showModal: false,
					showLogin: false,
					showLoader: true
				});

				var _this = this;
				api.handlePost("/account/login", this.props.currentUser, function (err, response) {
					_this.setState({
						showLoader: false
					});

					if (err) {
						alert(err.message);
						return;
					}

					store.dispatch(actions.currentUserRecieved(response.profile));
				});
			},
			writable: true,
			configurable: true
		},
		openStripeModal: {
			value: function openStripeModal(event) {
				event.preventDefault();
				if (this.props.course.type == "online") stripe.showModal();else stripe.showModalWithText(this.props.course.title);
			},
			writable: true,
			configurable: true
		},
		submitApplication: {
			value: function submitApplication(application) {
				//		console.log('submitApplication: '+JSON.stringify(application))

				this.setState({ showLoader: true });
				application.course = this.props.course.title;
				var _this = this;
				api.handlePost("/api/application", application, function (err, response) {
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
				var bannerIndex = 0;
				var btnRegister = null;
				if (this.props.course.type == "online") {
					bannerIndex = 1;
					btnRegister = React.createElement(
						"a",
						{ onClick: this.openStripeModal, style: { marginRight: 12 }, href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
						"Register"
					);
				} else if (this.props.course.type == "immersive") {
					bannerIndex = 2;
					btnRegister = React.createElement(
						"a",
						{ style: { marginRight: 12 }, href: "#application", className: "button button-border button-dark button-rounded noleftmargin" },
						"Apply"
					);
				} else {
					btnRegister = React.createElement(
						"a",
						{ onClick: this.openStripeModal, style: { marginRight: 12 }, href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
						"Register"
					);
				}

				var banner = this.props.banners[bannerIndex];

				var startDate = this.props.course.dates == null ? "" : this.props.course.dates.split("-")[0].trim();
				var detailBox = null;
				if (this.props.course.type != "online") {
					detailBox = React.createElement(
						"div",
						{ className: "col_half panel panel-default col_last" },
						React.createElement(
							"div",
							{ style: { backgroundColor: "#f1f9f5" }, className: "panel-heading" },
							"Details"
						),
						React.createElement(
							"div",
							{ className: "panel-body" },
							this.props.course.dates,
							React.createElement("br", null),
							this.props.course.schedule,
							React.createElement("br", null),
							"Tuition: $",
							this.props.course.tuition,
							React.createElement("br", null),
							"Deposit: $",
							this.props.course.deposit,
							React.createElement("hr", null),
							btnRegister,
							React.createElement(
								"a",
								{ onClick: this.openModal, href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
								"Request Syllabus"
							)
						)
					);
				}


				var _course = this.props.course;
				var _accountType = this.props.currentUser.accountType;
				var _showLogin = this.showLogin;
				var _openStripeModal = this.openStripeModal;
				var units = this.props.course.units.map(function (unit, i) {
					return React.createElement(CourseSection, { key: unit.index, subscribeAction: _openStripeModal, loginAction: _showLogin, unit: unit, course: _course, accountType: _accountType });
				});

				return React.createElement(
					"div",
					null,
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(Sidebar, null),
					React.createElement(
						"section",
						{ id: "content", style: { backgroundColor: "#F5F5F5" } },
						React.createElement(
							"div",
							{ className: "content-wrap" },
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
												{ className: "entry-image" },
												React.createElement("img", { style: { background: "#fff", padding: 6, border: "1px solid #ddd" }, className: "image_fade", src: "/images/" + banner, alt: "FullStack 360" })
											),
											React.createElement(
												"div",
												{ className: "entry-content" },
												React.createElement(
													"div",
													{ className: "col_half" },
													React.createElement(
														"h2",
														{ style: { marginBottom: 0 } },
														this.props.course.title
													),
													React.createElement(
														"p",
														null,
														this.props.course.description
													)
												),
												detailBox
											)
										),
										units
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						{ id: "content", style: { backgroundColor: "#fff", paddingBottom: 0 } },
						React.createElement(
							"div",
							{ className: "row common-height clearfix", style: { background: "#fff", border: "1px solid #ddd" } },
							React.createElement(
								"div",
								{ className: "col-sm-8 col-padding" },
								React.createElement(
									"div",
									null,
									React.createElement(
										"div",
										{ className: "heading-block" },
										React.createElement(
											"h3",
											null,
											"Prepare for Tomorrow"
										)
									),
									React.createElement(
										"div",
										{ className: "row clearfix" },
										React.createElement(
											"div",
											{ className: "col-md-10" },
											React.createElement(
												"p",
												null,
												"Our Mission is to teach you tomorrow’s technology, today.  If you want to work for a leading tech firm, for a technology startup, or become an entrepreneur, our classes will put you on the right track to achieve these goals.  This iOS class is based entirely on Swift language, which is the main language you will need to know while developing the majority of iOS app.  In our iOS class you will not be learning how to program games, however you will be able to learn how to develop social media applications similar to Snapchat and Instagram."
											),
											React.createElement(
												"p",
												null,
												"Even if you do not want to become a professional developer and have it become your lifelong career, learning how an iOS app developed will give you the edge both in the immediate and distant future.  It might be a cliché, but learning how to code will empower you to act on future ideas. For example if you are sitting in class one day and think of the next great social media app, it doesn’t have to just be a pipe dream or something that you would have to rely on someone else to build, it could be a project that you start building right away."
											),
											React.createElement(
												"a",
												{ target: "_blank", href: "https://www.facebook.com/FullStack-360-1631852427085987/", className: "social-icon inline-block si-small si-light si-rounded si-facebook" },
												React.createElement("i", { className: "icon-facebook" }),
												React.createElement("i", { className: "icon-facebook" })
											),
											React.createElement(
												"a",
												{ target: "_blank", href: "https://twitter.com/fullstack360", className: "social-icon inline-block si-small si-light si-rounded si-twitter" },
												React.createElement("i", { className: "icon-twitter" }),
												React.createElement("i", { className: "icon-twitter" })
											)
										)
									)
								)
							),
							React.createElement("div", { className: "col-sm-4 col-padding", style: { background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: "cover" } })
						)
					),
					this.props.course.type == "immersive" ? React.createElement(Application, { onSubmit: this.submitApplication }) : null,
					React.createElement(
						Modal,
						{ show: this.state.showLogin, onHide: this.closeModal },
						React.createElement(
							Modal.Header,
							{ closeButton: true, style: { textAlign: "center", padding: 12 } },
							React.createElement(
								"h2",
								null,
								"Login"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement("input", { onChange: this.updateLogin, value: this.props.currentUser.email, className: "form-control", type: "text", id: "email", placeholder: "Email" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateLogin, value: this.props.currentUser.password, className: "form-control", type: "password", id: "password", placeholder: "Password" }),
							React.createElement("br", null)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ onClick: this.login, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Log In"
							)
						)
					),
					React.createElement(
						Modal,
						{ show: this.state.showModal, onHide: this.closeModal },
						React.createElement(
							Modal.Header,
							{ closeButton: true, style: { textAlign: "center", padding: 12 } },
							React.createElement(
								"h2",
								null,
								"Request Syllabus"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement("input", { onChange: this.updateSyllabusRequest, value: this.state.syllabusRequest.name, className: "form-control", type: "text", id: "name", placeholder: "Name" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateSyllabusRequest, value: this.state.syllabusRequest.email, className: "form-control", type: "text", id: "email", placeholder: "Email" }),
							React.createElement("br", null)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ onClick: this.syllabusRequest, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Submit"
							)
						)
					),
					React.createElement(
						Modal,
						{ show: this.state.showConfirmation, onHide: this.closeModal },
						React.createElement(
							Modal.Header,
							{ closeButton: true, style: { textAlign: "center", padding: 12 } },
							React.createElement(
								"h2",
								null,
								"Deposit Confirmed"
							),
							React.createElement("img", { style: { width: 120, borderRadius: 60 }, src: "/images/logo_round_blue_260.png" })
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24, textAlign: "center" } },
							React.createElement(
								"p",
								null,
								"Thank you for submitting a deposit to the ",
								this.props.course.title,
								". We look forward to meeting you on ",
								startDate,
								". If you have any questions or concerns, feel free to contact us at katrina@velocity360.io. Thank you."
							)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ onClick: this.closeModal, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"OK"
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

	return Course;
})(Component);

var stateToProps = function (state) {
	var keys = Object.keys(state.courseReducer.courses);

	return {
		currentUser: state.profileReducer.currentUser,
		course: state.courseReducer.courses[keys[0]],
		testimonials: state.staticReducer.testimonials,
		loaderOptions: state.staticReducer.loaderConfig,
		banners: state.staticReducer.banners
	};
};


module.exports = connect(stateToProps)(Course);