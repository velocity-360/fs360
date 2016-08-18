var mongoose = require('mongoose')

var TutorialSchema = new mongoose.Schema({
	title: {type:String, trim:true, default: ''},
	description: {type:String, trim:true, default: ''},
	image: {type:String, trim:true, default: 'tHyPScSk'}, // blue logo
	slug: {type:String, lowercase:true, trim:true, default:''},
	link: {type:String, trim:true, lowercase:true, default:''},
	posts: {type:Array, default: []}, // blog posts for tutorial series. the 'isPublic' property should be 'no' for these
	timestamp: {type:Date, default:Date.now}
})

TutorialSchema.methods.summary = function() {
	var summary = {
		'title':this.title,
		'description':this.description,
		'image':this.image,
		'slug':this.slug,
		'link':this.link,
		'posts':this.posts,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary
}

module.exports = mongoose.model('TutorialSchema', TutorialSchema)