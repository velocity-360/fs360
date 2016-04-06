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

				api.handlePost("/api/test", this.props.currentUser);

			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var courses = this.props.courses.map(function (course, i) {
					var index = i + 1;
					var colClass = index % 3 == 0 ? "col_one_third" : "col_one_third col_last";
					return React.createElement(
						"div",
						{ key: i, className: colClass },
						React.createElement(
							"div",
							{ className: "feature-box fbox-plain" },
							React.createElement(
								"div",
								{ className: "fbox-icon", "data-animate": "bounceIn" },
								React.createElement(
									"a",
									{ href: "#" },
									React.createElement("img", { src: "https://media-service.appspot.com/site/images/" + course.image + "?crop=360", alt: "Responsive Layout" })
								)
							),
							React.createElement(
								"h3",
								null,
								React.createElement(
									"a",
									{ href: "#" },
									course.title
								)
							),
							React.createElement(
								"p",
								null,
								course.description
							)
						)
					);
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
											"Its your time to ",
											React.createElement(
												"strong",
												null,
												"create"
											),
											" Landing Pages for ",
											React.createElement(
												"strong",
												null,
												"FREE"
											)
										),
										React.createElement(
											"span",
											{ "data-animate": "fadeInUp", "data-delay": "300" },
											"Building a Landing Page was never so Easy & Interactive."
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
												{ className: "col_one_third nobottommargin" },
												React.createElement("input", { value: this.props.currentUser.firstName, onChange: this.updateUserRegistration, id: "firstName", type: "text", className: "form-control input-lg not-dark", placeholder: "First Name*" })
											),
											React.createElement(
												"div",
												{ className: "col_one_third nobottommargin" },
												React.createElement("input", { value: this.props.currentUser.lastName, onChange: this.updateUserRegistration, id: "lastName", type: "text", className: "form-control input-lg not-dark", placeholder: "Last Name*" })
											),
											React.createElement(
												"div",
												{ className: "col_one_third col_last nobottommargin" },
												React.createElement("input", { value: this.props.currentUser.email, onChange: this.updateUserRegistration, id: "email", type: "text", className: "form-control input-lg not-dark", placeholder: "Email*" })
											)
										),
										React.createElement(
											"div",
											{ className: "col_one_fifth col_last nobottommargin" },
											React.createElement(
												"button",
												{ onClick: this.register, className: "btn btn-lg btn-danger btn-block nomargin", value: "submit", type: "submit" },
												"JOIN"
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
									{ id: "section-features", className: "heading-block title-center page-section" },
									React.createElement(
										"div",
										{ style: { background: "#f9f9f9", border: "1px solid #ddd", padding: 24, marginBottom: 24, fontSize: 16 } },
										"FullStack 360 conducts development courses that are relevant in the startup and tech world today. We focus on the most up-to-date frameworks and libraries such as React, Angular, and Node JS. Our students are always prepared for rapid changes in the industry and are ready to work in tech after a course."
									),
									React.createElement(
										"h3",
										null,
										"Featured Courses"
									)
								),
								courses,
								React.createElement("div", { className: "clear" }),
								React.createElement(
									"div",
									{ className: "divider divider-short divider-center" },
									React.createElement("i", { className: "icon-circle" })
								),
								React.createElement(
									"div",
									{ className: "container clearfix" },
									React.createElement(
										"div",
										{ className: "col_one_third bottommargin-sm center" },
										React.createElement("img", { "data-animate": "fadeInLeft", src: "images/services/iphone6.png", alt: "Iphone" })
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
												"Optimized for Mobile & Touch Enabled Devices."
											)
										),
										React.createElement(
											"p",
											null,
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quod consequuntur quibusdam, enim expedita sed quia nesciunt incidunt accusamus necessitatibus modi adipisci officia libero accusantium esse hic, obcaecati, ullam, laboriosam!"
										),
										React.createElement(
											"p",
											null,
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti vero, animi suscipit id facere officia. Aspernatur, quo, quos nisi dolorum aperiam fugiat deserunt velit rerum laudantium cum magnam."
										),
										React.createElement(
											"a",
											{ href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
											"Learn more"
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
											"Meet the Bride & the Groom"
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
												{ className: "team-image", style: { width: 150 } },
												React.createElement("img", { className: "img-circle", src: "images/wedding/17.jpg", alt: "Bryant Kellam" })
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
														"Brian Correa"
													),
													React.createElement(
														"span",
														null,
														"Groom"
													)
												),
												React.createElement(
													"div",
													{ className: "team-content" },
													"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, pariatur, magni! Omnis reiciendis architecto, cupiditate fuga dolores nam accusamus iste molestias quos mollitia totam eius porro culpa incidunt, sunt rerum molestiae aliquid non hic."
												),
												React.createElement("div", { className: "line topmargin-sm nobottommargin" }),
												React.createElement(
													"a",
													{ href: "#", className: "social-icon si-borderless si-small si-facebook", title: "Facebook" },
													React.createElement("i", { className: "icon-facebook" }),
													React.createElement("i", { className: "icon-facebook" })
												),
												React.createElement(
													"a",
													{ href: "#", className: "social-icon si-borderless si-small si-twitter", title: "Twitter" },
													React.createElement("i", { className: "icon-twitter" }),
													React.createElement("i", { className: "icon-twitter" })
												),
												React.createElement(
													"a",
													{ href: "#", className: "social-icon si-borderless si-small si-pinterest", title: "Pinterest" },
													React.createElement("i", { className: "icon-pinterest" }),
													React.createElement("i", { className: "icon-pinterest" })
												),
												React.createElement(
													"a",
													{ href: "#", className: "social-icon si-borderless si-small si-instagram", title: "Instagram" },
													React.createElement("i", { className: "icon-instagram" }),
													React.createElement("i", { className: "icon-instagram" })
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
												{ className: "team-image", style: { width: 150 } },
												React.createElement("img", { className: "img-circle", src: "images/wedding/18.jpg", alt: "Leanna Pyburn" })
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
														"Leanna Pyburn"
													),
													React.createElement(
														"span",
														null,
														"Bride"
													)
												),
												React.createElement(
													"div",
													{ className: "team-content" },
													"Blanditiis adipisci laudantium reiciendis distinctio, molestiae, illum. Aut eveniet assumenda expedita labore nulla commodi numquam perspiciatis, amet doloribus cum sint, quisquam possimus eos aspernatur distinctio similique perferendis."
												),
												React.createElement("div", { className: "line topmargin-sm nobottommargin" }),
												React.createElement(
													"a",
													{ href: "#", className: "social-icon si-borderless si-small si-facebook", title: "Facebook" },
													React.createElement("i", { className: "icon-facebook" }),
													React.createElement("i", { className: "icon-facebook" })
												),
												React.createElement(
													"a",
													{ href: "#", className: "social-icon si-borderless si-small si-twitter", title: "Twitter" },
													React.createElement("i", { className: "icon-twitter" }),
													React.createElement("i", { className: "icon-twitter" })
												),
												React.createElement(
													"a",
													{ href: "#", className: "social-icon si-borderless si-small si-instagram", title: "Instagram" },
													React.createElement("i", { className: "icon-instagram" }),
													React.createElement("i", { className: "icon-instagram" })
												)
											)
										)
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
	return {
		currentUser: state.profileReducer.currentUser,
		courses: state.courseReducer.courses
	};
};

// const StoreSelector = function(store){
// 	console.log('StoreSelector: '+JSON.stringify(store.profileReducer.currentUser));
// 	return {
// 		currentUser: store.profileReducer.currentUser
// 	}

// }

module.exports = connect(stateToProps)(Home);
//		getCurrentUser()