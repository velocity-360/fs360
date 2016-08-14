"use strict";

var constants = require("../constants/constants");

var initialState = {
	testimonials: [{ name: "Brian Correa", image: "briancorrea.jpg", course: "iOS Intensive", quote: "On the first day of class my instructor taught me more than I taught myself in the three weeks. I immediately knew I made the right choice to learn iOS with Velocity. The hands-on structure of the class is the best use of my time and prevents me from wasting time trying to get one thing off the ground. Instead, I was immediately building projects.  I am confident that after the Velocity class, my skill-set will be appealing to companies looking to hire a junior developer." },
	// {name:'Jeff Abraham', image:'jeffabraham.jpg', course:'iOS Intensive', quote:"I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team"}
	// {name:'Mike Maloney', image:'mikemaloney.jpg', course:'Web Development', quote:"After 20 years on Broadway, I was skeptical if the Velocity class would work for me. However I quickly realized that Velocity was exactly what I needed. We spent practically the entire day coding from the minute I walked into class every morning.  I started with the full-time Web intensive class and I am now in the middle of taking an iOS class. What separates Velocity is that I learn only very relevant technologies that will be useful in the near future.  When you stumble down the rabbit hole, the instructor guides you but does not hold your hand.  Lastly, the culture at Velocity is hard to match, with its offices being centrally located at WeWork, and the great collaborative environment between both the students and instructors."},
	{ name: "Jennifer Lin", image: "jenn.jpg", course: "Web Intensive", quote: "I took the Web Development course which was highly technical yet relaxing at the same time. Their team's over-the-shoulder help maximized the session for everyone. If we were on our own, most of our time would be spent debugging and making minor steps forwards. At the workshop, we were not debugging, we were creating real world projects. Stop debugging, Join the FullStack 360 Team" }],
	banners: ["hackathon.jpg", "hacking-2.jpg", "girl.jpg"],
	faq: {
		highschool: [{ question: "Will I Have Fun?", answer: "Coding doesn’t have to be boring, although we wont be developing games, you will know how to create apps similar to, Snapchat, and YikYak.  Also, besides spending your day coding, we are going to have weekly hackothons, start up brainstorming and debate lunches, and at the end of the program we will have a coding competition." }, { question: "I don’t have a lot of experience coding - can I still take your summer class?", answer: "Of course!  Velocity High school summer program is designed with students that have limited experience in mind.  If you have some knowledge of coding, that is great! But if not that does not mean we cannot teach you." }, { question: "Is there a screening process?", answer: "We look to see that students are driven individuals, as well as what classes you are enrolled in, as well as other interests you have outside of school.  This is designed to ensure that no students enroll in a class that they are not ready and able to succeed in." }, { question: "Who are the instructors for the summer classes?", answer: "All of our instructors have worked in the technology field and have developed countless projects both big and small some which you probably have used! (insert examples of projects dan and dan have worked on)  Our instructors want to teach the next generation of programmers the most efficient and effective way to develop. All of our instructors are extremely qualified to teach you how to become a developer.  Because we are all working professionals we only teach you highly relevant information not theoretical information, we are not academics we are coders!" }, { question: "Will this class help me get into college?  What about an internship in the future?", answer: "Yes, I am glad you asked.  Velocity Summer program will make all high school students a very attractive candidate for top colleges.  We can confidently say this because we know that Colleges want the next Steve Jobs, Mark Zuckerberg, Evan Spiegel (Snapchat), or Jack Dorsey (Twitter), to go to their college.  This makes college admissions officers constantly looking for students who know how to develop apps and websites. If your goal is to get an internship with exciting startups such as Uber or Instagram, learning how to code at Velocity is the perfect first step to take. Technology startups and giants such as Google and Apple all look for interns that have familiarity with code and have spent time developing.  After 2 weeks at Velocity you will be able to say, that you can build a project from scratch, which will impress any company while looking at a high schoolers or freshman in college resume." }, { question: "Where is the Summer Program for Velocity?", answer: "Our location is <a target=\"_blank\" href=\"https://www.wework.com/locations/new-york-city/nomad\">WeWork</a> which is an exciting environment for all the students in the summer program.  WeWork is home to about 500 exciting companies and startups! This directly lends itself to help you understand what the daily life of working at a startup is like, because you will be around aot of employs at a wide variety of startups.  This creates a fun and exciting culture in the workshops.  WeWork has plenty of great areas to work and collaborate, debate, and enjoy your fellow students.  Also while you are attending the class at Velocity you will be able to take advantage of the great programming and networking opportunities WeWork organizes including socials, events hosted by companies, as well as interested speakers and presentations." }],
		general: [{ question: "How much programming experience do I need?", answer: "There is no minimum experience required. We do not admit based on prior knowledge. but rather ability to learn in a fast-paced environment. For example, we’d gladly admit a student who recently began learning Python but shows a propensity for development over someone who learned Java 5+ years ago but struggles with learning anything new." }, { question: "Are instructors available beyond course hours?", answer: "Yes - our instructors hold weekly office hours to address any bugs. Due to the small and intimate class sizes instructors will often make themselves available before or after a session to help students with any material." }, { question: "Cancellation Policy", answer: "Your deposit is refundable until the course begins. Before the halfway point, 50% tuition (minus your deposit) is refundable. No refunds are permitted beyond the halfway point of the course." }, { question: "What is a typical class size?", answer: "A typical class size is 7. Due to space limitations, no class will exceed 10 people. Our intimate classes enable instructors to give each student ample attention and assistance." }, { question: "Mac or PC?", answer: "Either one is acceptable, however a Mac will be easier and is preferred. Instructors will use a Mac." }]
	},
	isLoading: true,
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
};

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.heroes data.
See `initialstate.js` for a clear view of what it looks like!
*/

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];


	switch (action.type) {

		// case constants.UPDATE_CURRENT_USER:
		// 	var newState = Object.assign({}, state);
		// 	newState['currentUser'] = action.currentUser;
		// 	console.log('PROFILE REDUCER - updateCurrentUser: '+JSON.stringify(newState));
		// 	return newState;

		default:
			return state;
	}
};