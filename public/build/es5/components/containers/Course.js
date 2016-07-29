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

var CTA = _interopRequire(require("../../components/CTA"));

var CourseSection = _interopRequire(require("../../components/CourseSection"));

var CourseCard = _interopRequire(require("../../components/CourseCard"));

var Application = _interopRequire(require("../../components/Application"));

var DetailBox = _interopRequire(require("../../components/DetailBox"));

var Login = _interopRequire(require("../../components/Login"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var api = _interopRequire(require("../../utils/APIManager"));

var Course = (function (Component) {
	function Course(props, context) {
		_classCallCheck(this, Course);

		_get(Object.getPrototypeOf(Course.prototype), "constructor", this).call(this, props, context);
		this.closeModal = this.closeModal.bind(this);
		this.showLogin = this.showLogin.bind(this);
		this.closeLogin = this.closeLogin.bind(this);
		this.submitApplication = this.submitApplication.bind(this);
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
			value: function componentDidMount() {},
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
		submitApplication: {
			value: function submitApplication(application) {
				var course = this.props.courses[this.props.slug];
				this.setState({ showLoader: true });
				application.course = course.title;
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
				var course = this.props.courses[this.props.slug];

				var bannerIndex = 0;
				if (course.type == "online") bannerIndex = 1;else if (course.type == "immersive") bannerIndex = 2;


				var banner = this.props.banners[bannerIndex];
				var startDate = course.dates == null ? "" : course.dates.split("-")[0].trim();
				var _course = course;
				//		var _accountType = (this.props.currentUser.id == null) ? 'notLoggedIn' : this.props.currentUser.accountType
				var _currentUser = this.props.currentUser;
				var _showLogin = this.showLogin;
				//		var _openStripeModal = this.openStripeModal

				var units = course.units.map(function (unit, i) {
					return React.createElement(CourseSection, { key: i, loginAction: _showLogin, unit: unit, course: _course, currentUser: _currentUser });
				});

				var bootcamps = this.props.bootcamps.map(function (bootcamp, i) {
					return React.createElement(
						"div",
						{ key: bootcamp.id, className: "col-md-12 bottommargin" },
						React.createElement(
							"div",
							{ className: "team team-list clearfix" },
							React.createElement(
								"div",
								{ className: "team-image", style: { width: 150 } },
								React.createElement("img", { className: "img-circle", src: "https://media-service.appspot.com/site/images/" + bootcamp.image + "?crop=260", alt: "Velocity 360" })
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
											{ href: "/course/" + bootcamp.slug },
											bootcamp.title
										)
									),
									React.createElement(
										"span",
										{ style: { color: "#444" } },
										bootcamp.dates
									),
									React.createElement(
										"span",
										{ style: { color: "#444" } },
										bootcamp.schedule
									)
								),
								React.createElement(
									"div",
									{ className: "team-content" },
									bootcamp.description
								)
							)
						)
					);
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
														course.title
													),
													React.createElement(
														"p",
														null,
														course.description
													)
												),
												React.createElement(DetailBox, { showLoader: this.showLoader, hideLoader: this.hideLoader, course: course })
											)
										),
										units,
										React.createElement(CTA, { course: course, currentUser: this.props.currentUser, loginAction: _showLogin })
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						{ style: { background: "#fff", paddingTop: 48, borderTop: "1px solid #ddd" } },
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
								bootcamps
							)
						)
					),
					React.createElement(
						"section",
						{ id: "content", style: { backgroundColor: "#fff", paddingBottom: 0 } },
						React.createElement(
							"div",
							{ className: "row common-height clearfix", style: { background: "#f9f9f9", border: "1px solid #ddd" } },
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
												"Technology, more than any other industry, changes rapidly and many fall behind. As a newcomer to tech, it is imperative to understand the trends and develop the skills that will be valued tomorrow over those in demand today. Velocity 360 strongly prepares students under that guiding principle. Our curriculum is highly focused on the bleeding edge of tech evolution: Node JS, React, Redux, and React Native."
											),
											React.createElement(
												"p",
												null,
												"While other bootcamps continue to teach Ruby on Rails (Dev Bootcamp, Flatiron School, General Assembly, NYCDA, App Academy, etc) and have been doing so for several years, Velocity 360 is the only bootcamp in NYC that focuses on the tremendously growing Node/React/React-Native ecosystem. Rather than joining the mass of Ruby on Rails devs that graduate from bootcamps every three months, you will leave Velocity 360 with the skills highly in demand yet hard to find in the tech world."
											)
										)
									)
								)
							),
							React.createElement("div", { className: "col-sm-4 col-padding", style: { background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: "cover" } })
						)
					),
					course.type == "immersive" ? React.createElement(Application, { onSubmit: this.submitApplication }) : null,
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
								course.title,
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
		courses: state.courseReducer.courses,
		bootcamps: state.courseReducer.courseArray,
		loaderOptions: state.staticReducer.loaderConfig,
		banners: state.staticReducer.banners
	};
};


module.exports = connect(stateToProps)(Course);