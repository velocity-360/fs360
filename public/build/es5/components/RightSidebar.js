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
var connect = require("react-redux").connect;
var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var TextUtils = _interopRequire(require("../utils/TextUtils"));

var api = _interopRequire(require("../utils/APIManager"));

var RightSidebar = (function (Component) {
	function RightSidebar(props, context) {
		_classCallCheck(this, RightSidebar);

		_get(Object.getPrototypeOf(RightSidebar.prototype), "constructor", this).call(this, props, context);
		this.fetchEvents = this.fetchEvents.bind(this);
		this.state = {
			posts: [],
			events: []
		};
	}

	_inherits(RightSidebar, Component);

	_prototypeProperties(RightSidebar, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				api.handleGet("/api/post", { limit: "3" }, function (err, response) {
					if (err) {
						return;
					}

					var posts = response.posts;
					_this.setState({
						posts: posts
					});

					_this.fetchEvents();
				});
			},
			writable: true,
			configurable: true
		},
		fetchEvents: {
			value: function fetchEvents() {
				var _this = this;
				api.handleGet("/api/event", { limit: "3" }, function (err, response) {
					if (err) {
						return;
					}

					//			console.log(JSON.stringify(response))
					var events = response.events;
					_this.setState({
						events: events
					});
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var posts = this.state.posts.map(function (post, i) {
					var name = post.profile.name == null ? "anon" : post.profile.name;
					return React.createElement(
						"div",
						{ key: post.id, style: { border: "1px solid #ddd", padding: 12, background: "#f9f9f9", marginBottom: 16 } },
						React.createElement(
							"h5",
							{ style: { fontWeight: 400, marginBottom: 0 } },
							React.createElement(
								"a",
								{ href: "/post/" + post.slug },
								post.title
							)
						),
						React.createElement(
							"span",
							{ style: { fontWeight: 100, fontSize: 14 } },
							name
						)
					);
				});

				var events = this.state.events.map(function (event, i) {
					return React.createElement(
						"div",
						{ key: event.id, style: { border: "1px solid #ddd", background: "#f9f9f9", marginBottom: 16 } },
						React.createElement("img", { style: { width: 104, float: "left", marginRight: 12 }, src: "https://media-service.appspot.com/site/images/" + event.image + "?crop=260", alt: "Velocity 360" }),
						React.createElement(
							"div",
							{ style: { padding: 12, height: 104, textAlign: "right" } },
							React.createElement(
								"h5",
								{ style: { fontWeight: 200, marginBottom: 0 } },
								React.createElement(
									"a",
									{ href: "/event/" + event.slug },
									event.title
								)
							),
							React.createElement(
								"span",
								{ style: { fontWeight: 100, fontSize: 14 } },
								event.date,
								", ",
								event.time
							),
							React.createElement("br", null),
							React.createElement(
								"a",
								{ href: "/event/" + event.slug, style: { marginRight: 0 }, className: "button button-3d button-mini button-rounded button-teal" },
								"Attend"
							)
						)
					);
				});
				return React.createElement(
					"div",
					null,
					React.createElement(
						"div",
						{ className: "widget clearfix" },
						React.createElement(
							"h4",
							null,
							"Recent Posts"
						),
						React.createElement("hr", null),
						posts,
						React.createElement(
							"a",
							{ href: "/feed" },
							"View All"
						)
					),
					React.createElement(
						"div",
						{ className: "widget clearfix" },
						React.createElement(
							"h4",
							null,
							"Events"
						),
						React.createElement("hr", null),
						events
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return RightSidebar;
})(Component);

module.exports = RightSidebar;