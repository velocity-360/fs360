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
					return React.createElement(
						"div",
						{ key: course.id, className: "col-md-12 bottommargin" },
						React.createElement(
							"div",
							{ className: "team team-list clearfix" },
							React.createElement(
								"div",
								{ className: "team-image", style: { width: 150 } },
								React.createElement("img", { className: "img-circle", src: "https://media-service.appspot.com/site/images/" + course.image + "?crop=260", alt: "Velocity 360" })
							),
							React.createElement(
								"div",
								{ className: "team-desc" },
								React.createElement(
									"div",
									{ className: "team-title" },
									React.createElement(
										"h4",
										{ style: { fontWeight: 400 } },
										React.createElement(
											"a",
											{ href: "/course/" + course.slug },
											course.title
										)
									),
									React.createElement(
										"span",
										{ style: { color: "#444" } },
										course.dates
									),
									React.createElement(
										"span",
										{ style: { color: "#444" } },
										course.schedule
									)
								),
								React.createElement(
									"div",
									{ className: "team-content" },
									course.description
								)
							)
						)
					);
				});

				var posts = this.props.posts.map(function (post, i) {
					var name = post.profile.name == null ? "anon" : post.profile.name;
					return React.createElement(
						"div",
						{ key: post.id, style: { border: "1px solid #ddd", padding: 12, background: "#f9f9f9", marginBottom: 16 } },
						React.createElement(
							"span",
							{ style: { fontWeight: 100, fontSize: 14 } },
							name
						),
						React.createElement(
							"h5",
							{ style: { fontWeight: 400 } },
							React.createElement(
								"a",
								{ href: "/post/" + post.slug },
								post.title
							)
						)
					);
				});

				var headerString = "Learn Tomorrow's Technology Today";

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
										headerString
									),
									React.createElement(
										"span",
										null,
										"Velocity 360 is the only coding bootcamp that delivers a full stack education ",
										React.createElement("br", null),
										"with the most cutting edge tech: Node, React, Redux, and React Native."
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
											"h2",
											{ style: { fontWeight: 400 } },
											"Highly Demanded Skills"
										)
									),
									React.createElement("img", { style: { background: "#fff", float: "left", border: "1px solid #ddd", maxWidth: 260, padding: 6, marginRight: 12 }, className: "image_fade", src: "/images/class.jpg", alt: "Velocity 360" }),
									React.createElement(
										"h3",
										{ style: { marginBottom: 6, fontWeight: 400 } },
										"Industry Driven"
									),
									React.createElement(
										"p",
										null,
										"Technology, more than any other industry, changes rapidly and many fall behind. As a newcomer to tech, it is imperative to understand the trends and develop the skills that will be valued tomorrow over those in demand today. Velocity 360 strongly prepares students under that guiding principle. Our curriculum is highly focused on the bleeding edge of tech evolution: Node JS, React, Redux, and React Native."
									),
									React.createElement(
										"h3",
										{ style: { marginBottom: 6, fontWeight: 400 } },
										"Modern Curriculum"
									),
									React.createElement(
										"p",
										null,
										"While other bootcamps continue to teach Ruby on Rails (Dev Bootcamp, Flatiron School, General Assembly, NYCDA, App Academy, etc) and have been doing so for several years, Velocity 360 is the only bootcamp in NYC that focuses on the tremendously growing Node/React/React-Native ecosystem. Rather than joining the mass of Ruby on Rails devs that graduate from bootcamps every three months, you will leave Velocity 360 with the skills highly in demand yet hard to find in the tech world."
									),
									React.createElement("img", { src: "/images/wework.jpg" }),
									React.createElement(
										"i",
										{ style: { fontWeight: 100 } },
										"* Courses are held at our WeWork Location on 28th Street."
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm hidden-xs col_last", style: { borderLeft: "1px solid #ddd", padding: 36 } },
									React.createElement(
										"div",
										{ className: "widget clearfix" },
										React.createElement(
											"h4",
											null,
											"Recent Posts"
										),
										React.createElement("hr", null),
										posts
									),
									React.createElement(
										"div",
										{ className: "widget clearfix" },
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
								{ style: { fontWeight: 400 } },
								"Bootcamps"
							)
						),
						React.createElement(
							"div",
							{ className: "content-wrap", style: { paddingTop: 0 } },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								courses
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
		courses: state.courseReducer.courseArray,
		posts: state.postReducer.postsArray
	};
};

module.exports = connect(stateToProps)(Landing);