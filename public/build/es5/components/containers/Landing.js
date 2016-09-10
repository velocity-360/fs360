"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _reactBootstrap = require("react-bootstrap");

var ReactBootstrap = _interopRequire(_reactBootstrap);

var Modal = _reactBootstrap.Modal;
var connect = require("react-redux").connect;
var _utils = require("../../utils");

var api = _utils.api;
var TextUtils = _utils.TextUtils;
var _components = require("../../components");

var Nav = _components.Nav;
var Footer = _components.Footer;
var Header = _components.Header;
var TutorialCard = _components.TutorialCard;
var Landing = (function (Component) {
    function Landing(props, context) {
        _classCallCheck(this, Landing);

        _get(Object.getPrototypeOf(Landing.prototype), "constructor", this).call(this, props, context);
        this.state = {
            tutorials: []
        };
    }

    _inherits(Landing, Component);

    _prototypeProperties(Landing, null, {
        componentDidMount: {
            value: function componentDidMount() {
                var _this = this;
                api.handleGet("/api/tutorial", { limit: 3, status: "live" }, function (err, response) {
                    if (err) {
                        alert(err.message);
                        return;
                    }

                    //          console.log(JSON.stringify(response))
                    var tutorials = response.tutorials;
                    _this.setState({
                        tutorials: tutorials
                    });
                });
            },
            writable: true,
            configurable: true
        },
        render: {
            value: function render() {
                var courses = this.props.courses.map(function (course, i) {
                    if (course.type == "immersive") {
                        return React.createElement(
                            "div",
                            { key: course.id, className: "col-md-12 bottommargin" },
                            React.createElement(
                                "div",
                                { className: "team team-list clearfix" },
                                React.createElement(
                                    "div",
                                    { className: "team-image", style: { width: 150 } },
                                    React.createElement("img", { className: "img-circle", src: "https://media-service.appspot.com/site/images/" + course.image + "?crop=260", alt: "Velocity 360" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "team-desc" },
                                    React.createElement(
                                        "div",
                                        { className: "team-title" },
                                        React.createElement(
                                            "h4",
                                            { style: { fontWeight: 400 } },
                                            React.createElement(
                                                "a",
                                                { href: "/course/" + course.slug },
                                                course.title
                                            )
                                        ),
                                        React.createElement(
                                            "span",
                                            { style: { color: "#444" } },
                                            course.dates
                                        ),
                                        React.createElement(
                                            "span",
                                            { style: { color: "#444" } },
                                            course.schedule
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "team-content" },
                                        course.description
                                    )
                                )
                            )
                        );
                    }
                });

                var tutorialsList = this.state.tutorials.map(function (tutorial, i) {
                    return React.createElement(TutorialCard, { key: tutorial.id, tutorial: tutorial, bg: "#fff" });
                });

                return React.createElement(
                    "div",
                    null,
                    React.createElement(Nav, null),
                    React.createElement(Header, null),
                    React.createElement(
                        "div",
                        { className: "section notopmargin nobottommargin" },
                        React.createElement(
                            "div",
                            { className: "container clearfix" },
                            React.createElement(
                                "div",
                                { className: "col_half nobottommargin topmargin-lg" },
                                React.createElement("img", { style: { padding: 6, background: "#fff", border: "1px solid #ddd" }, src: "/images/girl.png", alt: "Velocity 360", className: "center-block" })
                            ),
                            React.createElement(
                                "div",
                                { className: "col_half nobottommargin col_last" },
                                React.createElement(
                                    "div",
                                    { className: "heading-block topmargin-lg" },
                                    React.createElement(
                                        "h2",
                                        { style: style.heading },
                                        "Looking Ahead"
                                    ),
                                    React.createElement(
                                        "span",
                                        null,
                                        "Prepare for tomorrow."
                                    )
                                ),
                                React.createElement(
                                    "p",
                                    { style: style.paragraph },
                                    "Technology, more than any other industry, changes rapidly and many fall behind. As a newcomer to tech, it is imperative to understand the trends and develop the skills that will be valued tomorrow over those in vogue today. Velocity 360 strongly prepares students under that guiding principle. Our curriculum is highly focused on the bleeding edge of tech evolution: Node JS, React, and React Native."
                                ),
                                React.createElement(
                                    "table",
                                    { style: { background: "#fff", border: "1px solid #ddd" }, className: "table table-striped" },
                                    React.createElement(
                                        "thead",
                                        null,
                                        React.createElement(
                                            "tr",
                                            null,
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "strong",
                                                    null,
                                                    "Article"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "strong",
                                                    null,
                                                    "Source"
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "tbody",
                                        null,
                                        React.createElement(
                                            "tr",
                                            { className: "info" },
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "a",
                                                    { target: "_blank", href: "http://stackoverflow.com/research/developer-survey-2016#technology-trending-tech-on-stack-overflow" },
                                                    "2016 Developer Survey Results"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                "Stack Overflow"
                                            )
                                        ),
                                        React.createElement(
                                            "tr",
                                            null,
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "a",
                                                    { target: "_blank", href: "https://www.youtube.com/watch?v=sBzRwzY7G-k" },
                                                    "2016/2017 Must-Know Web Development Tech"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                "YouTube"
                                            )
                                        ),
                                        React.createElement(
                                            "tr",
                                            { className: "info" },
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "a",
                                                    { target: "_blank", href: "https://blog.whoishiring.io/hacker-news-who-is-hiring-thread-part-3/#front endframeworks" },
                                                    "Hacker News “Who is Hiring?” - Supporting Technologies"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                "Hacker News"
                                            )
                                        ),
                                        React.createElement(
                                            "tr",
                                            null,
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "a",
                                                    { href: "https://www.velocity360.io/post/starting-out-today" },
                                                    "Starting Out Today"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                "Velocity 360"
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    "i",
                                    null,
                                    "* Cleary React is the winner here, Facebook did enormous job delivering a good technology and even better job convincing the JS crowd how good it is...it looks like the battle is lost."
                                ),
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement(
                                    "span",
                                    null,
                                    "- ",
                                    React.createElement(
                                        "a",
                                        { target: "_blank", href: "https://blog.whoishiring.io/hacker-news-who-is-hiring-thread-part-3/#front endframeworks" },
                                        "Sebastian Pawluś, WhoIsHiring.io"
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "section",
                        { id: "section-about", className: "page-section section nobg nomargin" },
                        React.createElement(
                            "div",
                            { className: "container clearfix" },
                            React.createElement(
                                "div",
                                { className: "heading-block bottommargin-lg center" },
                                React.createElement(
                                    "h2",
                                    { style: style.heading },
                                    "The Velocity Advantage"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col_one_third" },
                                React.createElement(
                                    "div",
                                    { className: "heading-block fancy-title nobottomborder title-bottom-border" },
                                    React.createElement(
                                        "h4",
                                        { style: style.heading },
                                        "True Full ",
                                        React.createElement(
                                            "span",
                                            null,
                                            "Stack"
                                        )
                                    )
                                ),
                                React.createElement("img", { style: { maxWidth: 220, marginBottom: 12 }, src: "/images/aws.png" }),
                                React.createElement(
                                    "p",
                                    { style: style.paragraph },
                                    "At Velocity 360, students learn ALL areas of the stack: backend, front end, mobile, and even dev ops. Through Node, React and React Native, we are able to focus on a wider range of areas because the concepts are transferrable. This is a key reason why React & React Native are becoming so popular - one set of concepts can be applied to both web and mobile development. Our course highly emphasizes this cross-compatibility preparing students for careers in almost any aspect of software development."
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col_one_third" },
                                React.createElement(
                                    "div",
                                    { className: "heading-block fancy-title nobottomborder title-bottom-border" },
                                    React.createElement(
                                        "h4",
                                        { style: style.heading },
                                        "Small ",
                                        React.createElement(
                                            "span",
                                            null,
                                            "Classes"
                                        )
                                    )
                                ),
                                React.createElement("img", { style: { maxWidth: 220, marginBottom: 12 }, src: "/images/class-2.jpg" }),
                                React.createElement(
                                    "p",
                                    { style: style.paragraph },
                                    "The average class size at Velocity is 10 students. We take very careful measures to ensure that the students selected for each cohort are qualified, motivated and prepared to succeed beyond the course. The tech bootcamp industry is quickly developing a reputation for churning out unqualified devs and much of this is due to students enrolling for the wrong reasons. We make sure our students are pursuing a career in software for the right reasons."
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col_one_third col_last" },
                                React.createElement(
                                    "div",
                                    { className: "heading-block fancy-title nobottomborder title-bottom-border" },
                                    React.createElement(
                                        "h4",
                                        { style: style.heading },
                                        "Modern ",
                                        React.createElement(
                                            "span",
                                            null,
                                            "Curriculum"
                                        )
                                    )
                                ),
                                React.createElement("img", { style: { maxWidth: 220, marginBottom: 12 }, src: "/images/node-react.png" }),
                                React.createElement(
                                    "p",
                                    { style: style.paragraph },
                                    "While other bootcamps continue to teach Ruby on Rails (Dev Bootcamp, Flatiron School, General Assembly, NYCDA, App Academy, etc) and have been doing so for several years, Velocity 360 is the only bootcamp in NYC that focuses on the tremendously growing Node/React/React-Native ecosystem. Rather than joining the mass of Ruby on Rails devs that graduate from bootcamps every three months, you will leave Velocity 360 with the skills highly in demand yet hard to find in the tech world."
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "section",
                        { style: { background: "#f9f9f9", paddingTop: 48, borderTop: "1px solid #ddd" } },
                        React.createElement(
                            "div",
                            { className: "content-wrap", style: { paddingTop: 0 } },
                            React.createElement(
                                "div",
                                { className: "container clearfix" },
                                React.createElement(
                                    "div",
                                    { className: "heading-block bottommargin-lg center" },
                                    React.createElement(
                                        "h2",
                                        { style: { fontWeight: 400 } },
                                        "Our Students Currently Work At"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-3" },
                                        React.createElement("img", { style: { border: "1px solid #ddd", marginTop: 24 }, src: "/images/crains.png", alt: "Velocity 360" })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-3" },
                                        React.createElement("img", { style: { border: "1px solid #ddd", marginTop: 24 }, src: "/images/bloomberg.png", alt: "Velocity 360" })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-3" },
                                        React.createElement("img", { style: { border: "1px solid #ddd", marginTop: 24 }, src: "/images/nytimes.png", alt: "Velocity 360" })
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-3" },
                                        React.createElement("img", { style: { border: "1px solid #ddd", marginTop: 24 }, src: "/images/codeacademy.png", alt: "Velocity 360" })
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "section",
                        { id: "events", style: { background: "#fff", padding: "32px 0px 48px", borderTop: "1px solid #ddd" } },
                        React.createElement(
                            "div",
                            { className: "container clearfix" },
                            React.createElement(
                                "div",
                                { className: "col_half nobottommargin" },
                                React.createElement(
                                    "div",
                                    { className: "heading-block topmargin-lg" },
                                    React.createElement(
                                        "h2",
                                        { style: style.heading },
                                        "Events"
                                    )
                                ),
                                React.createElement(
                                    "p",
                                    { style: style.paragraph },
                                    "If you are in the NYC area, feel free to stop by for one of our events. Each week, we host a couple open workshops, demos, and study sessions. This is a great way to get a feel for our teaching style and learn more about Velocity 360 classes."
                                ),
                                React.createElement(
                                    "table",
                                    { style: { background: "#fff", border: "1px solid #ddd" }, className: "table table-striped" },
                                    React.createElement(
                                        "thead",
                                        null,
                                        React.createElement(
                                            "tr",
                                            null,
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "strong",
                                                    null,
                                                    "Topic"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "strong",
                                                    null,
                                                    "Date"
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "tbody",
                                        null,
                                        React.createElement(
                                            "tr",
                                            { className: "info" },
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "a",
                                                    { target: "_blank", href: "https://www.meetup.com/velocity360/events/233828246/" },
                                                    "Intro Web Development With Node JS"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                "Sept 6th"
                                            )
                                        ),
                                        React.createElement(
                                            "tr",
                                            null,
                                            React.createElement(
                                                "td",
                                                null,
                                                React.createElement(
                                                    "a",
                                                    { target: "_blank", href: "https://www.meetup.com/velocity360/events/233828392/" },
                                                    "Mobile Development With React Native"
                                                )
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                "Sept 7th"
                                            )
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "hidden-xs col_half nobottommargin topmargin-lg col_last" },
                                React.createElement("img", { style: { maxWidth: 400, padding: 6, background: "#fff", border: "1px solid #ddd" }, src: "/images/class-4.jpg", alt: "Velocity 360", className: "center-block" })
                            )
                        )
                    ),
                    React.createElement(
                        "section",
                        { style: { background: "#f9f9f9", paddingTop: 48, borderTop: "1px solid #ddd" } },
                        React.createElement(
                            "div",
                            { className: "heading-block center" },
                            React.createElement(
                                "h2",
                                { style: { fontWeight: 400 } },
                                "Bootcamps"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "content-wrap", style: { paddingTop: 0 } },
                            React.createElement(
                                "div",
                                { className: "container clearfix" },
                                courses
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "heading-block center" },
                            React.createElement(
                                "h2",
                                { style: { fontWeight: 400 } },
                                "Tutorials"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "content-wrap", style: { paddingTop: 0 } },
                            React.createElement(
                                "div",
                                { className: "container clearfix" },
                                React.createElement(
                                    "div",
                                    { className: "row" },
                                    tutorialsList
                                ),
                                React.createElement(
                                    "div",
                                    { style: { textAlign: "center" } },
                                    React.createElement(
                                        "a",
                                        { href: "/tutorials", className: "button button-rounded button-reveal button-large button-border tright" },
                                        React.createElement("i", { className: "icon-signal" }),
                                        React.createElement(
                                            "span",
                                            null,
                                            "View All Tutorials"
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "section",
                        { id: "section-testimonials", className: "page-section section parallax dark", style: { backgroundImage: "url(\"/images/joe_blue.png\")", padding: "100px 0", margin: 0 }, "data-stellar-background-ratio": "0.3" },
                        React.createElement(
                            "div",
                            { className: "container clearfix" },
                            React.createElement(
                                "div",
                                { className: "col_half nobottommargin" },
                                React.createElement(
                                    "div",
                                    { className: "heading-block center" },
                                    React.createElement(
                                        "h4",
                                        { style: style.heading },
                                        "Harsh Sinha, Bloomberg"
                                    ),
                                    React.createElement("img", { style: { width: 120, marginTop: 12 }, src: "/images/harsh.png" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "fslider testimonial testimonial-full nobgcolor noborder noshadow nopadding", "data-arrows": "false" },
                                    React.createElement(
                                        "div",
                                        { className: "testi-content" },
                                        React.createElement(
                                            "p",
                                            { style: { color: "#fff" } },
                                            "I came into Velocity 360 as an experienced developer looking to sharpen my knowledge in react.js and web applications. Dan Kwon did a fantastic job guiding us into subject at a pace that worked for everybody. We all began the class with many questions about Node, React, and Redux. But by the end we were able to create an actual project with real world applications."
                                        ),
                                        React.createElement(
                                            "a",
                                            { target: "_blank", href: "https://www.coursereport.com/schools/velocity" },
                                            "Read More"
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col_half nobottommargin col_last" },
                                React.createElement(
                                    "div",
                                    { className: "heading-block center" },
                                    React.createElement(
                                        "h4",
                                        { style: style.heading },
                                        "Rob Ungar, Code Academy"
                                    ),
                                    React.createElement("img", { style: { width: 120, marginTop: 12 }, src: "/images/rob.png" })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "fslider testimonial testimonial-full nobgcolor noborder noshadow nopadding", "data-arrows": "false" },
                                    React.createElement(
                                        "div",
                                        { className: "testi-content" },
                                        React.createElement(
                                            "p",
                                            { style: { color: "#fff" } },
                                            "This is the best learning experience in my journey to become a developer...You are coding on day one, there are no long lectures about theory. You code along and things are explained as you go. And then you build the project again."
                                        ),
                                        React.createElement(
                                            "a",
                                            { target: "_blank", href: "https://www.coursereport.com/schools/velocity" },
                                            "Read More"
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { style: { textAlign: "center", marginTop: 36 } },
                            React.createElement(
                                "div",
                                { className: "heading-block center" },
                                React.createElement(
                                    "h2",
                                    { style: { fontWeight: 400 } },
                                    "Read More Reviews"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-2 col-md-offset-4" },
                                    React.createElement(
                                        "a",
                                        { target: "_blank", href: "https://www.switchup.org/bootcamps/velocity-360" },
                                        React.createElement("img", { style: { marginBottom: 24 }, src: "/images/switchup.png" })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-2" },
                                    React.createElement(
                                        "a",
                                        { target: "_blank", href: "https://www.coursereport.com/schools/velocity" },
                                        React.createElement("img", { style: { width: 110 }, src: "/images/coursereport.png" })
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(Footer, null)
                );
            },
            writable: true,
            configurable: true
        }
    });

    return Landing;
})(Component);

var style = {
    paragraph: {
        lineHeight: 25 + "px",
        fontSize: 16
    },
    heading: {
        fontWeight: 300
    }
};

var stateToProps = function (state) {
    return {
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courseArray
    };
};

module.exports = connect(stateToProps)(Landing);