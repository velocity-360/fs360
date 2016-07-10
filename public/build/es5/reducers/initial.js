"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// Reducers
var profileReducer = _interopRequire(require("../reducers/profile"));

var courseReducer = _interopRequire(require("../reducers/course"));

var postReducer = _interopRequire(require("../reducers/post"));

var eventReducer = _interopRequire(require("../reducers/event"));

var projectReducer = _interopRequire(require("../reducers/project"));

var staticReducer = _interopRequire(require("../reducers/static"));

module.exports = function () {
	var initialState = {
		profileReducer: {
			currentUser: {
				id: null,
				name: "",
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				tagString: "",
				accountType: "basic"
			}
		},
		courseReducer: {
			courses: {
				0: {
					title: "",
					description: "",
					syllabus: "",
					image: "",
					units: [],
					tuition: 0,
					deposit: 0,
					premiumTuition: 0
				}
			},
			courseArray: []
		},
		postReducer: {
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
		},
		projectReducer: {
			projects: {},
			projectsArray: [],
			emptyProject: {
				title: "",
				image: "",
				description: "",
				tags: [],
				units: [],
				profile: {
					name: ""
				}
			}
		},
		staticReducer: {
			loaderConfig: {
				lines: 13,
				length: 20,
				width: 10,
				radius: 30,
				corners: 1,
				rotate: 0,
				direction: 1,
				color: "#fff",
				speed: 1,
				trail: 60,
				shadow: false,
				hwaccel: false,
				zIndex: 2000000000,
				top: "50%",
				left: "50%",
				scale: 1
			}
		}

	};

	return initialState;
};