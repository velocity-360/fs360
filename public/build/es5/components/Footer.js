"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var Footer = (function (_React$Component) {
	function Footer(props, context) {
		_classCallCheck(this, Footer);

		_get(Object.getPrototypeOf(Footer.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(Footer, _React$Component);

	_prototypeProperties(Footer, null, {
		render: {
			value: function render() {
				return React.createElement(
					"footer",
					{ id: "footer", className: "dark" },
					React.createElement(
						"div",
						{ id: "copyrights" },
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"div",
								{ className: "col_half" },
								"Copyright © 2016 All Rights Reserved by The Grid Media, LLC.",
								React.createElement("br", null)
							),
							React.createElement(
								"div",
								{ className: "col_half col_last tright" },
								React.createElement(
									"div",
									{ className: "fright clearfix" },
									React.createElement(
										"a",
										{ target: "_blank", href: "https://www.facebook.com/FullStack-360-1631852427085987/", className: "social-icon si-small si-borderless si-facebook" },
										React.createElement("i", { className: "icon-facebook" }),
										React.createElement("i", { className: "icon-facebook" })
									),
									React.createElement(
										"a",
										{ target: "_blank", href: "https://twitter.com/fullstack360", className: "social-icon si-small si-borderless si-twitter" },
										React.createElement("i", { className: "icon-twitter" }),
										React.createElement("i", { className: "icon-twitter" })
									),
									React.createElement(
										"a",
										{ target: "_blank", href: "https://github.com/fullstack360", className: "social-icon si-small si-borderless si-github" },
										React.createElement("i", { className: "icon-github" }),
										React.createElement("i", { className: "icon-github" })
									)
								),
								React.createElement("div", { className: "clear" }),
								React.createElement("i", { className: "icon-envelope2" }),
								" dkwon@velocity360.io ",
								React.createElement(
									"span",
									{ className: "middot" },
									"·"
								),
								" Velocity"
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Footer;
})(React.Component);

module.exports = Footer;