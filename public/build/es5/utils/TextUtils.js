"use strict";

module.exports = {

	truncateText: function (str, limit) {
		if (str.length < limit) return str;

		return str.substring(0, limit) + "...";
	},

	capitalize: function (str) {
		if (str.length == 1) return str.toUpperCase();

		var firstLetter = str.substring(0, 1);
		return firstLetter.toUpperCase() + str.substring(1);
	},

	convertToHtml: function (str) {
		var find = "\n";
		var re = new RegExp(find, "g");
		var html = str.replace(re, "<br />");
		return html;
	},

	stringToArray: function (str, separator) {
		var t = str.split(separator);
		var array = [];
		for (var i = 0; i < t.length; i++) {
			var tag = t[i];
			if (tag.length == 0) continue;

			array.push(tag.trim());
		}

		return array;
	}

};