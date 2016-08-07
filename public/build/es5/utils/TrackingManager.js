"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var api = _interopRequire(require("../utils/APIManager"));

module.exports = {
	currentPage: {
		page: "",
		slug: "",
		params: {}
	},

	updateTracking: function (callback) {
		api.handlePost("/tracker", undefined.currentPage, function (err, response) {
			if (err) {
				callback(err, null);
				return;
			}

			callback(null, response);
		});
	}
};