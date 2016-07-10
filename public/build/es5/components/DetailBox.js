"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var api = _interopRequire(require("../api/api"));

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
				s.course = this.props.content.title;
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
				//		console.log('submitRequest: '+JSON.stringify(this.props.content.path))

				if (this.state.visitor.name.length == 0) {
					alert("Please enter your name.");
					return;
				}

				if (this.state.visitor.email.length == 0) {
					alert("Please enter your email.");
					return;
				}

				// this.setState({
				// 	showLoader: true
				// })

				var s = Object.assign({}, this.state.visitor);
				var parts = s.name.split(" ");
				s.firstName = parts[0];
				if (parts.length > 1) s.lastName = parts[parts.length - 1];

				var _this = this;
				var url = "";

				if (this.props.course.type == "immersive") {
					// syllabus request
					s.pdf = this.props.course.syllabus;
					url = "/api/syllabus";
				}
				if (this.props.course.type == "online") {
					url = "/api/subscribe";
				}
				if (this.props.course.type == "live") {
					url = "/api/subscribe";
				}


				api.handlePost(url, s, function (err, response) {
					// _this.setState({
					// 	showLoader: false
					// })

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
				if (this.props.course.type == "online") {
					detailContent = {
						title: "Newsletter",
						text: "Join our newsletter for notifications on upcoming courses, events and tutorials.",
						path: "/api/subscribe"
					};
				} else if (this.props.course.type == "immersive") {
					detailContent = {
						title: "Request Syllabus",
						text: "Complete the form below to receive a syllabus for " + this.props.course.title,
						path: "/api/syllabus"
					};
				} else {
					detailContent = {
						title: "Attend Free Session",
						text: "Complete the form below to attend the next session of " + this.props.course.title + " for free.",
						path: "/api/subscribe"
					};
				}


				return React.createElement(
					"div",
					{ className: "col_half panel panel-default col_last" },
					React.createElement(
						"div",
						{ style: { backgroundColor: "#f1f9f5", textAlign: "center" }, className: "panel-heading" },
						detailContent.title
					),
					React.createElement(
						"div",
						{ className: "panel-body", style: { textAlign: "center" } },
						React.createElement("img", { style: { width: 96, marginBottom: 12 }, src: "/images/logo_round_blue_260.png" }),
						React.createElement(
							"p",
							null,
							detailContent.text
						),
						React.createElement("hr", null),
						React.createElement("input", { type: "text", onChange: this.updateVisitor, value: this.state.visitor.name, id: "name", placeholder: "Name", className: "form-control", style: { background: "#f9f9f9" } }),
						React.createElement("br", null),
						React.createElement("input", { type: "text", onChange: this.updateVisitor, value: this.state.visitor.email, id: "email", placeholder: "Email", className: "form-control", style: { background: "#f9f9f9" } }),
						React.createElement("br", null),
						React.createElement(
							"a",
							{ onClick: this.submitRequest, href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
							"Submit"
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