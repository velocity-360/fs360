"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Loader = _interopRequire(require("react-loader"));

var Nav = _interopRequire(require("../../components/Nav"));

var Register = _interopRequire(require("../../components/Register"));

var Header = _interopRequire(require("../../components/Header"));

var Footer = _interopRequire(require("../../components/Footer"));

var RightSidebar = _interopRequire(require("../../components/RightSidebar"));

var Peaks = (function (Component) {
	function Peaks(props, context) {
		_classCallCheck(this, Peaks);

		_get(Object.getPrototypeOf(Peaks.prototype), "constructor", this).call(this, props, context);
		this.state = {};
	}

	_inherits(Peaks, Component);

	_prototypeProperties(Peaks, null, {
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
					React.createElement(Nav, null),
					React.createElement(
						"section",
						{ id: "slider", className: "slider-parallax dark full-screen", style: { background: "url(\"/images/mountains.jpg\") center" } },
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
										"Introducing Peaks Academy"
									),
									React.createElement("img", { style: { width: 124, borderRadius: 62 }, src: "/images/peaks.png", alt: "Velocity 360" }),
									React.createElement(
										"span",
										{ style: { fontSize: 18 }, "data-animate": "fadeInUp", "data-delay": "300" },
										"Data Science Bootcamp",
										React.createElement("br", null),
										"Learn data science from anywhere in the world,",
										React.createElement("br", null),
										"without quitting your job",
										React.createElement("br", null)
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
									{ className: "col_two_third bottommargin-sm" },
									React.createElement(
										"div",
										{ className: "fancy-title title-bottom-border" },
										React.createElement(
											"h2",
											{ style: { fontWeight: 400 } },
											"Overview"
										)
									),
									React.createElement("img", { style: { background: "#fff", float: "right", border: "1px solid #ddd", maxWidth: 260, padding: 6, marginLeft: 12 }, className: "image_fade", src: "/images/group.JPG", alt: "Velocity 360" }),
									React.createElement(
										"div",
										null,
										React.createElement(
											"p",
											null,
											"Through an advanced curriculum and project based structure, students learn today’s cutting edge analytic technologies. The program is designed for students who prefer not to leave their day jobs and are ready to take on an extra educational challenge during their evenings and weekends.",
											React.createElement("br", null),
											React.createElement("br", null),
											"The program features a Python-driven curriculum, and immerses you in the world of data science and machine learning algorithms. The course is well suited for professionals who have a strong technical background."
										),
										React.createElement(
											"a",
											{ target: "_blank", href: "http://www.peaksacademy.com/", className: "button button-border button-dark button-rounded noleftmargin" },
											"Learn More"
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm hidden-xs col_last", style: { borderLeft: "1px solid #ddd", padding: 36 } },
									React.createElement(RightSidebar, null)
								)
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Peaks;
})(Component);

module.exports = Peaks;