"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Time = _interopRequire(require("react-time"));

module.exports = {

    formattedDate: function (timestamp) {
        var now = new Date();
        var timestamp = new Date(this.props.post.timestamp);
        var diff = now - timestamp;

        var date = null;
        if (diff > 24 * 60 * 1000) {
            date = React.createElement(Time, { value: timestamp, format: "MMM DD, YYYY" });
        } else {
            date = React.createElement(Time, { value: timestamp, titleFormat: "YYYY/MM/DD HH:mm", relative: true });
        }

        return date;
    }

};