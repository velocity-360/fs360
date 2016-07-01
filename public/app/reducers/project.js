var constants = require('../constants/constants')

var initialState = {
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
}


/* A reducer is a function that takes the current state and an action, and 
then returns a new state. This reducer is responsible for appState.heroes 
data. See `initialstate.js` for a clear view of what it looks like! */


export default function(state = initialState, action){
	switch (action.type) {

		case constants.PROJECT_CREATED:
			var newState = Object.assign({}, state)
			var project = action.project
			newState.projects[project.id] = project
			newState.projectsArray.unshift(project)
			return newState

		case constants.PROJECTS_RECIEVED:
			var newState = Object.assign({}, state)

			var c = action.projects
			newState['projectsArray'] = c
			var projectsMap = {}
			for (var i=0; i<c.length; i++){
				var project = c[i]
				projectsMap[project.id] = project
			}

			newState['projects'] = projectsMap
//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState))
			return newState

		default:
			return state
	}

}