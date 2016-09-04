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
var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var Dropzone = _interopRequire(require("react-dropzone"));

var Loader = _interopRequire(require("react-loader"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var _utils = require("../../utils");

var TextUtils = _utils.TextUtils;
var api = _utils.api;
var _components = require("../../components");

var Footer = _components.Footer;
var Nav = _components.Nav;
var Sidebar = _components.Sidebar;
var CourseCard = _components.CourseCard;
var Account = (function (Component) {
	function Account(props, context) {
		_classCallCheck(this, Account);

		_get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this, props, context);
		this.uploadProfileImage = this.uploadProfileImage.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
		this.updateCurrentUser = this.updateCurrentUser.bind(this);
		this.state = {
			showLoader: false
		};
	}

	_inherits(Account, Component);

	_prototypeProperties(Account, null, {
		componentDidMount: {
			value: function componentDidMount() {
				api.handleGet("/api/course", { subscribers: this.props.profile.id }, function (err, response) {
					//			console.log('Fetch Courses: '+JSON.stringify(response))
					if (err) {
						return;
					}

					store.currentStore().dispatch(actions.coursesRecieved(response.courses));
				});
			},
			writable: true,
			configurable: true
		},
		uploadProfileImage: {
			value: function uploadProfileImage(files) {
				this.setState({
					showLoader: true
				});

				var _this = this;
				api.upload(files[0], function (err, response) {
					_this.setState({
						showLoader: false
					});

					if (err) {
						alert(response.message);
						return;
					}

					var updatedUser = Object.assign({}, _this.props.profile);
					updatedUser.image = response.id;
					store.currentStore().dispatch(actions.updateCurrentUser(updatedUser));
				});
			},
			writable: true,
			configurable: true
		},
		updateCurrentUser: {
			value: function updateCurrentUser(event) {
				event.preventDefault();
				var updatedUser = Object.assign({}, this.props.profile);
				updatedUser[event.target.id] = event.target.value;
				store.currentStore().dispatch(actions.updateCurrentUser(updatedUser));
			},
			writable: true,
			configurable: true
		},
		updateProfile: {
			value: function updateProfile(event) {
				event.preventDefault();

				var profile = Object.assign({}, this.props.profile);
				profile.tags = TextUtils.stringToArray(profile.tagString, ",");

				var endpoint = "/api/profile/" + profile.id;
				api.handlePut(endpoint, profile, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.currentStore().dispatch(actions.currentUserRecieved(response.profile));
					alert("Profile Updated");
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var courseList = null;
				if (this.props.courses.length == 0) {
					courseList = React.createElement(
						"p",
						null,
						"Subscribe to video courses ",
						React.createElement(
							"a",
							{ href: "/courses?type=online" },
							"HERE"
						)
					);
				} else {
					courseList = this.props.courses.map(function (course) {
						return React.createElement(CourseCard, { key: course.id, course: course });
					});
				}

				return React.createElement(
					"div",
					{ id: "wrapper", className: "clearfix", style: { background: "#f9f9f9" } },
					React.createElement(Nav, { headerStyle: "dark" }),
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
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
										"tutorialsList"
									)
								)
							)
						)
					),
					React.createElement(Footer, null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Account;
})(Component);

var stateToProps = function (state) {
	return {
		profile: state.profileReducer.currentUser,
		loaderOptions: state.staticReducer.loaderConfig,
		courses: state.courseReducer.courseArray
	};
};

module.exports = connect(stateToProps)(Account);