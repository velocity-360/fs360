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
		staticReducer: {
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
			}
		}		

	}

	return initialState
}