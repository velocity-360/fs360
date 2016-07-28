var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
	firstName: {type:String, trim:true, lowercase:true, default:''},
	lastName: {type:String, trim:true, lowercase:true, default:''},
	promoCode: {type:String, trim:true, lowercase:true, default:''},
	email: {type:String, trim:true, lowercase:true, default:''},
	accountType: {type:String, trim:true, lowercase:true, default:'basic'}, // basic, premium
	city: {type:String, trim:true, lowercase:true, default:''},
	githubId: {type:String, trim:true, default:''},
	stripeId: {type:String, trim:true, default:''},
	creditCard: {type:mongoose.Schema.Types.Mixed, default:{}},
	resume: {type:String, trim:true, default:''},
	about: {type:String, trim:true, default:''},
	tags: {type:Array, default:[]},
	password: {type:String, default:''},
	bio: {type:String, default:''},
	username: {type:String, trim:true, default:''},
	credits: {type: Number, default: 10},
	monthlyRate: {type: Number, default: 0},
	image: {type:String, trim:true, default:'qeodpw-g'}, // default profile icon
	isAdmin: {type:String, trim:true, lowercase:true, default:'no'},
	timestamp: {type:Date, default:Date.now},
});

ProfileSchema.methods.summary = function() {
	var summary = {
		'firstName':this.firstName,
		'lastName':this.lastName,
		'promoCode':this.promoCode,
		'githubId':this.githubId,
		'accountType':this.accountType,
		'stripeId':this.stripeId,
		'creditCard':this.creditCard,
		'email':this.email,
		'city':this.city,
		'about':this.about,
		'tags':this.tags,
		'resume':this.resume,
		'bio':this.bio,
		'username':this.username,
		'credits':this.credits,
		'monthlyRate':this.monthlyRate,
		'image':this.image,
		'timestamp':this.timestamp,
		'isAdmin':this.isAdmin,
		'id':this._id
	};
	
	return summary;
};

module.exports = mongoose.model('ProfileSchema', ProfileSchema);