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

var api = _interopRequire(require("../utils/APIManager"));

var connect = require("react-redux").connect;
var Sidebar = (function (Component) {
	function Sidebar(props, context) {
		_classCallCheck(this, Sidebar);

		_get(Object.getPrototypeOf(Sidebar.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(Sidebar, Component);

	_prototypeProperties(Sidebar, null, {
		componentDidMount: {
			value: function componentDidMount() {
				api.handleGet("/account/currentuser", {}, function (err, response) {
					if (err) {
						return;
					}

					store.currentStore().dispatch(actions.currentUserRecieved(response.profile));
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"header",
					{ id: "header", className: "no-sticky" },
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
								{ id: "logo", className: "nobottomborder" },
								React.createElement(
									"a",
									{ href: "/", className: "standard-logo", "data-dark-logo": "/images/logo-side-dark.png" },
									React.createElement("img", { src: "/images/logo-side.png", alt: "FullStack 360" })
								),
								React.createElement(
									"a",
									{ href: "/", className: "retina-logo", "data-dark-logo": "/images/logo-side-dark@2x.png" },
									React.createElement("img", { src: "/images/logo-side@2x.png", alt: "FullStack 360" })
								)
							),
							React.createElement(
								"nav",
								{ id: "primary-menu" },
								React.createElement(
									"ul",
									null,
									React.createElement(
										"li",
										null,
										this.props.currentUser.id == null ? null : React.createElement(
											"a",
											{ href: "/account" },
											React.createElement(
												"div",
												null,
												this.props.currentUser.firstName
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "/" },
											React.createElement(
												"div",
												null,
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
												null,
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
														null,
														"Videos"
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
														null,
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
														null,
														"Bootcamp"
													)
												)
											)
										)
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

	return Sidebar;
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state.profileReducer.currentUser))

	return {
		currentUser: state.profileReducer.currentUser
	};
};


module.exports = connect(stateToProps)(Sidebar);