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
var Nav = _interopRequire(require("../../components/Nav"));

var Footer = _interopRequire(require("../../components/Footer"));

var EventCard = _interopRequire(require("../../components/EventCard"));

var Testimonial = _interopRequire(require("../../components/Testimonial"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var stripe = _interopRequire(require("../../utils/StripeUtils"));

var api = _interopRequire(require("../../api/api"));

var Landing = (function (Component) {
	function Landing(props, context) {
		_classCallCheck(this, Landing);

		_get(Object.getPrototypeOf(Landing.prototype), "constructor", this).call(this, props, context);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.updateUserRegistration = this.updateUserRegistration.bind(this);
		this.submitInfoRequest = this.submitInfoRequest.bind(this);
		this.openModal = this.openModal.bind(this);
		this.showRegistrationForm = this.showRegistrationForm.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.syllabusRequest = this.syllabusRequest.bind(this);
		this.register = this.register.bind(this);
		this.validate = this.validate.bind(this);
		this.state = {
			showRegistration: false,
			showLoader: false,
			showModal: false,
			visitor: {
				name: "",
				email: "",
				phone: "",
				course: "Fundamentals Bootcamp",
				referral: ""
			}
		};
	}

	_inherits(Landing, Component);

	_prototypeProperties(Landing, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				stripe.initialize(function (token) {
					_this.setState({ showLoader: true });
					api.submitStripeToken(token, function () {
						api.handleGet("/account/currentuser", {}, function (err, response) {
							_this.setState({ showLoader: false });
							if (err) {
								alert(response.message);
								return;
							}

							window.location.href = "/account";
						});
					});
				});
			},
			writable: true,
			configurable: true
		},
		updateVisitor: {
			value: function updateVisitor(event) {
				event.preventDefault();

				var visitor = Object.assign({}, this.state.visitor);
				visitor[event.target.id] = event.target.value;
				this.setState({
					visitor: visitor
				});
			},
			writable: true,
			configurable: true
		},
		updateUserRegistration: {
			value: function updateUserRegistration(event) {
				event.preventDefault();

				if (event.target.id == "membershiptype") {
					this.setState({
						membershiptype: event.target.value
					});

					return;
				}


				var updatedUser = Object.assign({}, this.props.currentUser);
				if (event.target.id == "name") {
					var parts = event.target.value.split(" ");
					updatedUser.firstName = parts[0];
					if (parts.length > 1) updatedUser.lastName = parts[parts.length - 1];
				}

				updatedUser[event.target.id] = event.target.value;
				store.dispatch(actions.updateCurrentUser(updatedUser));
			},
			writable: true,
			configurable: true
		},
		register: {
			value: function register(event) {
				event.preventDefault();
				var missingField = this.validate(this.props.currentUser, true);
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
					_this.setState({
						showRegistration: false,
						showLoader: false
					});

					if (err) {
						alert(err.message);
						return;
					}

					if (_this.state.membershiptype == "basic") {
						window.location.href = "/account";
						return;
					}

					// premium registration, show stripe modal
					stripe.showModal();
				});
			},
			writable: true,
			configurable: true
		},
		submitInfoRequest: {
			value: function submitInfoRequest(event) {
				event.preventDefault();

				var missingField = this.validate(this.state.visitor, false);
				if (missingField != null) {
					alert("Please enter your " + missingField);
					return;
				}

				this.setState({
					showModal: false,
					showLoader: true
				});

				var pkg = Object.assign({}, this.state.visitor);
				pkg.headers = this.props.headers;
				var _this = this;
				api.handlePost("/api/info", pkg, function (err, response) {
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
		validate: {
			value: function validate(profile, withPassword) {
				if (profile.name.length == 0) {
					return "Name";
				} // if (profile.lastName.length == 0)
				// 	return 'Last Name'

				if (profile.email.length == 0) {
					return "Email";
				}if (withPassword == false) {
					return null;
				}if (profile.password.length == 0) {
					return "Password";
				}return null // this is successful
				;
			},
			writable: true,
			configurable: true
		},
		syllabusRequest: {
			value: function syllabusRequest(event) {
				event.preventDefault();

				var missingField = this.validate(false);
				if (missingField != null) {
					alert("Please enter your " + missingField);
					return;
				}

				var pkg = {
					course: this.state.selectedCourse,
					visitor: this.props.currentUser,
					headers: this.props.headers
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
				event.preventDefault();

				var visitor = Object.assign({}, this.state.visitor);
				visitor.course = event.target.id;

				this.setState({
					showModal: true,
					visitor: visitor
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
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(Nav, null),
					React.createElement(
						"section",
						{ id: "slider", style: { background: "url(\"/images/joe_light_blue.png\") center", overflow: "visible" }, "data-height-lg": "450", "data-height-md": "450", "data-height-sm": "600", "data-height-xs": "600", "data-height-xxs": "600" },
						React.createElement("br", null),
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
										"h4",
										null,
										"Start your Programming Career"
									)
								),
								React.createElement("div", { className: "line", style: { margin: "15px 0 30px" } }),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement("input", { onChange: this.updateVisitor, id: "name", type: "text", className: "form-control input-lg not-dark", placeholder: "Name" })
								),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement("input", { onChange: this.updateVisitor, id: "email", type: "text", className: "form-control input-lg not-dark", placeholder: "Email" })
								),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement(
										"label",
										{ "for": "template-contactform-subject" },
										"I am interested in"
									),
									React.createElement(
										"select",
										{ onChange: this.updateVisitor, value: this.state.visitor.course, id: "course", className: "form-control input-lg not-dark" },
										React.createElement(
											"option",
											{ value: "fundamentals-bootcamp" },
											"Fundamentals Bootcamp"
										),
										React.createElement(
											"option",
											{ value: "mvp-bootcamp" },
											"MVP Bootcamp"
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_full nobottommargin" },
									React.createElement(
										"button",
										{ onClick: this.submitInfoRequest, className: "btn btn-lg btn-danger btn-block nomargin", value: "submit" },
										"Request Syllabus"
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						null,
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
										"Build Real Products"
									),
									React.createElement(
										"span",
										null,
										"Velocity 360 is the only coding bootcamp that uses real projects from",
										React.createElement("br", null),
										"local startups to teach students."
									)
								)
							),
							React.createElement(
								"div",
								{ className: "container clearfix", style: { paddingTop: 64 } },
								React.createElement(
									"div",
									{ className: "col_two_third bottommargin-sm" },
									React.createElement(
										"div",
										{ className: "fancy-title title-bottom-border" },
										React.createElement(
											"h3",
											null,
											"Real World Experience"
										)
									),
									React.createElement(
										"p",
										null,
										React.createElement("img", { style: { background: "#fff", float: "left", border: "1px solid #ddd", maxWidth: 260, padding: 6, marginRight: 12 }, className: "image_fade", src: "/images/class.jpg", alt: "Velocity 360" }),
										"The Velocity 360 program provides real development experience by partnering with local startups to build their prototypes (often referred to as 'MVP' - Minimal Viable Product). After a 6-week period covering programming fundamentals, students work in groups of 2-4 on an actual project that was pre-vetted by the Velocity 360 team.",
										React.createElement("br", null),
										React.createElement("br", null),
										"At the end of the program, students will publish a real, live product that will be further supported by the startup team. As such, students will already have a professional project on their portfolio immediately upon completion and may even continue with the project beyond the course."
									),
									React.createElement(
										"div",
										{ className: "fancy-title title-bottom-border" },
										React.createElement(
											"h3",
											null,
											"How It Works"
										)
									),
									"The Velocity Bootcamp Program is divided into two parts.",
									React.createElement("br", null),
									React.createElement("br", null),
									React.createElement(
										"div",
										{ className: "col_half panel panel-default" },
										React.createElement(
											"div",
											{ className: "panel-heading" },
											React.createElement(
												"h2",
												{ className: "panel-title" },
												React.createElement(
													"a",
													{ style: { color: "#1ABC9C" }, href: "#" },
													"6-Week Fundamentals Bootcamp"
												)
											)
										),
										React.createElement(
											"div",
											{ className: "panel-body" },
											"The Fundamentals Bootcamp covers backend and frontend development using the most up-to-date technologies. Using Node JS, Mongo, Express and React (with ES6), we create a fully functional website with user registration, image uploading, email notification functionality. We also touch on React Native which leverages the powerful library to build native iOS apps in JavaScript.",
											React.createElement("br", null),
											React.createElement("br", null),
											React.createElement(
												"ul",
												{ style: { listStyle: "none", fontWeight: "600" } },
												React.createElement(
													"li",
													null,
													"Jul 11th - Aug 19th"
												),
												React.createElement(
													"li",
													null,
													"Mon - Fri"
												),
												React.createElement(
													"li",
													null,
													"9am - 5pm"
												)
											),
											React.createElement(
												"a",
												{ href: "/course/fundamentals-bootcamp", className: "button button-rounded button-reveal button-large button-border tright" },
												React.createElement("i", { className: "icon-signal" }),
												React.createElement(
													"span",
													null,
													"Apply"
												)
											)
										)
									),
									React.createElement(
										"div",
										{ className: "col_half panel panel-default col_last" },
										React.createElement(
											"div",
											{ className: "panel-heading" },
											React.createElement(
												"h2",
												{ className: "panel-title" },
												React.createElement(
													"a",
													{ style: { color: "#1ABC9C" }, href: "#" },
													"6-Week MVP Bootcamp"
												)
											)
										),
										React.createElement(
											"div",
											{ className: "panel-body" },
											"The MVP Bootcamp builds real projects with local startups. All projects are carefully vetted by our staff for feasibility, originality of idea, and strength founding team. The startups are from incubators, accelerators and nearby universities. By the end of the bootcamp, all students will have a professional project on their resumes and may even continue with the startup beyond the course.",
											React.createElement("br", null),
											React.createElement("br", null),
											React.createElement(
												"ul",
												{ style: { listStyle: "none", fontWeight: "600" } },
												React.createElement(
													"li",
													null,
													"Aug 22nd - Sep 30th"
												),
												React.createElement(
													"li",
													null,
													"Mon - Fri"
												),
												React.createElement(
													"li",
													null,
													"9am - 5pm"
												)
											),
											React.createElement(
												"a",
												{ href: "/course/mvp-bootcamp", className: "button button-rounded button-reveal button-large button-border tright" },
												React.createElement("i", { className: "icon-signal" }),
												React.createElement(
													"span",
													null,
													"Apply"
												)
											)
										)
									),
									React.createElement("div", { className: "clearfix" }),
									"Each section is a stand-alone course meaning students can enroll in one and not the other. However, the MVP Bootcamp requires working knowledge of the material covered in the Fundamentals Course so students should not be complete beginners for this sequence. The tuition for each course is $6,500 but when taken together, the combined tuition is $11,500."
								),
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm hidden-xs col_last" },
									React.createElement(
										"div",
										{ className: "widget clearfix", style: { padding: 24, textAlign: "center", border: "1px solid #ddd", background: "#f9f9f9" } },
										React.createElement(
											"h4",
											null,
											"Featured Tutorial"
										),
										React.createElement(
											"div",
											{ className: "wistia_embed wistia_async_ehbr4b234p videoFoam=true", style: { height: 200, width: 356, marginTop: 12 } },
											" "
										),
										React.createElement("hr", null),
										React.createElement(
											"strong",
											null,
											"Setting Up a Node JS Project"
										),
										React.createElement("br", null),
										React.createElement("br", null),
										React.createElement(
											"p",
											null,
											"Set up a basic project using Express and use http request details from the browser to generate dynamic responses."
										),
										React.createElement(
											"div",
											{ className: "tagcloud" },
											React.createElement(
												"a",
												{ href: "#" },
												"JavaScript"
											),
											React.createElement(
												"a",
												{ href: "#" },
												"Node JS"
											),
											React.createElement(
												"a",
												{ href: "#" },
												"Express"
											),
											React.createElement(
												"a",
												{ href: "#" },
												"Mongo DB"
											)
										)
									),
									React.createElement(
										"div",
										{ className: "widget clearfix", style: { padding: 24, textAlign: "center", border: "1px solid #ddd", background: "#F9FCFF" } },
										React.createElement(
											"h4",
											null,
											"Featured App"
										),
										React.createElement("img", { style: { width: 128, border: "1px solid #ddd" }, src: "/images/radius.png", alt: "Velocity 360" }),
										React.createElement(
											"h3",
											{ style: { marginBottom: 6, marginTop: 9 } },
											React.createElement(
												"a",
												{ target: "_blank", href: "https://itunes.apple.com/us/app/mercurymq-radius/id926659377?mt=8" },
												"Radius"
											)
										),
										React.createElement("hr", null),
										React.createElement(
											"strong",
											null,
											"iOS App"
										),
										React.createElement("br", null),
										React.createElement(
											"p",
											null,
											"Radius is a job-searching app aimed at part time workers, students, and short term service providers like dog-walkers or furniture movers. It utilizes the GPS functionality on the iPhone to find jobs nearby and also to find workers in the area."
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
												"REST API"
											),
											React.createElement(
												"a",
												{ href: "#" },
												"JavaScript"
											)
										)
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
								"Part Time Courses"
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
										React.createElement("img", { style: { border: "1px solid #ddd" }, src: "/images/xcode.jpg", alt: "Velocity 360" })
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
												"July 11th - August 19th"
											),
											React.createElement(
												"span",
												null,
												"Mon/Weds 6pm - 9pm"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"The 8-week iOS & Node Evening Course takes beginners through the process of designing and programming a basic iOS app from start. Students will create a simple app that utilizes key platform tools including the GPS locator, accelerator, and camera. In addition, the course will explore third party APIs such as Google Maps and Foursquare."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ href: "/course/ios-development", className: "btn btn-success" },
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
										React.createElement("img", { style: { border: "1px solid #ddd" }, src: "/images/react.jpg", alt: "Velocity 360" })
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
												"Node & React Evening Course"
											),
											React.createElement(
												"span",
												null,
												"August 22nd - September 30th"
											),
											React.createElement(
												"span",
												null,
												"Tues/Thurs 6pm - 9pm"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"React and NodeThe Node & React Development Evening course is an 8-week class that covers backend and frontend development using the most up-to-date technologies. Using Node JS, Mongo, Express and React (with ES6), we will create a fully functional website with user registration, image uploading, email notification functionality."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ href: "/course/react-with-node-js", className: "btn btn-success" },
											"Learn More"
										)
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						{ id: "register", className: "section pricing-section nomargin", style: { backgroundColor: "#FFF" } },
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"h2",
								{ className: "pricing-section--title center" },
								"Cant make it to our live courses?"
							),
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement(
									"p",
									{ style: { fontSize: 16 } },
									"Join our online service. ",
									React.createElement("br", null),
									"Online members have access to videos, code samples, the forum and more."
								)
							),
							React.createElement(
								"div",
								{ className: "pricing pricing--jinpa" },
								React.createElement(
									"div",
									{ className: "pricing--item" },
									React.createElement(
										"h3",
										{ className: "pricing--title" },
										"Basic"
									),
									React.createElement(
										"div",
										{ style: { fontSize: "1.15em" }, className: "pricing--price" },
										"FREE"
									),
									React.createElement(
										"div",
										{ style: { borderTop: "1px solid #eee", marginTop: 24, paddingTop: 24 } },
										React.createElement(
											"ul",
											{ className: "pricing--feature-list" },
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Limited Video Access"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Forum Access"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Discounts to Live Events"
											)
										)
									),
									React.createElement(
										"button",
										{ onClick: this.showRegistrationForm, id: "basic", className: "pricing--action" },
										"Join"
									)
								),
								React.createElement(
									"div",
									{ className: "pricing--item", style: { marginLeft: 24, border: "1px solid #eee" } },
									React.createElement(
										"h3",
										{ className: "pricing--title" },
										"Premium"
									),
									React.createElement(
										"div",
										{ style: { fontSize: "1.15em" }, className: "pricing--price" },
										React.createElement(
											"span",
											{ className: "pricing--currency" },
											"$"
										),
										"19.99/mo"
									),
									React.createElement(
										"div",
										{ style: { borderTop: "1px solid #eee", marginTop: 24, paddingTop: 24 } },
										React.createElement(
											"ul",
											{ className: "pricing--feature-list" },
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Full Video Access"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Downloadable Code Samples"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Customized Job Listings"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Forum Access"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Discounts to Live Events"
											)
										)
									),
									React.createElement(
										"button",
										{ onClick: this.showRegistrationForm, id: "premium", className: "pricing--action" },
										"Join"
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
								"Request Info"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement("img", { style: { width: 128, borderRadius: 64, border: "1px solid #ddd", marginBottom: 24 }, src: "/images/logo_round_green_260.png" })
							),
							React.createElement("input", { onChange: this.updateVisitor, value: this.state.visitor.name, id: "name", className: "form-control", type: "text", placeholder: "Name" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateVisitor, value: this.state.visitor.email, id: "email", className: "form-control", type: "text", placeholder: "Email" }),
							React.createElement("br", null)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ onClick: this.submitInfoRequest, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
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
							React.createElement("input", { onChange: this.updateUserRegistration, id: "name", className: "form-control", type: "text", placeholder: "Name" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "email", className: "form-control", type: "text", placeholder: "Email" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "password", className: "form-control", type: "password", placeholder: "Password" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "promoCode", className: "form-control", type: "text", placeholder: "Promo Code" }),
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

	return Landing;
})(Component);

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser,
		loaderOptions: state.staticReducer.loaderConfig
	};
};

module.exports = connect(stateToProps)(Landing);