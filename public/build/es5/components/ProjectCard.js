"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var ProjectCard = (function (Component) {
	function ProjectCard(props, context) {
		_classCallCheck(this, ProjectCard);

		_get(Object.getPrototypeOf(ProjectCard.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(ProjectCard, Component);

	_prototypeProperties(ProjectCard, null, {
		render: {
			value: function render() {
				return React.createElement(
					"div",
					{ className: "col-md-4 col-sm-6 bottommargin" },
					React.createElement(
						"div",
						{ className: "ipost clearfix", style: { background: "#f9f9f9", border: "1px solid #ddd", padding: 16 } },
						React.createElement(
							"div",
							{ className: "entry-image" },
							React.createElement("img", { style: { background: "#fff", border: "1px solid #ddd" }, className: "image_fade", src: "https://media-service.appspot.com/site/images/" + this.props.project.image + "?crop=460", alt: "FullStack 360" })
						),
						React.createElement(
							"div",
							{ className: "entry-title" },
							React.createElement(
								"h3",
								null,
								this.props.project.title
							),
							React.createElement("hr", null)
						),
						React.createElement(
							"div",
							{ className: "entry-content" },
							React.createElement(
								"p",
								null,
								this.props.project.description
							)
						),
						React.createElement(
							"a",
							{ style: { marginTop: 16, marginBottom: 12 }, href: "/project/" + this.props.project.slug, className: "button button-border button-dark button-rounded noleftmargin" },
							"View"
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return ProjectCard;
})(Component);

module.exports = ProjectCard;