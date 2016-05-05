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

var Nav = _interopRequire(require("../../components/Nav"));

var Footer = _interopRequire(require("../../components/Footer"));

var EventCard = _interopRequire(require("../../components/EventCard"));

var Testimonial = _interopRequire(require("../../components/Testimonial"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var Ios = (function (Component) {
	function Ios(props, context) {
		_classCallCheck(this, Ios);

		_get(Object.getPrototypeOf(Ios.prototype), "constructor", this).call(this, props, context);
		this.updateUserRegistration = this.updateUserRegistration.bind(this);
		this.register = this.register.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.rsvp = this.rsvp.bind(this);
		this.syllabusRequest = this.syllabusRequest.bind(this);
		this.validate = this.validate.bind(this);
		this.showRegistrationForm = this.showRegistrationForm.bind(this);
		this.state = {
			showRegistration: false,
			showLoader: false,
			showModal: false,
			bootcamp: {
				subject: "Bootcamp",
				image: "logo_round_green_260.png",
				button: "Request Info"
			},
			selectedEvent: {
				id: null,
				title: "",
				image: ""
			},
			membershiptype: "premium",
			selectedCourse: "ios bootcamp" // for syllabus requests
		};
	}

	_inherits(Ios, Component);

	_prototypeProperties(Ios, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				api.handleGet("/api/event", {}, function (err, response) {
					if (err) {
						return;
					}

					store.dispatch(actions.eventsRecieved(response.events));
				});
			},
			writable: true,
			configurable: true
		},
		updateUserRegistration: {
			value: function updateUserRegistration(event) {
				console.log("updateUserRegistration: " + event.target.id);
				event.preventDefault();

				if (event.target.id == "course") {
					this.setState({
						selectedCourse: event.target.value
					});
					return;
				}

				if (event.target.id == "membershiptype") {
					this.setState({
						membershiptype: event.target.value
					});
				}

				var updatedUser = Object.assign({}, this.props.currentUser);
				updatedUser[event.target.id] = event.target.value;
				store.dispatch(actions.updateCurrentUser(updatedUser));
			},
			writable: true,
			configurable: true
		},
		validate: {
			value: function validate(withPassword) {
				console.log("VALIDATE: " + JSON.stringify(this.props.currentUser));
				if (this.props.currentUser.firstName.length == 0) {
					return "First Name";
				}if (this.props.currentUser.lastName.length == 0) {
					return "Last Name";
				}if (this.props.currentUser.email.length == 0) {
					return "Email";
				}if (withPassword == false) {
					return null;
				}if (this.props.currentUser.password.length == 0) {
					return "Password";
				}return null // this is successful
				;
			},
			writable: true,
			configurable: true
		},
		register: {
			value: function register(event) {
				event.preventDefault();
				var missingField = this.validate(true);
				if (missingField != null) {
					alert("Please enter your " + missingField);
					return;
				}

				this.setState({
					showModal: false,
					showLoader: true
				});

				var _this = this;
				api.handlePost("/api/profile", this.props.currentUser, function (err, response) {
					console.log("REGISTER RESPONSE: " + JSON.stringify(response));

					if (err) {
						_this.setState({
							showLoader: false
						});
						alert(err.message);
						return;
					}

					//			alert(response.message)
					window.location.href = "/courses";
				});
			},
			writable: true,
			configurable: true
		},
		rsvp: {
			value: function rsvp(event) {
				event.preventDefault();
				var missingField = this.validate(false);
				if (missingField != null) {
					alert("Please enter your " + missingField);
					return;
				}

				this.setState({
					showModal: false,
					showLoader: true
				});

				var _this = this;
				var pkg = {
					visitor: this.props.currentUser,
					event: this.state.selectedEvent
				};

				api.handlePost("/api/rsvp", pkg, function (err, response) {
					console.log("RSVP REQUEST RESPONSE: " + JSON.stringify(response));
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
		syllabusRequest: {
			value: function syllabusRequest(event) {
				event.preventDefault();
				console.log("SYLLABUS REQUEST: " + this.state.selectedCourse);

				var missingField = this.validate(false);
				if (missingField != null) {
					alert("Please enter your " + missingField);
					return;
				}

				var pkg = {
					course: this.state.selectedCourse,
					visitor: this.props.currentUser
				};

				this.setState({
					showModal: false,
					showLoader: true
				});

				var _this = this;
				api.handlePost("/api/syllabus", pkg, function (err, response) {
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
		openModal: {
			value: function openModal(event) {
				console.log("OPEN MODAL: " + event.target.id);
				event.preventDefault();

				this.setState({
					showModal: true,
					selectedEvent: event.target.id == "bootcamp" ? this.state.bootcamp : this.props.events[event.target.id]
				});
			},
			writable: true,
			configurable: true
		},
		closeModal: {
			value: function closeModal() {
				this.setState({
					showRegistration: false,
					showModal: false
				});
			},
			writable: true,
			configurable: true
		},
		showRegistrationForm: {
			value: function showRegistrationForm(event) {
				event.preventDefault();
				this.setState({
					membershiptype: event.target.id,
					showRegistration: true
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(
						"header",
						{ id: "header", className: "transparent-header page-section dark" },
						React.createElement(
							"div",
							{ id: "header-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ id: "primary-menu-trigger" },
									React.createElement("i", { className: "icon-reorder" })
								),
								React.createElement(
									"div",
									{ id: "logo" },
									React.createElement(
										"a",
										{ href: "/", className: "standard-logo", "data-dark-logo": "/images/logo-dark.png" },
										React.createElement("img", { src: "/images/logo.png", alt: "FullStack 360" })
									),
									React.createElement(
										"a",
										{ href: "/", className: "retina-logo", "data-dark-logo": "/images/logo-dark@2x.png" },
										React.createElement("img", { src: "/images/logo@2x.png", alt: "FullStack 360" })
									)
								),
								React.createElement(
									"nav",
									{ id: "primary-menu" },
									React.createElement(
										"ul",
										{ className: "one-page-menu" },
										React.createElement(
											"li",
											{ className: "current" },
											React.createElement(
												"a",
												{ href: "/", "data-href": "#header" },
												React.createElement(
													"div",
													null,
													"Home"
												)
											)
										),
										React.createElement(
											"li",
											null,
											React.createElement(
												"a",
												{ href: "/application", "data-href": "#section-buy" },
												React.createElement(
													"div",
													null,
													"Apply"
												)
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						{ id: "slider", style: { background: "url(\"/images/ios-banner.jpg\") center", overflow: "visible" }, "data-height-lg": "450", "data-height-md": "450", "data-height-sm": "600", "data-height-xs": "600", "data-height-xxs": "600" },
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"form",
								{ action: "#", method: "post", role: "form", className: "landing-wide-form landing-form-overlay dark clearfix" },
								React.createElement(
									"div",
									{ className: "heading-block nobottommargin nobottomborder" },
									React.createElement(
										"h2",
										null,
										"Request More Info"
									)
								),
								React.createElement("div", { className: "line", style: { margin: "15px 0 30px" } }),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement("input", { type: "text", className: "form-control input-lg not-dark", placeholder: "Name" })
								),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement("input", { type: "text", className: "form-control input-lg not-dark", placeholder: "Last Name" })
								),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement("input", { type: "email", className: "form-control input-lg not-dark", placeholder: "Email" })
								),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement("input", { type: "password", className: "form-control input-lg not-dark", placeholder: "Phone" })
								),
								React.createElement(
									"div",
									{ className: "col_full nobottommargin" },
									React.createElement(
										"button",
										{ className: "btn btn-lg btn-danger btn-block nomargin", value: "submit", type: "submit" },
										"Submit"
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						{ id: "content" },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "promo promo-dark promo-full landing-promo header-stick" },
								React.createElement(
									"div",
									{ className: "container clearfix" },
									React.createElement(
										"h3",
										null,
										"Beautiful Landing Page designs waiting for you inside"
									),
									React.createElement(
										"span",
										null,
										"Youll love our beautiful & interactive builder that makes your build process easier & fun."
									)
								)
							),
							React.createElement(
								"div",
								{ className: "container clearfix", style: { paddingTop: 64 } },
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm", style: { background: "#f9f9f9" } },
									React.createElement(
										"div",
										{ className: "widget clearfix", style: { padding: 24 } },
										React.createElement(
											"h4",
											null,
											"Spotlight"
										),
										React.createElement("img", { style: { width: 128, borderRadius: 64 }, src: "/images/briancorrea.jpg", alt: "FullStaack 360" }),
										React.createElement("hr", null),
										React.createElement(
											"h3",
											{ style: { marginBottom: 6 } },
											"Brian Correa"
										),
										React.createElement(
											"strong",
											{ style: { color: "#1ABC9C" } },
											"iOS & Node Course"
										),
										React.createElement("br", null),
										React.createElement(
											"p",
											null,
											"On the first day of class my instructor taught me more than I taught myself in the three weeks. I immediately knew I made the right choice to learn iOS with FS360. The hands-on structure of the class is the best use of my time and prevents me from wasting time trying to get one thing off the ground. Instead, I was immediately building projects. I am confident that after the FS360 class, my skill-set will be appealing to companies looking to hire a junior developer."
										),
										React.createElement(
											"div",
											{ className: "tagcloud" },
											React.createElement(
												"a",
												{ href: "#" },
												"iOS"
											),
											React.createElement(
												"a",
												{ href: "#" },
												"Node JS"
											),
											React.createElement(
												"a",
												{ href: "#" },
												"Swift"
											),
											React.createElement(
												"a",
												{ href: "#" },
												"REST API"
											),
											React.createElement(
												"a",
												{ href: "#" },
												"JavaScript"
											)
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_two_third bottommargin-sm col_last" },
									React.createElement(
										"h3",
										null,
										"Learn to Build Real iPhone Apps"
									),
									React.createElement(
										"p",
										null,
										"FullStack 360 is designed for part-time students who want to accelerate their learning through a flexible night and weekend schedule. Our iOS-focused curriculum will teach you the fundamentals of programming, how to solve problems like an engineer, and launch your own iPhone App to the App Store.",
										React.createElement("br", null),
										React.createElement("br", null),
										"Our focus is to teach the most up-to-date technologies to prepare students for the rapidly changing landscape in software. It all too common that aspiring developers waste valuable time learning outdated languages and frameworks, only to find out they do not have the marketable skills to transition into tech."
									),
									React.createElement("hr", null),
									React.createElement(
										"h3",
										null,
										"Learn to Build Real iPhone Apps"
									),
									React.createElement(
										"p",
										null,
										"FullStack 360 is designed for part-time students who want to accelerate their learning through a flexible night and weekend schedule. Our iOS-focused curriculum will teach you the fundamentals of programming, how to solve problems like an engineer, and launch your own iPhone App to the App Store."
									)
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
								null,
								"iOS Courses"
							)
						),
						React.createElement(
							"div",
							{ className: "content-wrap", style: { paddingTop: 0 } },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "team team-list clearfix" },
									React.createElement(
										"div",
										{ className: "team-image" },
										React.createElement("img", { style: { border: "1px solid #ddd" }, src: "/images/xcode.jpg", alt: "FullStack 360" })
									),
									React.createElement(
										"div",
										{ className: "team-desc" },
										React.createElement(
											"div",
											{ className: "team-title" },
											React.createElement(
												"h4",
												null,
												"iOS & Node 24-Week Part Time Bootcamp"
											),
											React.createElement(
												"span",
												null,
												"Jul 5 to Jul 15 | Mon - Fri | 9am - 5pm"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"The iOS High School Course takes students through the process of designing and programming a basic iOS app from start. Students will create a simple app that utilizes key platform tools including the GPS locator, accelerator, and camera. In addition, the course will explore third party APIs such as Google Maps and Foursquare."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ href: "/course/ios-high-school-course", className: "btn btn-success" },
											"Learn More"
										)
									)
								),
								React.createElement("div", { style: { margin: 36 } }),
								React.createElement(
									"div",
									{ className: "team team-list clearfix" },
									React.createElement(
										"div",
										{ className: "team-image" },
										React.createElement("img", { style: { border: "1px solid #ddd" }, src: "/images/ios.jpg", alt: "FullStack 360" })
									),
									React.createElement(
										"div",
										{ className: "team-desc" },
										React.createElement(
											"div",
											{ className: "team-title" },
											React.createElement(
												"h4",
												null,
												"iOS & Node Evening Course"
											),
											React.createElement(
												"span",
												null,
												"June 6 to July 27 | Mon, Wed | 6pm - 9pm"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"The iOS High School Course takes students through the process of designing and programming a basic iOS app from start. Students will create a simple app that utilizes key platform tools including the GPS locator, accelerator, and camera. In addition, the course will explore third party APIs such as Google Maps and Foursquare."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ href: "/course/ios-high-school-course", className: "btn btn-success" },
											"Learn More"
										)
									)
								)
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
								this.state.selectedEvent.title
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement("img", { style: { width: 128, borderRadius: 64, border: "1px solid #ddd", background: "#fff", marginBottom: 24, padding: 12 }, src: "https://media-service.appspot.com/site/images/" + this.state.selectedEvent.image + "?crop=360" })
							),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "firstName", className: "form-control", type: "text", placeholder: "First Name" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "lastName", className: "form-control", type: "text", placeholder: "Last Name" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "email", className: "form-control", type: "text", placeholder: "Email" }),
							React.createElement("br", null)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ onClick: this.rsvp, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Submit"
							)
						)
					),
					React.createElement(
						Modal,
						{ show: this.state.showRegistration, onHide: this.closeModal },
						React.createElement(
							Modal.Header,
							{ closeButton: true, style: { textAlign: "center", padding: 12 } },
							React.createElement(
								"h3",
								null,
								"Join"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement("img", { style: { width: 128, borderRadius: 64, border: "1px solid #ddd", background: "#fff", marginBottom: 24 }, src: "/images/logo_round_green_260.png" })
							),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "firstName", className: "form-control", type: "text", placeholder: "First Name" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "lastName", className: "form-control", type: "text", placeholder: "Last Name" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "email", className: "form-control", type: "text", placeholder: "Email" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "password", className: "form-control", type: "password", placeholder: "Password" }),
							React.createElement("br", null),
							React.createElement(
								"select",
								{ onChange: this.updateUserRegistration, id: "membershiptype", value: this.state.membershiptype, className: "form-control input-md not-dark" },
								React.createElement(
									"option",
									{ value: "basic" },
									"Basic"
								),
								React.createElement(
									"option",
									{ value: "starter" },
									"Starter"
								),
								React.createElement(
									"option",
									{ value: "premium" },
									"Premium"
								)
							)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ onClick: this.register, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Register"
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

	return Ios;
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state));
	var courseList = [];
	var keys = Object.keys(state.courseReducer.courses);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		courseList.push(state.courseReducer.courses[key]);
	}

	return {
		//    	events: state.eventReducer.eventArray,
		currentUser: state.profileReducer.currentUser,
		courses: courseList,
		testimonials: state.staticReducer.testimonials,
		loaderOptions: state.staticReducer.loaderConfig
	};
};


module.exports = connect(stateToProps)(Ios);
//		getCurrentUser()