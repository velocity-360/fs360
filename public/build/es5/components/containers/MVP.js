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
var Loader = _interopRequire(require("react-loader"));

var Nav = _interopRequire(require("../../components/Nav"));

var Register = _interopRequire(require("../../components/Register"));

var Header = _interopRequire(require("../../components/Header"));

var Footer = _interopRequire(require("../../components/Footer"));

var RightSidebar = _interopRequire(require("../../components/RightSidebar"));

var api = _interopRequire(require("../../api/api"));

var MVP = (function (Component) {
	function MVP(props, context) {
		_classCallCheck(this, MVP);

		_get(Object.getPrototypeOf(MVP.prototype), "constructor", this).call(this, props, context);
		this.updateProposal = this.updateProposal.bind(this);
		this.submitProposal = this.submitProposal.bind(this);
		this.state = {
			showLoader: false,
			proposal: {
				name: "",
				email: "",
				summary: ""
			}
		};
	}

	_inherits(MVP, Component);

	_prototypeProperties(MVP, null, {
		updateProposal: {
			value: function updateProposal(event) {
				var proposal = Object.assign({}, this.state.proposal);
				proposal[event.target.id] = event.target.value;
				this.setState({
					proposal: proposal
				});
			},
			writable: true,
			configurable: true
		},
		submitProposal: {
			value: function submitProposal(event) {
				event.preventDefault();
				console.log("submitProposal: " + JSON.stringify(this.state.proposal));

				if (this.state.proposal.name.length == 0) {
					alert("Please enter your name.");
					return;
				}

				if (this.state.proposal.email.length == 0) {
					alert("Please enter your email.");
					return;
				}

				if (this.state.proposal.summary.length == 0) {
					alert("Please enter the summary for your project.");
					return;
				}


				var _this = this;
				_this.setState({ showLoader: true });
				api.handlePost("/api/proposal", this.state.proposal, function (err, response) {
					_this.setState({ showLoader: false });

					if (err) {
						alert(err.message);
						return;
					}

					alert(response.message);
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				return React.createElement(
					"div",
					null,
					React.createElement(Nav, null),
					React.createElement(
						"section",
						{ id: "slider", className: "slider-parallax dark full-screen", style: { background: "url(\"/images/lounge.jpg\") center" } },
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"div",
								{ className: "vertical-middle" },
								React.createElement(
									"div",
									{ className: "heading-block center nobottomborder" },
									React.createElement(
										"h1",
										{ "data-animate": "fadeInUp" },
										"8-Week MVP Program"
									),
									React.createElement("img", { style: { width: 124, borderRadius: 62 }, src: "/images/logo_round_green_260.png", alt: "Velocity 360" }),
									React.createElement(
										"span",
										{ "data-animate": "fadeInUp", "data-delay": "300" },
										"Oct 31st - Jan 6th",
										React.createElement("br", null),
										"27 East 28th Street",
										React.createElement("br", null),
										"NYC"
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						{ id: "content" },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "col_two_third bottommargin-sm" },
									React.createElement(
										"div",
										{ className: "fancy-title title-bottom-border" },
										React.createElement(
											"h2",
											{ style: { fontWeight: 400 } },
											"Overview"
										)
									),
									React.createElement("img", { style: { background: "#fff", float: "right", border: "1px solid #ddd", maxWidth: 260, padding: 6, marginLeft: 12 }, className: "image_fade", src: "/images/group.JPG", alt: "Velocity 360" }),
									React.createElement(
										"div",
										null,
										React.createElement(
											"p",
											null,
											"The Velocity 360 MVP Program brings together local startups in need of software development for an initial prototype - often referred to as a \"minimal viable product\" or MVP. Over a period of eight weeks, our cohort will work with a handful of startups from NYC to build a fully functional product through our full time 8-week bootcamp program. The tech stack will be very modern and scalable: Node JS, React, and React Native for mobile development."
										),
										React.createElement(
											"h3",
											{ style: { fontWeight: 400, marginBottom: 0 } },
											"Cohort Students"
										),
										React.createElement(
											"p",
											null,
											"The students in the cohort are aspiring software developers mostly from the area. As a result, startup founders and students can continue working beyond the timeframe of the bootcamp. Students are generally professionals 5-10 years out of college and in the process of changing careers. All students are vetted for educational background, aptitude, and interpersonal dynamic."
										),
										React.createElement(
											"h3",
											{ style: { fontWeight: 400, marginBottom: 0 } },
											"Startups"
										),
										React.createElement(
											"p",
											null,
											"Velocity 360 works with startups in need of technical development for their MVP. This means there should be no technical co-founder on the team and development should not have begun. The MVP program is not a good fit if the following applies your team:",
											React.createElement("br", null),
											"1) At least one technical member",
											React.createElement("br", null),
											"2) Outsourced development to a third-party development shop, domestic or overseas"
										),
										React.createElement(
											"h3",
											{ style: { fontWeight: 400, marginBottom: 0 } },
											"Terms"
										),
										React.createElement(
											"p",
											null,
											"The 8-Week MVP Program will run from October 31st through January 6th (two weeks scheduled off for Thanksgiving and Christmas/New Years). Velocity 360 will not have an equity position in any of the projects and will not own the intellectual property rights of the software developed. These matters will be coordinated between the students and the founders on an individual basis. However, Velocity 360 will secure a $1,000 deposit from the startups to ensure continued interest to completing the project."
										),
										React.createElement("img", { style: { marginBottom: 6, maxWidth: 400 }, src: "/images/wework-2.jpg" }),
										React.createElement("br", null),
										React.createElement(
											"i",
											{ style: { fontWeight: 100 } },
											"* All courses and events are held at our WeWork Location on 28th Street."
										)
									),
									React.createElement(
										"div",
										{ style: { marginTop: 64 }, className: "fancy-title title-bottom-border" },
										React.createElement(
											"h2",
											{ style: { fontWeight: 400 } },
											"Submit Project Proposal"
										)
									),
									React.createElement(
										"div",
										{ className: "col_full panel panel-default" },
										React.createElement(
											"div",
											{ style: { backgroundColor: "#f1f9f5", textAlign: "left" }, className: "panel-heading" },
											"Proposal"
										),
										React.createElement(
											"div",
											{ className: "panel-body", style: { textAlign: "left" } },
											"Date: Oct 31 - Jan 6th",
											React.createElement("br", null),
											"Deposit: $1,000 (refunded upon completion)",
											React.createElement("br", null),
											React.createElement("hr", null),
											React.createElement("input", { onChange: this.updateProposal, type: "text", id: "name", placeholder: "Name", className: "form-control", style: { background: "#f9f9f9" } }),
											React.createElement("br", null),
											React.createElement("input", { onChange: this.updateProposal, type: "text", id: "email", placeholder: "Email", className: "form-control", style: { background: "#f9f9f9" } }),
											React.createElement("br", null),
											React.createElement("textarea", { onChange: this.updateProposal, id: "summary", className: "form-control", style: { background: "#f9f9f9", height: 120 }, placeholder: "Please describe your project, team members, and current progress." }),
											React.createElement("br", null),
											React.createElement(
												"a",
												{ onClick: this.submitProposal, href: "#", className: "button button-border button-dark button-rounded noleftmargin" },
												"Submit"
											)
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm hidden-xs col_last", style: { borderLeft: "1px solid #ddd", padding: 36 } },
									React.createElement(RightSidebar, null)
								)
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return MVP;
})(Component);

var stateToProps = function (state) {
	return {
		loaderOptions: state.staticReducer.loaderConfig,
		currentUser: state.profileReducer.currentUser,
		courses: state.courseReducer.courseArray,
		events: state.eventReducer.events
	};
};

module.exports = connect(stateToProps)(MVP);