var Promise = require('bluebird');

module.exports = {

	sendEmail: function(from, recipient, subject, text){
		return new Promise(function (resolve, reject){

			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
			sendgrid.send({
				to:       recipient,
				from:     from,
				fromname: 'Velocity 360',
				subject:  subject,
				text:     text
			}, function(err) {
				if (err) {reject(err); }
				else { resolve(); }
			});
		});
	},

	sendHtmlEmail: function(from, recipient, subject, html){
		return new Promise(function (resolve, reject){

			var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
			sendgrid.send({
				to:       recipient,
				from:     from,
				fromname: 'Velocity 360',
				subject:  subject,
				html:     html
			}, function(err) {
				if (err) {reject(err); }
				else { resolve(); }
			});
		});

	}





}