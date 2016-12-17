import constants from '../constants'

var initialState = {
	all: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)
	let updatedList = (state.all) ? Object.assign([], state.all) : []

	switch (action.type) {
		case constants.COURSES_RECEIVED:
			action.courses.forEach((course, i) => {
				if (newState[course.id] == null){
					newState[course.id] = course
					newState[course.slug] = course
					updatedList.push(course)
				}
			})

			newState['all'] = updatedList
			if (action.params == null)
				return newState

			keys.forEach((key, i) => { // ignore slug and id
				let array = (newState[key]) ? Object.assign([], newState[key]) : []

			})

			return newState

		default:
			return state
	}

}