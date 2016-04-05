"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var ReactDOM = _interopRequire(require("react-dom"));

var Provider = require("react-redux").Provider;
var store = _interopRequire(require("./stores/store"));

var Main = _interopRequire(require("./components/Main"));

var App = (function (_React$Component) {
	function App(props, context) {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), "constructor", this).call(this, props, context);
		// this.updateVisitor = this.updateVisitor.bind(this);
		// this.signUp = this.signUp.bind(this);
		this.refreshData = this.refreshData.bind(this);
		// this.selectLocation = this.selectLocation.bind(this);

		//		this.changeContent = this.changeContent.bind(this);
		this.state = {
			page: null,
			slug: null
		};
	}

	_inherits(App, _React$Component);

	_prototypeProperties(App, null, {
		initialState: {
			value: function initialState() {
				return {
					page: null,
					slug: null
				};
			},
			writable: true,
			configurable: true
		},
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {},
			writable: true,
			configurable: true
		},
		refreshData: {
			value: function refreshData() {},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					Provider,
					{ store: store },
					React.createElement(Main, { page: this.props.page, slug: this.props.slug })
				);
			},
			writable: true,
			configurable: true
		}
	});

	return App;
})(React.Component);

module.exports = App;