import constants from '../constants'

var initialState = {
	all: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)
	let updatedList = (state.all) ? Object.assign([], state.all) : []

	switch (action.type) {
		case constants.TUTORIALS_RECEIVED:
//			console.log('TUTORIALS_RECEIVED: '+JSON.stringify(action.tutorials))
			action.tutorials.forEach((tutorial, i) => {
				if (newState[tutorial.id] == null){
					newState[tutorial.id] = tutorial
					newState[tutorial.slug] = tutorial
					updatedList.push(tutorial)
				}
			})

			newState['all'] = updatedList
			return newState

		case constants.TUTORIAL_UPDATED:
			newState[action.tutorial.id] = action.tutorial
			newState[action.tutorial.slug] = action.tutorial

			let array = []
			updatedList.forEach((tutorial, i) => {
				if (tutorial.id == action.tutorial.id) // replace old with new
					array.push(action.tutorial)
				else
					array.push(tutorial)
			})

			newState['all'] = array
			return newState

		default:
			return state
	}

}