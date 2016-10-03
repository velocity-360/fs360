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
var _components = require("../../components");

var Nav = _components.Nav;
var CourseCard = _components.CourseCard;
var Application = _components.Application;
var _utils = require("../../utils");

var api = _utils.api;
var TrackingManager = _utils.TrackingManager;
var Stripe = _utils.Stripe;
var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var Course = (function (Component) {
	function Course(props, context) {
		_classCallCheck(this, Course);

		_get(Object.getPrototypeOf(Course.prototype), "constructor", this).call(this, props, context);
		this.toggleApplication = this.toggleApplication.bind(this);
		this.toggleConfirmation = this.toggleConfirmation.bind(this);
		this.submitApplication = this.submitApplication.bind(this);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.showPaypal = this.showPaypal.bind(this);
		this.submitSyllabusRequest = this.submitSyllabusRequest.bind(this);
		this.validate = this.validate.bind(this);
		this.showStripeModal = this.showStripeModal.bind(this);
		this.state = {
			showLoader: false,
			showConfirmation: false,
			showApplication: false,
			visitor: {
				name: "",
				email: "",
				subject: "Syllabus Request"
			}
		};
	}

	_inherits(Course, Component);

	_prototypeProperties(Course, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				var course = this.props.courses[this.props.slug];
				var discountTuition = course.tuition - 200;
				var text = "Full Tuition - $" + discountTuition;
				Stripe.initializeWithText(text, function (token) {
					_this.setState({ showLoader: true });

					var currentUser = _this.props.currentUser;
					api.submitStripeCharge(token, course, discountTuition, "course", function (err, response) {
						_this.setState({ showLoader: false });
						if (err) {
							alert(err.message);
							return;
						}

						console.log("Stripe Charge: " + JSON.stringify(response));
						var currentStore = store.currentStore();
						_this.setState({
							showConfirmation: true
						});
					});
				});
			},
			writable: true,
			configurable: true
		},
		showStripeModal: {
			value: function showStripeModal(event) {
				event.preventDefault();
				var course = this.props.courses[this.props.slug];
				Stripe.showModalWithText(course.title);
			},
			writable: true,
			configurable: true
		},
		toggleApplication: {
			value: function toggleApplication(event) {
				if (event != null) event.preventDefault();

				var showApplication = !this.state.showApplication;
				this.setState({
					showApplication: showApplication
				});
			},
			writable: true,
			configurable: true
		},
		toggleConfirmation: {
			value: function toggleConfirmation(event) {
				event.preventDefault();
				var showConfirmation = !this.state.showConfirmation;
				this.setState({
					showConfirmation: showConfirmation
				});
			},
			writable: true,
			configurable: true
		},
		submitApplication: {
			value: function submitApplication(application) {
				var _this = this;
				var course = this.props.courses[this.props.slug];
				this.setState({
					showLoader: true,
					showApplication: false
				});

				application.course = course.title;
				api.handlePost("/account/application", application, function (err, response) {
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
		updateVisitor: {
			value: function updateVisitor(event) {
				var updatedVisitor = Object.assign({}, this.state.visitor);
				updatedVisitor[event.target.id] = event.target.value;
				this.setState({
					visitor: updatedVisitor
				});
			},
			writable: true,
			configurable: true
		},
		subscribe: {
			value: function subscribe(event) {
				var _this = this;
				event.preventDefault();
				if (this.state.visitor.name.length == 0) {
					alert("Please enter your name.");
					return;
				}

				if (this.state.visitor.email.length == 0) {
					alert("Please enter your email.");
					return;
				}

				this.setState({ showLoader: true });

				var s = Object.assign({}, this.state.visitor);
				var parts = s.name.split(" ");
				s.firstName = parts[0];
				if (parts.length > 1) s.lastName = parts[parts.length - 1];

				var course = this.props.courses[this.props.slug];
				s.source = course.title;
				s.subject = "New Subscriber";
				s.confirmation = "Thanks for subscribing! Stay tuned for more tutorials, events and upcoming courses!";
				api.handlePost("/account/subscribe", s, function (err, response) {
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
		submitSyllabusRequest: {
			value: function submitSyllabusRequest(event) {
				var _this = this;
				event.preventDefault();
				var missingField = this.validate(this.state.visitor, false);
				if (missingField != null) {
					alert("Please enter your " + missingField);
					return;
				}

				var pkg = Object.assign({}, this.state.visitor);
				var parts = pkg.name.split(" ");
				pkg.firstName = parts[0];
				if (parts.length > 1) pkg.lastName = parts[parts.length - 1];

				var course = this.props.courses[this.props.slug];
				pkg.pdf = course.syllabus;
				pkg.course = course.title;
				pkg.subject = "Syllabus Request";
				pkg.confirmation = "Thanks for your interest! Check your email shortly for a direct download link to the syllabus.";

				this.setState({ showLoader: true });
				api.handlePost("/account/syllabus", pkg, function (err, response) {
					_this.setState({ showLoader: false });
					if (err) {
						alert(err.message);
						return;
					}

					alert(response.message);
					var tracker = new TrackingManager(); // this is a singelton so no need to reset page info:
					tracker.updateTracking(function (err, response) {
						if (err) {
							console.log("ERROR: " + JSON.stringify(err));
							return;
						}
					});
				});
			},
			writable: true,
			configurable: true
		},
		validate: {
			value: function validate(profile, withPassword) {
				if (profile.name.length == 0) {
					return "Name";
				}if (profile.email.length == 0) {
					return "Email";
				}if (profile.email.indexOf("@") == -1) {
					// invalid email
					return "valid email address";
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
		showPaypal: {
			value: function showPaypal(event) {
				event.preventDefault();
				var course = this.props.courses[this.props.slug];
				if (course.discountPaypalLink.length == 0) {
					// no discount code
					window.open(course.paypalLink, "Velocity 360", "width=650,height=900");
					return;
				}

				var promoCode = this.state.promoCode.trim();
				if (promoCode.length == 0) {
					window.open(course.paypalLink, "Velocity 360", "width=650,height=900");
					return;
				}

				if (course.promoCodes.indexOf(promoCode) == -1) {
					window.open(course.paypalLink, "Velocity 360", "width=650,height=900");
					return;
				}

				// successful promo code
				window.open(course.discountPaypalLink, "Velocity 360", "width=650,height=900");
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var course = this.props.courses[this.props.slug];
				var units = course.units.map(function (unit, i) {
					return React.createElement(
						"div",
						{ key: i, className: "entry clearfix", style: { border: "none" } },
						React.createElement(
							"div",
							{ className: "entry-timeline" },
							"Unit",
							React.createElement(
								"span",
								null,
								i + 1
							),
							React.createElement("div", { className: "timeline-divider" })
						),
						React.createElement(
							"div",
							{ className: "panel panel-default", style: { maxWidth: 520 } },
							React.createElement(
								"div",
								{ className: "panel-body", style: { padding: 36 } },
								React.createElement(
									"h3",
									null,
									React.createElement(
										"a",
										{ href: "#", style: { marginRight: 12 }, className: "btn btn-info" },
										React.createElement(
											"strong",
											null,
											unit.topic
										)
									)
								),
								React.createElement("hr", null),
								unit.description,
								React.createElement("br", null)
							)
						)
					);
				});

				var faq = this.props.faq.general.map(function (question, i) {
					return React.createElement(
						"div",
						{ key: i },
						React.createElement(
							"div",
							{ style: { background: "#fff" }, className: "acctitle" },
							React.createElement("i", { className: "acc-closed icon-question-sign" }),
							React.createElement("i", { className: "acc-open icon-question-sign" }),
							question.question
						),
						React.createElement("div", { style: { background: "#fff" }, className: "acc_content clearfix", dangerouslySetInnerHTML: { __html: question.answer } })
					);
				});

				var instructors = this.props.instructors.map(function (instructor, i) {
					return React.createElement(
						"div",
						{ key: i, className: "col-md-12 bottommargin" },
						React.createElement(
							"div",
							{ className: "team team-list" },
							React.createElement(
								"div",
								{ className: "team-desc" },
								React.createElement(
									"div",
									{ className: "team-title" },
									React.createElement("img", { style: { width: 96, marginBottom: 6 }, src: "/images/" + instructor.image, alt: "Velocity 360" }),
									React.createElement(
										"h4",
										{ style: { marginBottom: 12 } },
										instructor.name
									),
									React.createElement(
										"div",
										{ className: "tagcloud" },
										React.createElement(
											"a",
											{ style: style.tag, href: "#" },
											"Node JS"
										),
										React.createElement(
											"a",
											{ style: style.tag, href: "#" },
											"React"
										),
										React.createElement(
											"a",
											{ style: style.tag, href: "#" },
											"Angular JS"
										),
										React.createElement(
											"a",
											{ style: style.tag, href: "#" },
											"JQuery"
										)
									)
								),
								React.createElement("div", { className: "clearfix" }),
								React.createElement(
									"div",
									{ className: "team-content" },
									instructor.bio
								)
							)
						)
					);
				});

				var sidemenu = null;
				var btnApply = null;
				var who = null;
				var tuition = null;
				var admissions = null;
				var syllabus = null;
				var cta = null;
				var register = null;
				var startDate = null;
				if (course.type == "immersive") {
					// bootcamp
					sidemenu = React.createElement(
						"ul",
						null,
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#introduction" },
								"Introduction"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#who" },
								"Who"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#curriculum" },
								"Curriculum"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#tuition" },
								"Tuition"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#instructors" },
								"Instructors"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#faq" },
								"FAQ"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#admissions" },
								"Admissions"
							)
						)
					);

					btnApply = React.createElement(
						"a",
						{ onClick: this.toggleApplication, href: "#", className: "apply" },
						"Apply"
					);
					cta = React.createElement(
						"div",
						{ style: { paddingTop: 16 } },
						React.createElement("hr", null),
						React.createElement(
							"a",
							{ href: "#newsletter" },
							"Request Syllabus"
						),
						React.createElement("input", { onChange: this.updateVisitor, id: "name", type: "name", style: style.input, className: "custom-input", placeholder: "Name" }),
						React.createElement("br", null),
						React.createElement("input", { onChange: this.updateVisitor, id: "email", type: "email", style: style.input, className: "custom-input", placeholder: "Email" }),
						React.createElement("br", null),
						React.createElement(
							"a",
							{ onClick: this.submitSyllabusRequest, href: "#", style: { marginRight: 12, color: "#fff" }, className: "btn btn-info" },
							"Request Syllabus"
						)
					);

					who = React.createElement(
						"article",
						{ id: "who", className: "overview", style: style.articleSection },
						React.createElement(
							"h2",
							null,
							"Who"
						),
						React.createElement(
							"div",
							{ className: "image" },
							React.createElement("img", { style: { width: 220, background: "#fff", padding: 6, border: "1px solid #ddd", marginLeft: 12 }, src: "/images/group.JPG", alt: "Velocity 360" })
						),
						React.createElement(
							"p",
							null,
							"The ",
							course.title,
							" is designed for beginner to intermediate programmers. A typical applicant has written basic code before, possibly tinkered with jQuery and JavaScript and/or a framework like Ruby on Rails. You should be comfortable writing  simple programs to perform string manipulation, arithmetic operations, etc. HTML should be familiar as well. This should not be your first time coding. If you are a beginner who is looking for the next step and is eager to learn, this course is for you."
						)
					);

					tuition = React.createElement(
						"article",
						{ id: "tuition", className: "overview", style: style.articleSection },
						React.createElement(
							"h2",
							null,
							"Tuition"
						),
						React.createElement(
							"div",
							{ className: "col_full nobottommargin" },
							React.createElement(
								"p",
								{ className: "about", style: { marginBottom: 6 } },
								"Tuition"
							),
							React.createElement(
								"p",
								null,
								"Tuition is $",
								course.tuition,
								" with a $",
								course.deposit,
								" deposit to reserve your spot. A $500 discount will be applied to those who pay in full at the start of the course. Otherwise, payments can be made in bi-weekly installments throughout the duration of the course."
							)
						),
						React.createElement(
							"div",
							{ style: { marginTop: 24 }, className: "col_full nobottommargin" },
							React.createElement(
								"p",
								{ className: "about", style: { marginBottom: 6 } },
								"Scholarships"
							),
							React.createElement(
								"p",
								null,
								"A $1,000 scholarship is available to any woman admitted to the course. Further, two full scholarships are allotted in each class for highly qualified candidates. Full scholarships will be awarded solely on merit. Our holistic review considers factors such as aptitude, coding ability, and problem-solving determination. An award determination is made after your in-person code review. You will be notified of your scholarship award before the start of class, if applicable."
							)
						),
						React.createElement(
							"div",
							{ style: { marginTop: 24 }, className: "col_full nobottommargin" },
							React.createElement(
								"p",
								{ className: "about", style: { marginBottom: 6 } },
								"Deadline"
							),
							React.createElement(
								"p",
								null,
								"The deadline for application is November 28th for regular applicants. To be eligible for the full scholarship, the deadline is November 7th."
							)
						)
					);

					admissions = React.createElement(
						"article",
						{ id: "admissions", className: "overview", style: style.articleSection },
						React.createElement(
							"h2",
							null,
							"Admissions"
						),
						React.createElement(
							"a",
							{ href: "#", style: { marginRight: 12 }, className: "btn btn-info" },
							"Step 1"
						),
						React.createElement(
							"strong",
							null,
							"Apply"
						),
						React.createElement(
							"p",
							{ style: { marginTop: 10 } },
							"Complete our online application by November 28th to apply for the course."
						),
						React.createElement(
							"a",
							{ href: "#", style: { marginRight: 12 }, className: "btn btn-info" },
							"Step 2"
						),
						React.createElement(
							"strong",
							null,
							"Phone Interview"
						),
						React.createElement(
							"p",
							{ style: { marginTop: 10 } },
							"All applicants will undergo a 15-30 minute phone interview as a first technical assessment. You should feel comfortable speaking about prior programming experience."
						),
						React.createElement(
							"a",
							{ href: "#", style: { marginRight: 12 }, className: "btn btn-info" },
							"Step 3"
						),
						React.createElement(
							"strong",
							null,
							"In-person code review"
						),
						React.createElement(
							"p",
							{ style: { marginTop: 10 } },
							"After the phone screen, the next step is an in-person code review. Here you’ll sit down with one of our instructors and complete our day 1 coding assignment. Rather than an algorithms assignment, you will work with an instructor to spin up a simple Node server to render a page. This should take about an hour, and will determine your preparedness for the pace of the course."
						),
						React.createElement(
							"a",
							{ href: "#", style: { marginRight: 12 }, className: "btn btn-info" },
							"Step 4"
						),
						React.createElement(
							"strong",
							null,
							"Decision"
						),
						React.createElement(
							"p",
							{ style: { marginTop: 10 } },
							"You will receive an email with your application decision. You will have 7 days from your acceptance letter to make your deposit. After 7 days, your spot will be forfeited."
						),
						React.createElement("hr", null),
						React.createElement(
							"a",
							{ onClick: this.toggleApplication, href: "#", className: "btn btn-lg btn-success" },
							"Apply"
						)
					);

					syllabus = React.createElement(
						"article",
						{ id: "syllabus", className: "overview" },
						React.createElement(
							"div",
							{ className: "container" },
							React.createElement(
								"h2",
								{ style: { marginTop: 24 } },
								"Request Syllabus"
							),
							React.createElement(
								"div",
								{ className: "panel panel-default" },
								React.createElement(
									"div",
									{ className: "panel-body", style: { padding: 36 } },
									React.createElement(
										"h3",
										null,
										"Download Full syllabus"
									),
									React.createElement("hr", null),
									React.createElement(
										"p",
										{ style: { marginBottom: 16 } },
										"Sign up below to get our course syllabus, and to stay informed about Velocity 360."
									),
									React.createElement("input", { onChange: this.updateVisitor, id: "name", type: "name", style: { borderRadius: "0px !important", background: "#FEF9E7" }, className: "custom-input", placeholder: "Name" }),
									React.createElement("br", null),
									React.createElement("input", { onChange: this.updateVisitor, id: "email", type: "email", style: { borderRadius: "0px !important", background: "#FEF9E7" }, className: "custom-input", placeholder: "Email" }),
									React.createElement("br", null),
									React.createElement(
										"a",
										{ onClick: this.submitSyllabusRequest, href: "#", style: { marginRight: 12 }, className: "btn btn-info" },
										"Submit"
									)
								)
							)
						)
					);
				}

				if (course.type == "live") {
					// part time course
					sidemenu = React.createElement(
						"ul",
						null,
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#introduction" },
								"Introduction"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#curriculum" },
								"Curriculum"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#tuition" },
								"Tuition"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#instructors" },
								"Instructors"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#faq" },
								"FAQ"
							)
						),
						React.createElement(
							"li",
							null,
							React.createElement(
								"a",
								{ href: "#register", className: "apply" },
								"Register"
							)
						)
					);

					cta = React.createElement(
						"div",
						{ style: { paddingTop: 16 } },
						React.createElement(
							"a",
							{ href: "#newsletter" },
							"Newsletter"
						),
						React.createElement(
							"p",
							{ style: { marginBottom: 16, fontSize: 13 } },
							"Sign up to our newsletter to stay informed about upcoming tutorials, events, and courses."
						),
						React.createElement("input", { onChange: this.updateVisitor, id: "name", type: "name", style: style.input, className: "custom-input", placeholder: "Name" }),
						React.createElement("br", null),
						React.createElement("input", { onChange: this.updateVisitor, id: "email", type: "email", style: style.input, className: "custom-input", placeholder: "Email" }),
						React.createElement("br", null),
						React.createElement(
							"a",
							{ onClick: this.subscribe, href: "#", style: { marginRight: 12, color: "#fff" }, className: "btn btn-info" },
							"Submit"
						)
					);

					tuition = React.createElement(
						"article",
						{ id: "tuition", className: "overview", style: style.articleSection },
						React.createElement(
							"div",
							{ className: "container" },
							React.createElement(
								"h2",
								{ style: { marginTop: 24 } },
								"Tuition"
							),
							React.createElement(
								"p",
								null,
								"Tuition is $",
								course.tuition,
								" with a $",
								course.deposit,
								" deposit to reserve your spot. A $200 discount will be applied to those who pay in full at the start of the course. Otherwise, payments can be made in bi-weekly installments throughout the duration of the course."
							)
						)
					);

					register = React.createElement(
						"article",
						{ id: "register", className: "overview", style: { margin: "auto", padding: 32 } },
						React.createElement(
							"h2",
							null,
							"Register"
						),
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "col-md-6", style: { marginBottom: 32 } },
								React.createElement(
									"h3",
									{ style: { marginBottom: 12 } },
									"Deposit"
								),
								"To secure a spot in the next class, submit a deposit below. If the class does not run for any reason, the deposit will be fully refunded. The first payment installment is due on the first day of class.",
								React.createElement("br", null),
								React.createElement("br", null),
								React.createElement(
									"a",
									{ onClick: this.showPaypal, href: "#register", className: "btn btn-success" },
									"Submit Deposit"
								)
							),
							React.createElement(
								"div",
								{ className: "col-md-6" },
								React.createElement(
									"h3",
									{ style: { marginBottom: 12 } },
									"Full Tuition"
								),
								"Submit the full tution today to receive a $200 discount. If the class does not run for any reason, your payment will be fully refunded.",
								React.createElement("br", null),
								React.createElement("br", null),
								React.createElement(
									"a",
									{ onClick: this.showStripeModal, href: "#", className: "btn btn-success" },
									"Full Tution"
								)
							)
						)
					);

					startDate = course.dates.split("-")[0].trim();
				}

				return React.createElement(
					"div",
					{ id: "wrapper", className: "clearfix", style: { backgroundImage: "url('/images/keyboard.png')", backgroundSize: "contain" } },
					React.createElement(Nav, null),
					React.createElement(
						"section",
						{ id: "lpf-header" },
						React.createElement(
							"header",
							null,
							React.createElement(
								"div",
								{ className: "content-wrapper dark" },
								React.createElement(
									"div",
									{ className: "content" },
									React.createElement(
										"h2",
										null,
										course.title
									),
									React.createElement(
										"h4",
										{ className: "muted" },
										"Learn Fullstack Development for Web and Mobile with Node, React, React Native"
									),
									course.type == "immersive" ? React.createElement(
										"a",
										{ onClick: this.toggleApplication, href: "#", style: { marginTop: 0 }, className: "button button-glass" },
										"Apply"
									) : React.createElement(
										"a",
										{ onClick: this.showPaypal, href: "#", style: { marginTop: 0 }, className: "button button-glass" },
										"Register"
									)
								)
							)
						)
					),
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(
						"section",
						{ id: "content", style: { background: "#f9f9f9" } },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ id: "lpf-content" },
								React.createElement(
									"main",
									null,
									React.createElement(
										"div",
										{ className: "aside-toggle" },
										React.createElement("div", null)
									),
									React.createElement(
										"aside",
										null,
										React.createElement(
											"nav",
											{ style: { padding: 16, background: "#fff", border: "1px solid #ddd" } },
											sidemenu,
											btnApply,
											cta
										)
									),
									React.createElement(
										"div",
										{ className: "content", style: { background: "#f9f9f9", paddingTop: 22 } },
										React.createElement(
											"article",
											{ className: "overview", style: style.article },
											React.createElement(
												"div",
												{ className: "container" },
												React.createElement(
													"div",
													{ className: "panel panel-default" },
													React.createElement(
														"article",
														{ id: "introduction", className: "overview", style: style.articleSection },
														React.createElement(
															"h2",
															null,
															course.title
														),
														React.createElement(
															"div",
															{ className: "row" },
															React.createElement(
																"div",
																{ className: "col-md-4" },
																React.createElement("img", { style: { width: 180, background: "#fff", marginBottom: 12 }, src: "https://media-service.appspot.com/site/images/" + course.image + "?crop=320", alt: "Velocity 360" })
															),
															React.createElement(
																"div",
																{ className: "col-md-8" },
																React.createElement(
																	"p",
																	{ style: { background: "#f9f9f9", padding: 12, border: "1px solid #ddd" }, className: "about" },
																	course.dates,
																	React.createElement("br", null),
																	course.schedule
																)
															)
														),
														React.createElement(
															"p",
															null,
															course.description
														)
													),
													who,
													React.createElement(
														"article",
														{ id: "curriculum", className: "overview", style: { margin: "auto", padding: 32 } },
														React.createElement(
															"h2",
															null,
															"Curriculum"
														),
														React.createElement(
															"div",
															{ className: "postcontent clearfix", style: { paddingBottom: 64 } },
															React.createElement(
																"div",
																{ id: "posts", className: "post-timeline clearfix" },
																React.createElement("div", { className: "timeline-border" }),
																units
															)
														)
													),
													React.createElement("div", { className: "clearfix" }),
													tuition,
													React.createElement(
														"article",
														{ id: "instructors", className: "overview", style: { margin: "auto", padding: 32 } },
														React.createElement(
															"h2",
															null,
															"Instructors"
														),
														instructors
													),
													React.createElement("div", { className: "clearfix" }),
													React.createElement(
														"article",
														{ id: "faq", className: "overview", style: style.articleSection },
														React.createElement(
															"h2",
															null,
															"FAQ"
														),
														React.createElement(
															"div",
															{ className: "col_full nobottommargin" },
															React.createElement(
																"div",
																{ className: "accordion accordion-border clearfix", "data-state": "closed" },
																faq
															)
														)
													),
													admissions,
													register
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
						{ bsSize: "sm", show: this.state.showConfirmation, onHide: this.toggleConfirmation },
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24, borderRadius: 3 } },
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement("img", { style: { width: 96, borderRadius: 48, border: "1px solid #ddd", background: "#fff", marginBottom: 24 }, src: "/images/logo_round_blue_260.png" }),
								React.createElement(
									"h4",
									null,
									"Confirmed"
								),
								React.createElement("hr", { style: { borderTop: "1px solid #ddd" } }),
								"Thanks for submitting the full tuition to the ",
								course.title,
								" course. Your payment has been confirmed. We look forward to getting started on ",
								startDate,
								".",
								React.createElement("br", null),
								React.createElement("br", null),
								React.createElement(
									"a",
									{ onClick: this.toggleConfirmation, href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin" },
									"Close"
								)
							)
						)
					),
					React.createElement(
						Modal,
						{ bsSize: "large", show: this.state.showApplication, onHide: this.toggleApplication },
						React.createElement(Application, { onSubmit: this.submitApplication })
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Course;
})(Component);




var style = {
	header: {
		marginBottom: 0,
		marginTop: 0 },

	panelBody: {
		padding: 36,
		borderBottom: "1px solid #ddd"
	},
	sidebar: {
		padding: 16,
		background: "#fff",
		border: "1px solid #ddd"
	},
	input: {
		borderRadius: "0px !important",
		background: "#FEF9E7"
	},
	article: {
		marginTop: 46
	},
	articleSection: {
		margin: "auto",
		padding: 32,
		borderBottom: "1px solid #ddd"
	},
	tag: {
		background: "#f9f9f9"
	}
};

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser,
		courses: state.courseReducer.courses,
		loaderOptions: state.staticReducer.loaderConfig,
		faq: state.staticReducer.faq,
		instructors: state.staticReducer.instructors

	};
};


module.exports = connect(stateToProps)(Course);