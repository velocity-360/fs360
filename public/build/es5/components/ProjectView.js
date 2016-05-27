"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var ProjectView = (function (Component) {
	function ProjectView(props, context) {
		_classCallCheck(this, ProjectView);

		_get(Object.getPrototypeOf(ProjectView.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(ProjectView, Component);

	_prototypeProperties(ProjectView, null, {
		render: {
			value: function render() {
				var tags = this.props.project.tags.map(function (tag, i) {
					return React.createElement(
						"a",
						{ href: "#" },
						tag
					);
				});

				return React.createElement(
					"div",
					{ className: "panel panel-default", style: { padding: 36 } },
					React.createElement("img", { style: { width: "120", marginBottom: 16, float: "left", marginRight: 24 }, src: "https://media-service.appspot.com/site/images/" + this.props.project.image + "?crop=420" }),
					React.createElement("i", { onClick: this.toggleEditing, className: "i-plain icon-edit" }),
					React.createElement(
						"h2",
						null,
						this.props.project.title
					),
					React.createElement("hr", null),
					React.createElement(
						"div",
						{ className: "tagcloud clearfix" },
						tags
					),
					React.createElement(
						"div",
						{ style: { marginTop: 36, padding: 16, border: "1px solid #ddd", textAlign: "center", background: "#f9f9f9" } },
						React.createElement(
							"div",
							{ className: "masonry-thumbs col-4" },
							React.createElement(
								"a",
								{ href: "/images/logo_round_blue_260.png", "data-lightbox": "image" },
								React.createElement("img", { style: { width: 96 }, src: "/images/logo_round_blue_260.png", alt: "Single Image" }),
								React.createElement(
									"div",
									{ style: { width: 96 }, className: "overlay" },
									React.createElement(
										"div",
										{ className: "overlay-wrap" },
										React.createElement("i", { className: "icon-line-plus" })
									)
								)
							),
							React.createElement(
								"a",
								{ href: "/images/logo_round_blue_260.png", "data-lightbox": "image" },
								React.createElement("img", { style: { width: 96 }, src: "/images/logo_round_blue_260.png", alt: "Single Image" }),
								React.createElement(
									"div",
									{ style: { width: 96 }, className: "overlay" },
									React.createElement(
										"div",
										{ className: "overlay-wrap" },
										React.createElement("i", { className: "icon-line-plus" })
									)
								)
							),
							React.createElement(
								"a",
								{ href: "/images/logo_round_blue_260.png", "data-lightbox": "image" },
								React.createElement("img", { style: { width: 96 }, src: "/images/logo_round_blue_260.png", alt: "Single Image" }),
								React.createElement(
									"div",
									{ style: { width: 96 }, className: "overlay" },
									React.createElement(
										"div",
										{ className: "overlay-wrap" },
										React.createElement("i", { className: "icon-line-plus" })
									)
								)
							),
							React.createElement(
								"a",
								{ href: "/images/logo_round_blue_260.png", "data-lightbox": "image" },
								React.createElement("img", { style: { width: 96 }, src: "/images/logo_round_blue_260.png", alt: "Single Image" }),
								React.createElement(
									"div",
									{ style: { width: 96 }, className: "overlay" },
									React.createElement(
										"div",
										{ className: "overlay-wrap" },
										React.createElement("i", { className: "icon-line-plus" })
									)
								)
							)
						)
					),
					React.createElement(
						"h3",
						{ style: { marginTop: 36, marginBottom: 0 } },
						"Summary"
					),
					React.createElement(
						"p",
						null,
						this.props.project.description
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return ProjectView;
})(Component);

module.exports = ProjectView;