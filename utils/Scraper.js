var cheerio = require('cheerio')
var superagent = require('superagent')
var Promise = require('bluebird')

module.exports = {

	scrape: function(url, props){
		return new Promise(function (resolve, reject){
			superagent
			.get(url)
			.query(null)
			.set('Accept', 'text/html')
			.end(function(err, response){
				if (err){
					reject(err)
					return
				}

				var metaData = {}
				$ = cheerio.load(response.text)
			    $('meta').each(function(i, meta) {
			    	if (meta.attribs != null){
			    		var attribs = meta.attribs
				    	if (attribs.property != null){
					    	var prop = attribs.property
					    	if (props.indexOf(prop) != -1){
								var key = prop.replace('og:', '')
						    	metaData[key] = attribs.content
					    	}
				    	}
			    	}
			    })

			    console.log(JSON.stringify(metaData))
				resolve(metaData)
			})
		})
	}

}