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
var ProjectCard = _interopRequire(require("../../components/ProjectCard"));

var Register = _interopRequire(require("../../components/Register"));

var Nav = _interopRequire(require("../../components/Nav"));

var Footer = _interopRequire(require("../../components/Footer"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var stripe = _interopRequire(require("../../utils/StripeUtils"));

var api = _interopRequire(require("../../api/api"));

var Landing = (function (Component) {
	function Landing(props, context) {
		_classCallCheck(this, Landing);

		_get(Object.getPrototypeOf(Landing.prototype), "constructor", this).call(this, props, context);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.showRegistrationForm = this.showRegistrationForm.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = {
			membershiptype: "Basic",
			showRegistration: false,
			visitor: {
				name: "",
				email: "",
				phone: "",
				course: "",
				referral: ""
			}
		};
	}

	_inherits(Landing, Component);

	_prototypeProperties(Landing, null, {
		componentDidMount: {
			value: function componentDidMount() {
				var _this = this;
				api.handleGet("/api/project", null, function (err, response) {
					if (err) {
						return;
					}

					store.dispatch(actions.projectsRecieved(response.projects));
				});
			},
			writable: true,
			configurable: true
		},
		updateVisitor: {
			value: function updateVisitor(event) {
				event.preventDefault();

				var visitor = Object.assign({}, this.state.visitor);
				visitor[event.target.id] = event.target.value;
				this.setState({
					visitor: visitor
				});
			},
			writable: true,
			configurable: true
		},
		openModal: {
			value: function openModal(event) {
				event.preventDefault();

				var visitor = Object.assign({}, this.state.visitor);
				visitor.course = event.target.id;

				this.setState({
					visitor: visitor
				});
			},
			writable: true,
			configurable: true
		},
		showRegistrationForm: {
			value: function showRegistrationForm(event) {
				event.preventDefault();
				this.setState({
					membershiptype: event.target.id,
					showRegistration: true
				});
			},
			writable: true,
			configurable: true
		},
		closeModal: {
			value: function closeModal() {
				this.setState({
					showRegistration: false
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var projectList = this.props.projects.map(function (project, i) {
					return React.createElement(ProjectCard, { key: project.id, project: project });
				});

				return React.createElement(
					"div",
					null,
					React.createElement(Nav, null),
					React.createElement(
						"section",
						{ id: "slider", style: { background: "url(\"/images/joe_light_blue.png\") center", overflow: "visible" }, "data-height-lg": "450", "data-height-md": "450", "data-height-sm": "600", "data-height-xs": "600", "data-height-xxs": "600" },
						React.createElement("br", null),
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"form",
								{ action: "#", method: "post", role: "form", className: "landing-wide-form landing-form-overlay dark clearfix" },
								React.createElement(
									"div",
									{ className: "heading-block nobottommargin nobottomborder" },
									React.createElement(
										"h4",
										null,
										"Start your Programming Career"
									)
								),
								React.createElement("div", { className: "line", style: { margin: "15px 0 30px" } }),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement("input", { onChange: this.updateVisitor, id: "name", type: "text", className: "form-control input-lg not-dark", placeholder: "Name" })
								),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement("input", { onChange: this.updateVisitor, id: "email", type: "text", className: "form-control input-lg not-dark", placeholder: "Email" })
								),
								React.createElement(
									"div",
									{ className: "col_full" },
									React.createElement(
										"label",
										{ "for": "template-contactform-subject" },
										"I am interested in"
									),
									React.createElement(
										"select",
										{ onChange: this.updateVisitor, value: this.state.visitor.course, id: "course", className: "form-control input-lg not-dark" },
										React.createElement(
											"option",
											{ value: "fundamentals-bootcamp" },
											"Fundamentals Bootcamp"
										),
										React.createElement(
											"option",
											{ value: "mvp-bootcamp" },
											"MVP Bootcamp"
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_full nobottommargin" },
									React.createElement(
										"button",
										{ onClick: this.submitInfoRequest, className: "btn btn-lg btn-danger btn-block nomargin", value: "submit" },
										"Request Syllabus"
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						null,
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "promo promo-dark promo-full landing-promo header-stick" },
								React.createElement(
									"div",
									{ className: "container clearfix" },
									React.createElement(
										"h3",
										null,
										"Build Real Products"
									),
									React.createElement(
										"span",
										null,
										"Velocity 360 is the only coding bootcamp that uses real ",
										React.createElement("br", null),
										"projects from local startups to teach students."
									)
								)
							),
							React.createElement(
								"div",
								{ className: "container clearfix", style: { paddingTop: 64 } },
								projectList,
								React.createElement(
									"div",
									{ className: "col_one_third bottommargin-sm col_last" },
									React.createElement(
										"div",
										{ className: "widget clearfix", style: { borderRadius: 2, padding: 24, textAlign: "center", border: "1px solid #ddd", background: "#F9FCFF" } },
										React.createElement(
											"h4",
											null,
											"Featured App"
										),
										React.createElement("img", { style: { width: 128, border: "1px solid #ddd" }, src: "/images/radius.png", alt: "Velocity 360" }),
										React.createElement(
											"h3",
											{ style: { marginBottom: 6, marginTop: 9 } },
											React.createElement(
												"a",
												{ href: "/project/123" },
												"Radius"
											)
										),
										React.createElement("hr", null),
										React.createElement(
											"strong",
											null,
											"iOS App"
										),
										React.createElement("br", null),
										React.createElement(
											"p",
											null,
											"Radius is a job-searching app aimed at part time workers, students, and short term service providers like dog-walkers or furniture movers. It utilizes the GPS functionality on the iPhone to find jobs nearby and also to find workers in the area."
										),
										React.createElement(
											"div",
											{ className: "tagcloud" },
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"iOS"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"Node JS"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"REST API"
											),
											React.createElement(
												"a",
												{ style: { background: "#fff" }, href: "#" },
												"JavaScript"
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						{ id: "register", className: "section pricing-section nomargin", style: { backgroundColor: "#FFF" } },
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"h2",
								{ className: "pricing-section--title center" },
								"Cant make it to our live courses?"
							),
							React.createElement(
								"div",
								{ style: { textAlign: "center" } },
								React.createElement(
									"p",
									{ style: { fontSize: 16 } },
									"Join our online service. ",
									React.createElement("br", null),
									"Online members have access to videos, code samples, the forum and more."
								)
							),
							React.createElement(
								"div",
								{ className: "pricing pricing--jinpa" },
								React.createElement(
									"div",
									{ className: "pricing--item", style: { marginRight: 24 } },
									React.createElement(
										"h3",
										{ className: "pricing--title" },
										"Basic"
									),
									React.createElement(
										"div",
										{ style: { fontSize: "1.15em" }, className: "pricing--price" },
										"FREE"
									),
									React.createElement(
										"div",
										{ style: { borderTop: "1px solid #eee", marginTop: 24, paddingTop: 24 } },
										React.createElement(
											"ul",
											{ className: "pricing--feature-list" },
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Limited Video Access"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Forum Access"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Discounts to Live Events"
											)
										)
									),
									React.createElement(
										"button",
										{ onClick: this.showRegistrationForm, id: "basic", className: "pricing--action" },
										"Join"
									)
								),
								React.createElement(
									"div",
									{ className: "pricing--item", style: { marginRight: 24, border: "1px solid #eee" } },
									React.createElement(
										"h3",
										{ className: "pricing--title" },
										"Premium"
									),
									React.createElement(
										"div",
										{ style: { fontSize: "1.15em" }, className: "pricing--price" },
										React.createElement(
											"span",
											{ className: "pricing--currency" },
											"$"
										),
										"19.99/mo"
									),
									React.createElement(
										"div",
										{ style: { borderTop: "1px solid #eee", marginTop: 24, paddingTop: 24 } },
										React.createElement(
											"ul",
											{ className: "pricing--feature-list" },
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Full Video Access"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Downloadable Code Samples"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Customized Job Listings"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Forum Access"
											),
											React.createElement(
												"li",
												{ className: "pricing--feature" },
												"Discounts to Live Events"
											)
										)
									),
									React.createElement(
										"button",
										{ onClick: this.showRegistrationForm, id: "premium", className: "pricing--action" },
										"Join"
									)
								)
							)
						)
					),
					React.createElement(Register, { membershipType: this.state.membershiptype, hide: this.closeModal, isVisible: this.state.showRegistration }),
					React.createElement(Footer, null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Landing;
})(Component);

var stateToProps = function (state) {
	return {
		currentUser: state.profileReducer.currentUser,
		projects: state.projectReducer.projectsArray
	};
};

module.exports = connect(stateToProps)(Landing);