"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var TextUtils = require("../utils").TextUtils;
var TutorialCard = (function (Component) {
    function TutorialCard() {
        _classCallCheck(this, TutorialCard);

        if (Component != null) {
            Component.apply(this, arguments);
        }
    }

    _inherits(TutorialCard, Component);

    _prototypeProperties(TutorialCard, null, {
        render: {
            value: function render() {
                var tutorial = this.props.tutorial;
                var link = tutorial.status == "live" ? React.createElement(
                    "a",
                    { href: "/tutorial/" + tutorial.slug, className: "button button-3d button-mini button-rounded button-teal" },
                    "View"
                ) : React.createElement(
                    "a",
                    { href: "#", className: "button button-3d button-mini button-rounded button-teal" },
                    "Coming Soon!"
                );
                var price = tutorial.price == 0 ? "FREE" : "$" + tutorial.price;
                var background = this.props.bg == null ? "#f9f9f9" : this.props.bg;


                return React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(
                        "div",
                        { style: { width: 92 + "%", margin: "auto", background: background, border: "1px solid #ddd", textAlign: "center", padding: 16, marginBottom: 32 } },
                        React.createElement("img", { style: { width: 100, borderRadius: 50, marginBottom: 12 }, src: "https://media-service.appspot.com/site/images/" + tutorial.image + "?crop=460" }),
                        React.createElement(
                            "div",
                            { className: "fancy-title title-bottom-border" },
                            React.createElement(
                                "h3",
                                { style: { fontWeight: 400 } },
                                React.createElement(
                                    "a",
                                    { style: { color: "#444" }, href: "/tutorial/" + tutorial.slug },
                                    tutorial.title
                                )
                            )
                        ),
                        React.createElement(
                            "p",
                            { style: { height: 144 } },
                            TextUtils.truncateText(tutorial.description, 180)
                        ),
                        React.createElement(
                            "h5",
                            { style: { marginBottom: 0, fontWeight: 200 } },
                            tutorial.posts.length,
                            " units",
                            React.createElement(
                                "span",
                                { style: { margin: 10 } },
                                "|"
                            ),
                            price,
                            React.createElement(
                                "span",
                                { style: { margin: 10 } },
                                "|"
                            ),
                            link
                        )
                    )
                );
            },
            writable: true,
            configurable: true
        }
    });

    return TutorialCard;
})(Component);

module.exports = TutorialCard;