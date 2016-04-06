import fetch from 'isomorphic-fetch'
import actions from '../actions/actions'
import store from '../stores/store'

export default {

	handleGet: function(endpoint, params){

		fetch(endpoint, {
		    method: 'GET',
//		    URLSearchParams: params,
		    headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		    },
		})
		.then(response => response.json())
		.then(json => store.dispatch(actions.coursesRecieved(json.courses)))
		.catch( err => console.log(err) )
	},

	handlePost: function(endpoint, body){
		console.log('HANDLE POST: '+JSON.stringify(body));
	    fetch(endpoint, {
	        method: 'POST',
	        headers: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(body),
	    })
	    .then(response => response.json())
	    // .then( json => dispatch( login( json ) ))
	    .then( json => console.log(JSON.stringify(json)))
	    .catch( err => console.log(err) )
	}



}