import api from '../utils/APIManager'

let instance = null

class TrackingManager {
	constructor(props, context){
        if (instance == null) // singelton
            instance = this

		this.updateTracking = this.updateTracking.bind(this)
		this.setCurrentPage = this.setCurrentPage.bind(this)
		this.currentPage = {
			page: '',
			slug: '',
			params: {}
		}

		return instance
	}

	setCurrentPage(pageInfo){
//		console.log('SET CURRENT PAGE: '+JSON.stringify(pageInfo))
		this.currentPage = pageInfo
	}

	updateTracking(callback){
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

export default TrackingManager

// export default {
// 	currentPage: {
// 		page: '',
// 		slug: '',
// 		params: {}
// 	},

// 	updateTracking: (callback) => {
// 		console.log('UPDATE TRACKING: '+JSON.stringify(this.currentPage))
// 		api.handlePost('/tracker', this.currentPage, (err, response) => {
// 			if (err){
// 				callback(err, null)
// 				return
// 			}

// 			callback(null, response)
// 		})
// 	}
// }