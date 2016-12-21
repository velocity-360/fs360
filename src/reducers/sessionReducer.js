import constants from '../constants'

var initialState = {
	selectedMenuItem: 'home',
	isLoading: false
}


export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch (action.type) {
		case constants.SELECT_MENU_ITEM:
			newState['selectedMenuItem'] = action.item
			return newState

		case constants.TOGGLE_LOADING:
			newState['isLoading'] = action.isLoading
			return newState

		default:
			return state
	}

}