var superagent = require('superagent')
var Promise = require('bluebird')

module.exports = {

	get: function(url, params){

		return new Promise(function(resolve, reject){
			superagent
			.get(url)
			.query(params)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (err){
					reject(err)
					return
				}

				resolve(response.body)
				// var data = {post:null}
				// if (err == null){
				// 	// console.log('POST: '+JSON.stringify(response.body))
				// 	data['post'] = response.body.results[0]
				// }

			 //    res.render('post', data)
			})
		})
	},

	post: function(url, body){

		return new Promise(function(resolve, reject){
			superagent
			.post(url)
			.send(body)
			.set('Accept', 'application/json')
			.end(function(err, response){
				if (err){
					reject(err)
					return
				}

				resolve(response)
			})
		})
	}

}