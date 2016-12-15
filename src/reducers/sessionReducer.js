import constants from '../constants'

var initialState = {
	selectedMenuItem: 'home'
}


export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch (action.type) {
		case constants.SELECT_MENU_ITEM:
			newState['selectedMenuItem'] = action.item
			return newState

		default:
			return state
	}

}