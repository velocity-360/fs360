var constants = require('../constants/constants');

var initialState = {
	testimonials: [
		{name:'Brian Correa', image:'briancorrea.jpg', course:'iOS Course'},
		{name:'Mike Maloney', image:'mikemaloney.jpg', course:'MEAN Stack Course'},
		{name:'Jeff Abraham', image:'jeffabraham.jpg', course:'iOS Course'},
		{name:'Jennifer Lin', image:'jenn.jpg', course:'Web Development Intensive'}
	]
	
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

export default function(state = initialState, action){

	switch (action.type) {

		// case constants.UPDATE_CURRENT_USER:
		// 	var newState = Object.assign({}, state);
		// 	newState['currentUser'] = action.currentUser;
		// 	console.log('PROFILE REDUCER - updateCurrentUser: '+JSON.stringify(newState));
		// 	return newState;

		default:
			return state;
	}

}