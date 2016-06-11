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
				course: "ios-node-bootcamp",
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
				console.log("updateVisitor: " + event.target.id);
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
				//		console.log('updateUserRegistration: '+event.target.id)
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
				//		console.log('submitInfoRequest: '+JSON.stringify(this.state.visitor))

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
				//		var visitor = this.state.visitor
				console.log("VALIDATE: " + JSON.stringify(profile));
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
				//		console.log('SYLLABUS REQUEST: '+this.state.selectedCourse)

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
				console.log("OPEN MODAL: " + event.target.id);
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
						{ id: "slider", style: { background: "url(\"/images/ios-banner.jpg\") center", overflow: "visible" }, "data-height-lg": "450", "data-height-md": "450", "data-height-sm": "600", "data-height-xs": "600", "data-height-xxs": "600" },
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
										"Learn iOS or Web Development"
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
											{ value: "ios-node-bootcamp" },
											"iOS & Node Bootcamp"
										),
										React.createElement(
											"option",
											{ value: "node-react-bootcamp" },
											"React & Node Bootcamp"
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_full nobottommargin" },
									React.createElement(
										"button",
										{ onClick: this.submitInfoRequest, className: "btn btn-lg btn-danger btn-block nomargin", value: "submit" },
										"Request Info"
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
										"Become a Professional Developer in 6 Weeks"
									),
									React.createElement(
										"span",
										null,
										"Learn iOS and Web development in our accelerated 6-week Bootcamp."
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
										"h3",
										null,
										"Build Real Projects"
									),
									React.createElement(
										"p",
										null,
										"Velocity is designed for part-time students who want to accelerate their learning through a flexible night and weekend schedule. Our project-based curriculum will teach you the fundamentals of programming, how to solve problems like an engineer, and launch your own iPhone App or publish a database-driven website.",
										React.createElement("br", null),
										React.createElement("br", null),
										"Whether you are looking for a job as a software developer or starting your own company, Velocity will help the transition. We provide students with interview preparation, practice, and assigments gathered from previous students who have gone through many interview processes. Our former students have gone on to work at companies like the New York Times,",
										React.createElement(
											"a",
											{ target: "_blank", href: "http://eranyc.com/" },
											" ERA Accelerator"
										),
										", and several NYC based startups."
									),
									React.createElement("hr", null),
									React.createElement(
										"div",
										{ className: "row" },
										React.createElement(
											"div",
											{ className: "col-md-4 col-sm-6 bottommargin" },
											React.createElement(
												"div",
												{ className: "ipost clearfix" },
												React.createElement(
													"div",
													{ className: "entry-image" },
													React.createElement("img", { style: { background: "#fff", padding: 6, border: "1px solid #ddd" }, className: "image_fade", src: "/images/class.jpg", alt: "Velocity 360" })
												),
												React.createElement(
													"div",
													{ className: "entry-title" },
													React.createElement(
														"h3",
														null,
														"Small Classes"
													),
													React.createElement("hr", null)
												),
												React.createElement(
													"div",
													{ className: "entry-content" },
													React.createElement(
														"p",
														null,
														"Our average class size is six students and the maximum per class is ten. Every student recieves individual attenttion and no one falls far behind."
													)
												)
											)
										),
										React.createElement(
											"div",
											{ className: "col-md-4 col-sm-6 bottommargin" },
											React.createElement(
												"div",
												{ className: "ipost clearfix" },
												React.createElement(
													"div",
													{ className: "entry-image" },
													React.createElement("img", { style: { background: "#fff", padding: 6, border: "1px solid #ddd" }, className: "image_fade", src: "/images/joe.jpg", alt: "Velocity 360" })
												),
												React.createElement(
													"div",
													{ className: "entry-title" },
													React.createElement(
														"h3",
														null,
														"Cutting Edge Curriculum"
													),
													React.createElement("hr", null)
												),
												React.createElement(
													"div",
													{ className: "entry-content" },
													React.createElement(
														"p",
														null,
														"Ruby on Rails? Django? Ember? Backbone? PHP? Angular? Swift? Objective C? Node? JavaScript? React? To beginners, the tech landscape is overwhelming and the wrong choice can waste a lot of time and money. We make the right choices for you. Simple as that."
													)
												)
											)
										),
										React.createElement(
											"div",
											{ className: "col-md-4 col-sm-6 bottommargin" },
											React.createElement(
												"div",
												{ className: "ipost clearfix" },
												React.createElement(
													"div",
													{ className: "entry-image" },
													React.createElement("img", { style: { background: "#fff", padding: 6, border: "1px solid #ddd" }, className: "image_fade", src: "/images/phone.jpg", alt: "Velocity 360" })
												),
												React.createElement(
													"div",
													{ className: "entry-title" },
													React.createElement(
														"h3",
														null,
														"Realistic Projects"
													),
													React.createElement("hr", null)
												),
												React.createElement(
													"div",
													{ className: "entry-content" },
													React.createElement(
														"p",
														null,
														"All courses are taught by current professionals who work on real projects. As such, our curriculum is heavily driven by the skills required in the tech industry and prepares our students for the challenges they will face."
													)
												)
											)
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm hidden-xs col_last", style: { background: "#f9f9f9" } },
									React.createElement(
										"div",
										{ className: "widget clearfix", style: { padding: 24 } },
										React.createElement(
											"h4",
											null,
											"Spotlight"
										),
										React.createElement("img", { style: { width: 128, borderRadius: 64 }, src: "/images/briancorrea.jpg", alt: "Velocity 360" }),
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
											"On the first day of class my instructor taught me more than I taught myself in the three weeks. I immediately knew I made the right choice to learn iOS with Velocity. The hands-on structure of the class is the best use of my time and prevents me from wasting time trying to get one thing off the ground. Instead, I was immediately building projects. I am confident that after the Velocity class, my skill-set will be appealing to companies looking to hire a junior developer."
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
								"Courses"
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
												"iOS & Node 6-Week Bootcamp"
											),
											React.createElement(
												"span",
												null,
												"July 11th - August 19th"
											),
											React.createElement(
												"span",
												null,
												"Mon - Fri, 9am - 5pm"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"The 6-Week iOS Intensive is a comprehensive course in all aspects of iOS development for beginners. 5 days a week, 8 hours a day, students cover the key aspects of iOS development from creating sleek UI’s, animations, GPS locator, integrating 3rd party data, and publishing. This course is designed for beginners with little to no programming experience and all development is done with Swift. By the end of the course, students will have published at least one app to the App Store and gained the skills neccessary to begin working as junior iOS developers."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ id: "ios-node-bootcamp", href: "/course/ios-node-bootcamp", className: "btn btn-success" },
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
												"Node & React 6-Week Bootcamp"
											),
											React.createElement(
												"span",
												null,
												"August 22nd - September 30th"
											),
											React.createElement(
												"span",
												null,
												"Mon - Fri, 9am - 5pm"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"The Node React Development Evening bootcamp is an 6-week course that covers backend and frontend development using the most up-to-date technologies. Using Node JS, Mongo, Express and React (with ES6), we will create a fully functional website with user registration, image uploading, email notification functionality. We also touch on React Native which leverages the powerful library to build native iOS apps in JavaScript."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ id: "node-react-evening", href: "/course/node-react-bootcamp", className: "btn btn-success" },
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
	//	console.log('STATE TO PROPS: '+JSON.stringify(state.profileReducer.currentUser));

	return {
		currentUser: state.profileReducer.currentUser,
		loaderOptions: state.staticReducer.loaderConfig
	};
};


module.exports = connect(stateToProps)(Landing);