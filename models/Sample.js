var mongoose = require('mongoose')

var SampleSchema = new mongoose.Schema({
	title: {type:String, trim:true, default:''},
	url: {type:String, trim:true, default:''},
	video: {type:String, trim:true, default:''},
	title: {type:String, lowercase:true, default:''},
	timestamp: {type:Date, default: Date.now}
})

module.exports = mongoose.model('SampleSchema', SampleSchema)