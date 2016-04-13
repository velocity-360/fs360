"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var Home = _interopRequire(require("./containers/Home"));

var Courses = _interopRequire(require("./containers/Courses"));

var Course = _interopRequire(require("./containers/Course"));

var Videos = _interopRequire(require("./containers/Videos"));

var IOSHighSchool = _interopRequire(require("./containers/IOSHighSchool"));

var Main = (function (_React$Component) {
	function Main(props, context) {
		_classCallCheck(this, Main);

		_get(Object.getPrototypeOf(Main.prototype), "constructor", this).call(this, props, context);
		this.state = {};
	}

	_inherits(Main, _React$Component);

	_prototypeProperties(Main, null, {
		render: {
			value: function render() {
				console.log("RENDER MAIN: " + JSON.stringify(this.props.page) + ", " + JSON.stringify(this.props.slug));

				var page = null;
				switch (this.props.page) {
					case "home":
						return page = React.createElement(Home, null);

					case "course":
						return page = React.createElement(Course, { slug: this.props.slug });

					case "courses":
						return page = React.createElement(Courses, { params: this.props.params });

					case "ioshighschool":
						console.log("TEST");
						return page = React.createElement(IOSHighSchool, null);

					case "videos":
						return page = React.createElement(Videos, null);

					default:
						return page = null;

				}

				return React.createElement(
					"div",
					null,
					page
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Main;
})(React.Component);

module.exports = Main;