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
var api = require("../../utils").api;
var _components = require("../../components");

var Nav = _components.Nav;
var Footer = _components.Footer;
var CourseCard = _components.CourseCard;
var RightSidebar = _components.RightSidebar;
var Register = _components.Register;
var Tutorials = (function (Component) {
	function Tutorials(props, context) {
		_classCallCheck(this, Tutorials);

		_get(Object.getPrototypeOf(Tutorials.prototype), "constructor", this).call(this, props, context);
		this.state = {
			tutorials: []
		};
	}

	_inherits(Tutorials, Component);

	_prototypeProperties(Tutorials, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				api.handleGet("/api/tutorial", null, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					console.log(JSON.stringify(response));
					var tutorials = response.tutorials;
					_this.setState({
						tutorials: tutorials
					});
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var tutorialsList = this.state.tutorials.map(function (tutorial, i) {
					return React.createElement(
						"div",
						{ key: tutorial.id, className: "col-md-4" },
						React.createElement(
							"div",
							{ style: { width: 92 + "%", margin: "auto", background: "#f9f9f9", border: "1px solid #ddd", textAlign: "center", padding: 16, marginBottom: 32 } },
							React.createElement("img", { style: { width: 100, borderRadius: 50, marginBottom: 12 }, src: "https://media-service.appspot.com/site/images/" + tutorial.image + "?crop=460" }),
							React.createElement(
								"div",
								{ className: "fancy-title title-bottom-border" },
								React.createElement(
									"h3",
									{ style: { fontWeight: 400 } },
									tutorial.title
								)
							),
							React.createElement(
								"p",
								{ style: { height: 100 } },
								tutorial.description
							),
							React.createElement(
								"a",
								{ href: "/tutorial/" + tutorial.slug, className: "button button-3d button-mini button-rounded button-teal" },
								"View"
							)
						)
					);
				});

				return React.createElement(
					"div",
					{ className: "clearfix" },
					React.createElement(Nav, { headerStyle: "dark" }),
					React.createElement(
						"section",
						null,
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "col_full bottommargin-sm" },
									React.createElement(
										"div",
										{ className: "row" },
										tutorialsList
									)
								)
							)
						)
					),
					React.createElement("hr", null),
					React.createElement(Register, null),
					React.createElement(Footer, null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Tutorials;
})(Component);

module.exports = Tutorials;