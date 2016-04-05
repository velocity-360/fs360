import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// Add middleware to createStore
//var createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// App Reducers
import profileReducer from '../reducers/profile'
import courseReducer from '../reducers/course'

// Combine Reducers
var reducers = combineReducers({
    profileReducer: profileReducer,
    courseReducer: courseReducer,
    // more...
});

// Create Store
var store = createStore(
    reducers,
    applyMiddleware(thunk) // Add middleware to createStore
);


export default store;
