"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var CodeSample = (function (Component) {
	function CodeSample(props, context) {
		_classCallCheck(this, CodeSample);

		_get(Object.getPrototypeOf(CodeSample.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(CodeSample, Component);

	_prototypeProperties(CodeSample, null, {
		render: {
			value: function render() {
				var image = "";
				if (this.props.sample.topic == "ios") {
					image = "apple-2.jpg";
				}
				if (this.props.sample.topic == "node") {
					image = "node-red.png";
				}
				if (this.props.sample.topic == "react") {
					image = "apple-2.jpg";
				}

				var btnDownload = "";
				if (this.props.sample.isPublic == "yes") {
					btnDownload = React.createElement(
						"div",
						null,
						React.createElement(
							"a",
							{ href: this.props.sample.url, style: { float: "right" }, className: "btn btn-primary", role: "button" },
							"Download"
						),
						React.createElement("br", null),
						React.createElement("br", null)
					);
				} else if (this.props.accountType == "premium") {
					btnDownload = React.createElement(
						"div",
						null,
						React.createElement(
							"a",
							{ href: this.props.sample.url, style: { float: "right" }, className: "btn btn-primary", role: "button" },
							"Download"
						),
						React.createElement("br", null),
						React.createElement("br", null)
					);
				} else if (this.props.accountType == "basic" || this.props.accountType == "") {
					btnDownload = React.createElement(
						"div",
						{ style: { border: "1px solid #ddd", padding: 12, background: "#f9f9f9", marginTop: 12 } },
						"To download, please ",
						React.createElement(
							"a",
							{ style: { color: "red" }, onClick: this.subscribe, href: "#" },
							"upgrade"
						),
						" your account to Premium"
					);
				} else {
					// not logged in
					btnDownload = React.createElement(
						"div",
						{ style: { border: "1px solid #ddd", padding: 12, background: "#f9f9f9", marginTop: 12 } },
						"Please ",
						React.createElement(
							"a",
							{ onClick: this.login, style: { color: "red" }, href: "#" },
							"log in"
						),
						" or ",
						React.createElement(
							"a",
							{ style: { color: "red" }, href: "/#register" },
							"register"
						),
						" to download."
					);
				}

				var tags = this.props.sample.tags.map(function (tag, i) {
					return React.createElement(
						"a",
						{ key: i, style: { background: "#f9f9f9", marginRight: 6 }, href: "#" },
						tag
					);
				});


				return React.createElement(
					"div",
					{ key: this.props.sample.id, href: "#", className: "list-group-item" },
					React.createElement("img", { style: { float: "left", width: 96, borderRadius: 48, marginRight: 24 }, src: "/images/" + image }),
					React.createElement(
						"h4",
						{ className: "list-group-item-heading" },
						this.props.sample.title
					),
					React.createElement(
						"div",
						{ className: "tagcloud", style: { marginTop: 6, marginBottom: 0 } },
						tags
					),
					React.createElement("hr", { style: { color: "#fff", background: "#fff" } }),
					React.createElement(
						"p",
						{ className: "list-group-item-text", style: { marginTop: 0 } },
						this.props.sample.description
					),
					React.createElement("br", null),
					btnDownload
				);
			},
			writable: true,
			configurable: true
		}
	});

	return CodeSample;
})(Component);

module.exports = CodeSample;
// this.login = this.login.bind(this)
// this.subscribe = this.subscribe.bind(this)