"use strict";

var constants = require("../constants/constants");

var initialState = {
	samples: {},
	samplesArray: [],
	emptySample: {
		title: "",
		image: "",
		url: "",
		description: "",
		tags: [],
		profile: {
			name: "",
			image: "",
			id: null
		}
	}
};


/* A reducer is a function that takes the current state and an action, and 
then returns a new state. This reducer is responsible for appState.heroes 
data. See `initialstate.js` for a clear view of what it looks like! */

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	switch (action.type) {

		case constants.SAMPLE_CREATED:
			var newState = Object.assign({}, state);
			var sample = action.sample;
			newState.samples[sample.id] = sample;
			newState.samplesArray.unshift(sample);
			return newState;

		case constants.SAMPLES_RECIEVED:
			var newState = Object.assign({}, state);

			var c = action.samples;
			newState.samplesArray = c;
			var samplesMap = {};
			for (var i = 0; i < c.length; i++) {
				var sample = c[i];
				samplesMap[sample.id] = sample;
			}

			newState.samples = samplesMap;
			//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState;

		default:
			return state;
	}
};