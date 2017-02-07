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
			dispatch({
				type: constants.TOGGLE_LOADING,
				isLoading: false
			})
			throw err
//			alert(err.message)
		})
}

const getData = (path, params, actionType, payloadKey) => {
	return (dispatch) => APIManager
		.handleGet(path, params)
		.then((response) => {
//			console.log('GET: '+JSON.stringify(response))
			dispatch({
				type: actionType,
				params: params, // can be null
				[payloadKey]: response[payloadKey]
			})

			return response
		})
		.catch((err) => {
			console.log('ERROR: '+JSON.stringify(err))
			dispatch({
				type: constants.TOGGLE_LOADING,
				isLoading: false
			})

			throw err
			// alert(err.message)
		})
}

const putData = (path, data, actionType, payloadKey) => {
	return (dispatch) => APIManager
		.handlePut(path, data)
		.then((response) => {
//			console.log('RESPONSE: '+JSON.stringify(response[payloadKey]))
			dispatch({
				type: actionType,
				[payloadKey]: response[payloadKey]
			})

			return response
		})
		.catch((err) => {
			dispatch({
				type: constants.TOGGLE_LOADING,
				isLoading: false
			})
			throw err
			// alert('ERROR: '+JSON.stringify(err))
		})
}

const submitStripeCharge = (token, product) => {
	return (dispatch) => APIManager
		.submitStripeCharge(token, product)
		.then((response) => { // returns profile and product
			console.log('SUBMIT STRIPE CHARGE: '+JSON.stringify(response))
			dispatch({
				type: constants.CURRENT_USER_RECIEVED,
				profile: response.profile
			})
			return response
		})
		.then((response) => {
			dispatch({ // TODO: make this conditional based on product purchased:
				type: constants.TUTORIAL_UPDATED,
				tutorial: response.tutorial
			})
			return response
		})
		.catch((err) => {
			alert(err.message)
		})
}

const submitStripeCard = (token) => {
	return (dispatch) => APIManager
		.submitStripeCard(token)
		.then((response) => { // returns profile and product
//			console.log('SUBMIT STRIPE CARD: '+JSON.stringify(response))
			dispatch({
				type: constants.CURRENT_USER_RECIEVED,
				profile: response.profile
			})

			return response
		})
		.catch((err) => {
			alert(err.message)
		})
}

export default {
	toggleLoading: (isLoading) => {
		return {
			type: constants.TOGGLE_LOADING,
			isLoading: isLoading
		}
	},

	register: (credentials) => {
		return dispatch => {
			dispatch({
				type: constants.TOGGLE_LOADING,
				isLoading: true
			})
			return dispatch(postData('/api/profile', credentials, constants.CURRENT_USER_RECIEVED, 'profile'))
		}
	},

	login: (credentials) => {
		return dispatch => { 
			dispatch({
				type: constants.TOGGLE_LOADING,
				isLoading: true
			})			
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
	},

	submitStripeCharge: (token, product) => {
		return dispatch => {
			return dispatch(submitStripeCharge(token, product))
		}
	},

	submitStripeCard: (token) => {
		return dispatch => {
			return dispatch(submitStripeCard(token))
		}
	},

	updateTutorial: (tutorial, params) => {
		return dispatch => {
			return dispatch(putData('/api/tutorial/'+tutorial.id, params, constants.TUTORIAL_UPDATED, 'tutorial'))
		}
	}

}