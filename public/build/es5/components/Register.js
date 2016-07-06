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
var Loader = _interopRequire(require("react-loader"));

var stripe = _interopRequire(require("../utils/StripeUtils"));

var textUtils = _interopRequire(require("../utils/TextUtils"));

var api = _interopRequire(require("../api/api"));

var Register = (function (Component) {
	function Register(props, context) {
		_classCallCheck(this, Register);

		_get(Object.getPrototypeOf(Register.prototype), "constructor", this).call(this, props, context);
		this.updateUserRegistration = this.updateUserRegistration.bind(this);
		this.showRegistrationForm = this.showRegistrationForm.bind(this);
		this.hideRegistrationForm = this.hideRegistrationForm.bind(this);
		this.validate = this.validate.bind(this);
		this.register = this.register.bind(this);
		this.state = {
			showLoader: false,
			showRegistration: false,
			membershipType: "Basic",
			visitor: {
				name: "",
				email: "",
				password: "",
				course: "",
				referral: ""
			}
		};
	}

	_inherits(Register, Component);

	_prototypeProperties(Register, null, {
		showRegistrationForm: {
			value: function showRegistrationForm(event) {
				event.preventDefault();
				this.setState({
					membershipType: event.target.id,
					showRegistration: true
				});
			},
			writable: true,
			configurable: true
		},
		hideRegistrationForm: {
			value: function hideRegistrationForm() {
				this.setState({
					showRegistration: false
				});
			},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				stripe.initialize(function (token) {
					_this.setState({ showLoader: true });

					// api.submitStripeToken(token, function(){
					// 	api.handleGet('/account/currentuser', {}, function(err, response){
					// 		_this.setState({showLoader: false})
					// 		if (err){
					// 			alert(response.message)
					// 			return
					// 		}

					// 		window.location.href = '/account'
					// 	})
					// })

					api.submitStripeToken(token, function (err, response) {
						_this.setState({ showLoader: false });
						if (err) {
							alert(response.message);
							return;
						}

						window.location.href = "/account";
					});
				});
			},
			writable: true,
			configurable: true
		},
		updateUserRegistration: {
			value: function updateUserRegistration(event) {
				var updatedVisitor = Object.assign({}, this.state.visitor);
				updatedVisitor[event.target.id] = event.target.value;
				this.setState({
					visitor: updatedVisitor
				});
			},
			writable: true,
			configurable: true
		},
		register: {
			value: function register(event) {
				event.preventDefault();
				var missingField = this.validate(this.state.visitor, true);
				if (missingField != null) {
					alert("Please enter your " + missingField);
					return;
				}

				var registrant = Object.assign({}, this.state.visitor);
				var parts = this.state.visitor.name.split(" ");
				registrant.firstName = parts[0];
				if (parts.length > 1) registrant.lastName = parts[1];

				this.setState({
					showLoader: true
				});

				var _this = this;
				api.handlePost("/api/profile", registrant, function (err, response) {
					if (err) {
						alert(err.message);
						_this.setState({ showLoader: false });
						return;
					}

					if (_this.state.membershipType == "basic") {
						window.location.href = "/account";
						return;
					}

					// premium registration, show stripe modal
					stripe.showModal();
					_this.setState({
						showLoader: false,
						showRegistration: false
					});
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
				var loaderConfig = {
					lines: 13,
					length: 20,
					width: 10,
					radius: 30,
					corners: 1,
					rotate: 0,
					direction: 1,
					color: "#fff",
					speed: 1,
					trail: 60,
					shadow: false,
					hwaccel: false,
					zIndex: 2000000000,
					top: "50%",
					left: "50%",
					scale: 1
				};

				return React.createElement(
					"section",
					{ id: "register", className: "section pricing-section nomargin", style: { backgroundColor: "#FFF" } },
					React.createElement(Loader, { options: loaderConfig, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(
						"div",
						{ className: "container clearfix" },
						React.createElement(
							"h2",
							{ className: "pricing-section--title center" },
							"Cant make it to our live courses?"
						),
						React.createElement(
							"div",
							{ style: { textAlign: "center" } },
							React.createElement(
								"p",
								{ style: { fontSize: 16 } },
								"Join our online service. ",
								React.createElement("br", null),
								"Online members have access to videos, code samples, the forum and more."
							)
						),
						React.createElement(
							"div",
							{ className: "pricing pricing--jinpa" },
							React.createElement(
								"div",
								{ className: "pricing--item", style: { marginRight: 24 } },
								React.createElement(
									"h3",
									{ className: "pricing--title" },
									"Basic"
								),
								React.createElement(
									"div",
									{ style: { fontSize: "1.15em" }, className: "pricing--price" },
									"FREE"
								),
								React.createElement(
									"div",
									{ style: { borderTop: "1px solid #eee", marginTop: 24, paddingTop: 24 } },
									React.createElement(
										"ul",
										{ className: "pricing--feature-list" },
										React.createElement(
											"li",
											{ className: "pricing--feature" },
											"Limited Video Access"
										),
										React.createElement(
											"li",
											{ className: "pricing--feature" },
											"Forum Access"
										),
										React.createElement(
											"li",
											{ className: "pricing--feature" },
											"Discounts to Live Events"
										)
									)
								),
								React.createElement(
									"button",
									{ onClick: this.showRegistrationForm, id: "basic", className: "pricing--action" },
									"Join"
								)
							),
							React.createElement(
								"div",
								{ className: "pricing--item", style: { marginRight: 24, border: "1px solid #eee" } },
								React.createElement(
									"h3",
									{ className: "pricing--title" },
									"Premium"
								),
								React.createElement(
									"div",
									{ style: { fontSize: "1.15em" }, className: "pricing--price" },
									React.createElement(
										"span",
										{ className: "pricing--currency" },
										"$"
									),
									"19.99/mo"
								),
								React.createElement(
									"div",
									{ style: { borderTop: "1px solid #eee", marginTop: 24, paddingTop: 24 } },
									React.createElement(
										"ul",
										{ className: "pricing--feature-list" },
										React.createElement(
											"li",
											{ className: "pricing--feature" },
											"20% Off ALL Live Courses"
										),
										React.createElement(
											"li",
											{ className: "pricing--feature" },
											"Full Video Access"
										),
										React.createElement(
											"li",
											{ className: "pricing--feature" },
											"Downloadable Code Samples"
										),
										React.createElement(
											"li",
											{ className: "pricing--feature" },
											"Discounts to Live Events"
										)
									)
								),
								React.createElement(
									"button",
									{ onClick: this.showRegistrationForm, id: "premium", className: "pricing--action" },
									"Join"
								)
							)
						)
					),
					React.createElement(
						Modal,
						{ bsSize: "sm", show: this.state.showRegistration, onHide: this.hideRegistrationForm },
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24, borderRadius: 3 } },
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement("img", { style: { width: 96, borderRadius: 48, border: "1px solid #ddd", background: "#fff", marginBottom: 24 }, src: "/images/logo_round_green_260.png" }),
								React.createElement(
									"h4",
									null,
									textUtils.capitalize(this.state.membershipType),
									" Membership"
								)
							),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "name", className: "form-control", style: { marginBottom: 12 }, type: "text", placeholder: "Name" }),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "email", className: "form-control", style: { marginBottom: 12 }, type: "text", placeholder: "Email" }),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "password", className: "form-control", style: { marginBottom: 12 }, type: "password", placeholder: "Password" }),
							React.createElement("input", { onChange: this.updateUserRegistration, id: "promoCode", className: "form-control", style: { marginBottom: 12 }, type: "text", placeholder: "Promo Code" }),
							React.createElement(
								"div",
								{ style: { textAlign: "center", marginTop: 24 } },
								React.createElement(
									"a",
									{ onClick: this.register, href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin" },
									"Join"
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

	return Register;
})(Component);

module.exports = Register;