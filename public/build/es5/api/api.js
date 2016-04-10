"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var fetch = _interopRequire(require("isomorphic-fetch"));

var actions = _interopRequire(require("../actions/actions"));

var store = _interopRequire(require("../stores/store"));

module.exports = {

	handleGet: function (endpoint, params, completion) {
		fetch(endpoint, {
			method: "GET",
			//		    URLSearchParams: params,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			} }).then(function (response) {
			return response.json();
		}).then(function (json) {
			return store.dispatch(actions.coursesRecieved(json.courses));
		})["catch"](function (err) {
			return console.log(err);
		});
	},

	handlePost: function (endpoint, body, completion) {
		console.log("HANDLE POST: " + JSON.stringify(body));
		fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body) }).then(function (response) {
			return response.json();
		})
		//	    .then( json => console.log(JSON.stringify(json)))
		.then(function (json) {
			if (completion != null) {
				completion(null, json);
			}
		})["catch"](function (err) {
			if (completion != null) {
				completion(err, null);
			}
		});
	}



};