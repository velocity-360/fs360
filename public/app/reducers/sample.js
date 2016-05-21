var constants = require('../constants/constants');

var initialState = {
	samples: {

	},
	samplesArray: [],
	emptySample: {
		title: '',
		image: '',
		url: '',
		description: '',
		tags: [],
		profile: {
			name: '',
			image: '',
			id: null
		}		
	}
};


/* A reducer is a function that takes the current state and an action, and 
then returns a new state. This reducer is responsible for appState.heroes 
data. See `initialstate.js` for a clear view of what it looks like! */

export default function(state = initialState, action){
	switch (action.type) {

		case constants.SAMPLE_CREATED:
			var sample = action.sample

			var newState = Object.assign({}, state)
			var s = Object.assign({}, newState.samples)
			s[sample.id] = sample
			newState['samples'] = s

			var a = Object.assign([], newState.samplesArray)
			a.unshift(sample)
			newState['samplesArray'] = a

			return newState;

		case constants.SAMPLES_RECIEVED:
			var newState = Object.assign({}, state);

			var c = action.samples
			newState['samplesArray'] = c
			var samplesMap = {}
			for (var i=0; i<c.length; i++){
				var sample = c[i]
				samplesMap[sample.id] = sample
			}

			newState['samples'] = samplesMap
//			console.log('COURSE REDUCER - COURSES_RECIEVED: '+JSON.stringify(newState));
			return newState;

		default:
			return state;
	}

}