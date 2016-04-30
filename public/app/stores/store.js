import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// Add middleware to createStore
//var createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// App Reducers
import profileReducer from '../reducers/profile'
import courseReducer from '../reducers/course'
import postReducer from '../reducers/post'
import eventReducer from '../reducers/event'
import projectReducer from '../reducers/project'
import staticReducer from '../reducers/static'

// Combine Reducers
var reducers = combineReducers({
    profileReducer: profileReducer,
    courseReducer: courseReducer,
    postReducer: postReducer,
    eventReducer: eventReducer,
    staticReducer: staticReducer,
    projectReducer: projectReducer,
});

// Create Store
var store = createStore(
    reducers,
    applyMiddleware(thunk) // Add middleware to createStore
);


export default store;
