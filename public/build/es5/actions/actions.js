"use strict";

/*
This module contains action creators. They are functions which will return an object describing the actions.
These actions are imported by Redux-aware components who need them, in our case it is just Home.

https://github.com/krawaller/riastart2015
*/

var constants = require("../constants/constants");
var store = require("../stores/store");

module.exports = {
	reset: function () {
		// A normal action creator, returns a simple object describing the action.
		return {
			type: constants.RESET
		};
	},

	currentUserRecieved: function (user) {
		return {
			type: constants.CURRENT_USER_RECIEVED,
			currentUser: user
		};
	},

	updateCurrentUser: function (updatedUser) {
		console.log("updateCurrentUser: " + JSON.stringify(store));
		return {
			type: constants.UPDATE_CURRENT_USER,
			currentUser: updatedUser
		};
	},

	coursesRecieved: function (courses) {
		//		console.log('ACTIONS - coursesRecieved: '+JSON.stringify(courses));
		// A normal action creator, returns a simple object describing the action.
		return {
			type: constants.COURSES_RECIEVED,
			courses: courses
		};
	},

	courseRecieved: function (course) {
		return {
			type: constants.COURSE_RECIEVED,
			course: course
		};
	},

	postsRecieved: function (posts) {
		return {
			type: constants.POSTS_RECIEVED,
			posts: posts
		};
	},

	postCreated: function (post) {
		return {
			type: constants.POST_CREATED,
			post: post
		};
	},

	postEdited: function (editedPost) {
		return {
			type: constants.POST_EDITED,
			post: editedPost
		};
	},

	projectsRecieved: function (projects) {
		return {
			type: constants.PROJECTS_RECIEVED,
			projects: projects
		};
	},

	eventsRecieved: function (events) {
		return {
			type: constants.EVENTS_RECIEVED,
			events: events
		};
	},


	samplesRecieved: function (samples) {
		return {
			type: constants.SAMPLES_RECIEVED,
			samples: samples
		};
	},

	sampleCreated: function (sample) {
		return {
			type: constants.SAMPLE_CREATED,
			sample: sample
		};
	},

	unitReceived: function (unit) {
		return {
			type: constants.UNIT_RECEIVED,
			unit: unit
		};
	},

	tutorialsReceived: function (tutorials) {
		return {
			type: constants.TUTORIALS_RECIEVED,
			tutorials: tutorials
		};
	}

	// duckDown: function(who){
	// 	// here we take advantage of Redux-thunk; instead of returning an object describing an action,
	// 	// we return a function that takes dispatch and getState as arguments. This function can then
	// 	// invoke dispatch, now or later using setTimeout or similar.

	// 	return function(dispatch, getState){
	// 		dispatch({type:constants.DUCK_DOWN, coward:who});
	// 		setTimeout(function(){
	// 			dispatch({type:constants.STAND_UP, coward:who});
	// 		},2000);
	// 	}
	// },

	// aimAt: function(killer,victim){
	// 	// Another async action using the Redux-thunk syntax
	// 	return function(dispatch,getState){
	// 		dispatch({type:constants.AIM_AT, killer:killer, victim:victim});
	// 		setTimeout(function(){
	// 			dispatch({type:constants.KILL_HERO, killer:killer, victim:victim});
	// 		},2000);
	// 	};
	// }
};