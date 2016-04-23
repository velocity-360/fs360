var mongoose = require('mongoose');


var EventSchema = new mongoose.Schema({
	title: {type:String, trim:true, default: ''},
	date: {type:String, trim:true, default: ''},
	time: {type:String, trim:true, default: ''},
	address: {type:String, trim:true, default: ''},
	description: {type:String, trim:true, default: ''},
	image: {type:String, trim:true, default: 'tHyPScSk'}, // blue logo
	slug: {type:String, lowercase:true, trim:true, default:''},
	link: {type:String, trim:true, lowercase:true, default:''},
	priority: {type:Number, default:0},
	timestamp: {type:Date, default:Date.now},
});


EventSchema.methods.summary = function(type) {
	var summary = {
		'title':this.title,
		'date':this.date,
		'time':this.time,
		'address':this.address,
		'description':this.description,
		'image':this.image,
		'slug':this.slug,
		'link':this.link,
		'priority':this.priority,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};


module.exports = mongoose.model('EventSchema', EventSchema);


