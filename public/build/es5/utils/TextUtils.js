"use strict";

module.exports = {

	truncateText: function (str, limit) {
		if (str.length < limit) return str;

		return str.substring(0, limit) + "...";
	},

	convertToHtml: function (str) {
		var find = "\n";
		var re = new RegExp(find, "g");
		var html = str.replace(re, "<br />");
		return html;
	}

};