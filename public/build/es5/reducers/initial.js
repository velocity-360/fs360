"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// Reducers
var profileReducer = _interopRequire(require("../reducers/profile"));

var courseReducer = _interopRequire(require("../reducers/course"));

var tutorialReducer = _interopRequire(require("../reducers/tutorial"));

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
		tutorialReducer: {
			tutorials: {},
			tutorialArray: []
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
		eventReducer: {
			events: {},
			eventArray: []
		},
		staticReducer: {
			banners: ["hackathon.jpg", "hacking-2.jpg", "girl.jpg"],
			instructors: [{ name: "Dan Kwon", image: "kwon.png", tags: ["Node JS", "React", "React Native", "Angular JS", "iOS", "Swift", "Objective C"], bio: "Dan is a full stack developer focusing on building MVPs for early stage startups in New York. As a consultant, he has worked with several startups and development agencies over a five year span. Dan specializes in iOS, backend technologies such as Node JS, Google Compute Engine, Heroku, and AWS as well as front end libraries such as React and Angular JS. Dan graduated from Cornell University where he walked to class in the snow, uphill both ways." }, { name: "Roger Beaman", image: "beaman.png", tags: ["Node JS", "React", "Angular JS", "JQuery"], bio: "Roger Beaman is a passionate Fullstack JavaScript developer that took the unusual route to software development which perhaps you are on right now. He started work in finance and found that writing Excel formulas was by far the most exciting part of his job. Thus began a journey to joining you in the exciting career that is software development. In under a year he was able to go from a bootcamp to a lead developer at Shutterstock and he is excited about sharing the knowledge and advice he has to help you do the same." }, { name: "Anna Garcia", image: "anna.png", tags: ["Node JS", "React", "Angular JS", "JQuery"], bio: "A recent graduate of the Grace Hopper coding school for women, Anna is a life-long tech enthusiast, musician, and fitness fanatic. Founder of the original JuiceCrawl (http://www.juicecrawl.com), Anna explored technology and programming on her own before deciding to make it her career in 2015. With a  background in Node, Express, Angular, and SQL, Anna will be helping out as a teaching assistant for several courses." }],
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
			},
			faq: {
				general: [{ question: "Why React, React Native & Node?", answer: "Simply put, React with Node is the most demanded tech stack today among startups and leading tech companies like Facebook and AirBnB. React with Node brings powerful component-based architecture to the web, all under a single language. According to  StackOverflow’s <a target=\"_blank\" href=\"http://stackoverflow.com/research/developer-survey-2016\">2016 Developer Survey</a>, React is the Top Trending Tech by a large margin. Ruby on Rails is not even in the <a target=\"_blank\" href=\"http://stackoverflow.com/research/developer-survey-2016#technology-top-paying-tech\">Top Paying Tech</a> list, yet React is. The data speaks for itself. Check out our <a href=\"https://www.velocity360.io/post/starting-out-today/\">blog post</a>." }, { question: "How much programming experience do I need?", answer: "There is no minimum experience required. We do not admit based on prior knowledge. but rather ability to learn in a fast-paced environment. For example, we’d gladly admit a student who recently began learning Python but shows a propensity for development over someone who learned Java 5+ years ago but struggles with learning anything new." }, { question: "Are instructors available beyond course hours?", answer: "Yes - our instructors hold weekly office hours to address any bugs. Due to the small and intimate class sizes instructors will often make themselves available before or after a session to help students with any material." }, { question: "Cancellation Policy", answer: "Your deposit is refundable until the course begins. Before the halfway point, 50% tuition (minus your deposit) is refundable. No refunds are permitted beyond the halfway point of the course." }, { question: "What is a typical class size?", answer: "A typical class size is 7. Due to space limitations, no class will exceed 10 people. Our intimate classes enable instructors to give each student ample attention and assistance." }, { question: "Mac or PC?", answer: "Either one is acceptable, however a Mac will be easier and is preferred. Instructors will use a Mac." }, { question: "What is the teaching style?", answer: "We teach practical coding, not algorithms and theory. We do NOT show videos, give long lectures or require a vocab list." }, { question: "Will I have a project to show by the course’s end?", answer: "Yes, and likely more than one. We encourage you to post them to your Github." }]
			}
		}

	};

	return initialState;
};