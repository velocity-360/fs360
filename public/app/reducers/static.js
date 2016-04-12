var constants = require('../constants/constants');

var initialState = {
	testimonials: [
		{name:'Brian Correa', image:'briancorrea.jpg', course:'iOS Intensive', quote:"On the first day of class my instructor taught me more than I taught myself in the three weeks. I immediately knew I made the right choice to learn iOS with FS360. The hands-on structure of the class is the best use of my time and prevents me from wasting time trying to get one thing off the ground. Instead, I was immediately building projects.  I am confident that after the FS360 class, my skill-set will be appealing to companies looking to hire a junior developer."},
		{name:'Jeff Abraham', image:'jeffabraham.jpg', course:'iOS Intensive', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"},
		{name:'Mike Maloney', image:'mikemaloney.jpg', course:'Web Development', quote:"After 20 years on Broadway, I was skeptical if the FS360 class would work for me. However I quickly realized that FS360 was exactly what I needed. We spent practically the entire day coding from the minute I walked into class every morning.  I started with the full-time Web intensive class and I am now in the middle of taking an iOS class. What separates FS360 is that I learn only very relevant technologies that will be useful in the near future.  When you stumble down the rabbit hole, the instructor guides you but does not hold your hand.  Lastly, the culture at FS360 is hard to match, with its offices being centrally located at WeWork, and the great collaborative environment between both the students and instructors."},
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