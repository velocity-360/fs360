"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var superagent = _interopRequire(require("superagent"));

var actions = _interopRequire(require("../actions/actions"));

var store = _interopRequire(require("../stores/store"));

module.exports = {

	handleGet: function (endpoint, params, completion) {
		superagent.get(endpoint).query(params).set("Accept", "application/json").end(function (err, res) {
			if (completion == null) return;

			if (err) {
				completion(err, null);
				return;
			}

			if (res.body.confirmation == "success") completion(null, res.body);else completion({ message: res.body.message }, null);
		});
	},

	// using superagent here because for some reason, cookies don't get installed using fetch (wtf)
	handlePost: function (endpoint, body, completion) {
		superagent.post(endpoint).send(body).set("Accept", "application/json").end(function (err, res) {
			if (completion == null) return;

			if (err) {
				completion(err, null);
				return;
			}

			var json = res.body;
			//			console.log('ERROR: '+JSON.stringify(json))
			if (json.confirmation != "success") {
				completion({ message: json.message }, null);
				return;
			}

			completion(null, json);
		});
	},

	handlePut: function (endpoint, body, completion) {
		superagent.put(endpoint).send(body).set("Accept", "application/json").end(function (err, res) {
			if (completion == null) return;

			if (err) {
				completion(err, null);
				return;
			}

			if (res.body.confirmation != "success") {
				completion({ message: res.body.message }, null);
				return;
			}

			completion(null, res.body);
		});
	},


	upload: function (file, completion) {
		var _file = file;
		this.handleGet("https://media-service.appspot.com/api/upload", null, function (err, response) {
			if (err) {
				return;
			}

			var uploadRequest = superagent.post(response.upload);
			uploadRequest.attach("file", _file);
			uploadRequest.end(function (err, resp) {
				if (err) {
					console.log("UPLOAD ERROR: " + JSON.stringify(err));
					completion(err, null);
					return;
				}

				var image = resp.body.image;
				completion(null, image);
			});
		});
	},

	submitStripeToken: function (token, completion) {
		var body = {
			stripeToken: token.id,
			email: token.email
		};

		superagent.post("/stripe/card").type("form").send(body).set("Accept", "application/json").end(function (err, res) {
			if (completion == null) return;

			if (err) {
				completion(err, null);
				return;
			}

			if (res.body.confirmation != "success") {
				completion({ message: res.body.message }, null);
				return;
			}

			completion(null, res.body);
		});
	},

	submitStripeCharge: function (token, email, product, amt, type, completion) {
		var customerEmail = email == null ? token.email : email; // defer to token if no current user
		var body = {
			stripeToken: token.id,
			email: customerEmail,
			product: product.id,
			description: product.title,
			amount: amt,
			type: type
		};

		superagent.post("/stripe/charge").type("form").send(body).set("Accept", "application/json").end(function (err, res) {
			if (completion == null) return;

			if (err) {
				completion(err, null);
				return;
			}

			if (res.body.confirmation != "success") {
				completion({ message: res.body.message }, null);
				return;
			}

			completion(null, res.body);
		});
	}
};