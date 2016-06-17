"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var TextUtils = _interopRequire(require("../utils/TextUtils"));

var CourseCopy = (function (Component) {
	function CourseCopy() {
		_classCallCheck(this, CourseCopy);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(CourseCopy, Component);

	_prototypeProperties(CourseCopy, null, {
		render: {
			value: function render() {
				return React.createElement(
					"section",
					{ id: "content", style: { backgroundColor: "#fff", paddingBottom: 0 } },
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
										"Prepare for Tomorrow"
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
											"Our Mission is to teach you tomorrow’s technology, today.  If you want to work for a leading tech firm, for a technology startup, or become an entrepreneur, our classes will put you on the right track to achieve these goals.  This iOS class is based entirely on Swift language, which is the main language you will need to know while developing the majority of iOS app.  In our iOS class you will not be learning how to program games, however you will be able to learn how to develop social media applications similar to Snapchat and Instagram."
										),
										React.createElement(
											"p",
											null,
											"Even if you do not want to become a professional developer and have it become your lifelong career, learning how an iOS app developed will give you the edge both in the immediate and distant future.  It might be a cliché, but learning how to code will empower you to act on future ideas.  For example if you are sitting in class one day and think of the next great social media app, it doesn’t have to just be a pipe dream or something that you would have to rely on someone else to build, it could be a project that you start building right away."
										),
										React.createElement(
											"a",
											{ target: "_blank", href: "https://www.facebook.com/FullStack-360-1631852427085987/", className: "social-icon inline-block si-small si-light si-rounded si-facebook" },
											React.createElement("i", { className: "icon-facebook" }),
											React.createElement("i", { className: "icon-facebook" })
										),
										React.createElement(
											"a",
											{ target: "_blank", href: "https://twitter.com/fullstack360", className: "social-icon inline-block si-small si-light si-rounded si-twitter" },
											React.createElement("i", { className: "icon-twitter" }),
											React.createElement("i", { className: "icon-twitter" })
										)
									)
								)
							)
						),
						React.createElement("div", { className: "col-sm-4 col-padding", style: { background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: "cover" } })
					),
					React.createElement(
						"div",
						{ className: "content-wrap", style: { background: "#f9f9f9" } },
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
											React.createElement("img", { style: { background: "#fff", padding: 6, border: "1px solid #ddd" }, className: "image_fade", src: "/images/class.jpg", alt: "FullStack 360" })
										),
										React.createElement(
											"div",
											{ className: "entry-title" },
											React.createElement(
												"h3",
												null,
												"Small Classes"
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
											React.createElement("img", { style: { background: "#fff", padding: 6, border: "1px solid #ddd" }, className: "image_fade", src: "/images/phone.jpg", alt: "FullStack 360" })
										),
										React.createElement(
											"div",
											{ className: "entry-title" },
											React.createElement(
												"h3",
												null,
												"Realistic Projects"
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
											React.createElement("img", { style: { background: "#fff", padding: 6, border: "1px solid #ddd" }, className: "image_fade", src: "/images/joe.jpg", alt: "FullStack 360" })
										),
										React.createElement(
											"div",
											{ className: "entry-title" },
											React.createElement(
												"h3",
												null,
												"Cutting Edge Curriculum"
											),
											React.createElement("hr", null)
										),
										React.createElement(
											"div",
											{ className: "entry-content" },
											React.createElement(
												"p",
												null,
												"Ruby on Rails? Django? Ember? Backbone? PHP? Angular? Swift? Objective C? Node? JavaScript? React? To beginners, the tech landscape is overwhelming and the wrong choice can waste a lot of time and money. We make the right choices for you. Simple as that."
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

	return CourseCopy;
})(Component);

module.exports = CourseCopy;