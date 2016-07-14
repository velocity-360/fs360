var mongoose = require('mongoose')


var ProjectSchema = new mongoose.Schema({
	title: {type:String, trim:true, default: ''},
	description: {type:String, trim:true, default: ''},
	level: {type:String, default:'beginner'},
	slug: {type:String, lowercase:true, trim:true, default:''},
	repo: {type:String, lowercase:true, trim:true, default:''},
	link: {type:String, trim:true, lowercase:true, default:''}, // app store, website, etc
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	pdf: {type:String, default:''},
	preview: {type:String, default:''},
	image: {type:String, trim:true, default: 'tHyPScSk'}, // blue logo
	subscribers: {type: Array, default:[]},
	tags: {type: Array, default:[]}, // tech used
	units: {type:Array, default:[]}, // array of json objects {'unit':'unit one', 'description':'fawe awef fawef f'}
	price: {type: Number, default: 0}, // price in usd
	premiumPrice: {type: Number, default: 0}, // price for premium subscribers
	paypalLink: {type:String, trim:true, default:''},
	timestamp: {type:Date, default:Date.now},
})


ProjectSchema.methods.summary = function() {
	var summary = {
		'title':this.title,
		'description':this.description,
		'level':this.level,
		'pdf':this.pdf,
		'preview':this.preview,
		'image':this.image,
		'profile':this.profile,
		'slug':this.slug,
		'repo':this.repo,
		'link':this.link,
		'tags':this.tags,
		'subscribers':this.subscribers,
		'units':this.units,
		'price':this.price,
		'premiumPrice':this.premiumPrice,
		'paypalLink':this.paypalLink,
		'timestamp':this.timestamp,
		'id':this._id
	}
	return summary
}

module.exports = mongoose.model('ProjectSchema', ProjectSchema)