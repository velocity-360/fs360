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

var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var api = _interopRequire(require("../utils/APIManager"));

var CTA = (function (Component) {
	function CTA(props, context) {
		_classCallCheck(this, CTA);

		_get(Object.getPrototypeOf(CTA.prototype), "constructor", this).call(this, props, context);
		this.openStripeModal = this.openStripeModal.bind(this);
		this.configureStripe = this.configureStripe.bind(this);
		this.subscribe = this.subscribe.bind(this);
		this.updateCourse = this.updateCourse.bind(this);
		this.updateCurrentUser = this.updateCurrentUser.bind(this);
		this.login = this.login.bind(this);
		this.state = {};
	}

	_inherits(CTA, Component);

	_prototypeProperties(CTA, null, {
		componentDidMount: {
			value: function componentDidMount() {},
			writable: true,
			configurable: true
		},
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

				if (this.props.currentUser.id == null) {
					// not logged in
					this.props.loginAction(event);
					return;
				}

				// check credits first:
				if (this.props.currentUser.credits < this.props.course.credits && this.props.currentUser.accountType == "basic") {
					alert("Not Enough Credits. Please Upgrade to Premium or Purchase More Credits.");
					return;
				}

				// Fetch course first to get most updated subscriber list:
				var _this = this;
				var endpoint = "/api/course/" + this.props.course.id;
				api.handleGet(endpoint, null, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					var course = response.course;
					var subscribers = course.subscribers;
					if (subscribers.indexOf(_this.props.currentUser.id) != -1) // already subscribed
						return;

					subscribers.push(_this.props.currentUser.id);
					_this.updateCourse({
						subscribers: subscribers
					});
				});
			},
			writable: true,
			configurable: true
		},
		updateCourse: {
			value: function updateCourse(pkg) {
				var _this = this;
				var endpoint = "/api/course/" + this.props.course.id;
				api.handlePut(endpoint, pkg, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					var course = response.course;
					store.currentStore().dispatch(actions.courseRecieved(course));

					if (_this.props.currentUser.accountType == "premium") return;

					var credits = _this.props.currentUser.credits - course.credits;
					_this.updateCurrentUser({
						credits: credits
					});
				});
			},
			writable: true,
			configurable: true
		},
		updateCurrentUser: {
			value: function updateCurrentUser(pkg) {
				var endpoint = "/api/profile/" + this.props.currentUser.id;
				api.handlePut(endpoint, pkg, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					store.currentStore().dispatch(actions.currentUserRecieved(response.profile));
				});
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
				var user = this.props.currentUser;
				var cta = null;
				var date = null;
				var schedule = null;
				var deposit = null;
				var tuition = null;
				var premiumTuition = null;
				var register = null;

				switch (course.type) {
					case "online":
						cta = "Subscribe";
						premiumTuition = React.createElement(
							"p",
							{ style: { marginBottom: 0 } },
							"Subscribe to this course to receive email notifications when new videos are published. If you are a ",
							React.createElement(
								"a",
								{ href: user.id == null ? "/#register" : "/checkout" },
								"premium"
							),
							" member, all online video courses are included in membership."
						);

						var creditsRemaining = null;
						if (user.accountType == "basic") creditsRemaining = React.createElement(
							"span",
							null,
							"Hello ",
							user.firstName,
							"! You have ",
							user.credits,
							" credits remaining"
						);else creditsRemaining = React.createElement(
							"span",
							null,
							"Hello ",
							user.firstName,
							". You are a premium member, feel free to subscribe to this series for free!"
						);


						var isSubscriber = course.subscribers.indexOf(user.id) > -1;
						register = React.createElement(
							"div",
							{ className: "col_full panel panel-default" },
							React.createElement(
								"div",
								{ style: { backgroundColor: "#f1f9f5", textAlign: "left" }, className: "panel-heading" },
								"Fee: ",
								course.credits,
								" credits"
							),
							React.createElement(
								"div",
								{ className: "panel-body", style: { textAlign: "left" } },
								user.id == null ? React.createElement(
									"span",
									null,
									React.createElement(
										"a",
										{ onClick: this.login, href: "#" },
										"Login"
									),
									" or ",
									React.createElement(
										"a",
										{ href: "/#register" },
										"register"
									),
									" to subscribe."
								) : creditsRemaining,
								React.createElement("br", null),
								React.createElement("br", null),
								isSubscriber ? React.createElement(
									"div",
									null,
									React.createElement("hr", null),
									React.createElement(
										"span",
										null,
										"You are subscribed to this series"
									)
								) : React.createElement(
									"div",
									null,
									React.createElement(
										"a",
										{ onClick: this.subscribe, href: "#", target: "_blank", className: "button button-xlarge tright" },
										"Subscribe",
										React.createElement("i", { "class": "icon-circle-arrow-right" })
									),
									React.createElement("br", null)
								)
							)
						);
						break;

					case "immersive":
						cta = "Details";
						date = React.createElement(
							"span",
							null,
							"Date: ",
							course.dates,
							React.createElement("br", null)
						);
						schedule = React.createElement(
							"span",
							null,
							"Time: ",
							course.schedule,
							React.createElement("br", null)
						);
						deposit = React.createElement(
							"span",
							null,
							"Deposit: $",
							course.deposit,
							React.createElement("br", null)
						);
						tuition = React.createElement(
							"span",
							null,
							"Regular Tuition: $",
							course.tuition,
							React.createElement("br", null)
						);
						premiumTuition = React.createElement(
							"span",
							null,
							"Premium Member Tuition: $",
							course.premiumTuition,
							React.createElement("br", null)
						);
						register = React.createElement(
							"a",
							{ href: "#application", className: "button button-xlarge tright" },
							"Apply",
							React.createElement("i", { "class": "icon-circle-arrow-right" })
						);
						break;

					case "live":
						cta = "Register";
						date = React.createElement(
							"span",
							null,
							"Date: ",
							course.dates,
							React.createElement("br", null)
						);
						schedule = React.createElement(
							"span",
							null,
							"Time: ",
							course.schedule,
							React.createElement("br", null)
						);
						deposit = React.createElement(
							"span",
							null,
							"Deposit: $",
							course.deposit,
							React.createElement("br", null)
						);
						tuition = React.createElement(
							"span",
							null,
							"Regular Tuition: $",
							course.tuition,
							React.createElement("br", null)
						);
						premiumTuition = React.createElement(
							"span",
							null,
							"Premium Member Tuition: $",
							course.premiumTuition,
							React.createElement("br", null)
						);
						register = React.createElement(
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
						);
						break;

					default:
						break;
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
									date,
									schedule,
									deposit,
									tuition,
									premiumTuition,
									React.createElement("br", null),
									register
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
//		this.configureStripe(this.props.course)