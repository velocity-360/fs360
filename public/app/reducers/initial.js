// Reducers
import profileReducer from '../reducers/profile'
import courseReducer from '../reducers/course'
import postReducer from '../reducers/post'
import eventReducer from '../reducers/event'
import projectReducer from '../reducers/project'
import staticReducer from '../reducers/static'

export default function() {

	var initialState = {
		profileReducer: {
			currentUser: {
				id: null,
				name: '',
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				tagString: '',
				accountType:'basic'
			}
		},
		courseReducer: {
			courses: {
				0:{
					title:'',
					description:'',
					syllabus: '',
					image: '',
					units:[],
					tuition: 0,
					deposit: 0,
					premiumTuition: 0
				}
			},
			courseArray: []
		},
		postReducer: {
			posts: {

			},
			postsArray: [],
			emptyPost: {
				text: '',
				image: '',
				title: '',
				slug: '',
				date: null,
				profile: {
					name: ''
				}
			}
		},
		projectReducer: {
			projects: {

			},
			projectsArray: [],
			emptyProject: {
				title: '',
				image: '',
				description: '',
				tags: [],
				units: [],
				profile: {
					name: ''
				}		
			}			
		},
		eventReducer:{
			events: { },
			eventArray: []
		},
		staticReducer: {
			banners:[
				'hackathon.jpg',
				'hacking-2.jpg',
				'girl.jpg'
			],			
			loaderConfig: {
			    lines: 13,
			    length: 20,
			    width: 10,
			    radius: 30,
			    corners: 1,
			    rotate: 0,
			    direction: 1,
			    color: '#fff',
			    speed: 1,
			    trail: 60,
			    shadow: false,
			    hwaccel: false,
			    zIndex: 2e9,
			    top: '50%',
			    left: '50%',
			    scale: 1.00
			},
			faq: {
				general: [
					{question:'Why React, React Native & Node?', answer:'Simply put, React with Node is the most demanded tech stack today among startups and leading tech companies like Facebook and AirBnB. React with Node brings powerful component-based architecture to the web, all under a single language. According to  StackOverlow’s <a target="_blank" href="http://stackoverflow.com/research/developer-survey-2016">2016 Developer Survey</a>, React is the Top Trending Tech by a large margin. Ruby on Rails is not even in the <a target="_blank" href="http://stackoverflow.com/research/developer-survey-2016#technology-top-paying-tech">Top Paying Tech</a> list, yet React is. The data speaks for itself. Check out our <a href="https://www.velocity360.io/post/starting-out-today/">blog post</a>.'},
					{question:'How much programming experience do I need?', answer:'There is no minimum experience required. We do not admit based on prior knowledge. but rather ability to learn in a fast-paced environment. For example, we’d gladly admit a student who recently began learning Python but shows a propensity for development over someone who learned Java 5+ years ago but struggles with learning anything new.'},
					{question:'Are instructors available beyond course hours?', answer:'Yes - our instructors hold weekly office hours to address any bugs. Due to the small and intimate class sizes instructors will often make themselves available before or after a session to help students with any material.'},
					{question:'Cancellation Policy', answer:'Your deposit is refundable until the course begins. Before the halfway point, 50% tuition (minus your deposit) is refundable. No refunds are permitted beyond the halfway point of the course.'},
					{question:'What is a typical class size?', answer:'A typical class size is 7. Due to space limitations, no class will exceed 10 people. Our intimate classes enable instructors to give each student ample attention and assistance.'},
					{question:'Mac or PC?', answer:'Either one is acceptable, however a Mac will be easier and is preferred. Instructors will use a Mac.'},
					{question:'What is the teaching style?', answer:'We teach practical coding, not algorithms and theory. We do NOT show videos, give long lectures or require a vocab list.'},
					{question:'Will I have a project to show by the course’s end?', answer:'Yes, and likely more than one. We encourage you to post them to your Github.'}
				]
			}
		}		

	}

	return initialState
}