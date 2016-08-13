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
		eventReducer: {
			events: {},
			eventArray: []
		},
		staticReducer: {
			banners: ["hackathon.jpg", "hacking-2.jpg", "girl.jpg"],
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
				general: [{ question: "I don’t have a lot of experience coding - can I still take a class?", answer: "Of course!  Velocity programs are designed with students that have limited experience in mind.  If you have some knowledge of coding, that is great! But if not that does not mean we cannot teach you." }, { question: "Is there a screening process?", answer: "We look to see that students are driven individuals, as well as what classes you are enrolled in, as well as other interests you have outside of school.  This is designed to ensure that no students enroll in a class that they are not ready and able to succeed in." }, { question: "Who are the instructors?", answer: "All of our instructors have worked in the technology field and have developed countless projects both big and small some which you probably have used! (insert examples of projects dan and dan have worked on)  Our instructors want to teach the next generation of programmers the most efficient and effective way to develop. All of our instructors are extremely qualified to teach you how to become a developer.  Because we are all working professionals we only teach you highly relevant information not theoretical information, we are not academics we are coders!" }, { question: "Will this class help me get a job or an internship?", answer: "Yes, I am glad you asked.  Velocity Summer program will make all high school students a very attractive candidate for top colleges.  We can confidently say this because we know that Colleges want the next Steve Jobs, Mark Zuckerberg, Evan Spiegel (Snapchat), or Jack Dorsey (Twitter), to go to their college.  This makes college admissions officers constantly looking for students who know how to develop apps and websites. If your goal is to get an internship with exciting startups such as Uber or Instagram, learning how to code at Velocity is the perfect first step to take. Technology startups and giants such as Google and Apple all look for interns that have familiarity with code and have spent time developing.  After 2 weeks at Velocity you will be able to say, that you can build a project from scratch, which will impress any company while looking at a high schoolers or freshman in college resume." }, { question: "Where is Velocity located?", answer: "Our location is <a target=\"_blank\" href=\"https://www.wework.com/locations/new-york-city/nomad\">WeWork</a> which is an exciting environment for all the students in the summer program.  WeWork is home to about 500 exciting companies and startups! This directly lends itself to help you understand what the daily life of working at a startup is like, because you will be around aot of employs at a wide variety of startups.  This creates a fun and exciting culture in the workshops.  WeWork has plenty of great areas to work and collaborate, debate, and enjoy your fellow students.  Also while you are attending the class at Velocity you will be able to take advantage of the great programming and networking opportunities WeWork organizes including socials, events hosted by companies, as well as interested speakers and presentations." }]
			}
		}

	};

	return initialState;
};