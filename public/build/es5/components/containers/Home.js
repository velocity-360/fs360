"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Nav = _interopRequire(require("../../components/Nav"));

var Footer = _interopRequire(require("../../components/Footer"));

var Testimonial = _interopRequire(require("../../components/Testimonial"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var Home = (function (Component) {
	function Home(props, context) {
		_classCallCheck(this, Home);

		_get(Object.getPrototypeOf(Home.prototype), "constructor", this).call(this, props, context);
		this.updateUserRegistration = this.updateUserRegistration.bind(this);
		this.register = this.register.bind(this);
	}

	_inherits(Home, Component);

	_prototypeProperties(Home, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				console.log("HOME: componentDidMount");
				api.handleGet("/api/course?isFeatured=yes", {});
			},
			writable: true,
			configurable: true
		},
		updateUserRegistration: {
			value: function updateUserRegistration(event) {
				event.preventDefault();
				var updatedUser = Object.assign({}, this.props.currentUser);
				updatedUser[event.target.id] = event.target.value;
				store.dispatch(actions.updateCurrentUser(updatedUser));
			},
			writable: true,
			configurable: true
		},
		register: {
			value: function register(event) {
				event.preventDefault();
				console.log("REGISTER: " + JSON.stringify(this.props.currentUser));

				//		api.handlePost('/api/test', this.props.currentUser);

			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var testimonialList = this.props.testimonials.map(function (testimonial, i) {
					return React.createElement(Testimonial, { key: i, testimonial: testimonial });
				});

				return React.createElement(
					"div",
					null,
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
												React.createElement("input", { value: this.props.currentUser.email, onChange: this.updateUserRegistration, id: "lastName", type: "text", className: "form-control input-lg not-dark", placeholder: "Email*" })
											),
											React.createElement(
												"div",
												{ className: "col_one_fourth col_last nobottommargin" },
												React.createElement(
													"select",
													{ className: "form-control input-lg not-dark" },
													React.createElement(
														"option",
														null,
														"iOS Bootcamp"
													),
													React.createElement(
														"option",
														null,
														"Web Bootcamp"
													),
													React.createElement(
														"option",
														null,
														"iOS Part Time"
													),
													React.createElement(
														"option",
														null,
														"Web Part Time"
													)
												)
											)
										),
										React.createElement(
											"div",
											{ className: "col_one_fifth col_last nobottommargin" },
											React.createElement(
												"button",
												{ onClick: this.register, className: "btn btn-lg btn-danger btn-block nomargin", value: "submit", type: "submit" },
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
										"The only constant in the software industry is change. One day, PHP is the king, the next day Ruby on Rails is highest in demand. The major bootcamps in NYC focus on today. Flatiron School, General Assebmbly, Dev Bootcamp all teach Rails while we focus on tomorrow. Our stack is Node JS with React on the front end and ES2015. Will you be among the flood of Rails devs saturating the NYC market or will you be ready for the tech stack of tomorrow?"
									),
									React.createElement(
										"a",
										{ href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
										"Learn more"
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
											"Meet the Bride & the Groom"
										)
									),
									testimonialList
								)
							)
						)
					),
					React.createElement(
						"section",
						{ id: "section-team", className: "page-section" },
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
										React.createElement("img", { src: "/images/iphone.jpg", alt: "John Doe" })
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
												"iOS High School Course"
											),
											React.createElement(
												"span",
												null,
												"2 weeks"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"The iOS Crash Course takes beginners through the process of designing and programming a basic iOS app from start. Students will create a simple app that utilizes key platform tools including the GPS locator, accelerator, and camera. In addition, the course will explore third party APIs such as Google Maps and Foursquare."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ href: "/course/123", className: "btn btn-success" },
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
										React.createElement("img", { src: "/images/xcode.jpg", alt: "Nix Maxwell" })
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
												"iOS Intensive"
											),
											React.createElement(
												"span",
												null,
												"6 Weeks"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"The iOS Intensive covers all aspects of iOS development for beginners. For 4 hours a day, 4 days a week, students will cover the key aspects of iOS development from creating sleek UI’s, animations, GPS locator, integrating 3rd party data, and publishing. This course is designed for beginners with little to no programming experience and all development will be done using Swift."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ href: "/course/123", className: "btn btn-success" },
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
										React.createElement("img", { src: "/images/node.jpg", alt: "Josh Clark" })
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
												"Web High School Course"
											),
											React.createElement(
												"span",
												null,
												"2 Weeks"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda similique unde mollitia."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ href: "/course/123", className: "btn btn-success" },
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
										React.createElement("img", { src: "/images/react.jpg", alt: "Mary Jane" })
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
												"Web Intensive"
											),
											React.createElement(
												"span",
												null,
												"6 Weeks"
											)
										),
										React.createElement(
											"div",
											{ className: "team-content" },
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda similique unde mollitia."
										),
										React.createElement("br", null),
										React.createElement(
											"a",
											{ href: "/course/123", className: "btn btn-success" },
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
							{ className: "row clearfix common-height" },
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
								{ className: "col-md-6 center col-padding", style: { backgroundColor: "#F5F5F5" } },
								React.createElement(
									"div",
									null,
									React.createElement(
										"div",
										{ className: "heading-block nobottomborder" },
										React.createElement(
											"h3",
											null,
											"Walkthrough Videos & Demos"
										)
									),
									React.createElement(
										"p",
										{ className: "lead" },
										"Democracy inspire breakthroughs, Rosa Parks; inspiration raise awareness natural resources. Governance impact; transformative donation philanthropy, respect reproductive."
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
															"iOS + Node"
														)
													),
													React.createElement(
														"td",
														null,
														"June 1 - Nov 28"
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
															"Full Stack Web"
														)
													),
													React.createElement(
														"td",
														null,
														"June 1 - Nov 28"
													),
													React.createElement(
														"td",
														null,
														"Closed"
													)
												)
											)
										)
									),
									React.createElement(
										"a",
										{ href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
										"Apply"
									)
								)
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
	console.log("STATE TO PROPS: " + JSON.stringify(state));
	var courseList = [];
	var keys = Object.keys(state.courseReducer.courses);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		courseList.push(state.courseReducer.courses[key]);
	}


	return {
		currentUser: state.profileReducer.currentUser,
		courses: courseList,
		testimonials: state.staticReducer.testimonials
	};
};


module.exports = connect(stateToProps)(Home);
//		getCurrentUser()