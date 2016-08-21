import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// App Reducers
import profileReducer from '../reducers/profile'
import courseReducer from '../reducers/course'
import tutorialReducer from '../reducers/tutorial'
import postReducer from '../reducers/post'
import eventReducer from '../reducers/event'
import projectReducer from '../reducers/project'
import staticReducer from '../reducers/static'


var store
export default {

	configureStore: function(initialState){
		// Combine Reducers
		var reducers = combineReducers({
		    profileReducer: profileReducer,
		    courseReducer: courseReducer,
		    tutorialReducer: tutorialReducer,
		    postReducer: postReducer,
		    eventReducer: eventReducer,
		    staticReducer: staticReducer,
		    projectReducer: projectReducer
		})

		// Create Store
		store = createStore(
		    reducers,
		    initialState,
		    applyMiddleware(thunk) // Add middleware to createStore
		)

		return store
	},

	currentStore: function(){
		return store
	}

}







