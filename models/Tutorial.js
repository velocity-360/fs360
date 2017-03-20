var mongoose = require('mongoose')

var TutorialSchema = new mongoose.Schema({
	title: {type:String, trim:true, default:''},
	category: {type:String, trim:true, default:'web development'}, // web development, data science, etc
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
		title: this.title,
		category: this.category,
		status: this.status,
		isFeatured: this.isFeatured,
		description: this.description,
		image: this.image,
		wistia: this.wistia,
		slug: this.slug,
		subscribers: this.subscribers,
		youtube: this.youtube,
		posts: this.posts,
		price: this.price,
		priority: this.priority,
		timestamp: this.timestamp,
		schema:'tutorial',
		id: this._id.toString(),

		// the following are convenience methods for mustache templating:
		isPremium: (this.price > 0) ? true : null,
		fee: function(){
			return (this.price == 0) ? 'Free' : '$'+this.price+'.00'
		},
		preview: function(max){
			var ceiling = max || 160
			return (this.description.length < ceiling) ? this.description : this.description.substring(0, ceiling)+'...'			
		},
		numUnits: function(){
			return (this.posts.length == 0) ? 'Coming Soon' : this.posts.length+' Units'
		}
	}

	return summary
}


module.exports = mongoose.model('TutorialSchema', TutorialSchema)