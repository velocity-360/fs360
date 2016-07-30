"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Loader = _interopRequire(require("react-loader"));

var stripe = _interopRequire(require("../../utils/StripeUtils"));

var api = _interopRequire(require("../../utils/APIManager"));

var connect = require("react-redux").connect;
var Nav = _interopRequire(require("../../components/Nav"));

var Header = _interopRequire(require("../../components/Header"));

var Footer = _interopRequire(require("../../components/Footer"));

var RightSidebar = _interopRequire(require("../../components/RightSidebar"));

var Checkout = (function (Component) {
	function Checkout(props, context) {
		_classCallCheck(this, Checkout);

		_get(Object.getPrototypeOf(Checkout.prototype), "constructor", this).call(this, props, context);
		this.configureStripe = this.configureStripe.bind(this);
		this.openStripeModal = this.openStripeModal.bind(this);
		this.state = {
			showLoader: false
		};
	}

	_inherits(Checkout, Component);

	_prototypeProperties(Checkout, null, {
		componentDidMount: {
			value: function componentDidMount() {
				//		console.log('CHECKOUT: componentDidMount = '+JSON.stringify(this.props.params))
				if (this.props.params == null) {
					// premium membership registration
					var _this = this;
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

				var path = "";
				var keys = Object.keys(this.props.params);
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i];
					var value = this.props.params[key];
					path += key + "/" + value;
				}

				var endpoint = "/api/" + path;
				api.handleGet(endpoint, null, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					console.log(JSON.stringify(response));
				});
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
						_this.setState({ showLoader: true });
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

				// course deposit:
				stripe.showModalWithText(this.props.course.title);
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
					"div",
					null,
					React.createElement(Nav, { headerStyle: "dark" }),
					React.createElement(
						"section",
						null,
						React.createElement(Loader, { options: loaderConfig, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix", style: { paddingTop: 64 } },
								React.createElement(
									"div",
									{ className: "col_two_third bottommargin-sm" },
									React.createElement(
										"div",
										{ className: "fancy-title title-bottom-border" },
										React.createElement(
											"h2",
											{ style: { fontWeight: 400 } },
											"Premium Membership"
										)
									),
									React.createElement("img", { style: { background: "#fff", float: "right", maxWidth: 220, marginLeft: 16 }, className: "image_fade", src: "/images/logo_round_blue_260.png", alt: "Velocity 360" }),
									React.createElement(
										"p",
										null,
										"Premium Membership includes access to ALL videos, downloadable source code, and PDF tutorials."
									),
									React.createElement(
										"a",
										{ onClick: this.openStripeModal, href: "#", className: "button button-xlarge tright" },
										"Checkout",
										React.createElement("i", { "class": "icon-circle-arrow-right" })
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm hidden-xs col_last", style: { borderLeft: "1px solid #ddd", padding: 36 } },
									React.createElement(RightSidebar, null)
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

	return Checkout;
})(Component);

module.exports = Checkout;