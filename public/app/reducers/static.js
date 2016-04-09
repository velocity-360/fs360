var constants = require('../constants/constants');

var initialState = {
	testimonials: [
		{name:'Brian Correa', image:'briancorrea.jpg', course:'iOS Intensive', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"},
		{name:'Mike Maloney', image:'mikemaloney.jpg', course:'Web Development', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"},
		{name:'Jeff Abraham', image:'jeffabraham.jpg', course:'iOS Intensive', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"},
		{name:'Jennifer Lin', image:'jenn.jpg', course:'Web Intensive', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"}
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