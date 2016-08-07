"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var api = _interopRequire(require("../utils/APIManager"));

var instance = null;

var TrackingManager = (function () {
	function TrackingManager(props, context) {
		_classCallCheck(this, TrackingManager);

		if (instance == null) // singelton
			instance = this;

		this.updateTracking = this.updateTracking.bind(this);
		this.setCurrentPage = this.setCurrentPage.bind(this);
		this.currentPage = {
			page: "",
			slug: "",
			params: {}
		};

		return instance;
	}

	_prototypeProperties(TrackingManager, null, {
		setCurrentPage: {
			value: function setCurrentPage(pageInfo) {
				this.currentPage = pageInfo;
			},
			writable: true,
			configurable: true
		},
		updateTracking: {
			value: function updateTracking(callback) {
				//		console.log('UPDATE TRACKING: '+JSON.stringify(this.currentPage))
				api.handlePost("/tracker", this.currentPage, function (err, response) {
					if (err) {
						callback(err, null);
						return;
					}

					callback(null, response);
				});
			},
			writable: true,
			configurable: true
		}
	});

	return TrackingManager;
})();

module.exports = TrackingManager;