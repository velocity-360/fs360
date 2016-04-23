var constants = require('../constants/constants');

var initialState = {
	events: {
		0:{
			title:'',
			description:'',
		}
	},
	eventArray: []
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

export default function(state = initialState, action){
	switch (action.type) {

		case constants.EVENTS_RECIEVED:
			var newState = Object.assign({}, state)
			var c = action.events
			newState['eventArray'] = c
			var eventMap = {}
			for (var i=0; i<c.length; i++){
				var event = c[i]
				eventMap[event.id] = event
			}

			newState['events'] = eventMap
//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState

		default:
			return state
	}

}