import api from '../utils/APIManager'

export default {
	currentPage: {
		page: '',
		slug: '',
		params: {}
	},

	updateTracking: (callback) => {
		console.log('UPDATE TRACKING: '+JSON.stringify(this.currentPage))
		api.handlePost('/tracker', this.currentPage, (err, response) => {
			if (err){
				callback(err, null)
				return
			}

			callback(null, response)
		})
	}
}