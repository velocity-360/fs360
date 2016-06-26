var constants = require('../../constants/constants');

var initialState = {
	currentUser: {
		id: 23,
		name: 'Michael Jordan',
		firstName: 'Michael',
		lastName: 'Jordan',
		email: 'mjordan@bulls.com',
		password: 'philjackson',
		tagString: 'bulls'
	}
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

export default function(state = initialState, action){
	switch (action.type) {

		default:
			return state;
	}

}