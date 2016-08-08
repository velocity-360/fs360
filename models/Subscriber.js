var mongoose = require('mongoose')

var SubscriberSchema = new mongoose.Schema({
	name: {type:String, trim:true, default:''},
	email: {type:String, trim:true, default:''},
	survey: {type:Array, default:[]},
	workshop: {type:String, trim:true, lowercase:true, default:''},
	timestamp: {type:Date, default:Date.now},
})

SubscriberSchema.methods.summary = function() {
	var summary = {
		'name':this.name,
		'email':this.email,
		'survey':this.survey,
		'workshop':this.workshop,
		'timestamp':this.timestamp,
		'id':this._id
	}
	return summary
}

module.exports = mongoose.model('SubscriberSchema', SubscriberSchema)