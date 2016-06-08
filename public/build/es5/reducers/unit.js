"use strict";

var constants = require("../constants/constants");

var initialState = {
	units: {},
	unitsArray: []
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	switch (action.type) {

		case constants.UNIT_RECEIVED:
			var newState = Object.assign({}, state);

			return newState;

		default:
			return state;
	}
};