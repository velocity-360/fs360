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

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var CourseSection = _interopRequire(require("../../components/CourseSection"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var Course = (function (Component) {
	function Course(props, context) {
		_classCallCheck(this, Course);

		_get(Object.getPrototypeOf(Course.prototype), "constructor", this).call(this, props, context);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = {
			showLoader: false,
			showModal: false };
	}

	_inherits(Course, Component);

	_prototypeProperties(Course, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				api.handleGet("/api/course?slug=" + this.props.slug, {}, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.dispatch(actions.coursesRecieved(response.courses));
				});
			},
			writable: true,
			configurable: true
		},
		openModal: {
			value: function openModal(event) {
				event.preventDefault();
				this.setState({ showModal: true });
			},
			writable: true,
			configurable: true
		},
		closeModal: {
			value: function closeModal() {
				this.setState({ showModal: false });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _course = this.props.course;
				var units = this.props.course.units.map(function (unit, i) {
					return React.createElement(CourseSection, { key: unit.index, unit: unit, course: _course });
				});


				if (this.props.slug == "ios-high-school-course") {
					console.log("IOS HIGH SCHOOL COURSE");
				}


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
												"10",
												React.createElement(
													"span",
													null,
													"Feb"
												),
												React.createElement("div", { className: "timeline-divider" })
											),
											React.createElement(
												"div",
												{ className: "entry-image" },
												React.createElement(
													"a",
													{ href: "/images/blog/full/17.jpg", "data-lightbox": "image" },
													React.createElement("img", { className: "image_fade", src: "/images/hacking-2.jpg", alt: "Standard Post with Image" })
												)
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
												React.createElement(
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
														"Depost: $",
														this.props.course.deposit,
														React.createElement("hr", null),
														React.createElement(
															"a",
															{ href: "#", onClick: this.openModal, style: { marginRight: 12 }, className: "button button-border button-dark button-rounded noleftmargin" },
															"Apply"
														),
														React.createElement(
															"a",
															{ href: "#", onClick: this.openModal, className: "button button-border button-dark button-rounded noleftmargin" },
															"Request Syllabus"
														)
													)
												)
											)
										),
										units,
										React.createElement(
											"div",
											{ className: "entry clearfix" },
											React.createElement(
												"div",
												{ className: "entry-timeline" },
												"Unit",
												React.createElement(
													"span",
													null,
													"!"
												),
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
														{ className: "panel-body", style: { padding: 36 } },
														React.createElement(
															"h2",
															null,
															"Sign Up"
														),
														React.createElement("hr", null),
														"Ready to take the plunge? Need more information? Request a syllabus below or begin the application process.",
														React.createElement(
															"a",
															{ onClick: this.openModal, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
															"Apply"
														),
														React.createElement(
															"a",
															{ onClick: this.openModal, href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
															"Request Syllabus"
														)
													)
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
						{ id: "content", style: { backgroundColor: "#fff", paddingBottom: 48 } },
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
											"Welcome"
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
												"Our Mission is to teach you tomorrow’s technology, today.  If you want to work for a leading tech firm, for a technology startup, or become an entrepreneur, this 2-week class will put you on the right track to achieve any of these goals.  This iOS class is based entirely on Swift language, which is the main language you will need to know while developing the majority of iOS app.  In our iOS class you will not be learning how to program games, however you will be able to learn how to develop social media applications similar to Snapchat and Instagram."
											),
											React.createElement(
												"p",
												null,
												"Even if you do not want to become a professional developer and have it become your lifelong career, learning how an iOS app developed will give you the edge both in the immediate and distant future.  It might be a cliché, but learning how to code will empower you to act on future ideas.  For example if you are sitting in class one day and think of the next great social media app, it doesn’t have to just be a pipe dream or something that you would have to rely on someone else to build, it could be a project that you start building right away."
											),
											React.createElement(
												"a",
												{ href: "#", className: "social-icon inline-block si-small si-light si-rounded si-facebook" },
												React.createElement("i", { className: "icon-facebook" }),
												React.createElement("i", { className: "icon-facebook" })
											),
											React.createElement(
												"a",
												{ href: "#", className: "social-icon inline-block si-small si-light si-rounded si-twitter" },
												React.createElement("i", { className: "icon-twitter" }),
												React.createElement("i", { className: "icon-twitter" })
											),
											React.createElement(
												"a",
												{ href: "#", className: "social-icon inline-block si-small si-light si-rounded si-gplus" },
												React.createElement("i", { className: "icon-gplus" }),
												React.createElement("i", { className: "icon-gplus" })
											)
										)
									)
								)
							),
							React.createElement("div", { className: "col-sm-4 col-padding", style: { background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: "cover" } })
						),
						React.createElement(
							"div",
							{ className: "content-wrap", style: { background: "#f9f9f9", borderBottom: "1px solid #ddd" } },
							React.createElement(
								"div",
								{ className: "container clear-bottommargin clearfix" },
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
												React.createElement("img", { style: { background: "#fff", padding: 6, border: "1px solid #ddd" }, className: "image_fade", src: "/images/class.jpg", alt: "Image" })
											),
											React.createElement(
												"div",
												{ className: "entry-title" },
												React.createElement(
													"h3",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html" },
														"Small Classes"
													)
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
												React.createElement("img", { style: { background: "#fff", padding: 6, border: "1px solid #ddd" }, className: "image_fade", src: "/images/phone.jpg", alt: "Image" })
											),
											React.createElement(
												"div",
												{ className: "entry-title" },
												React.createElement(
													"h3",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html" },
														"Realistic Projects"
													)
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
												React.createElement("img", { style: { background: "#fff", padding: 6, border: "1px solid #ddd" }, className: "image_fade", src: "/images/joe.jpg", alt: "Image" })
											),
											React.createElement(
												"div",
												{ className: "entry-title" },
												React.createElement(
													"h3",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html" },
														"Compassion conflict resolution, progressive; tackle"
													)
												),
												React.createElement("hr", null)
											),
											React.createElement(
												"div",
												{ className: "entry-content" },
												React.createElement(
													"p",
													null,
													"Community health workers best practices, effectiveness meaningful work The Elders fairness. Our ambitions local solutions globalization."
												)
											)
										)
									)
								)
							)
						),
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"div",
								{ id: "faqs", className: "faqs" },
								React.createElement(
									"h3",
									{ style: { marginTop: 48 } },
									"Some of your Questions:"
								),
								React.createElement(
									"div",
									{ className: "divider" },
									React.createElement("i", { className: "icon-circle" })
								),
								React.createElement(
									"div",
									{ className: "col_half nobottommargin" },
									React.createElement(
										"h4",
										{ id: "faq-1" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										"  I don’t have a lot of experience coding; can I still take your summer class?"
									),
									React.createElement(
										"p",
										null,
										"Of course!  FS360 High school summer program is designed with students that have limited experience in mind.  If you have some knowledge of coding, that is great! But if not that does not mean we cannot teach you."
									),
									React.createElement(
										"p",
										null,
										"However we do screen our students.  We look to see that students are driven individuals, as well as what classes you are enrolled in, as well as other interests you have outside of school.  This is designed to ensure that no students enroll in a class that they are not ready and able to succeed in."
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-2" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" Who are the instructors for the summer classes?"
									),
									React.createElement(
										"p",
										null,
										"All of our instructors have worked in the technology field and have developed countless projects both big and small some which you probably have used! (insert examples of projects dan and dan have worked on)  Our instructors want to teach the next generation of programmers the most efficient and effective way to develop. All of our instructors are extremely qualified to teach you how to become a developer.  Because we are all working professionals we only teach you highly relevant information not theoretical information, we are not academics we are coders!"
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-3" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" Will this class help me get into College?  What about an internship in the future?"
									),
									React.createElement(
										"p",
										null,
										"Yes, I am glad you asked.  FS360 Summer program will make all high school students a very attractive candidate for top colleges.  We can confidently say this because we know that Colleges want the next Steve Jobs, Mark Zuckerberg, Evan Spiegel (Snapchat), or Jack Dorsey (Twitter), to go to their college.  This makes college admissions officers constantly looking for students who know how to develop apps and websites."
									),
									React.createElement(
										"p",
										null,
										"YAlso if your goal is to get an internship with exciting startups such as Uber or Instagram, learning how to code at FS360 is the perfect first step to take.  Technology startups and technology giants such as Google and Apple all look for interns that have familiarity with code and have spent time developing.  After 3 weeks at FS360 you will be able to say, that you can build a project from scratch, which will impress any company while looking at a high schoolers or freshman in college resume."
									)
								),
								React.createElement(
									"div",
									{ className: "col_half nobottommargin col_last" },
									React.createElement(
										"h4",
										{ id: "faq-4" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" Will I Have Fun?"
									),
									React.createElement(
										"p",
										null,
										"Coding doesn’t have to be boring, although we wont be developing games, you will know how to create apps similar to, Snapchat, and YikYak.  Also, besides spending your day coding, we are going to have weekly hackothons, start up brainstorming and debate lunches, and at the end of the program we will have a coding competition."
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-5" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" Where is the Summer Program for FS360?"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, quisquam atque vero delectus corrupti! Quo, maiores, dolorem, hic commodi nulla ratione accusamus doloribus fuga magnam id temporibus dignissimos deleniti quidem ipsam corporis sapiente nam expedita saepe quas ab? Vero, assumenda."
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
								"Request Syllabus"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement("input", { className: "form-control", type: "text", id: "name", placeholder: "Name" }),
							React.createElement("br", null),
							React.createElement("input", { className: "form-control", type: "text", id: "email", placeholder: "Email" }),
							React.createElement("br", null)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
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

	return Course;
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state));
	var keys = Object.keys(state.courseReducer.courses);

	return {
		currentUser: state.profileReducer.currentUser,
		course: state.courseReducer.courses[keys[0]],
		//course: state.courseReducer.courseArray[0],
		testimonials: state.staticReducer.testimonials,
		loaderOptions: state.staticReducer.loaderConfig

	};
};


module.exports = connect(stateToProps)(Course);