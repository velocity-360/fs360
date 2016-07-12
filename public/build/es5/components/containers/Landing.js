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
var connect = require("react-redux").connect;
var Nav = _interopRequire(require("../../components/Nav"));

var Register = _interopRequire(require("../../components/Register"));

var Header = _interopRequire(require("../../components/Header"));

var Footer = _interopRequire(require("../../components/Footer"));

var Landing = (function (Component) {
	function Landing(props, context) {
		_classCallCheck(this, Landing);

		_get(Object.getPrototypeOf(Landing.prototype), "constructor", this).call(this, props, context);
		this.state = {};
	}

	_inherits(Landing, Component);

	_prototypeProperties(Landing, null, {
		componentDidMount: {
			value: function componentDidMount() {},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var courses = this.props.courses.map(function (course, i) {
					var cls = i == 0 ? "col_half panel panel-default" : "col_half panel panel-default col_last";
					return React.createElement(
						"div",
						{ key: course.id, className: cls },
						React.createElement(
							"div",
							{ className: "panel-heading" },
							React.createElement(
								"h2",
								{ className: "panel-title" },
								React.createElement(
									"a",
									{ style: { color: "#1ABC9C" }, href: "#" },
									course.title
								)
							)
						),
						React.createElement(
							"div",
							{ className: "panel-body", style: { background: "#FFFDFD" } },
							course.description,
							React.createElement("br", null),
							React.createElement("br", null),
							React.createElement(
								"ul",
								{ style: { listStyle: "none", fontWeight: "600" } },
								React.createElement(
									"li",
									null,
									course.dates
								),
								React.createElement(
									"li",
									null,
									course.schedule
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
					);
				});

				return React.createElement(
					"div",
					null,
					React.createElement(Nav, null),
					React.createElement(Header, null),
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
									courses,
									React.createElement("div", { className: "clearfix" }),
									"Each section is a stand-alone course meaning students can enroll in one and not the other. However, the MVP Bootcamp requires working knowledge of the material covered in the Fundamentals Course so students should not be complete beginners for this sequence. The tuition for each course is $6,500 but when taken together, the combined tuition is $11,500.",
									React.createElement("br", null),
									"All live classes take place in our NYC location:",
									React.createElement("br", null),
									React.createElement("br", null),
									React.createElement(
										"strong",
										null,
										"Velocity 360"
									),
									React.createElement("br", null),
									React.createElement(
										"strong",
										null,
										"27 East 28th Street"
									),
									React.createElement("br", null),
									React.createElement(
										"strong",
										null,
										"New York, NY, 10016"
									)
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
												{ style: { background: "#fff" }, href: "#" },
												"JavaScript"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"Node JS"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"Express"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
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
												{ style: { background: "#fff" }, href: "#" },
												"iOS"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"Node JS"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"REST API"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
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
												"August 8th - September 28th"
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
											{ href: "/course/ios-node-evening-course", className: "btn btn-success" },
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
												"August 9th - September 29th"
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
											{ href: "/course/node-react-evening-course", className: "btn btn-success" },
											"Learn More"
										)
									)
								)
							)
						)
					),
					React.createElement(Register, null),
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
		courses: state.courseReducer.courseArray
	};
};

module.exports = connect(stateToProps)(Landing);