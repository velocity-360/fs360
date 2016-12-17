import constants from '../constants'

var initialState = {
	all: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)
	let updatedList = (state.all) ? Object.assign([], state.all) : []

	switch (action.type) {
		case constants.TUTORIALS_RECEIVED:
			console.log('TUTORIALS_RECEIVED: '+JSON.stringify(action.tutorials))
			action.tutorials.forEach((tutorial, i) => {
				if (newState[tutorial.id] == null){
					newState[tutorial.id] = tutorial
					newState[tutorial.slug] = tutorial
					updatedList.push(tutorial)
				}
			})

			newState['all'] = updatedList
			return newState

		default:
			return state
	}

}