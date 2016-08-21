"use strict";

var constants = require("../constants/constants");

var initialState = {
	tutorials: {},
	tutorialArray: []
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	switch (action.type) {

		case constants.TUTORIALS_RECIEVED:
			var newState = Object.assign({}, state);
			var c = action.tutorials;
			newState.tutorialArray = c;
			var tutorialMap = {};
			for (var i = 0; i < c.length; i++) {
				var tutorial = c[i];
				tutorialMap[tutorial.slug] = tutorial;
			}

			newState.tutorials = tutorialMap;
			//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState;

		default:
			return state;
	}
};