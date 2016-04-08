"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var Testimonial = _interopRequire(require("../../components/Testimonial"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var Course = (function (Component) {
	function Course() {
		_classCallCheck(this, Course);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(Course, Component);

	_prototypeProperties(Course, null, {
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
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
													{ href: "images/blog/full/17.jpg", "data-lightbox": "image" },
													React.createElement("img", { className: "image_fade", src: "/images/blog/standard/17.jpg", alt: "Standard Post with Image" })
												)
											),
											React.createElement(
												"div",
												{ className: "entry-title" },
												React.createElement(
													"h2",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html" },
														"This is a Standard post with a Preview Image"
													)
												)
											),
											React.createElement(
												"ul",
												{ className: "entry-meta clearfix" },
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("i", { className: "icon-user" }),
														" admin"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-folder-open" }),
													" ",
													React.createElement(
														"a",
														{ href: "#" },
														"General"
													),
													", ",
													React.createElement(
														"a",
														{ href: "#" },
														"Media"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html#comments" },
														React.createElement("i", { className: "icon-comments" }),
														" 13 Comments"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("i", { className: "icon-camera-retro" })
													)
												)
											),
											React.createElement(
												"div",
												{ className: "entry-content" },
												React.createElement(
													"p",
													null,
													"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
												),
												React.createElement(
													"a",
													{ href: "blog-single.html", className: "more-link" },
													"Read More"
												)
											)
										),
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
												{ className: "entry-title" },
												React.createElement(
													"h2",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html" },
														"This is a Standard post with a Preview Image"
													)
												)
											),
											React.createElement(
												"ul",
												{ className: "entry-meta clearfix" },
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("i", { className: "icon-user" }),
														" admin"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-folder-open" }),
													" ",
													React.createElement(
														"a",
														{ href: "#" },
														"General"
													),
													", ",
													React.createElement(
														"a",
														{ href: "#" },
														"Media"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html#comments" },
														React.createElement("i", { className: "icon-comments" }),
														" 13 Comments"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("i", { className: "icon-camera-retro" })
													)
												)
											),
											React.createElement(
												"div",
												{ className: "entry-content" },
												React.createElement(
													"p",
													null,
													"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere."
												),
												React.createElement(
													"a",
													{ href: "blog-single.html", className: "more-link" },
													"Read More"
												)
											)
										),
										React.createElement(
											"div",
											{ className: "entry clearfix" },
											React.createElement(
												"div",
												{ className: "entry-timeline" },
												"21",
												React.createElement(
													"span",
													null,
													"Mar"
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
														{ className: "panel-body" },
														"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, fuga optio voluptatibus saepe tenetur aliquam debitis eos accusantium! Vitae, hic, atque aliquid repellendus accusantium laudantium minus eaque quibusdam ratione sapiente."
													)
												)
											),
											React.createElement(
												"ul",
												{ className: "entry-meta clearfix" },
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("i", { className: "icon-user" }),
														" admin"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-folder-open" }),
													" ",
													React.createElement(
														"a",
														{ href: "#" },
														"Status"
													),
													", ",
													React.createElement(
														"a",
														{ href: "#" },
														"News"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html#comments" },
														React.createElement("i", { className: "icon-comments" }),
														" 11 Comments"
													)
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("i", { className: "icon-align-justify2" })
													)
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

	return Course;
})(Component);

var stateToProps = function (state) {
	console.log("STATE TO PROPS: " + JSON.stringify(state));
	return {
		currentUser: state.profileReducer.currentUser,
		testimonials: state.staticReducer.testimonials
	};
};


module.exports = connect(stateToProps)(Course);