"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var api = _interopRequire(require("../utils/APIManager"));

var QualifyingForm = (function (Component) {
	function QualifyingForm(props, context) {
		_classCallCheck(this, QualifyingForm);

		_get(Object.getPrototypeOf(QualifyingForm.prototype), "constructor", this).call(this, props, context);
		this.closeModal = this.closeModal.bind(this);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.state = {
			visitor: {
				name: "",
				email: ""
			}
		};
	}

	_inherits(QualifyingForm, Component);

	_prototypeProperties(QualifyingForm, null, {
		closeModal: {
			value: function closeModal() {
				console.log("closeModal: ");
				this.props.closeModal();
			},
			writable: true,
			configurable: true
		},
		updateVisitor: {
			value: function updateVisitor(event) {
				var updatedVisitor = Object.assign({}, this.state.visitor);
				updatedVisitor[event.target.id] = event.target.value;
				this.setState({
					visitor: updatedVisitor
				});
			},
			writable: true,
			configurable: true
		},
		submitForm: {
			value: function submitForm(event) {
				event.preventDefault();
				var missingField = this.validate(this.state.visitor, false);
				if (missingField != null) {
					alert("Please enter your " + missingField);
					return;
				}

				var pkg = Object.assign({}, this.state.visitor);
				var parts = pkg.name.split(" ");
				pkg.firstName = parts[0];
				if (parts.length > 1) pkg.lastName = parts[parts.length - 1];

				if (this.props.subject != null) pkg.subject = this.props.subject.title;

				var _this = this;
				this.props.toggleLoader(true);
				api.handlePost(this.props.endpoint, pkg, function (err, response) {
					_this.props.toggleLoader(false);
					_this.props.closeModal();
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
		validate: {
			value: function validate(profile, withPassword) {
				if (profile.name.length == 0) {
					return "Name";
				}if (profile.email.length == 0) {
					return "Email";
				}if (withPassword == false) {
					return null;
				}if (profile.password.length == 0) {
					return "Password";
				}return null // this is successful
				;
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					Modal,
					{ show: this.props.show, onHide: this.closeModal },
					React.createElement(
						Modal.Header,
						{ closeButton: true, style: { textAlign: "center", padding: 12 } },
						React.createElement("img", { style: { width: 96, borderRadius: 48 }, src: "/images/logo_round_green_260.png" })
					),
					React.createElement(
						Modal.Body,
						{ style: { background: "#f9f9f9", padding: 24, textAlign: "center" } },
						React.createElement(
							"div",
							{ className: "col_half", style: { marginBottom: 24 } },
							React.createElement("input", { onChange: this.updateVisitor, id: "name", type: "text", className: "form-control input-lg not-dark", placeholder: "Name" })
						),
						React.createElement(
							"div",
							{ className: "col_half col_last", style: { marginBottom: 24 } },
							React.createElement("input", { onChange: this.updateVisitor, id: "email", type: "text", className: "form-control input-lg not-dark", placeholder: "Email" })
						),
						React.createElement(
							"div",
							{ className: "col_full", style: { marginBottom: 12 } },
							React.createElement("input", { onChange: this.updateVisitor, id: "goal", type: "text", className: "form-control input-lg not-dark", placeholder: "Are you changing career into software development?" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateVisitor, id: "history", type: "text", className: "form-control input-lg not-dark", placeholder: "How have you tried to learn programming so far?" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateVisitor, id: "previous courses", type: "text", className: "form-control input-lg not-dark", placeholder: "Have you taken a course or completed a coding bootcamp?" }),
							React.createElement("br", null),
							React.createElement("input", { onChange: this.updateVisitor, id: "interest in Velocity", type: "text", className: "form-control input-lg not-dark", placeholder: "Are you interested in taking a course with Velocity 360?" })
						)
					),
					React.createElement(
						Modal.Footer,
						{ style: { textAlign: "center" } },
						React.createElement(
							"a",
							{ onClick: this.submitForm, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
							"Submit"
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return QualifyingForm;
})(Component);

module.exports = QualifyingForm;