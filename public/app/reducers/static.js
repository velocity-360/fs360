var constants = require('../constants/constants');

var initialState = {
	testimonials: [
		{name:'Brian Correa', image:'briancorrea.jpg', course:'iOS Intensive', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"},
		{name:'Mike Maloney', image:'mikemaloney.jpg', course:'Web Development', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"},
		{name:'Jeff Abraham', image:'jeffabraham.jpg', course:'iOS Intensive', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"},
		{name:'Jennifer Lin', image:'jenn.jpg', course:'Web Intensive', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"}
	],
	events:[
		{id:0, 'subject':'Node + iOS Workshop', 'fee':'Free', 'date':'April 5, 2016', 'time':'7:00pm', 'description':'Watch how the full stack comes together in this 2-hour demo. We will build and deploy a simple Node JS backend. Then we will create an iPhone app that queries the API and renders data in a table. This is a true full stack demo which involves several technologies.' , 'image':'apple.jpg', button:'Attend'},
		{id:1, 'subject':'Node JS Workshop', 'fee':'Free', 'date':'April 6, 2016', 'time':'7:00pm', 'description':'Learn how to build a full MEAN stack application with the SendGrid API. We\'ll build a Node server with a landing page to collect signups, create profiles, and automate welcome emails.' , 'image':'node.png', button:'Attend'},
	],
	loaderConfig: {
	    lines: 13,
	    length: 20,
	    width: 10,
	    radius: 30,
	    corners: 1,
	    rotate: 0,
	    direction: 1,
	    color: '#fff',
	    speed: 1,
	    trail: 60,
	    shadow: false,
	    hwaccel: false,
	    zIndex: 2e9,
	    top: '50%',
	    left: '50%',
	    scale: 1.00
	}
	
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