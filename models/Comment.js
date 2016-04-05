var mongoose = require('mongoose');


var CommentSchema = new mongoose.Schema({
	text: {type:String, trim:true, default:''},
	subject: {type:String, trim:true, default:''}, // id number of post comment refers to
	isInitial: {type:String, trim:true, default:'yes'},
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	thread: {type:String, trim:true, default:''},
	timestamp: {type:Date, default:Date.now},
});


CommentSchema.methods.summary = function() {
	var summary = {
		'profile':this.profile,
		'text':this.text,
		'isInitial':this.isInitial,
		'subject':this.subject,
		'thread':this.thread,
		'timestamp':this.timestamp,
		'id':this._id
	};
	
	return summary;
};



module.exports = mongoose.model('CommentSchema', CommentSchema);