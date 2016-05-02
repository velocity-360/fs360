var mongoose = require('mongoose');


var ProjectSchema = new mongoose.Schema({
	title: {type:String, trim:true, default: ''},
	description: {type:String, trim:true, default: ''},
	image: {type:String, trim:true, default: 'tHyPScSk'}, // blue logo
	slug: {type:String, lowercase:true, trim:true, default:''},
	repo: {type:String, lowercase:true, trim:true, default:''},
	link: {type:String, trim:true, lowercase:true, default:''},
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	tags: {type: Array, default:[]}, // tech used
	milestones: {type: Array, default:[]},
	timestamp: {type:Date, default:Date.now},
});


ProjectSchema.methods.summary = function() {
	var summary = {
		'title':this.title,
		'description':this.description,
		'image':this.image,
		'profile':this.profile,
		'slug':this.slug,
		'repo':this.repo,
		'link':this.link,
		'tags':this.tags,
		'milestones':this.milestones,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};

module.exports = mongoose.model('ProjectSchema', ProjectSchema);