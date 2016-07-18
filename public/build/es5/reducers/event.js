"use strict";

var constants = require("../constants/constants");

var initialState = {
	events: {
		0: {
			title: "",
			description: "" }
	},
	eventArray: []
};


module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	switch (action.type) {

		case constants.EVENTS_RECIEVED:
			var newState = Object.assign({}, state);
			var c = action.events;
			newState.eventArray = c;
			var eventMap = {};
			for (var i = 0; i < c.length; i++) {
				var event = c[i];
				eventMap[event.id] = event;
			}

			newState.events = eventMap;
			//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState;

		default:
			return state;
	}
};