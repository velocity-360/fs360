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

var Home = (function (Component) {
	function Home(props, context) {
		_classCallCheck(this, Home);

		_get(Object.getPrototypeOf(Home.prototype), "constructor", this).call(this, props, context);
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

	_inherits(Home, Component);

	_prototypeProperties(Home, null, {
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

							window.location.href = "/account"
							// store.dispatch(actions.currentUserRecieved(response.profile))
							;
						});
					});
				});


				//  var handler = StripeCheckout.configure({
				//      key: 'pk_live_yKFwKJsJXwOxC0yZob29rIN5',
				//      image: '/images/logo_round_blue_260.png',
				//      locale: 'auto',
				//      panelLabel: 'Premium: $19.99/month',
				//      token: function(token) { // You can access the token ID with `token.id`

				// _this.setState({showLoader: true})
				// api.submitStripeToken(token, function(){

				// 	api.handleGet('/account/currentuser', {}, function(err, response){
				// 		_this.setState({showLoader: false})
				// 		if (err){
				// 			alert(response.message)
				// 			return
				// 		}

				// 		window.location.href = '/account'
				// 		// store.dispatch(actions.currentUserRecieved(response.profile))
				// 	});
				// })
				//      }
				//  });

				// this.setState({
				// 	stripeHandler:handler
				// });

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
				//		console.log('updateUserRegistration: '+event.target.id)
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
				if (event.target.id == "name") {
					var parts = event.target.value.split(" ");
					updatedUser.firstName = parts[0];
					if (parts.length > 1) updatedUser.lastName = parts[parts.length - 1];
				} else {
					updatedUser[event.target.id] = event.target.value;
				}

				store.dispatch(actions.updateCurrentUser(updatedUser));
			},
			writable: true,
			configurable: true
		},
		validate: {
			value: function validate(withPassword) {
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
					//			console.log('RSVP REQUEST RESPONSE: '+JSON.stringify(response));
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
				var testimonialList = this.props.testimonials.map(function (testimonial, i) {
					return React.createElement(Testimonial, { key: i, testimonial: testimonial });
				});

				var _openModal = this.openModal;
				var events = this.props.events.map(function (e, i) {
					return React.createElement(EventCard, { key: e.id, index: i, event: e, click: _openModal });
				});


				return React.createElement(
					"div",
					null,
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(Nav, null),
					React.createElement(
						"section",
						{ id: "slider", className: "slider-parallax dark full-screen", style: { background: "url(images/programming.jpg) center" } },
						React.createElement(
							"div",
							{ className: "slider-parallax-inner" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "vertical-middle" },
									React.createElement(
										"div",
										{ className: "heading-block center nobottomborder" },
										React.createElement(
											"h1",
											{ "data-animate": "fadeInUp" },
											"Become a ",
											React.createElement(
												"strong",
												null,
												"Professional"
											),
											" Software Developer"
										),
										React.createElement(
											"span",
											{ "data-animate": "fadeInUp", "data-delay": "300" },
											"Learn to code in our part time or full time classes for Web and iOS"
										)
									),
									React.createElement(
										"form",
										{ action: "#", method: "post", role: "form", className: "landing-wide-form clearfix" },
										React.createElement(
											"div",
											{ className: "col_four_fifth nobottommargin" },
											React.createElement(
												"div",
												{ className: "col_one_fourth nobottommargin" },
												React.createElement("input", { value: this.props.currentUser.firstName, onChange: this.updateUserRegistration, id: "firstName", type: "text", className: "form-control input-lg not-dark", placeholder: "First Name*" })
											),
											React.createElement(
												"div",
												{ className: "col_one_fourth nobottommargin" },
												React.createElement("input", { value: this.props.currentUser.lastName, onChange: this.updateUserRegistration, id: "lastName", type: "text", className: "form-control input-lg not-dark", placeholder: "Last Name*" })
											),
											React.createElement(
												"div",
												{ className: "col_one_fourth nobottommargin" },
												React.createElement("input", { value: this.props.currentUser.email, onChange: this.updateUserRegistration, id: "email", type: "text", className: "form-control input-lg not-dark", placeholder: "Email*" })
											),
											React.createElement(
												"div",
												{ className: "col_one_fourth col_last nobottommargin" },
												React.createElement(
													"select",
													{ onChange: this.updateUserRegistration, id: "course", className: "form-control input-lg not-dark" },
													React.createElement(
														"option",
														{ value: "ios bootcamp" },
														"iOS Bootcamp"
													),
													React.createElement(
														"option",
														{ value: "web bootcamp" },
														"Web Bootcamp"
													),
													React.createElement(
														"option",
														{ value: "ios hs course" },
														"iOS & Node HS Course"
													),
													React.createElement(
														"option",
														{ value: "ios+node evening" },
														"iOS & Node Evening Course"
													),
													React.createElement(
														"option",
														{ value: "react+node evening" },
														"React & Node Evening Course"
													)
												)
											)
										),
										React.createElement(
											"div",
											{ className: "col_one_fifth col_last nobottommargin" },
											React.createElement(
												"button",
												{ onClick: this.syllabusRequest, id: "bootcamp", className: "btn btn-lg btn-danger btn-block nomargin", value: "submit" },
												"Request Syllabus"
											)
										)
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
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm center" },
									React.createElement("img", { "data-animate": "fadeInLeft", src: "/images/swift-react.png", alt: "Iphone" })
								),
								React.createElement(
									"div",
									{ className: "col_two_third bottommargin-sm col_last" },
									React.createElement(
										"div",
										{ className: "heading-block topmargin-sm" },
										React.createElement(
											"h3",
											null,
											"Coding Education for Tomorrow"
										)
									),
									React.createElement(
										"p",
										null,
										"FullStack 360 conducts development courses that are relevant in the startup and tech world today. We focus on the most up-to-date frameworks and libraries such as React, Angular, and Node JS. Our students are always prepared for rapid changes in the industry and are ready to work in tech after a course."
									),
									React.createElement(
										"p",
										null,
										"The only constant in the software industry is change. One day, PHP is the king, the next day Ruby on Rails is highest in demand. The major bootcamps in NYC focus on today. Flatiron School, General Assembly, Dev Bootcamp all teach Rails while we focus on tomorrow. Our stack is Node JS with React on the front end and ES2015. Will you be among the flood of Rails devs saturating the NYC market or will you be ready for the tech stack of tomorrow?"
									),
									React.createElement(
										"a",
										{ href: "/courses?type=live", className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
										"View Courses"
									),
									React.createElement("br", null),
									React.createElement(
										"a",
										{ href: "/courses?type=immersive", className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
										"View Bootcamps"
									)
								),
								React.createElement(
									"div",
									{ id: "events", className: "divider divider-short divider-center" },
									React.createElement("i", { className: "icon-circle" })
								),
								React.createElement(
									"div",
									{ id: "posts", className: "events small-thumbs" },
									React.createElement(
										"div",
										{ style: { textAlign: "center", paddingTop: 64 } },
										React.createElement(
											"h2",
											null,
											"Events"
										)
									),
									events
								),
								React.createElement(
									"div",
									{ className: "divider divider-short divider-center" },
									React.createElement("i", { className: "icon-circle" })
								),
								React.createElement("div", { className: "clear" })
							)
						)
					),
					React.createElement(
						"section",
						{ id: "section-team", className: "page-section", style: { background: "#f9f9f9", paddingTop: 48, borderTop: "1px solid #ddd" } },
						React.createElement(
							"div",
							{ className: "heading-block center" },
							React.createElement(
								"h2",
								null,
								"Summer 2016"
							),
							React.createElement(
								"span",
								null,
								"The following courses will run in Spring and Summer"
							)
						),
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"div",
								{ className: "col-md-6 bottommargin" },
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
												"iOS & Node High School Course"
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
								)
							),
							React.createElement(
								"div",
								{ className: "col-md-6 bottommargin" },
								React.createElement(
									"div",
									{ className: "team team-list clearfix" },
									React.createElement(
										"div",
										{ className: "team-image" },
										React.createElement("img", { src: "/images/xcode.jpg", alt: "FullStack 360" })
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
												"8 Weeks | Mon, Wed | 6pm - 9pm"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"The iOS Intensive covers all aspects of iOS development for beginners. Students will cover the key aspects of iOS development from creating sleek UI’s, animations, GPS locator, integrating 3rd party data, and publishing. This course is designed for beginners with little to no programming experience and all development will be done using Swift."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ href: "/course/ios-development", className: "btn btn-success" },
											"Learn More"
										)
									)
								)
							),
							React.createElement("div", { className: "clear" }),
							React.createElement(
								"div",
								{ className: "col-md-6 bottommargin" },
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
												"iOS & Node High School Course"
											),
											React.createElement(
												"span",
												null,
												"Jul 18 to Jul 29 | Mon - Fri | 9am - 5pm"
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
							),
							React.createElement(
								"div",
								{ className: "col-md-6 bottommargin" },
								React.createElement(
									"div",
									{ className: "team team-list clearfix" },
									React.createElement(
										"div",
										{ className: "team-image" },
										React.createElement("img", { src: "/images/react.jpg", alt: "FullStack 360" })
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
												"8 Weeks | Tues, Thurs | 6pm - 9pm"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"The Node & React Development Intensive is a 6-week crash course on backend and frontend development using the most up-to-date technologies. Using Node JS, Mongo, Express and React (with ES6), we will create a fully functional website with user registration, image uploading, email notification functionality."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ href: "/course/node-react-evening-course", className: "btn btn-success" },
											"Learn More"
										)
									)
								)
							),
							React.createElement(
								"div",
								{ className: "divider divider-short divider-center" },
								React.createElement("i", { className: "icon-circle" })
							),
							React.createElement("div", { className: "clear" })
						),
						React.createElement(
							"div",
							{ className: "row clearfix common-height", style: { borderTop: "1px solid #ddd" } },
							React.createElement(
								"div",
								{ className: "col-md-6 center col-padding", style: { background: "url(\"/images/hacking.jpg\") center center no-repeat", backgroundSize: "cover" } },
								React.createElement(
									"div",
									null,
									" "
								)
							),
							React.createElement(
								"div",
								{ className: "col-md-6 center col-padding", style: { backgroundColor: "#fff" } },
								React.createElement(
									"div",
									null,
									React.createElement(
										"div",
										{ className: "heading-block nobottomborder" },
										React.createElement(
											"h3",
											null,
											"Bootcamps"
										)
									),
									React.createElement(
										"p",
										{ className: "lead" },
										"FS360 operates 24-week bootcamps that run during evenings and weekends. Designed for working professionals, our bootcamps train students for a career change without having to leave their current job."
									),
									React.createElement(
										"div",
										{ className: "table-responsive" },
										React.createElement(
											"table",
											{ className: "table table-bordered table-striped", style: { background: "#fff", textAlign: "left" } },
											React.createElement(
												"colgroup",
												null,
												React.createElement("col", { className: "col-xs-2" }),
												React.createElement("col", { className: "col-xs-4" }),
												React.createElement("col", { className: "col-xs-4" })
											),
											React.createElement(
												"thead",
												null,
												React.createElement(
													"tr",
													null,
													React.createElement(
														"th",
														null,
														"Class"
													),
													React.createElement(
														"th",
														null,
														"Dates"
													),
													React.createElement(
														"th",
														null,
														"Status"
													)
												)
											),
											React.createElement(
												"tbody",
												null,
												React.createElement(
													"tr",
													null,
													React.createElement(
														"td",
														null,
														React.createElement(
															"span",
															null,
															React.createElement(
																"a",
																{ href: "/course/ios-node-bootcamp" },
																"iOS + Node"
															)
														)
													),
													React.createElement(
														"td",
														null,
														"June 6 - Dec 2, Mon/Wed/Sat"
													),
													React.createElement(
														"td",
														null,
														"Accepting Applications"
													)
												),
												React.createElement(
													"tr",
													null,
													React.createElement(
														"td",
														null,
														React.createElement(
															"span",
															null,
															React.createElement(
																"a",
																{ href: "/course/node-react-bootcamp" },
																"React + Node"
															)
														)
													),
													React.createElement(
														"td",
														null,
														"June 7 - Dec 2, Tue/Thu/Sat"
													),
													React.createElement(
														"td",
														null,
														"Accepting Applications"
													)
												)
											)
										)
									)
								)
							)
						),
						React.createElement(
							"div",
							{ className: "section" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ id: "section-couple", className: "heading-block title-center page-section" },
									React.createElement(
										"h2",
										null,
										"Meet Our Students"
									),
									React.createElement(
										"span",
										null,
										"Current & Former Students"
									)
								),
								testimonialList
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
								"Sign Up"
							),
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement(
									"p",
									{ style: { fontSize: 15 } },
									"Cant make it to our live courses? Join our online service. ",
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

	return Home;
})(Component);

var stateToProps = function (state) {
	var courseList = [];
	var keys = Object.keys(state.courseReducer.courses);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		courseList.push(state.courseReducer.courses[key]);
	}

	return {
		events: state.eventReducer.eventArray,
		currentUser: state.profileReducer.currentUser,
		courses: courseList,
		testimonials: state.staticReducer.testimonials,
		loaderOptions: state.staticReducer.loaderConfig
	};
};


module.exports = connect(stateToProps)(Home);