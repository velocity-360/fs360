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

var CourseCard = _interopRequire(require("../../components/CourseCard"));

var Application = _interopRequire(require("../../components/Application"));

var DetailBox = _interopRequire(require("../../components/DetailBox"));

var Login = _interopRequire(require("../../components/Login"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var stripe = _interopRequire(require("../../utils/StripeUtils"));

var api = _interopRequire(require("../../api/api"));

var Course = (function (Component) {
	function Course(props, context) {
		_classCallCheck(this, Course);

		_get(Object.getPrototypeOf(Course.prototype), "constructor", this).call(this, props, context);
		this.closeModal = this.closeModal.bind(this);
		this.showLogin = this.showLogin.bind(this);
		this.closeLogin = this.closeLogin.bind(this);
		this.openStripeModal = this.openStripeModal.bind(this);
		this.submitApplication = this.submitApplication.bind(this);
		this.configureStripe = this.configureStripe.bind(this);
		this.showLoader = this.showLoader.bind(this);
		this.hideLoader = this.hideLoader.bind(this);
		this.state = {
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
				if (this.props.course != null) {
					this.configureStripe(this.props.course);
					return;
				}

				var _this = this;
				api.handleGet("/api/course?slug=" + this.props.slug, {}, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.currentStore().dispatch(actions.coursesRecieved(response.courses));

					var course = response.courses[0];
					this.configureStripe(course);
				});
			},
			writable: true,
			configurable: true
		},
		configureStripe: {
			value: function configureStripe(course) {
				if (course.type == "online") {
					// for videos, show subscription prompt:
					stripe.initialize(function (token) {
						_this.setState({ showLoader: true });
						api.submitStripeToken(token, function (err, response) {
							if (err) {
								alert(err.message);
								return;
							}

							window.location.href = "/account";
						});
					});
					return;
				}

				stripe.initializeWithText("Submit Deposit", function (token) {
					_this.setState({ showLoader: true });
					api.submitStripeCharge(token, course, course.deposit, "course", function (err, response) {
						if (err) {
							alert(err.message);
							_this.setState({ showLoader: false });
							return;
						}

						_this.setState({
							showConfirmation: true,
							showLoader: false
						});
					});
				});
			},
			writable: true,
			configurable: true
		},
		closeModal: {
			value: function closeModal() {
				this.setState({
					showLogin: false,
					showConfirmation: false
				});
			},
			writable: true,
			configurable: true
		},
		closeLogin: {
			value: function closeLogin() {
				this.setState({ showLogin: false });
			},
			writable: true,
			configurable: true
		},
		showLogin: {
			value: function showLogin() {
				this.setState({ showLogin: true });
			},
			writable: true,
			configurable: true
		},
		showLoader: {
			value: function showLoader() {
				this.setState({ showLoader: true });
			},
			writable: true,
			configurable: true
		},
		hideLoader: {
			value: function hideLoader() {
				this.setState({ showLoader: false });
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
				if (this.props.course.type == "online") bannerIndex = 1;else if (this.props.course.type == "immersive") bannerIndex = 2;

				var banner = this.props.banners[bannerIndex];
				var startDate = this.props.course.dates == null ? "" : this.props.course.dates.split("-")[0].trim();
				var _course = this.props.course;
				var _accountType = this.props.currentUser.id == null ? "notLoggedIn" : this.props.currentUser.accountType;
				var _showLogin = this.showLogin;
				var _openStripeModal = this.openStripeModal;
				var units = this.props.course.units.map(function (unit, i) {
					return React.createElement(CourseSection, { key: i, subscribeAction: _openStripeModal, loginAction: _showLogin, unit: unit, course: _course, accountType: _accountType });
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
												React.createElement(DetailBox, { showLoader: this.showLoader, hideLoader: this.hideLoader, course: this.props.course })
											)
										),
										units,
										this.props.course.type != "online" ? React.createElement(
											"div",
											{ className: "entry clearfix" },
											React.createElement(
												"div",
												{ className: "entry-timeline" },
												"Join",
												React.createElement("span", null),
												React.createElement("div", { className: "timeline-divider" })
											),
											React.createElement(
												"div",
												{ className: "entry-image" },
												React.createElement(
													"div",
													{ className: "panel panel-default" },
													React.createElement(
														"div",
														{ className: "panel-body", style: { padding: 36, paddingBottom: 0 } },
														this.props.course.type == "live" ? React.createElement(
															"h2",
															null,
															"Register"
														) : React.createElement(
															"h2",
															null,
															"Details"
														),
														React.createElement("hr", null),
														React.createElement(
															"div",
															{ className: "col_half" },
															"Date: ",
															this.props.course.dates,
															React.createElement("br", null),
															"Time: ",
															this.props.course.schedule,
															React.createElement("br", null),
															"Deposit: $",
															this.props.course.deposit,
															React.createElement("br", null),
															"Regular Tuition: $",
															this.props.course.tuition,
															React.createElement("br", null),
															"Premium Member Tuition: $",
															this.props.course.premiumTuition,
															React.createElement("br", null),
															React.createElement("br", null),
															this.props.course.type == "live" ? React.createElement(
																"div",
																{ className: "col_full panel panel-default" },
																React.createElement(
																	"div",
																	{ style: { backgroundColor: "#f1f9f5", textAlign: "left" }, className: "panel-heading" },
																	"Submit Deposit"
																),
																React.createElement(
																	"div",
																	{ className: "panel-body", style: { textAlign: "left" } },
																	React.createElement(
																		"a",
																		{ href: this.props.course.paypalLink, target: "_blank", className: "button button-xlarge tright" },
																		"PayPal",
																		React.createElement("i", { "class": "icon-circle-arrow-right" })
																	),
																	React.createElement("br", null),
																	React.createElement(
																		"a",
																		{ onClick: this.openStripeModal, href: "#", className: "button button-xlarge tright" },
																		"Credit Card",
																		React.createElement("i", { "class": "icon-circle-arrow-right" })
																	)
																)
															) : React.createElement(
																"a",
																{ href: "#application", className: "button button-xlarge tright" },
																"Apply",
																React.createElement("i", { "class": "icon-circle-arrow-right" })
															)
														),
														React.createElement(
															"div",
															{ className: "col_half col_last" },
															React.createElement("img", { style: { width: "80%", float: "right" }, src: "https://media-service.appspot.com/site/images/" + this.props.course.image + "?crop=460" })
														)
													)
												)
											)
										) : null
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
												"Our Mission is to teach tomorrow’s technology, today.  If you want to work for a leading tech firm, for a technology startup, or become an entrepreneur, our classes will put you on the right track to achieve these goals.  This iOS class is based entirely on Swift language, which is the main language you will need to know while developing the majority of iOS app.  In our iOS class you will not be learning how to program games, however you will be able to learn how to develop social media applications similar to Snapchat and Instagram."
											),
											React.createElement(
												"p",
												null,
												"Even if you do not want to become a professional developer and have it become your lifelong career, learning how an iOS app developed will give you the edge both in the immediate and distant future.  It might be a cliché, but learning how to code will empower you to act on future ideas. For example if you are sitting in class one day and think of the next great social media app, it doesn’t have to just be a pipe dream or something that you would have to rely on someone else to build, it could be a project that you start building right away."
											),
											React.createElement(
												"a",
												{ target: "_blank", href: "https://www.facebook.com/Velocity-360-1631852427085987/", className: "social-icon inline-block si-small si-light si-rounded si-facebook" },
												React.createElement("i", { className: "icon-facebook" }),
												React.createElement("i", { className: "icon-facebook" })
											),
											React.createElement(
												"a",
												{ target: "_blank", href: "https://twitter.com/velocity360_io", className: "social-icon inline-block si-small si-light si-rounded si-twitter" },
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
					React.createElement(Login, { isVisible: this.state.showLogin, hide: this.closeLogin, redirect: null }),
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
	return {
		currentUser: state.profileReducer.currentUser,
		course: state.courseReducer.courseArray[0],
		loaderOptions: state.staticReducer.loaderConfig,
		banners: state.staticReducer.banners
	};
};


module.exports = connect(stateToProps)(Course);