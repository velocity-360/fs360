var constants = require('../constants/constants')

var initialState = {
	tutorials: {},
	tutorialArray: []
}

export default function(state = initialState, action){
	switch (action.type) {

		case constants.TUTORIALS_RECIEVED:
			var newState = Object.assign({}, state)
			var c = action.tutorials
			newState['tutorialArray'] = c
			var tutorialMap = {}
			for (var i=0; i<c.length; i++){
				var tutorial = c[i]
				tutorialMap[tutorial.slug] = tutorial
			}

			newState['tutorials'] = tutorialMap
//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState

		default:
			return state
	}

}