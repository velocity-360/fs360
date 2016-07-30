"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var CourseSection = (function (Component) {
	function CourseSection(props, context) {
		_classCallCheck(this, CourseSection);

		_get(Object.getPrototypeOf(CourseSection.prototype), "constructor", this).call(this, props, context);
		this.login = this.login.bind(this);
		this.subscribe = this.subscribe.bind(this);
	}

	_inherits(CourseSection, Component);

	_prototypeProperties(CourseSection, null, {
		login: {
			value: function login(event) {
				event.preventDefault();
				this.props.loginAction(event);
			},
			writable: true,
			configurable: true
		},
		subscribe: {
			value: function subscribe(event) {
				event.preventDefault();
				this.props.subscribeAction(event);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var accountType = this.props.currentUser.accountType;
				var videoThumb = null;
				var course = this.props.course;
				if (course.type == "online") {
					if (this.props.unit.index < 1) {
						// always show first video
						videoThumb = React.createElement(
							"div",
							{ className: "wistia_embed wistia_async_" + this.props.unit.wistia + " videoFoam=true", style: { height: 200, width: 356, marginTop: 12 } },
							" "
						);
					} else if (accountType == "premium") {
						// premium subscriber
						videoThumb = React.createElement(
							"div",
							{ className: "wistia_embed wistia_async_" + this.props.unit.wistia + " videoFoam=true", style: { height: 200, width: 356, marginTop: 12 } },
							" "
						);
					} else if (course.subscribers.indexOf(this.props.currentUser.id) > -1) {
						// regular subscriber
						videoThumb = React.createElement(
							"div",
							{ className: "wistia_embed wistia_async_" + this.props.unit.wistia + " videoFoam=true", style: { height: 200, width: 356, marginTop: 12 } },
							" "
						);
					} else if (accountType == "basic" || accountType == "") {
						videoThumb = React.createElement(
							"div",
							{ style: { border: "1px solid #ddd", padding: 12, background: "#f9f9f9", marginTop: 12, marginBottom: 12 } },
							"To view this video, please ",
							React.createElement(
								"a",
								{ style: { color: "red" }, href: "/checkout" },
								"upgrade"
							),
							" your account to Premium"
						);
					} else {
						// not logged in
						videoThumb = React.createElement(
							"div",
							{ style: { border: "1px solid #ddd", padding: 12, background: "#f9f9f9", marginTop: 12, marginBottom: 12 } },
							"Please ",
							React.createElement(
								"a",
								{ onClick: this.login, style: { color: "red" }, href: "#" },
								"log in"
							),
							" or ",
							React.createElement(
								"a",
								{ style: { color: "red" }, href: "/#register" },
								"register"
							),
							" to view this video."
						);
					}
				}

				return React.createElement(
					"div",
					{ className: "entry clearfix" },
					React.createElement(
						"div",
						{ className: "entry-timeline" },
						"Unit",
						React.createElement(
							"span",
							null,
							this.props.unit.index + 1
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
								{ className: "panel-body", style: { padding: 36 } },
								React.createElement(
									"h2",
									null,
									this.props.unit.topic
								),
								React.createElement("hr", null),
								this.props.unit.description,
								React.createElement("br", null),
								videoThumb
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return CourseSection;
})(Component);

module.exports = CourseSection;