var mongoose = require('mongoose')

var TrackSchema = new mongoose.Schema({
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	pageMap: {type:mongoose.Schema.Types.Mixed, default:{}},
	history: {type:Array, default:[]},
	timestamp: {type:Date, default:Date.now}
})

TrackSchema.methods.summary = function() {
	var summary = {
		'profile':this.profile,
		'pageMap':this.pageMap,
		'history':this.hisotry,
		'timestamp':this.timestamp,
		'id':this._id
	}
	return summary
}

module.exports = mongoose.model('TrackSchema', TrackSchema)