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

var api = _interopRequire(require("../utils/APIManager"));

var Checkout = (function (Component) {
	function Checkout(props, context) {
		_classCallCheck(this, Checkout);

		_get(Object.getPrototypeOf(Checkout.prototype), "constructor", this).call(this, props, context);
		this.configureStripe = this.configureStripe.bind(this);
		this.openStripeModal = this.openStripeModal.bind(this);
		this.state = {};
	}

	_inherits(Checkout, Component);

	_prototypeProperties(Checkout, null, {
		componentDidMount: {
			value: function componentDidMount() {
				//		console.log('CHECKOUT: componentDidMount')
				this.configureStripe();
			},
			writable: true,
			configurable: true
		},
		configureStripe: {
			value: function configureStripe() {
				var course = this.props.course;
				if (course == null) {
					// premium registration
					stripe.initialize(function (token) {
						api.submitStripeToken(token, function (err, response) {
							if (err) {
								alert(err.message);
								return;
							}

							console.log(JSON.stringify(response));
							window.location.href = "/account";
						});
					});
					return;
				}

				if (course.type == "online") {
					// for videos, show subscription prompt:
					stripe.initialize(function (token) {
						api.submitStripeToken(token, function (err, response) {
							if (err) {
								alert(err.message);
								return;
							}

							console.log(JSON.stringify(response));
							window.location.href = "/account";
						});
					});
					return;
				}

				stripe.initializeWithText("Submit Deposit", function (token) {
					api.submitStripeCharge(token, course, course.deposit, "course", function (err, response) {
						if (err) {
							alert(err.message);
							return;
						}

						console.log(JSON.stringify(response));
					});
				});
			},
			writable: true,
			configurable: true
		},
		openStripeModal: {
			value: function openStripeModal(event) {
				event.preventDefault();
				var course = this.props.course;
				if (course == null) {
					// premium registration
					stripe.showModal();
					return;
				}

				if (this.props.course.type == "online") {
					stripe.showModal();
					return;
				}

				// course deposite:
				stripe.showModalWithText(this.props.course.title);
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement("div", null);
			},
			writable: true,
			configurable: true
		}
	});

	return Checkout;
})(Component);

module.exports = Checkout;