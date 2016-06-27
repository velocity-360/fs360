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
				var tags = this.props.project.tags.map(function (tag, i) {
					return React.createElement(
						"a",
						{ key: tag, style: { background: "#fff" }, href: "#" },
						tag
					);
				});

				return React.createElement(
					"div",
					{ className: "col_one_third bottommargin-sm" },
					React.createElement(
						"div",
						{ className: "widget clearfix", style: { borderRadius: 2, padding: 24, textAlign: "center", border: "1px solid #ddd", background: "#F9FCFF" } },
						React.createElement(
							"h4",
							null,
							"Featured"
						),
						React.createElement("img", { style: { width: 128, border: "1px solid #ddd" }, src: "https://media-service.appspot.com/site/images/" + this.props.project.image + "?crop=260", alt: "Velocity 360" }),
						React.createElement(
							"h3",
							{ style: { marginBottom: 6, marginTop: 9 } },
							React.createElement(
								"a",
								{ id: "title", href: "/project/" + this.props.project.slug },
								this.props.project.title
							)
						),
						React.createElement("hr", null),
						React.createElement(
							"strong",
							null,
							"iOS App"
						),
						React.createElement("br", null),
						React.createElement(
							"p",
							{ style: { height: 150 }, id: "description" },
							this.props.project.description
						),
						React.createElement(
							"div",
							{ className: "tagcloud" },
							tags
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