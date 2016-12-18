import constants from '../constants'
import { APIManager } from '../utils'

const postData = (path, data, actionType, payloadKey) => {
	return (dispatch) => APIManager
		.handlePost(path, data)
		.then((response) => {
//			const result = response.result
			dispatch({
				type: actionType,
				[payloadKey]: response[payloadKey]
			})

			return response
		})
		.catch((err) => {
			alert(err.message)
		})
}

const getData = (path, params, actionType, payloadKey) => {
	return (dispatch) => APIManager
		.handleGet(path, params)
		.then((response) => {
			dispatch({
				type: actionType,
				params: params, // can be null
				[payloadKey]: response[payloadKey]
			})

			return response
		})
		.catch((err) => {
			alert(err.message)
		})
}

export default {

	register: (credentials) => {
		return dispatch => { // this needs to change:
			return dispatch(postData('/api/profile', credentials, constants.CURRENT_USER_RECIEVED, 'profile'))
		}
	},

	login: (credentials) => {
		return dispatch => { 
			return dispatch(postData('/account/login', credentials, constants.CURRENT_USER_RECIEVED, 'profile'))
		}
	},

	selectMenuItem: (item) => {
		return {
			type: constants.SELECT_MENU_ITEM,
			item: item
		}
	},

	currentUserReceived: (user) => {
		return {
			type: constants.CURRENT_USER_RECIEVED,
			user: user
		}
	},
	
	fetchCourses: (params) => {
		return dispatch => {
			return dispatch(getData('/api/course', params, constants.COURSES_RECEIVED, 'courses'))
		}
	},

	fetchTutorials: (params) => {
		return dispatch => {
			return dispatch(getData('/api/tutorial', params, constants.TUTORIALS_RECEIVED, 'tutorials'))
		}
	}

}