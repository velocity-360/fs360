var mongoose = require('mongoose')

var TutorialSchema = new mongoose.Schema({
	title: {type:String, trim:true, default:''},
	status: {type:String, trim:true, default: 'coming soon'}, // live or coming soon
	isFeatured: {type:String, default:'no'},
	description: {type:String, trim:true, default: ''},
	image: {type:String, trim:true, default: 'tHyPScSk'}, // blue logo
	wistia: {type:String, lowercase:true, trim:true, default:''},
	slug: {type:String, lowercase:true, trim:true, default:''},
	link: {type:String, trim:true, lowercase:true, default:''},
	subscribers: {type:Array, default:[]},
	youtube: {type:Array, default: []}, // free clips on youtubd
	posts: {type:Array, default: []}, // blog posts for tutorial series. the 'isPublic' property should be 'no' for these
	price: {type:Number, default: 0},
	priority: {type:Number, default: 100},
	timestamp: {type:Date, default:Date.now}
})

TutorialSchema.methods.summary = function() {
	var summary = {
		'title':this.title,
		'status':this.status,
		'isFeatured':this.isFeatured,
		'description':this.description,
		'image':this.image,
		'wistia':this.wistia,
		'slug':this.slug,
		'link':this.link,
		'subscribers':this.subscribers,
		'youtube':this.youtube,
		'posts':this.posts,
		'price':this.price,
		'priority':this.priority,
		'timestamp':this.timestamp,
		'schema':'tutorial',
		'id':this._id
	};
	return summary
}

module.exports = mongoose.model('TutorialSchema', TutorialSchema)