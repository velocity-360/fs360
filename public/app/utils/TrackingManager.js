import api from '../utils/APIManager'

export default {
	currentPage: {
		page: '',
		slug: '',
		params: {}
	},

	updateTracking: function(callback){
		api.handlePost('/tracker', this.currentPage, (err, response) => {
			if (err){
				callback(err, null)
				return
			}

			callback(null, response)
		})
	}



}