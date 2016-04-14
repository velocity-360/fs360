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
var Loader = _interopRequire(require("react-loader"));

var Sidebar = _interopRequire(require("../../components/Sidebar"));

var Footer = _interopRequire(require("../../components/Footer"));

var CourseSection = _interopRequire(require("../../components/CourseSection"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var Course = (function (Component) {
	function Course(props, context) {
		_classCallCheck(this, Course);

		_get(Object.getPrototypeOf(Course.prototype), "constructor", this).call(this, props, context);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.state = {
			showLoader: false,
			showModal: false };
	}

	_inherits(Course, Component);

	_prototypeProperties(Course, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				api.handleGet("/api/course?slug=" + this.props.slug, {}, function (err, response) {
					if (err) {
						alert(response.message);
						return;
					}

					store.dispatch(actions.coursesRecieved(response.courses));
				});
			},
			writable: true,
			configurable: true
		},
		openModal: {
			value: function openModal(event) {
				event.preventDefault();
				this.setState({ showModal: true });
			},
			writable: true,
			configurable: true
		},
		closeModal: {
			value: function closeModal() {
				this.setState({ showModal: false });
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var _course = this.props.course;
				var units = this.props.course.units.map(function (unit, i) {
					return React.createElement(CourseSection, { key: unit.index, unit: unit, course: _course });
				});


				if (this.props.slug == "ios-high-school-course") {
					console.log("IOS HIGH SCHOOL COURSE");
				}


				return React.createElement(
					"div",
					null,
					React.createElement(Loader, { options: this.props.loaderOptions, loaded: !this.state.showLoader, className: "spinner", loadedClassName: "loadedContent" }),
					React.createElement(Sidebar, null),
					React.createElement(
						"section",
						{ id: "content", style: { backgroundColor: "#F5F5F5" } },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "postcontent nobottommargin col_last clearfix" },
									React.createElement(
										"div",
										{ id: "posts", className: "post-timeline clearfix" },
										React.createElement("div", { className: "timeline-border" }),
										React.createElement(
											"div",
											{ className: "entry clearfix" },
											React.createElement(
												"div",
												{ className: "entry-timeline" },
												"10",
												React.createElement(
													"span",
													null,
													"Feb"
												),
												React.createElement("div", { className: "timeline-divider" })
											),
											React.createElement(
												"div",
												{ className: "entry-image" },
												React.createElement(
													"a",
													{ href: "/images/blog/full/17.jpg", "data-lightbox": "image" },
													React.createElement("img", { className: "image_fade", src: "/images/hacking-2.jpg", alt: "Standard Post with Image" })
												)
											),
											React.createElement(
												"div",
												{ className: "entry-content" },
												React.createElement(
													"div",
													{ className: "col_half" },
													React.createElement(
														"h2",
														{ style: { marginBottom: 0 } },
														this.props.course.title
													),
													React.createElement(
														"p",
														null,
														this.props.course.description
													)
												),
												React.createElement(
													"div",
													{ className: "col_half panel panel-default col_last" },
													React.createElement(
														"div",
														{ style: { backgroundColor: "#f1f9f5" }, className: "panel-heading" },
														"Details"
													),
													React.createElement(
														"div",
														{ className: "panel-body" },
														this.props.course.dates,
														React.createElement("br", null),
														this.props.course.schedule,
														React.createElement("br", null),
														"Tuition: $",
														this.props.course.tuition,
														React.createElement("br", null),
														"Depost: $",
														this.props.course.deposit,
														React.createElement("hr", null),
														React.createElement(
															"a",
															{ href: "#", onClick: this.openModal, style: { marginRight: 12 }, className: "button button-border button-dark button-rounded noleftmargin" },
															"Apply"
														),
														React.createElement(
															"a",
															{ href: "#", onClick: this.openModal, className: "button button-border button-dark button-rounded noleftmargin" },
															"Request Syllabus"
														)
													)
												)
											)
										),
										units,
										React.createElement(
											"div",
											{ className: "entry clearfix" },
											React.createElement(
												"div",
												{ className: "entry-timeline" },
												"Unit",
												React.createElement(
													"span",
													null,
													"!"
												),
												React.createElement("div", { className: "timeline-divider" })
											),
											React.createElement(
												"div",
												{ className: "entry-image" },
												React.createElement(
													"div",
													{ className: "panel panel-default" },
													React.createElement(
														"div",
														{ className: "panel-body", style: { padding: 36 } },
														React.createElement(
															"h2",
															null,
															"Sign Up"
														),
														React.createElement("hr", null),
														"Ready to take the plunge? Need more information? Request a syllabus below or begin the application process.",
														React.createElement(
															"a",
															{ onClick: this.openModal, href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
															"Apply"
														),
														React.createElement(
															"a",
															{ onClick: this.openModal, href: "#", className: "button button-border button-dark button-rounded button-large noleftmargin topmargin-sm" },
															"Request Syllabus"
														)
													)
												)
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						"section",
						{ id: "content", style: { backgroundColor: "#fff", paddingBottom: 48 } },
						React.createElement(
							"div",
							{ className: "row common-height clearfix", style: { background: "#fff", border: "1px solid #ddd" } },
							React.createElement(
								"div",
								{ className: "col-sm-8 col-padding" },
								React.createElement(
									"div",
									null,
									React.createElement(
										"div",
										{ className: "heading-block" },
										React.createElement(
											"h3",
											null,
											"Welcome"
										)
									),
									React.createElement(
										"div",
										{ className: "row clearfix" },
										React.createElement(
											"div",
											{ className: "col-md-10" },
											React.createElement(
												"p",
												null,
												"Our Mission is to teach you tomorrow’s technology, today.  If you want to work for a leading tech firm, for a technology startup, or become an entrepreneur, this 2-week class will put you on the right track to achieve any of these goals.  This iOS class is based entirely on Swift language, which is the main language you will need to know while developing the majority of iOS app.  In our iOS class you will not be learning how to program games, however you will be able to learn how to develop social media applications similar to Snapchat and Instagram."
											),
											React.createElement(
												"p",
												null,
												"Even if you do not want to become a professional developer and have it become your lifelong career, learning how an iOS app developed will give you the edge both in the immediate and distant future.  It might be a cliché, but learning how to code will empower you to act on future ideas.  For example if you are sitting in class one day and think of the next great social media app, it doesn’t have to just be a pipe dream or something that you would have to rely on someone else to build, it could be a project that you start building right away."
											),
											React.createElement(
												"a",
												{ href: "#", className: "social-icon inline-block si-small si-light si-rounded si-facebook" },
												React.createElement("i", { className: "icon-facebook" }),
												React.createElement("i", { className: "icon-facebook" })
											),
											React.createElement(
												"a",
												{ href: "#", className: "social-icon inline-block si-small si-light si-rounded si-twitter" },
												React.createElement("i", { className: "icon-twitter" }),
												React.createElement("i", { className: "icon-twitter" })
											),
											React.createElement(
												"a",
												{ href: "#", className: "social-icon inline-block si-small si-light si-rounded si-gplus" },
												React.createElement("i", { className: "icon-gplus" }),
												React.createElement("i", { className: "icon-gplus" })
											)
										)
									)
								)
							),
							React.createElement("div", { className: "col-sm-4 col-padding", style: { background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: "cover" } })
						),
						React.createElement(
							"div",
							{ className: "content-wrap", style: { background: "#f9f9f9", borderBottom: "1px solid #ddd" } },
							React.createElement(
								"div",
								{ className: "container clear-bottommargin clearfix" },
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "col-md-4 col-sm-6 bottommargin" },
										React.createElement(
											"div",
											{ className: "ipost clearfix" },
											React.createElement(
												"div",
												{ className: "entry-image" },
												React.createElement(
													"a",
													{ href: "#" },
													React.createElement("img", { className: "image_fade", src: "/images/magazine/thumb/1.jpg", alt: "Image" })
												)
											),
											React.createElement(
												"div",
												{ className: "entry-title" },
												React.createElement(
													"h3",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html" },
														"Bloomberg smart cities; change-makers economic security"
													)
												)
											),
											React.createElement(
												"ul",
												{ className: "entry-meta clearfix" },
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-calendar3" }),
													" 13th Jun 2014"
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html#comments" },
														React.createElement("i", { className: "icon-comments" }),
														" 53"
													)
												)
											),
											React.createElement(
												"div",
												{ className: "entry-content" },
												React.createElement(
													"p",
													null,
													"Prevention effect, advocate dialogue rural development lifting people up community civil society. Catalyst, grantees leverage."
												)
											)
										)
									),
									React.createElement(
										"div",
										{ className: "col-md-4 col-sm-6 bottommargin" },
										React.createElement(
											"div",
											{ className: "ipost clearfix" },
											React.createElement(
												"div",
												{ className: "entry-image" },
												React.createElement(
													"a",
													{ href: "#" },
													React.createElement("img", { className: "image_fade", src: "/images/magazine/thumb/2.jpg", alt: "Image" })
												)
											),
											React.createElement(
												"div",
												{ className: "entry-title" },
												React.createElement(
													"h3",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html" },
														"Medicine new approaches communities, outcomes partnership"
													)
												)
											),
											React.createElement(
												"ul",
												{ className: "entry-meta clearfix" },
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-calendar3" }),
													" 24th Feb 2014"
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html#comments" },
														React.createElement("i", { className: "icon-comments" }),
														" 17"
													)
												)
											),
											React.createElement(
												"div",
												{ className: "entry-content" },
												React.createElement(
													"p",
													null,
													"Cross-agency coordination clean water rural, promising development turmoil inclusive education transformative community."
												)
											)
										)
									),
									React.createElement(
										"div",
										{ className: "col-md-4 col-sm-6 bottommargin" },
										React.createElement(
											"div",
											{ className: "ipost clearfix" },
											React.createElement(
												"div",
												{ className: "entry-image" },
												React.createElement(
													"a",
													{ href: "#" },
													React.createElement("img", { className: "image_fade", src: "/images/magazine/thumb/4.jpg", alt: "Image" })
												)
											),
											React.createElement(
												"div",
												{ className: "entry-title" },
												React.createElement(
													"h3",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html" },
														"Compassion conflict resolution, progressive; tackle"
													)
												)
											),
											React.createElement(
												"ul",
												{ className: "entry-meta clearfix" },
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-calendar3" }),
													" 15th Jan 2014"
												),
												React.createElement(
													"li",
													null,
													React.createElement(
														"a",
														{ href: "blog-single.html#comments" },
														React.createElement("i", { className: "icon-comments" }),
														" 54"
													)
												)
											),
											React.createElement(
												"div",
												{ className: "entry-content" },
												React.createElement(
													"p",
													null,
													"Community health workers best practices, effectiveness meaningful work The Elders fairness. Our ambitions local solutions globalization."
												)
											)
										)
									)
								)
							)
						),
						React.createElement(
							"div",
							{ className: "container clearfix" },
							React.createElement(
								"div",
								{ id: "faqs", className: "faqs" },
								React.createElement(
									"h3",
									{ style: { marginTop: 48 } },
									"Some of your Questions:"
								),
								React.createElement(
									"div",
									{ className: "divider" },
									React.createElement("i", { className: "icon-circle" })
								),
								React.createElement(
									"div",
									{ className: "col_half nobottommargin" },
									React.createElement(
										"h4",
										{ id: "faq-1" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" How do I become an author?"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla."
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-2" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" Helpful Resources for Authors"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, placeat, architecto rem dolorem dignissimos repellat veritatis in et eos doloribus magnam aliquam ipsa alias assumenda officiis quasi sapiente suscipit veniam odio voluptatum. Enim at asperiores quod velit minima officia accusamus cumque eligendi consequuntur fuga? Maiores, quasi, voluptates, exercitationem fuga voluptatibus a repudiandae expedita omnis molestiae alias repellat perferendis dolores dolor."
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-3" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" How much money can I make?"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, fugiat iste nisi tempore nesciunt nemo fuga? Nesciunt, delectus laboriosam nisi repudiandae nam fuga saepe animi recusandae. Asperiores, provident, esse, doloremque, adipisci eaque alias dolore molestias assumenda quasi saepe nisi ab illo ex nesciunt nobis laboriosam iusto quia nulla ad voluptatibus iste beatae voluptas corrupti facilis accusamus recusandae sequi debitis reprehenderit quibusdam. Facilis eligendi a exercitationem nisi et placeat excepturi velit!"
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-4" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" Can I offer my items for free on a promotional basis?"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, fugiat iste nisi tempore nesciunt nemo fuga? Nesciunt, delectus laboriosam nisi repudiandae nam fuga saepe animi recusandae. Asperiores, provident, esse, doloremque, adipisci eaque alias dolore molestias assumenda quasi saepe nisi ab illo ex nesciunt nobis laboriosam iusto quia nulla ad voluptatibus iste beatae voluptas corrupti facilis accusamus recusandae sequi debitis reprehenderit quibusdam. Facilis eligendi a exercitationem nisi et placeat excepturi velit!"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed facere eos harum ipsum quia recusandae sunt fugit ad quaerat sapiente. Iure, ut maiores commodi voluptas ullam sunt harum autem veniam."
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-5" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" An Introduction to the Marketplaces for Authors"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, quisquam atque vero delectus corrupti! Quo, maiores, dolorem, hic commodi nulla ratione accusamus doloribus fuga magnam id temporibus dignissimos deleniti quidem ipsam corporis sapiente nam expedita saepe quas ab? Vero, assumenda."
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-6" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" How does the Tuts+ Premium affiliate program work?"
									),
									React.createElement(
										"p",
										{ className: "nobottommargin" },
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad odio ab quis architecto recusandae doloremque incidunt! Eius, quidem, pariatur necessitatibus commodi aliquid deleniti repudiandae accusantium tempora soluta vel nesciunt est quibusdam iure adipisci aspernatur maiores saepe ea eaque quo harum reprehenderit similique nemo voluptate ullam natus illum magnam alias nobis doloremque delectus ipsa dicta repellat maxime dignissimos eveniet quae debitis ratione assumenda tempore officiis fugiat dolor. Saepe iusto praesentium ullam aliquam impedit distinctio blanditiis soluta cum! Fugiat, aliquam, ad, nam mollitia accusantium facere fugit ex libero quidem cupiditate placeat eveniet provident id aspernatur harum sed in enim cum reiciendis delectus."
									)
								),
								React.createElement(
									"div",
									{ className: "col_half nobottommargin col_last" },
									React.createElement(
										"h4",
										{ id: "faq-7" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" What Images, Videos, Code or Music Can I Use in my Items?"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad odio ab quis architecto recusandae doloremque incidunt! Eius, quidem, pariatur necessitatibus commodi aliquid deleniti repudiandae accusantium tempora soluta vel nesciunt est quibusdam iure adipisci aspernatur maiores saepe ea eaque quo harum reprehenderit similique nemo voluptate ullam natus illum magnam alias nobis doloremque delectus ipsa dicta repellat maxime dignissimos eveniet quae debitis ratione assumenda tempore officiis fugiat dolor. Saepe iusto praesentium ullam aliquam impedit."
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-8" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" Can I use trademarked names in my items?"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, nisi, laborum autem reprehenderit excepturi harum ipsum quod sit. Inventore et sunt nemo natus labore voluptate omnis reprehenderit culpa. Minus vitae molestiae totam ut a accusamus at fugiat nemo debitis delectus? Consectetur, deleniti, cupiditate ad doloribus numquam minus illum fugit laborum a voluptatum nulla at autem ab beatae odio dolorem assumenda magni laudantium saepe recusandae doloremque illo nesciunt aut quos debitis neque reiciendis veritatis iusto eos aliquid voluptatem pariatur eveniet velit?"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, esse, dolore, animi sed aliquam est consequatur atque magnam sunt voluptas nostrum sint minus neque iste ut velit iure eius! Hic, laudantium, consequatur veniam magnam ullam eveniet sed minus rem deleniti!"
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-9" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" Tips for Increasing Your Referral Income"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, nisi, laborum autem reprehenderit excepturi harum ipsum quod sit. Inventore et sunt nemo natus labore voluptate omnis reprehenderit culpa. Minus vitae molestiae totam ut a accusamus at fugiat nemo debitis delectus? Consectetur, deleniti, cupiditate ad doloribus numquam minus illum fugit laborum a voluptatum nulla at autem ab beatae odio dolorem assumenda magni laudantium saepe recusandae doloremque illo nesciunt aut quos debitis neque reiciendis veritatis iusto eos aliquid voluptatem pariatur eveniet velit?"
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-10" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" How can I get support for an item which isnt working correctly?"
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, culpa eaque! Accusamus, molestiae, aspernatur, consequatur eaque laborum ipsum iure tempora minus laudantium inventore dolor assumenda magni cum id odio quam."
									),
									React.createElement(
										"p",
										null,
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo iusto aliquam voluptatem? Reiciendis, beatae, ipsam delectus voluptas ea error voluptates labore corporis ad tenetur sunt temporibus aperiam sit quis quasi tempora enim quo numquam provident ullam velit cumque similique veritatis quidem aliquam voluptatibus atque fugiat recusandae accusamus praesentium aut ipsa."
									),
									React.createElement("div", { className: "line" }),
									React.createElement(
										"h4",
										{ id: "faq-11" },
										React.createElement(
											"strong",
											null,
											"Q."
										),
										" How do I pay for items on the Marketplaces?"
									),
									React.createElement(
										"p",
										{ className: "nobottommargin" },
										"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo iusto aliquam voluptatem? Reiciendis, beatae, ipsam delectus voluptas ea error voluptates labore corporis ad tenetur sunt temporibus aperiam sit quis quasi tempora enim quo numquam provident ullam velit cumque similique veritatis quidem aliquam voluptatibus atque fugiat recusandae accusamus praesentium aut ipsa."
									)
								)
							)
						)
					),
					React.createElement(
						Modal,
						{ show: this.state.showModal, onHide: this.closeModal },
						React.createElement(
							Modal.Header,
							{ closeButton: true, style: { textAlign: "center", padding: 12 } },
							React.createElement(
								"h2",
								null,
								"Request Syllabus"
							)
						),
						React.createElement(
							Modal.Body,
							{ style: { background: "#f9f9f9", padding: 24 } },
							React.createElement("input", { className: "form-control", type: "text", id: "name", placeholder: "Name" }),
							React.createElement("br", null),
							React.createElement("input", { className: "form-control", type: "text", id: "email", placeholder: "Email" }),
							React.createElement("br", null)
						),
						React.createElement(
							Modal.Footer,
							{ style: { textAlign: "center" } },
							React.createElement(
								"a",
								{ href: "#", style: { marginRight: 12 }, className: "button button-border button-dark button-rounded button-large noleftmargin" },
								"Submit"
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

	return Course;
})(Component);

var stateToProps = function (state) {
	//	console.log('STATE TO PROPS: '+JSON.stringify(state));
	var keys = Object.keys(state.courseReducer.courses);

	return {
		currentUser: state.profileReducer.currentUser,
		course: state.courseReducer.courses[keys[0]],
		//course: state.courseReducer.courseArray[0],
		testimonials: state.staticReducer.testimonials,
		loaderOptions: state.staticReducer.loaderConfig

	};
};


module.exports = connect(stateToProps)(Course);