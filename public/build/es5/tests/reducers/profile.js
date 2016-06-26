"use strict";

var constants = require("../../constants/constants");

var initialState = {
	currentUser: {
		id: 23,
		name: "Michael Jordan",
		firstName: "Michael",
		lastName: "Jordan",
		email: "mjordan@bulls.com",
		password: "philjackson",
		tagString: "bulls"
	}
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	switch (action.type) {

		default:
			return state;
	}
};