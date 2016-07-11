"use strict";

var constants = require("../constants/constants");

var initialState = {
	posts: {},
	postsArray: [],
	emptyPost: {
		text: "",
		image: "",
		title: "",
		slug: "",
		date: null,
		profile: {
			name: ""
		}
	}
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	switch (action.type) {

		case constants.POST_CREATED:
			var newState = Object.assign({}, state);
			var post = action.post;
			newState.posts[post.id] = post;
			newState.postsArray.unshift(post);
			return newState;

		case constants.POSTS_RECIEVED:
			var newState = Object.assign({}, state);

			var c = action.posts;
			newState.postsArray = c;
			var postsMap = {};
			for (var i = 0; i < c.length; i++) {
				var post = c[i];
				postsMap[post.slug] = post // key posts by slug
				;
			}

			newState.posts = postsMap;
			//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState;

		case constants.POST_EDITED:
			var post = action.post;
			console.log("POST_EDITED: " + JSON.stringify(post));
			var newState = Object.assign({}, state);

			var postsMap = Object.assign({}, newState.posts);
			postsMap[post.slug] = post; // key posts by slug
			newState.posts = postsMap;

			return newState;

		default:
			return state;
	}
};