"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var store = _interopRequire(require("../../stores/store"));

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var Application = (function (Component) {
	function Application() {
		_classCallCheck(this, Application);

		if (Component != null) {
			Component.apply(this, arguments);
		}
	}

	_inherits(Application, Component);

	_prototypeProperties(Application, null, {
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
					React.createElement(Sidebar, null),
					React.createElement(
						"section",
						{ id: "content", style: { background: "#f9f9f9" } },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "postcontent bothsidebar nobottommargin" },
									React.createElement(
										"h3",
										null,
										"Application"
									),
									React.createElement("hr", null),
									React.createElement(
										"div",
										{ className: "contact-widget" },
										React.createElement("div", { className: "contact-form-result" }),
										React.createElement(
											"form",
											{ className: "nobottommargin", id: "template-contactform", name: "template-contactform", action: "", method: "post" },
											React.createElement("div", { className: "form-process" }),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-name" },
													"Name"
												),
												React.createElement("input", { type: "text", id: "template-contactform-name", name: "template-contactform-name", value: "", className: "sm-form-control required" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-email" },
													"Email"
												),
												React.createElement("input", { type: "email", id: "template-contactform-email", name: "template-contactform-email", value: "", className: "required email sm-form-control" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-phone" },
													"Phone"
												),
												React.createElement("input", { type: "text", id: "template-contactform-phone", name: "template-contactform-phone", value: "", className: "sm-form-control" })
											),
											React.createElement("div", { className: "clear" }),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-subject" },
													"Course"
												),
												React.createElement(
													"select",
													{ id: "course", className: "form-control input-lg not-dark" },
													React.createElement(
														"option",
														{ value: "ios intensive" },
														"iOS Intensive"
													),
													React.createElement(
														"option",
														{ value: "web intensive" },
														"Web Intensive"
													),
													React.createElement(
														"option",
														{ value: "ios hs course" },
														"iOS HS Course"
													),
													React.createElement(
														"option",
														{ value: "web hs course" },
														"Web HS Course"
													),
													React.createElement(
														"option",
														{ value: "ios bootcamp" },
														"iOS Bootcamp"
													),
													React.createElement(
														"option",
														{ value: "web bootcamp" },
														"Web Bootcamp"
													)
												)
											),
											React.createElement("div", { className: "clear" }),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-message" },
													"What is your goal in technology for the next 6 to 12 months?"
												),
												React.createElement("textarea", { className: "required sm-form-control", id: "template-contactform-message", name: "template-contactform-message", rows: "6", cols: "30" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"label",
													{ "for": "template-contactform-message" },
													"What have your worked on so far? (GitHub, side projects, etc.)"
												),
												React.createElement("textarea", { className: "required sm-form-control", id: "template-contactform-message", name: "template-contactform-message", rows: "6", cols: "30" })
											),
											React.createElement(
												"div",
												{ className: "col_full hidden" },
												React.createElement("input", { type: "text", id: "template-contactform-botcheck", name: "template-contactform-botcheck", value: "", className: "sm-form-control" })
											),
											React.createElement(
												"div",
												{ className: "col_full" },
												React.createElement(
													"a",
													{ href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
													"Submit"
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

	return Application;
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state));

	return {
		currentUser: state.profileReducer.currentUser
	};
};


module.exports = connect(stateToProps)(Application);