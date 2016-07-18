"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var Login = _interopRequire(require("../components/Login"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../api/api"));

var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var Nav = (function (Component) {
	function Nav(props, context) {
		_classCallCheck(this, Nav);

		_get(Object.getPrototypeOf(Nav.prototype), "constructor", this).call(this, props, context);
		this.openModal = this.openModal.bind(this);
		this.closeLogin = this.closeLogin.bind(this);
		this.state = {
			showModal: false,
			showLogin: false
		};
	}

	_inherits(Nav, Component);

	_prototypeProperties(Nav, null, {
		componentDidMount: {
			value: function componentDidMount() {
				if (this.props.currentUser.id != null) {
					return;
				}api.handleGet("/account/currentuser", {}, function (err, response) {
					//			console.log('CURRENT USER: '+JSON.stringify(response))
					if (err) {
						return;
					}

					store.currentStore().dispatch(actions.currentUserRecieved(response.profile));
				});
			},
			writable: true,
			configurable: true
		},
		openModal: {
			value: function openModal(event) {
				event.preventDefault();
				this.setState({ showLogin: true });
			},
			writable: true,
			configurable: true
		},
		closeLogin: {
			value: function closeLogin() {
				this.setState({ showLogin: false });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var login = this.props.currentUser.id == null ? React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ onClick: this.openModal, href: "#" },
						React.createElement(
							"div",
							{ className: "login", style: { padding: 4 } },
							"Login"
						)
					)
				) : React.createElement(
					"li",
					null,
					React.createElement(
						"a",
						{ href: "/account" },
						React.createElement(
							"div",
							{ className: "user", style: { padding: 4 } },
							this.props.currentUser.firstName
						)
					)
				);

				return React.createElement(
					"header",
					{ id: "header", className: "transparent-header page-section dark" },
					React.createElement(
						"div",
						{ id: "header-wrap" },
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"div",
								{ id: "primary-menu-trigger" },
								React.createElement("i", { className: "icon-reorder" })
							),
							React.createElement(
								"div",
								{ id: "logo" },
								React.createElement(
									"a",
									{ href: "/", className: "standard-logo", "data-dark-logo": "/images/logo-dark.png" },
									React.createElement("img", { src: "/images/logo.png", alt: "Velocity 360" })
								),
								React.createElement(
									"a",
									{ href: "/", className: "retina-logo", "data-dark-logo": "/images/logo-dark@2x.png" },
									React.createElement("img", { src: "/images/logo@2x.png", alt: "Velocity 360" })
								)
							),
							React.createElement(
								"nav",
								{ id: "primary-menu" },
								React.createElement(
									"ul",
									{ className: "one-page-menu" },
									React.createElement(
										"li",
										{ className: "current" },
										React.createElement(
											"a",
											{ href: "/" },
											React.createElement(
												"div",
												{ style: { padding: 4 } },
												"Home"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#" },
											React.createElement(
												"div",
												{ style: { padding: 4 } },
												"Courses"
											)
										),
										React.createElement(
											"ul",
											null,
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "/courses?type=online" },
													React.createElement(
														"div",
														{ style: { padding: 4 } },
														"Online"
													)
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "/courses?type=live" },
													React.createElement(
														"div",
														{ style: { padding: 4 } },
														"Part Time"
													)
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "/courses?type=immersive" },
													React.createElement(
														"div",
														{ style: { padding: 4 } },
														"Bootcamp"
													)
												)
											)
										)
									),
									login
								)
							)
						)
					),
					React.createElement(Login, { isVisible: this.state.showLogin, hide: this.closeLogin, redirect: "/account" })
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Nav;
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state.profileReducer))
	return {
		currentUser: state.profileReducer.currentUser
	};
};


module.exports = connect(stateToProps)(Nav);