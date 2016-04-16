import superagent from 'superagent'
import fetch from 'isomorphic-fetch'
import actions from '../actions/actions'
import store from '../stores/store'

export default {

	handleGet: function(endpoint, params, completion){

		superagent
		.get(endpoint)
		.query(params)
		.set('Accept', 'application/json')
		.end(function(err, res){
			if (err){ 
				if (completion != null)
					completion(err, null)
				return
			}

			if (completion != null){
				if (res.body.confirmation == 'success'){
		    		completion(null, res.body)
				}
				else {
		    		completion({message:res.body.message}, null)
				}
			}
		});

		// fetch(endpoint, {
		//     method: 'GET',
		//     headers: {
		//         'Accept': 'application/json',
		//         'Content-Type': 'application/json'
		//     },
		// })
		// .then(response => response.json())
		// .then(function(json){
	 //    	if (completion != null){
	 //    		if (json.confirmation == 'success')
		//     		completion(null, json)
	 //    		else
		//     		completion({message: json.message}, null)
	 //    	}
		// })
		// .catch(function(err){
	 //    	if (completion != null)
	 //    		completion(err, null)

		// })
	},

	// using superagent here because for some reason, cookies don't get installed using fetch (wtf)
	handlePost: function(endpoint, body, completion){
		superagent
		.post(endpoint)
		.send(body)
		.set('Accept', 'application/json')
		.end(function(err, res){
			if (err){ 
				if (completion != null)
					completion(err, null)
			}
			else { 
				if (completion != null)
		    		completion(null, res.body)
			}
		});
	}

	// handlePost: function(endpoint, body, completion){
	//     fetch(endpoint, {
	//         method: 'POST',
	//         headers: {
	// 	        'Accept': 'application/json',
	// 	        'Content-Type': 'application/json'
	//         },
	//         body: JSON.stringify(body),
	//     })
	//     .then(response => response.json())
	//     .then(function(json){
	//     	if (completion != null){
	//     		if (json.confirmation == 'success')
	// 	    		completion(null, json)
	//     		else
	// 	    		completion({message: json.message}, null)
	//     	}
	    	
	//     })
	//     .catch(function(err){
	    	// if (completion != null)
	    	// 	completion(err, null)
	    	
	//     })
	// }



}