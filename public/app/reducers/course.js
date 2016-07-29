var constants = require('../constants/constants')

var initialState = {
	courses:{},
	courseArray: []
}

export default function(state = initialState, action){
	switch (action.type) {

		case constants.COURSES_RECIEVED:
			var newState = Object.assign({}, state)
			var c = action.courses
			newState['courseArray'] = c
			var courseMap = {}
			for (var i=0; i<c.length; i++){
				var course = c[i];
				courseMap[course.slug] = course
			}

			newState['courses'] = courseMap
//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState

		case constants.COURSE_RECIEVED:
			var newState = Object.assign({}, state)

			// newState['courseArray'] = c
			var courseMap = Object.assign({}, newState.courses)
			var course = action.course
			courseMap[course.slug] = course

			newState['courses'] = courseMap
//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState


		default:
			return state
	}

}