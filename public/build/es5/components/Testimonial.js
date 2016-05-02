"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Testimonial = (function (Component) {
	function Testimonial() {
		_classCallCheck(this, Testimonial);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(Testimonial, Component);

	_prototypeProperties(Testimonial, null, {
		render: {
			value: function render() {
				return React.createElement(
					"div",
					{ className: "col-md-6 bottommargin" },
					React.createElement(
						"div",
						{ className: "team team-list clearfix" },
						React.createElement(
							"div",
							{ className: "team-image", style: { width: 150 } },
							React.createElement("img", { className: "img-circle", src: "/images/" + this.props.testimonial.image, alt: "FullStaack 360" })
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
									this.props.testimonial.name
								),
								React.createElement(
									"span",
									null,
									this.props.testimonial.course
								)
							),
							React.createElement(
								"div",
								{ className: "team-content" },
								this.props.testimonial.quote
							),
							React.createElement("div", { className: "line topmargin-sm nobottommargin" }),
							React.createElement(
								"a",
								{ href: "#", className: "social-icon si-small si-borderless si-github" },
								React.createElement("i", { className: "icon-github" }),
								React.createElement("i", { className: "icon-github" })
							),
							React.createElement(
								"a",
								{ href: "#", className: "social-icon si-borderless si-small si-twitter", title: "Twitter" },
								React.createElement("i", { className: "icon-twitter" }),
								React.createElement("i", { className: "icon-twitter" })
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Testimonial;
})(Component);

module.exports = Testimonial;