"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Sidebar = (function (Component) {
	function Sidebar() {
		_classCallCheck(this, Sidebar);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(Sidebar, Component);

	_prototypeProperties(Sidebar, null, {
		render: {
			value: function render() {
				return React.createElement(
					"header",
					{ id: "header", className: "no-sticky" },
					React.createElement(
						"div",
						{ id: "header-wrap" },
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"div",
								{ id: "primary-menu-trigger" },
								React.createElement("i", { className: "icon-reorder" })
							),
							React.createElement(
								"div",
								{ id: "logo", className: "nobottomborder" },
								React.createElement(
									"a",
									{ href: "/", className: "standard-logo", "data-dark-logo": "/images/logo-side-dark.png" },
									React.createElement("img", { src: "/images/logo-side.png", alt: "Canvas Logo" })
								),
								React.createElement(
									"a",
									{ href: "/", className: "retina-logo", "data-dark-logo": "/images/logo-side-dark@2x.png" },
									React.createElement("img", { src: "/images/logo-side@2x.png", alt: "Canvas Logo" })
								)
							),
							React.createElement(
								"nav",
								{ id: "primary-menu" },
								React.createElement(
									"ul",
									null,
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "/" },
											React.createElement(
												"div",
												null,
												"Home"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "/about" },
											React.createElement(
												"div",
												null,
												"About"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "/" },
											React.createElement(
												"div",
												null,
												"Pages"
											)
										),
										React.createElement(
											"ul",
											null,
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#" },
													React.createElement(
														"div",
														null,
														"One"
													)
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#" },
													React.createElement(
														"div",
														null,
														"Two"
													)
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#" },
													React.createElement(
														"div",
														null,
														"Three"
													)
												)
											)
										)
									)
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

	return Sidebar;
})(Component);

module.exports = Sidebar;