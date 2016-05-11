"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var Home = _interopRequire(require("./containers/Home"));

var Ios = _interopRequire(require("./containers/Ios"));

var Courses = _interopRequire(require("./containers/Courses"));

var Events = _interopRequire(require("./containers/Events"));

var Feed = _interopRequire(require("./containers/Feed"));

var PostPage = _interopRequire(require("./containers/PostPage"));

var Project = _interopRequire(require("./containers/Project"));

var Course = _interopRequire(require("./containers/Course"));

var Vault = _interopRequire(require("./containers/Vault"));

var Videos = _interopRequire(require("./containers/Videos"));

var Account = _interopRequire(require("./containers/Account"));

var Application = _interopRequire(require("./containers/Application"));

var Main = (function (Component) {
	function Main(props, context) {
		_classCallCheck(this, Main);

		_get(Object.getPrototypeOf(Main.prototype), "constructor", this).call(this, props, context);
		this.state = {};
	}

	_inherits(Main, Component);

	_prototypeProperties(Main, null, {
		render: {
			value: function render() {
				//		console.log('RENDER MAIN: '+JSON.stringify(this.props.page)+', '+JSON.stringify(this.props.slug))

				var page = null;
				switch (this.props.page) {
					case "home":
						return page = React.createElement(Ios, { headers: this.props.headers });

					case "ios":
						return page = React.createElement(Ios, { headers: this.props.headers });

					case "course":
						return page = React.createElement(Course, { slug: this.props.slug });

					case "courses":
						return page = React.createElement(Courses, { params: this.props.params });

					case "vault":
						return page = React.createElement(Vault, { params: this.props.params });

					case "application":
						return page = React.createElement(Application, { params: this.props.params });

					case "videos":
						return page = React.createElement(Videos, null);

					case "events":
						return page = React.createElement(Events, null);

					case "feed":
						return page = React.createElement(Feed, null);

					case "post":
						return page = React.createElement(PostPage, { slug: this.props.slug });

					case "project":
						return page = React.createElement(Project, { slug: this.props.slug });

					case "account":
						return page = React.createElement(Account, null);

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
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state));

	return {};
};


module.exports = connect(stateToProps)(Main);