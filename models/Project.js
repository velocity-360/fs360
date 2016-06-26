var mongoose = require('mongoose')


var ProjectSchema = new mongoose.Schema({
	title: {type:String, trim:true, default: ''},
	description: {type:String, trim:true, default: ''},
	slug: {type:String, lowercase:true, trim:true, default:''},
	repo: {type:String, lowercase:true, trim:true, default:''},
	link: {type:String, trim:true, lowercase:true, default:''}, // app store, website, etc
	profile: {type:mongoose.Schema.Types.Mixed, default:{}},
	image: {type:String, trim:true, default: 'tHyPScSk'}, // blue logo
	images: {type: Array, default:[]},
	tags: {type: Array, default:[]}, // tech used
	units: {type:Array, default:[]}, // array of json objects {'unit':'unit one', 'description':'fawe awef fawef f'}
	timestamp: {type:Date, default:Date.now},
})


ProjectSchema.methods.summary = function() {
	var summary = {
		'title':this.title,
		'description':this.description,
		'image':this.image,
		'images':this.images,
		'profile':this.profile,
		'slug':this.slug,
		'repo':this.repo,
		'link':this.link,
		'tags':this.tags,
		'units':this.units,
		'timestamp':this.timestamp,
		'id':this._id
	}
	return summary
}

module.exports = mongoose.model('ProjectSchema', ProjectSchema)