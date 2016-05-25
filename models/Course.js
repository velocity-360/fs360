var mongoose = require('mongoose');


var CourseSchema = new mongoose.Schema({
	title: {type:String, trim:true, default:''},
	schedule: {type:String, trim:true, default:''},
	isFeatured: {type:String, trim:true, default:'no'},
	dates: {type:String, trim:true, default:''},
	status: {type:String, trim:true, default:'active'}, // active or inactive
	level: {type:String, trim:true, default:''},
	slug: {type:String, trim:true, lowercase:true, default:''},
	type: {type:String, trim:true, default:'live'}, // live, immersive, project
	description: {type:String, default:''},
	units: {type:Array, default:[]}, // array of json objects {'unit':'unit one', 'description':'fawe awef fawef f'}
	tags: {type:Array, default:[]},
	tuition: {type:Number, default: 0},
	deposit: {type:Number, default: 0},
	priority: {type:Number, default: 100},
	image: {type:String, trim:true, default:''},
	syllabus: {type:String, trim:true, default:''},
	profile: {type:mongoose.Schema.Types.Mixed, default:{}}, // instructor
	subscribers: {type:Array, default:[]},
	timestamp: {type:Date, default:Date.now},
});


CourseSchema.methods.summary = function() {
	var summary = {
		'title':this.title,
		'schedule':this.schedule,
		'isFeatured':this.isFeatured,
		'dates':this.dates,
		'level':this.level,
		'status':this.status,
		'slug':this.slug,
		'type':this.type,
		'units':this.units,
		'tags':this.tags,
		'tuition':this.tuition,
		'deposit':this.deposit,
		'priority':this.priority,
		'description':this.description,
		'image':this.image,
		'syllabus':this.syllabus,
		'profile':this.profile,
		'subscribers':this.subscribers,
		'timestamp':this.timestamp,
		'id':this._id
	};
	return summary;
};


module.exports = mongoose.model('CourseSchema', CourseSchema);
