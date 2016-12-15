import constants from '../constants'

var initialState = {
	currentUser: null
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)
	let currentUser = Object.assign([], newState.currentUser)

	switch (action.type) {
		case constants.CURRENT_USER_RECIEVED:
			newState['currentUser'] = action.user
			return newState

		default:
			return state
	}
}