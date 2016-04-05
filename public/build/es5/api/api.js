"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fetch = _interopRequire(require("isomorphic-fetch"));

var actions = _interopRequire(require("../actions/actions"));

var store = _interopRequire(require("../stores/store"));

module.exports = {

	handleGet: function (endpoint, params) {
		fetch(endpoint, {
			method: "GET",
			//		    URLSearchParams: params,
			header: {
				Accept: "application/json",
				"Content-Type": "application/json"
			} }).then(function (response) {
			return response.json();
		}).then(function (json) {
			return store.dispatch(actions.coursesRecieved(json.courses));
		})["catch"](function (err) {
			return console.log(err);
		});
	}

};