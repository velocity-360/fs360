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

var Header = _interopRequire(require("../../components/Header"));

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
		this.closeLogin = this.closeLogin.bind(this);
		this.toggleApplication = this.toggleApplication.bind(this);
		this.submitApplication = this.submitApplication.bind(this);
		this.showLoader = this.showLoader.bind(this);
		this.hideLoader = this.hideLoader.bind(this);
		this.showLogin = this.showLogin.bind(this);
		this.showConfirmation = this.showConfirmation.bind(this);
		this.subscribe = this.subscribe.bind(this);
		this.updateCourse = this.updateCourse.bind(this);
		this.updateCurrentUser = this.updateCurrentUser.bind(this);
		this.showPaypal = this.showPaypal.bind(this);
		this.state = {
			showApplication: false,
			showLogin: false,
			showConfirmation: false,
			syllabusRequest: {
				name: "",
				email: "",
				course: "",
				subject: "Syllabus Request"
			}
		};
	}

	_inherits(Course, Component);

	_prototypeProperties(Course, null, {
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
		showConfirmation: {
			value: function showConfirmation() {
				this.setState({ showConfirmation: true });
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
		subscribe: {
			value: function subscribe(event) {
				event.preventDefault();
				console.log("Subscribe");

				if (this.props.currentUser.id == null) {
					// not logged in
					this.showLogin();
					return;
				}

				// check credits first:
				var course = this.props.courses[this.props.slug];
				if (this.props.currentUser.credits < course.credits && this.props.currentUser.accountType == "basic") {
					alert("Not Enough Credits. Please Upgrade to Premium or Purchase More Credits.");
					return;
				}

				// Fetch course first to get most updated subscriber list:
				var _this = this;
				var endpoint = "/api/course/" + course.id;
				api.handleGet(endpoint, null, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					var updatedCourse = response.course;
					var subscribers = updatedCourse.subscribers;
					if (subscribers.indexOf(_this.props.currentUser.id) != -1) // already subscribed
						return;

					subscribers.push(_this.props.currentUser.id);
					_this.updateCourse({
						subscribers: subscribers
					});
				});
			},
			writable: true,
			configurable: true
		},
		updateCourse: {
			value: function updateCourse(pkg) {
				var course = this.props.courses[this.props.slug];
				var _this = this;
				var endpoint = "/api/course/" + course.id;
				api.handlePut(endpoint, pkg, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					var updatedCourse = response.course;
					store.currentStore().dispatch(actions.courseRecieved(updatedCourse));

					if (_this.props.currentUser.accountType == "premium") return;

					var credits = _this.props.currentUser.credits - updatedCourse.credits;
					_this.updateCurrentUser({
						credits: credits
					});
				});
			},
			writable: true,
			configurable: true
		},
		updateCurrentUser: {
			value: function updateCurrentUser(pkg) {
				var endpoint = "/api/profile/" + this.props.currentUser.id;
				api.handlePut(endpoint, pkg, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					store.currentStore().dispatch(actions.currentUserRecieved(response.profile));
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
		showPaypal: {
			value: function showPaypal(event) {
				//		console.log('showPaypal')
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

				var startDate = course.dates == null ? "" : course.dates.split("-")[0].trim();
				var _course = course;
				var _currentUser = this.props.currentUser;
				var _showLogin = this.showLogin;
				var _subscribe = this.subscribe;

				var units = course.units.map(function (unit, i) {
					return React.createElement(
						"div",
						{ key: i, className: "entry clearfix" },
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
							{ className: "panel panel-default", style: { maxWidth: 600 } },
							React.createElement(
								"div",
								{ className: "panel-body", style: { padding: 36 } },
								React.createElement(
									"h3",
									null,
									unit.topic
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

				var sidemenu = null;
				var btnApply = null;
				var who = null;
				var tuition = null;
				var admissions = null;
				var register = null;
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
								"Tuition, Scholarships"
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

					who = React.createElement(
						"article",
						{ id: "who", className: "overview" },
						React.createElement(
							"div",
							{ className: "container" },
							React.createElement(
								"h2",
								null,
								"Who"
							),
							React.createElement(
								"p",
								{ className: "about" },
								"Are you right for this class?"
							),
							React.createElement(
								"div",
								{ className: "image" },
								React.createElement("img", { style: { width: 280, background: "#fff", padding: 6, border: "1px solid #ddd" }, src: "/images/group.JPG", alt: "Velocity 360" })
							),
							React.createElement(
								"div",
								{ className: "text" },
								React.createElement(
									"p",
									null,
									"The ",
									course.title,
									" is designed for beginner to intermediate programmers. A typical applicant has written basic code before, possibly tinkered with jQuery and JavaScript and/or a framework like Ruby on Rails. You should be comfortable writing  simple programs to perform string manipulation, arithmetic operations, etc. HTML should be familiar as well. This should not be your first time coding. If you’re a beginner programming who is looking for the next step and is eager to learn, this course is for you."
								)
							)
						)
					);

					tuition = React.createElement(
						"article",
						{ id: "tuition", className: "overview" },
						React.createElement(
							"div",
							{ className: "container" },
							React.createElement(
								"h2",
								{ style: { marginTop: 24 } },
								"Tuition, Scholarships, Deadlines"
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
									"A $1,000 scholarship is available to any woman is admittted to the course. Further, two full scholarships are allocated in each class for highly qualified applicants."
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
									"The deadline for application is August 29th for regular applicants. To be eligible for the full scholarship, the deadline is August 22nd."
								)
							)
						)
					);

					admissions = React.createElement(
						"article",
						{ id: "admissions", className: "overview" },
						React.createElement(
							"div",
							{ className: "container" },
							React.createElement(
								"h2",
								{ style: { marginTop: 24 } },
								"Admissions"
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
										"The Process"
									),
									React.createElement("hr", null),
									React.createElement(
										"span",
										{ className: "step" },
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
										"Complete our online application by midnight August 29th to apply for the course. To be eligible for a scholarship you must apply by midnight August 22nd."
									),
									React.createElement(
										"span",
										{ className: "step" },
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
										"All applicants will undergo a 15-30 minute phone interview to as a first technical assessment. You should feel comfortable speaking about prior programming experience."
									),
									React.createElement(
										"span",
										{ className: "step" },
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
										"span",
										{ className: "step" },
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

					tuition = React.createElement(
						"article",
						{ id: "tuition", className: "overview" },
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
						{ id: "register", className: "overview" },
						React.createElement(
							"div",
							{ className: "container" },
							React.createElement(
								"h2",
								{ style: { marginTop: 24 } },
								"Register"
							),
							React.createElement(
								"div",
								{ className: "panel panel-default" },
								React.createElement(
									"div",
									{ className: "panel-body", style: { padding: 36, lineHeight: 3 } },
									React.createElement(
										"span",
										{ className: "step" },
										"Dates"
									),
									course.dates,
									React.createElement("br", null),
									React.createElement(
										"span",
										{ className: "step" },
										"Schedule"
									),
									React.createElement(
										"span",
										null,
										course.schedule
									),
									React.createElement("br", null),
									React.createElement(
										"span",
										{ className: "step" },
										"Deposit"
									),
									React.createElement(
										"span",
										null,
										"$",
										course.deposit
									),
									React.createElement("br", null),
									React.createElement(
										"span",
										{ className: "step" },
										"Tuition"
									),
									React.createElement(
										"span",
										null,
										"$",
										course.tuition
									),
									React.createElement("br", null),
									React.createElement("br", null),
									React.createElement("input", { type: "text", onChange: this.updatePromoCode, id: "promo", placeholder: "Promo Code", className: "custom-input" }),
									React.createElement(
										"a",
										{ onClick: this.showPaypal, href: course.paypalLink, style: { width: "100%", textAlign: "center" }, className: "button button-xlarge" },
										"Submit Deposit"
									),
									React.createElement("br", null)
								)
							)
						)
					);
				}


				return React.createElement(
					"div",
					{ id: "wrapper", className: "clearfix" },
					React.createElement(Nav, { headerStyle: "dark" }),
					React.createElement(
						"section",
						{ id: "lpf-header", style: { backgroundImage: "url('/images/joe_light_blue.png')" } },
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
									React.createElement(
										"a",
										{ href: "https://www.velocity360.io/event/open-house", className: "button button-glass" },
										"Attend Info Session"
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
											btnApply
										)
									),
									React.createElement(
										"div",
										{ className: "content", style: { background: "#f9f9f9" } },
										React.createElement(
											"article",
											{ id: "introduction", className: "overview" },
											React.createElement(
												"div",
												{ className: "container" },
												React.createElement(
													"h2",
													null,
													course.title
												),
												React.createElement("hr", null),
												React.createElement(
													"p",
													{ className: "about" },
													course.dates,
													React.createElement("br", null),
													course.schedule
												),
												React.createElement(
													"div",
													{ className: "container" },
													React.createElement(
														"div",
														{ className: "image" },
														React.createElement("img", { style: { width: 280, background: "#fff", padding: 6, border: "1px solid #ddd" }, src: "https://media-service.appspot.com/site/images/" + course.image + "?crop=460", alt: "Velocity 360" })
													),
													React.createElement(
														"div",
														{ className: "text" },
														React.createElement(
															"p",
															null,
															course.description
														)
													)
												)
											)
										),
										React.createElement("hr", { style: { marginTop: 24 } }),
										who,
										React.createElement("hr", { style: { marginTop: 24 } }),
										React.createElement(
											"article",
											{ id: "curriculum", className: "overview" },
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
										tuition,
										React.createElement(
											"article",
											{ id: "instructors", className: "overview" },
											React.createElement(
												"div",
												{ className: "container" },
												React.createElement(
													"h2",
													{ style: { marginTop: 24 } },
													"Instructors"
												),
												React.createElement(
													"div",
													{ className: "col-md-12 bottommargin" },
													React.createElement(
														"div",
														{ className: "team team-list clearfix" },
														React.createElement(
															"div",
															{ className: "team-image", style: { width: 150 } },
															React.createElement("img", { className: "img-circle", src: "/images/kwon.png", alt: "Velocity 360" })
														),
														React.createElement(
															"div",
															{ className: "team-desc" },
															React.createElement(
																"div",
																{ className: "team-title" },
																React.createElement(
																	"h4",
																	{ style: { marginBottom: 12 } },
																	"Dan Kwon"
																),
																React.createElement(
																	"div",
																	{ className: "tagcloud" },
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"Node JS"
																	),
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"React"
																	),
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"React Native"
																	),
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"Angular JS"
																	),
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"iOS"
																	),
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"Swift"
																	),
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"Objective C"
																	)
																)
															),
															React.createElement("div", { className: "clearfix" }),
															React.createElement(
																"div",
																{ className: "team-content" },
																"Dan is a full stack developer focusing on building MVPs for early stage startups in New York. As a consultant, he has worked with several startups and development agencies over a five year span. Dan specializes in iOS, backend technologies such as Node JS, Google Compute Engine, Heroku, and AWS as well as front end libraries such as React and Angular JS. Dan graduated from Cornell University where he walked to class in the snow, uphill both ways."
															)
														)
													)
												),
												React.createElement(
													"div",
													{ className: "col-md-12 bottommargin" },
													React.createElement(
														"div",
														{ className: "team team-list clearfix" },
														React.createElement(
															"div",
															{ className: "team-image", style: { width: 150 } },
															React.createElement("img", { className: "img-circle", src: "/images/beaman.png", alt: "Velocity 360" })
														),
														React.createElement(
															"div",
															{ className: "team-desc" },
															React.createElement(
																"div",
																{ className: "team-title" },
																React.createElement(
																	"h4",
																	{ style: { marginBottom: 12 } },
																	"Roger Beaman"
																),
																React.createElement(
																	"div",
																	{ className: "tagcloud" },
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"Node JS"
																	),
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"React"
																	),
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"Angular JS"
																	),
																	React.createElement(
																		"a",
																		{ style: { background: "#fff" }, href: "#" },
																		"JQuery"
																	)
																)
															),
															React.createElement("div", { className: "clearfix" }),
															React.createElement(
																"div",
																{ className: "team-content" },
																"Roger Beaman is a passionate Fullstack JavaScript developer that took the unusual route to software development which perhaps you are on right now. He started work in finance and found that writing Excel formulas was by far the most exciting part of his job. Thus began a journey to joining you in the exciting career that is software development. In under a year he was able to go from a bootcamp to a lead developer at Shutterstock and he is excited about sharing the knowledge and advice he has to help you do the same."
															)
														)
													)
												)
											)
										),
										React.createElement(
											"article",
											{ id: "faq", className: "overview" },
											React.createElement(
												"div",
												{ className: "container" },
												React.createElement(
													"h2",
													{ style: { marginTop: 24 } },
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
											)
										),
										admissions,
										register
									)
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

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser,
		courses: state.courseReducer.courses,
		bootcamps: state.courseReducer.courseArray,
		loaderOptions: state.staticReducer.loaderConfig,
		faq: state.staticReducer.faq
	};
};


module.exports = connect(stateToProps)(Course);