"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var api = _interopRequire(require("../utils/APIManager"));

var DetailBox = (function (Component) {
	function DetailBox(props, context) {
		_classCallCheck(this, DetailBox);

		_get(Object.getPrototypeOf(DetailBox.prototype), "constructor", this).call(this, props, context);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.submitRequest = this.submitRequest.bind(this);
		this.state = {
			visitor: {
				name: "",
				email: ""
			}
		};
	}

	_inherits(DetailBox, Component);

	_prototypeProperties(DetailBox, null, {
		updateVisitor: {
			value: function updateVisitor(event) {
				event.preventDefault();
				var s = Object.assign({}, this.state.visitor);
				s[event.target.id] = event.target.value;
				s.course = this.props.course.title;
				this.setState({
					visitor: s
				});
			},
			writable: true,
			configurable: true
		},
		submitRequest: {
			value: function submitRequest(event) {
				event.preventDefault();

				if (this.state.visitor.name.length == 0) {
					alert("Please enter your name.");
					return;
				}

				if (this.state.visitor.email.length == 0) {
					alert("Please enter your email.");
					return;
				}

				this.props.showLoader();

				var s = Object.assign({}, this.state.visitor);
				var parts = s.name.split(" ");
				s.firstName = parts[0];
				if (parts.length > 1) s.lastName = parts[parts.length - 1];

				var _this = this;
				var url = "";

				var course = this.props.course;
				if (course.type == "immersive") {
					// syllabus request
					s.pdf = course.syllabus;
					s.subject = "Syllabus Request";
					s.confirmation = "Thanks for your interest! Check your email shortly for a direct download link to the syllabus.";
					url = "/account/syllabus";
				}
				if (course.type == "online") {
					s.subject = "New Subscriber";
					s.confirmation = "Thanks for subscribing! We will reach out to you shortly with more information!";
					url = "/account/subscribe";
				}
				if (course.type == "live") {
					s.subject = "Free Session Request";
					s.confirmation = "Thanks for your interest. We will contact you shortly with more information about attending a free session!";
					url = "/account/freesession";
				}

				api.handlePost(url, s, function (err, response) {
					_this.props.hideLoader();

					if (err) {
						alert(err.message);
						return;
					}

					alert(response.message);
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var detailContent = null;
				var course = this.props.course;
				if (course.type == "online") {
					detailContent = {
						title: "Newsletter",
						text: "Join our newsletter for notifications on upcoming courses, events and tutorials.",
						path: "/account/subscribe"
					};
				} else if (course.type == "immersive") {
					detailContent = {
						title: "Request Syllabus",
						text: "Complete the form below to receive a syllabus for " + course.title,
						path: "/account/syllabus"
					};
				} else {
					detailContent = {
						title: "Preview Free Session",
						text: "Complete the form below to attend a preview session of " + course.title + " for free.",
						path: "/account/subscribe"
					};
				}


				return React.createElement(
					"div",
					{ className: "entry clearfix" },
					React.createElement(
						"div",
						{ className: "entry-timeline" },
						"Preview",
						React.createElement("span", null),
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
								{ className: "panel-body", style: { padding: 36, paddingBottom: 0 } },
								React.createElement(
									"h2",
									null,
									detailContent.title
								),
								React.createElement("hr", null),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement(
										"p",
										null,
										detailContent.text
									),
									React.createElement("input", { type: "text", onChange: this.updateVisitor, value: this.state.visitor.name, id: "name", placeholder: "Name", className: "custom-input" }),
									React.createElement("br", null),
									React.createElement("input", { type: "text", onChange: this.updateVisitor, value: this.state.visitor.email, id: "email", placeholder: "Email", className: "custom-input" }),
									React.createElement("br", null),
									React.createElement(
										"a",
										{ onClick: this.submitRequest, href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
										"Submit"
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

	return DetailBox;
})(Component);

module.exports = DetailBox;