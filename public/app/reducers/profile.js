var constants = require('../constants/constants');

var initialState = {
	currentUser: {
		id: null,
		name: '',
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		tagString: '',
		accountType:'basic'
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
//			console.log('PROFILE REDUCER - updateCurrentUser: '+JSON.stringify(newState));
			return newState;

		case constants.CURRENT_USER_RECIEVED:
			var newState = Object.assign({}, state)
			var currentUser = action.currentUser
			var tags = currentUser.tags
			var tagString = ''
			for (var i=0; i<tags.length; i++){
				var tag = tags[i]
				if (tag.length == 0)
					continue

				tagString = tagString+tag
				if (i==tags.length-1)
					continue

				tagString = tagString+', '
			}

			currentUser['tagString'] = tagString
			newState['currentUser'] = currentUser
			return newState;

		default:
			return state;
	}

}