import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// Add middleware to createStore
//var createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// App Reducers
import profileReducer from '../reducers/profile'
import courseReducer from '../reducers/course'
import staticReducer from '../reducers/static'

// Combine Reducers
var reducers = combineReducers({
    profileReducer: profileReducer,
    courseReducer: courseReducer,
    staticReducer: staticReducer,
});

// Create Store
var store = createStore(
    reducers,
    applyMiddleware(thunk) // Add middleware to createStore
);


export default store;
