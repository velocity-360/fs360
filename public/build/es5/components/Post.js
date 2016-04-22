"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var TextUtils = _interopRequire(require("../utils/TextUtils"));

var DateUtils = _interopRequire(require("../utils/DateUtils"));

var Post = (function (Component) {
	function Post(props, context) {
		_classCallCheck(this, Post);

		_get(Object.getPrototypeOf(Post.prototype), "constructor", this).call(this, props, context);
	}

	_inherits(Post, Component);

	_prototypeProperties(Post, null, {
		render: {
			value: function render() {
				// var now = new Date();
				// var timestamp = new Date(this.props.post.timestamp);
				// var diff = now-timestamp;

				// var date = null;
				// if (diff > 24*60*1000) {
				//     date = <Time value={timestamp} format="MMM DD, YYYY" /> ;
				// }
				// else {
				//     date = <Time value={timestamp} titleFormat="YYYY/MM/DD HH:mm" relative />;
				// }

				var timestamp = new Date(this.props.post.timestamp);
				var date = DateUtils.formattedDate(timestamp);

				return React.createElement(
					"div",
					{ className: "entry clearfix" },
					React.createElement(
						"div",
						{ className: "entry-image" },
						React.createElement("img", { style: { border: "1px solid #ddd", background: "#fff" }, className: "image_fade", src: "https://media-service.appspot.com/site/images/" + this.props.post.image + "?crop=260", alt: "FullStack 360" })
					),
					React.createElement(
						"div",
						{ className: "entry-c" },
						React.createElement(
							"div",
							{ className: "entry-title" },
							React.createElement(
								"h2",
								null,
								React.createElement(
									"a",
									{ href: "/post/" + this.props.post.id },
									this.props.post.title
								)
							)
						),
						React.createElement(
							"ul",
							{ className: "entry-meta clearfix" },
							React.createElement(
								"li",
								null,
								React.createElement("i", { className: "icon-calendar3" }),
								" ",
								date
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "#" },
									React.createElement("i", { className: "icon-user" }),
									" ",
									this.props.post.profile.name
								)
							),
							React.createElement(
								"li",
								null,
								React.createElement(
									"a",
									{ href: "blog-single.html#comments" },
									React.createElement("i", { className: "icon-comments" }),
									" ",
									this.props.post.numReplies,
									" comments"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "entry-content" },
							React.createElement(
								"div",
								{ className: "panel panel-default" },
								React.createElement(
									"div",
									{ style: { padding: 16 }, className: "panel-body" },
									TextUtils.truncateText(this.props.post.text, 260)
								)
							)
						)
					),
					React.createElement("hr", { style: { padding: 12 } })
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Post;
})(Component);

module.exports = Post;