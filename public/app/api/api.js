import fetch from 'isomorphic-fetch'
import actions from '../actions/actions'
import store from '../stores/store'

export default {

	handleGet: function(endpoint, params){

		fetch(endpoint, {
		    method: 'GET',
//		    URLSearchParams: params,
		    header: {
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		    },
		})
		.then(response => response.json())
		.then(json => store.dispatch(actions.coursesRecieved(json.courses)))
		.catch( err => console.log(err) )

	}

}