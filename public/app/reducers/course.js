var constants = require('../constants/constants');

var initialState = {
	courses: []
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

export default function(state = initialState, action){
	switch (action.type) {

		case constants.COURSES_RECIEVED:
			var newState = Object.assign({}, state);
			newState['courses'] = action.courses;
			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState;

		default:
			return state;
	}

}