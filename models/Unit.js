var mongoose = require('mongoose');

var UnitSchema = new mongoose.Schema({
	title: {type:String, trim:true, default: ''},
	description: {type:String, trim:true, default: ''},
	image: {type:String, trim:true, default: 'tHyPScSk'}, // blue logo
	slug: {type:String, lowercase:true, trim:true, default:''},
	link: {type:String, trim:true, lowercase:true, default:''},
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	timestamp: {type:Date, default:Date.now}
});

UnitSchema.methods.summary = function() {
	var summary = {
		'title':this.title,
		'image':this.image,
		'profile':this.profile,
		'text':this.text,
		'slug':this.slug,
		'description':this.description,
		'link':this.link,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('UnitSchema', UnitSchema);