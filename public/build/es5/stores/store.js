"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var applyMiddleware = _redux.applyMiddleware;
var combineReducers = _redux.combineReducers;
var thunk = _interopRequire(require("redux-thunk"));

// Add middleware to createStore
//var createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

// App Reducers
var profileReducer = _interopRequire(require("../reducers/profile"));

var courseReducer = _interopRequire(require("../reducers/course"));

var postReducer = _interopRequire(require("../reducers/post"));

var eventReducer = _interopRequire(require("../reducers/event"));

var projectReducer = _interopRequire(require("../reducers/project"));

var staticReducer = _interopRequire(require("../reducers/static"));

// Combine Reducers
var reducers = combineReducers({
    profileReducer: profileReducer,
    courseReducer: courseReducer,
    postReducer: postReducer,
    eventReducer: eventReducer,
    staticReducer: staticReducer,
    projectReducer: projectReducer
});

// Create Store
var store = createStore(reducers, applyMiddleware(thunk) // Add middleware to createStore
);


module.exports = store;