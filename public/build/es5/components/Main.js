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
var Landing = _interopRequire(require("./containers/Landing"));

var ProjectLanding = _interopRequire(require("./containers/ProjectLanding"));

var Courses = _interopRequire(require("./containers/Courses"));

var Event = _interopRequire(require("./containers/Event"));

var Feed = _interopRequire(require("./containers/Feed"));

var PostPage = _interopRequire(require("./containers/PostPage"));

var MVP = _interopRequire(require("./containers/MVP"));

var Project = _interopRequire(require("./containers/Project"));

var Course = _interopRequire(require("./containers/Course"));

var Account = _interopRequire(require("./containers/Account"));

var Unit = _interopRequire(require("./containers/Unit"));

var Checkout = _interopRequire(require("./containers/Checkout"));

var TrackingManager = _interopRequire(require("../utils/TrackingManager"));

var Main = (function (Component) {
	function Main(props, context) {
		_classCallCheck(this, Main);

		_get(Object.getPrototypeOf(Main.prototype), "constructor", this).call(this, props, context);
		this.state = {};
	}

	_inherits(Main, Component);

	_prototypeProperties(Main, null, {
		componentDidMount: {
			value: function componentDidMount() {
				// TrackingManager.currentPage = {
				// 	page: this.props.page,
				// 	slug: (this.props.slug == null) ? '' : this.props.slug,
				// 	params: (this.props.params == null) ? '' : this.props.params
				// }

				var tracker = new TrackingManager();

				tracker.setCurrentPage({
					page: this.props.page,
					slug: this.props.slug == null ? "" : this.props.slug,
					params: this.props.params == null ? "" : this.props.params
				});

				tracker.updateTracking(function (err, response) {
					if (err) {
						console.log("ERROR: " + JSON.stringify(err));
						return;
					}

					console.log(JSON.stringify(response));
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var page = null;
				switch (this.props.page) {
					case "home":
						return page = React.createElement(Landing, null);

					case "landing":
						return page = React.createElement(ProjectLanding, null);

					case "course":
						return page = React.createElement(Course, { slug: this.props.slug });

					case "courses":
						return page = React.createElement(Courses, { params: this.props.params });

					case "event":
						return page = React.createElement(Event, { slug: this.props.slug });

					case "feed":
						return page = React.createElement(Feed, null);

					case "mvp":
						return page = React.createElement(MVP, null);

					case "checkout":
						return page = React.createElement(Checkout, { params: this.props.params });

					case "post":
						return page = React.createElement(PostPage, { slug: this.props.slug });

					case "project":
						return page = React.createElement(Project, { slug: this.props.slug });

					case "unit":
						return page = React.createElement(Unit, { slug: this.props.slug });

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
	//	console.log('STATE TO PROPS: '+JSON.stringify(state))

	return {};
};


module.exports = connect(stateToProps)(Main);
// TrackingManager.updateTracking((err, response) => {
// 	if (err){
// 		console.log('ERROR: '+JSON.stringify(err))
// 		return
// 	}

// 	console.log(JSON.stringify(response))

// })