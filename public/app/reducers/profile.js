var constants = require('../constants/constants');

var initialState = {
	currentUser: {
		id: null,
		name: '',
		email: '',
		password: ''
	}
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

export default function(state = initialState, action){
	switch (action.type) {

		case constants.UPDATE_CURRENT_USER:
			var newState = Object.assign({}, state);
			newState['currentUser'] = action.currentUser;
			console.log('PROFILE REDUCER - updateCurrentUser: '+JSON.stringify(newState));
			return newState;

		case constants.CURRENT_USER_RECIEVED:
			var newState = Object.assign({}, state);
			newState['currentUser'] = action.currentUser;
			return newState;

		default:
			return state;
	}

}