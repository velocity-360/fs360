"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var stripe = _interopRequire(require("../utils/StripeUtils"));

var api = _interopRequire(require("../api/api"));

var CTA = (function (Component) {
	function CTA(props, context) {
		_classCallCheck(this, CTA);

		_get(Object.getPrototypeOf(CTA.prototype), "constructor", this).call(this, props, context);
		this.openStripeModal = this.openStripeModal.bind(this);
		this.configureStripe = this.configureStripe.bind(this);
		this.state = {};
	}

	_inherits(CTA, Component);

	_prototypeProperties(CTA, null, {
		componentDidMount: {
			value: function componentDidMount() {
				this.configureStripe(this.props.course);
			},
			writable: true,
			configurable: true
		},
		configureStripe: {
			value: function configureStripe(course) {
				var course = this.props.course;
				if (course.type == "online") {
					// for videos, show subscription prompt:
					stripe.initialize(function (token) {
						_this.setState({ showLoader: true });
						api.submitStripeToken(token, function (err, response) {
							if (err) {
								alert(err.message);
								return;
							}

							window.location.href = "/account";
						});
					});
					return;
				}

				stripe.initializeWithText("Submit Deposit", function (token) {
					_this.setState({ showLoader: true });
					api.submitStripeCharge(token, course, course.deposit, "course", function (err, response) {
						if (err) {
							alert(err.message);
							_this.setState({ showLoader: false });
							return;
						}

						_this.setState({
							showConfirmation: true,
							showLoader: false
						});
					});
				});
			},
			writable: true,
			configurable: true
		},
		openStripeModal: {
			value: function openStripeModal(event) {
				event.preventDefault();
				if (this.props.course.type == "online") stripe.showModal();else stripe.showModalWithText(this.props.course.title);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var course = this.props.course;
				var cta = "Register";
				if (course.type == "online") {
					cta = "Subscribe";
				} else if (course.type == "immersive") {
					cta = "Details";
				}


				return React.createElement(
					"div",
					{ className: "entry clearfix" },
					React.createElement(
						"div",
						{ className: "entry-timeline" },
						"Join",
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
									cta
								),
								React.createElement("hr", null),
								React.createElement(
									"div",
									{ className: "col_half" },
									"Date: ",
									course.dates,
									React.createElement("br", null),
									"Time: ",
									course.schedule,
									React.createElement("br", null),
									"Deposit: $",
									course.deposit,
									React.createElement("br", null),
									"Regular Tuition: $",
									course.tuition,
									React.createElement("br", null),
									"Premium Member Tuition: $",
									course.premiumTuition,
									React.createElement("br", null),
									React.createElement("br", null),
									this.props.course.type == "live" ? React.createElement(
										"div",
										{ className: "col_full panel panel-default" },
										React.createElement(
											"div",
											{ style: { backgroundColor: "#f1f9f5", textAlign: "left" }, className: "panel-heading" },
											"Submit Deposit"
										),
										React.createElement(
											"div",
											{ className: "panel-body", style: { textAlign: "left" } },
											React.createElement(
												"a",
												{ href: course.paypalLink, target: "_blank", className: "button button-xlarge tright" },
												"PayPal",
												React.createElement("i", { "class": "icon-circle-arrow-right" })
											),
											React.createElement("br", null),
											React.createElement(
												"a",
												{ onClick: this.openStripeModal, href: "#", className: "button button-xlarge tright" },
												"Credit Card",
												React.createElement("i", { "class": "icon-circle-arrow-right" })
											)
										)
									) : React.createElement(
										"a",
										{ href: "#application", className: "button button-xlarge tright" },
										"Apply",
										React.createElement("i", { "class": "icon-circle-arrow-right" })
									)
								),
								React.createElement(
									"div",
									{ className: "col_half col_last" },
									React.createElement("img", { style: { width: "80%", float: "right" }, src: "https://media-service.appspot.com/site/images/" + course.image + "?crop=460" })
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

	return CTA;
})(Component);

module.exports = CTA;