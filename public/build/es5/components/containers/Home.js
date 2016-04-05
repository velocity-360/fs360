"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Nav = _interopRequire(require("../../components/Nav"));

var Footer = _interopRequire(require("../../components/Footer"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var api = _interopRequire(require("../../api/api"));

var Home = (function (Component) {
	function Home(props, context) {
		_classCallCheck(this, Home);

		_get(Object.getPrototypeOf(Home.prototype), "constructor", this).call(this, props, context);
		this.updateUserRegistration = this.updateUserRegistration.bind(this);
		this.register = this.register.bind(this);
	}

	_inherits(Home, Component);

	_prototypeProperties(Home, null, {
		componentWillMount: {
			value: function componentWillMount() {},
			writable: true,
			configurable: true
		},
		componentDidMount: {
			value: function componentDidMount() {
				console.log("HOME: componentDidMount");
				api.handleGet("/api/course", { status: "activ" });
			},
			writable: true,
			configurable: true
		},
		updateUserRegistration: {
			value: function updateUserRegistration(event) {
				event.preventDefault();
				var updatedUser = Object.assign({}, this.props.currentUser);
				updatedUser[event.target.id] = event.target.value;
				store.dispatch(actions.updateCurrentUser(updatedUser));
			},
			writable: true,
			configurable: true
		},
		register: {
			value: function register(event) {
				event.preventDefault();
				console.log("REGISTER: " + JSON.stringify(this.props.currentUser));

			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var courses = this.props.courses.map(function (course, i) {
					var index = i + 1;
					var colClass = index % 3 == 0 ? "col_one_third" : "col_one_third col_last";
					return React.createElement(
						"div",
						{ className: colClass },
						React.createElement(
							"div",
							{ className: "feature-box fbox-plain" },
							React.createElement(
								"div",
								{ className: "fbox-icon", "data-animate": "bounceIn" },
								React.createElement(
									"a",
									{ href: "#" },
									React.createElement("img", { src: "https://media-service.appspot.com/site/images/" + course.image + "?crop=360", alt: "Responsive Layout" })
								)
							),
							React.createElement(
								"h3",
								null,
								course.title
							),
							React.createElement(
								"p",
								null,
								"Powerful Layout with Responsive functionality that can be adapted to any screen size. Resize browser to view."
							)
						)
					);
				});

				return React.createElement(
					"div",
					null,
					React.createElement(Nav, null),
					React.createElement(
						"section",
						{ id: "slider", className: "slider-parallax dark full-screen", style: { background: "url(images/programming.jpg) center" } },
						React.createElement(
							"div",
							{ className: "slider-parallax-inner" },
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
											"Its your time to ",
											React.createElement(
												"strong",
												null,
												"create"
											),
											" Landing Pages for ",
											React.createElement(
												"strong",
												null,
												"FREE"
											)
										),
										React.createElement(
											"span",
											{ "data-animate": "fadeInUp", "data-delay": "300" },
											"Building a Landing Page was never so Easy & Interactive."
										)
									),
									React.createElement(
										"form",
										{ action: "#", method: "post", role: "form", className: "landing-wide-form clearfix" },
										React.createElement(
											"div",
											{ className: "col_four_fifth nobottommargin" },
											React.createElement(
												"div",
												{ className: "col_one_fourth nobottommargin" },
												React.createElement("input", { value: this.props.currentUser.firstName, onChange: this.updateUserRegistration, id: "firstName", type: "text", className: "form-control input-lg not-dark", placeholder: "First Name*" })
											),
											React.createElement(
												"div",
												{ className: "col_one_fourth nobottommargin" },
												React.createElement("input", { value: this.props.currentUser.lastName, onChange: this.updateUserRegistration, id: "lastName", type: "text", className: "form-control input-lg not-dark", placeholder: "Last Name*" })
											),
											React.createElement(
												"div",
												{ className: "col_one_fourth nobottommargin" },
												React.createElement("input", { value: this.props.currentUser.email, onChange: this.updateUserRegistration, id: "email", type: "email", className: "form-control input-lg not-dark", placeholder: "Email*" })
											),
											React.createElement(
												"div",
												{ className: "col_one_fourth col_last nobottommargin" },
												React.createElement("input", { id: "password", type: "password", className: "form-control input-lg not-dark", value: "", placeholder: "Password*" })
											)
										),
										React.createElement(
											"div",
											{ className: "col_one_fifth col_last nobottommargin" },
											React.createElement(
												"button",
												{ className: "btn btn-lg btn-danger btn-block nomargin", value: "submit", type: "submit" },
												"JOIN"
											)
										)
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
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ id: "section-features", className: "heading-block title-center page-section" },
									React.createElement(
										"h2",
										null,
										"Features Overview"
									),
									React.createElement(
										"span",
										null,
										"Some of the Features that are gonna blow your mind off"
									)
								),
								courses,
								React.createElement(
									"div",
									{ className: "col_one_third" },
									React.createElement(
										"div",
										{ className: "feature-box fbox-plain" },
										React.createElement(
											"div",
											{ className: "fbox-icon", "data-animate": "bounceIn", "data-delay": "600" },
											React.createElement(
												"a",
												{ href: "#" },
												React.createElement("img", { src: "/images/icons/features/flag.png", alt: "Responsive Layout" })
											)
										),
										React.createElement(
											"h3",
											null,
											"Endless Possibilities"
										),
										React.createElement(
											"p",
											null,
											"You have complete easy control on each & every element that provides endless customization possibilities."
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third" },
									React.createElement(
										"div",
										{ className: "feature-box fbox-plain" },
										React.createElement(
											"div",
											{ className: "fbox-icon", "data-animate": "bounceIn", "data-delay": "800" },
											React.createElement(
												"a",
												{ href: "#" },
												React.createElement("img", { src: "/images/icons/features/tick.png", alt: "Retina Graphics" })
											)
										),
										React.createElement(
											"h3",
											null,
											"Light & Dark Scheme"
										),
										React.createElement(
											"p",
											null,
											"Change your Websites Primary Scheme instantly by simply adding the dark class to the body."
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third col_last" },
									React.createElement(
										"div",
										{ className: "feature-box fbox-plain" },
										React.createElement(
											"div",
											{ className: "fbox-icon", "data-animate": "bounceIn", "data-delay": "1000" },
											React.createElement(
												"a",
												{ href: "#" },
												React.createElement("img", { src: "/images/icons/features/tools.png", alt: "Powerful Performance" })
											)
										),
										React.createElement(
											"h3",
											null,
											"Customizable Fonts"
										),
										React.createElement(
											"p",
											null,
											"Use any Font you like from Google Web Fonts, Typekit or other Web Fonts. They will blend in perfectly."
										)
									)
								),
								React.createElement("div", { className: "clear" }),
								React.createElement(
									"div",
									{ className: "col_one_third" },
									React.createElement(
										"div",
										{ className: "feature-box fbox-plain" },
										React.createElement(
											"div",
											{ className: "fbox-icon", "data-animate": "bounceIn", "data-delay": "1200" },
											React.createElement(
												"a",
												{ href: "#" },
												React.createElement("img", { src: "/images/icons/features/map.png", alt: "Responsive Layout" })
											)
										),
										React.createElement(
											"h3",
											null,
											"Responsive Layout"
										),
										React.createElement(
											"p",
											null,
											"Powerful Layout with Responsive functionality that can be adapted to any screen size. Resize browser to view."
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third" },
									React.createElement(
										"div",
										{ className: "feature-box fbox-plain" },
										React.createElement(
											"div",
											{ className: "fbox-icon", "data-animate": "bounceIn", "data-delay": "1400" },
											React.createElement(
												"a",
												{ href: "#" },
												React.createElement("img", { src: "/images/icons/features/seo.png", alt: "Retina Graphics" })
											)
										),
										React.createElement(
											"h3",
											null,
											"Retina Graphics"
										),
										React.createElement(
											"p",
											null,
											"Looks beautiful & ultra-sharp on Retina Screen Displays. Retina Icons, Fonts & all others graphics are optimized."
										)
									)
								),
								React.createElement(
									"div",
									{ className: "col_one_third col_last" },
									React.createElement(
										"div",
										{ className: "feature-box fbox-plain" },
										React.createElement(
											"div",
											{ className: "fbox-icon", "data-animate": "bounceIn", "data-delay": "1600" },
											React.createElement(
												"a",
												{ href: "#" },
												React.createElement("img", { src: "/images/icons/features/support.png", alt: "Powerful Performance" })
											)
										),
										React.createElement(
											"h3",
											null,
											"Powerful Performance"
										),
										React.createElement(
											"p",
											null,
											"Canvas includes tons of optimized code that are completely customizable and deliver unmatched fast performance."
										)
									)
								),
								React.createElement("div", { className: "clear" }),
								React.createElement(
									"div",
									{ className: "divider divider-short divider-center" },
									React.createElement("i", { className: "icon-circle" })
								),
								React.createElement(
									"div",
									{ id: "section-pricing", className: "heading-block title-center nobottomborder page-section" },
									React.createElement(
										"h2",
										null,
										"Pricing Details"
									),
									React.createElement(
										"span",
										null,
										"Our All inclusive Pricing Plan that covers you well"
									)
								),
								React.createElement(
									"div",
									{ className: "pricing-box pricing-extended bottommargin clearfix" },
									React.createElement(
										"div",
										{ className: "pricing-desc" },
										React.createElement(
											"div",
											{ className: "pricing-title" },
											React.createElement(
												"h3",
												null,
												"How many Themes can you Download today?"
											)
										),
										React.createElement(
											"div",
											{ className: "pricing-features" },
											React.createElement(
												"ul",
												{ className: "iconlist-color clearfix" },
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-desktop" }),
													" Ultra Responsive Layouts"
												),
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-eye-open" }),
													" Retina Ready Designs"
												),
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-beaker" }),
													" Advanced Admin Panel"
												),
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-magic" }),
													" Tons of Customization Options"
												),
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-font" }),
													" Support for Custom Fonts"
												),
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-stack3" }),
													" Premium Sliders Included"
												),
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-file2" }),
													" Photoshop Source Files Included"
												),
												React.createElement(
													"li",
													null,
													React.createElement("i", { className: "icon-support" }),
													" 24x7 Priority Email Support"
												)
											)
										)
									),
									React.createElement(
										"div",
										{ className: "pricing-action-area" },
										React.createElement(
											"div",
											{ className: "pricing-meta" },
											"As Low as"
										),
										React.createElement(
											"div",
											{ className: "pricing-price" },
											React.createElement(
												"span",
												{ className: "price-unit" },
												"€"
											),
											"39",
											React.createElement(
												"span",
												{ className: "price-tenure" },
												"monthly"
											)
										),
										React.createElement(
											"div",
											{ className: "pricing-action" },
											React.createElement(
												"a",
												{ href: "#", className: "button button-3d button-large btn-block nomargin" },
												"Get Started"
											)
										)
									)
								),
								React.createElement("div", { className: "clear" })
							),
							React.createElement(
								"div",
								{ className: "section" },
								React.createElement(
									"div",
									{ className: "container clearfix" },
									React.createElement(
										"div",
										{ id: "section-testimonials", className: "heading-block title-center page-section" },
										React.createElement(
											"h2",
											null,
											"Testimonials"
										),
										React.createElement(
											"span",
											null,
											"Our All inclusive Pricing Plan that covers you well"
										)
									),
									React.createElement(
										"ul",
										{ className: "testimonials-grid grid-3 clearfix" },
										React.createElement(
											"li",
											null,
											React.createElement(
												"div",
												{ className: "testimonial" },
												React.createElement(
													"div",
													{ className: "testi-image" },
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("img", { src: "/images/testimonials/1.jpg", alt: "Customer Testimonails" })
													)
												),
												React.createElement(
													"div",
													{ className: "testi-content" },
													React.createElement(
														"p",
														null,
														"Incidunt deleniti blanditiis quas aperiam recusandae consequatur ullam quibusdam cum libero illo rerum repellendus!"
													),
													React.createElement(
														"div",
														{ className: "testi-meta" },
														"John Doe",
														React.createElement(
															"span",
															null,
															"XYZ Inc."
														)
													)
												)
											)
										),
										React.createElement(
											"li",
											null,
											React.createElement(
												"div",
												{ className: "testimonial" },
												React.createElement(
													"div",
													{ className: "testi-image" },
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("img", { src: "/images/testimonials/2.jpg", alt: "Customer Testimonails" })
													)
												),
												React.createElement(
													"div",
													{ className: "testi-content" },
													React.createElement(
														"p",
														null,
														"Natus voluptatum enim quod necessitatibus quis expedita harum provident eos obcaecati id culpa corporis molestias."
													),
													React.createElement(
														"div",
														{ className: "testi-meta" },
														"Collis Taeed",
														React.createElement(
															"span",
															null,
															"Envato Inc."
														)
													)
												)
											)
										),
										React.createElement(
											"li",
											null,
											React.createElement(
												"div",
												{ className: "testimonial" },
												React.createElement(
													"div",
													{ className: "testi-image" },
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("img", { src: "/images/testimonials/7.jpg", alt: "Customer Testimonails" })
													)
												),
												React.createElement(
													"div",
													{ className: "testi-content" },
													React.createElement(
														"p",
														null,
														"Fugit officia dolor sed harum excepturi ex iusto magnam asperiores molestiae qui natus obcaecati facere sint amet."
													),
													React.createElement(
														"div",
														{ className: "testi-meta" },
														"Mary Jane",
														React.createElement(
															"span",
															null,
															"Google Inc."
														)
													)
												)
											)
										),
										React.createElement(
											"li",
											null,
											React.createElement(
												"div",
												{ className: "testimonial" },
												React.createElement(
													"div",
													{ className: "testi-image" },
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("img", { src: "/images/testimonials/3.jpg", alt: "Customer Testimonails" })
													)
												),
												React.createElement(
													"div",
													{ className: "testi-content" },
													React.createElement(
														"p",
														null,
														"Similique fugit repellendus expedita excepturi iure perferendis provident quia eaque. Repellendus, vero numquam?"
													),
													React.createElement(
														"div",
														{ className: "testi-meta" },
														"Steve Jobs",
														React.createElement(
															"span",
															null,
															"Apple Inc."
														)
													)
												)
											)
										),
										React.createElement(
											"li",
											null,
											React.createElement(
												"div",
												{ className: "testimonial" },
												React.createElement(
													"div",
													{ className: "testi-image" },
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("img", { src: "/images/testimonials/4.jpg", alt: "Customer Testimonails" })
													)
												),
												React.createElement(
													"div",
													{ className: "testi-content" },
													React.createElement(
														"p",
														null,
														"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, perspiciatis illum totam dolore deleniti labore."
													),
													React.createElement(
														"div",
														{ className: "testi-meta" },
														"Jamie Morrison",
														React.createElement(
															"span",
															null,
															"Adobe Inc."
														)
													)
												)
											)
										),
										React.createElement(
											"li",
											null,
											React.createElement(
												"div",
												{ className: "testimonial" },
												React.createElement(
													"div",
													{ className: "testi-image" },
													React.createElement(
														"a",
														{ href: "#" },
														React.createElement("img", { src: "/images/testimonials/8.jpg", alt: "Customer Testimonails" })
													)
												),
												React.createElement(
													"div",
													{ className: "testi-content" },
													React.createElement(
														"p",
														null,
														"Porro dolorem saepe reiciendis nihil minus neque. Ducimus rem necessitatibus repellat laborum nemo quod."
													),
													React.createElement(
														"div",
														{ className: "testi-meta" },
														"Cyan Taceed",
														React.createElement(
															"span",
															null,
															"Tutsplus"
														)
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
									{ id: "section-specs", className: "heading-block title-center page-section" },
									React.createElement(
										"h2",
										null,
										"Product Specifications"
									),
									React.createElement(
										"span",
										null,
										"Complete list of the Tech Specifications for your understanding"
									)
								),
								React.createElement(
									"div",
									{ id: "side-navigation" },
									React.createElement(
										"div",
										{ className: "col_one_third" },
										React.createElement(
											"ul",
											{ className: "sidenav" },
											React.createElement(
												"li",
												{ className: "ui-tabs-active" },
												React.createElement(
													"a",
													{ href: "#snav-content1" },
													React.createElement("i", { className: "icon-screen" }),
													"Responsive Layout",
													React.createElement("i", { className: "icon-chevron-right" })
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#snav-content2" },
													React.createElement("i", { className: "icon-magic" }),
													"Retina Ready Display",
													React.createElement("i", { className: "icon-chevron-right" })
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#snav-content3" },
													React.createElement("i", { className: "icon-tint" }),
													"Unlimited Color Options",
													React.createElement("i", { className: "icon-chevron-right" })
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#snav-content4" },
													React.createElement("i", { className: "icon-gift" }),
													"Bootstrap 3.1 Compatible",
													React.createElement("i", { className: "icon-chevron-right" })
												)
											),
											React.createElement(
												"li",
												null,
												React.createElement(
													"a",
													{ href: "#snav-content5" },
													React.createElement("i", { className: "icon-adjust" }),
													"Light & Dark Scheme",
													React.createElement("i", { className: "icon-chevron-right" })
												)
											)
										)
									),
									React.createElement(
										"div",
										{ className: "col_two_third col_last" },
										React.createElement(
											"div",
											{ id: "snav-content1" },
											React.createElement(
												"h3",
												null,
												"Ultra Responsive Template"
											),
											React.createElement("img", { className: "alignright img-responsive", src: "/images/landing/responsive.png", alt: "" }),
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, ex, inventore, tenetur, repellat ipsam soluta libero amet nam aspernatur perspiciatis quos praesentium et debitis ea odit enim illo aliquid eligendi numquam neque. Ipsum, voluptatibus, perspiciatis a quam aliquid cumque cupiditate id ipsa tempora eveniet. Cupiditate, necessitatibus, consequatur odio. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, vitae, laboriosam libero nihil labore hic modi? Odit, veritatis nulla molestiae!"
										),
										React.createElement(
											"div",
											{ id: "snav-content2" },
											React.createElement(
												"h3",
												null,
												"Retina Ready Display"
											),
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, voluptatem reprehenderit natus facilis id deserunt iusto incidunt cumque odit molestias iste dolor eum esse soluta facere quidem minima in voluptate explicabo ducimus alias ratione aut molestiae omnis fuga labore quod optio modi voluptatum nemo suscipit porro maxime ex. Maiores, ratione eligendi labore quaerat veniam laborum nam rem delectus illum aspernatur quas sequi animi quae nulla alias hic inventore ex perspiciatis nisi consequatur enim a aut dolorum modi quod perferendis dicta impedit magni placeat repellat. Soluta, dicta, dolores, reiciendis, eum accusamus esse et debitis rem fugit fugiat dignissimos pariatur sint quod laborum autem. Nulla, ducimus, culpa, vel esse unde sapiente expedita corrupti consectetur veritatis quas autem laborum mollmquam amet eius. Numquam, ad, quaerat, ab, deleniti rem quae doloremque tenetur ea illum hic amet dolor suscipit porro ducimus excepturi perspiciatis modi praesentium voluptas quos expedita provident adipisci dolorem! Aliquam, ipsum voluptatem et voluptates impedit ab libero similique a. Nisi, ea magni et ab voluptatum nemo numquam odio quis libero aspernatur architecto tempore qui quisquam saepe corrupti necessitatibus natus quos aliquid non voluptatibus quod obcaecati fugiat quibusdam quidem inventore quia eveniet iusto culpa incidunt vero vel in accusamus eum. Molestiae nihil voluptate molestias illum eligendi esse nesciunt."
										),
										React.createElement(
											"div",
											{ id: "snav-content3" },
											React.createElement("img", { className: "alignleft img-responsive", src: "http://www.w3schools.com/tags/colormap.gif", alt: "" }),
											React.createElement(
												"h3",
												null,
												"Unlimited Color Options"
											),
											"Dolor aperiam modi aliquam dolores consequatur error commodi ad eius incidunt! Libero, odio incidunt ullam sunt fugiat? Laboriosam, perferendis, debitis, harum soluta iste eos sunt odit architecto porro eveniet sint optio nihil animi. Laudantium, quam, culpa, velit molestias exercitationem reprehenderit enim distinctio aliquam aut ex numquam sequi assumenda veritatis fuga voluptatum. Magni, voluptates adipisci unde sapiente eligendi ea maxime tempora pariatur ipsa.. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, aspernatur, saepe, quidem animi hic rem libero earum fuga voluptas culpa iure qui accusantium ab quae dolorum laborum quia repellat fugit aut minima molestias placeat mollitia doloribus quibusdam consectetur officia nesciunt ad. Ab, quod ipsum commodi assumenda doloribus possimus sed laudantium.Lorem ipsum dolor sit amet, consectetur adipisicing elit."
										),
										React.createElement(
											"div",
											{ id: "snav-content4" },
											React.createElement("img", { className: "alignleft img-responsive", src: "/images/landing/bootstrap.png", alt: "" }),
											React.createElement(
												"h3",
												null,
												"Bootstrap v3.2.0 Compatiable"
											),
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, nostrum, dolores id quo nam repudiandae ad culpa architecto minima nemo eaque soluta nulla laborum neque provident saepe facilis expedita numquam quas alias in perferendis accusamus ipsam blanditiis sit voluptatem temporibus vero error veritatis repellat eos reiciendis repellendus quam. Officia dicta ipsam nostrum aperiam. Dolor, expedita enim modi nostrum commodi sint architecto aliquam aut mollitia repellendus deserunt quaerat aspernatur aperiam voluptatibus consequatur rerum consequuntur."
										),
										React.createElement(
											"div",
											{ id: "snav-content5" },
											React.createElement(
												"h3",
												null,
												"Light & Dark Scheme Available"
											),
											"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, temporibus, maxime, laudantium quidem sapiente deserunt error rerum illum explicabo voluptate velit tempora cupiditate reprehenderit consequuntur nemo in et blanditiis soluta tempore perspiciatis at atque excepturi culpa facere sequi impedit cumque illo molestias saepe eveniet ducimus fugiat reiciendis unde. Modi, at laboriosam ex velit commodi officiis! Neque, consequatur, modi, nulla, voluptatem quibusdam incidunt minus dolores repellat nihil consectetur ducimus aliquid. Eaque, tempora voluptatum accusantium expedita obcaecati magnam voluptates consequatur ut harum rem dolor id error. Officia, repudiandae, eos, quibusdam porro eius esse cupiditate non fugit dignissimos delectus et tempora sequi fugiat quo voluptatem temporibus vel obcaecati? Laboriosam, quis obcaecati quas veniam repellendus officiis et quos velit id natus mollitia dacilis ipsum et perspiciatis officia iste cupiditate ducimus nisi consequuntur excepturi dolorum. Sint, architecto, cumque facere officia harum dicta perferendis inventore excepturi sequi explicabo provident omnis dolore quasi fugit molestiae atque id consectetur reprehenderit laborum beatae consequatur similique."
										)
									)
								)
							),
							React.createElement(
								"div",
								{ className: "section footer-stick" },
								React.createElement(
									"div",
									{ className: "container clearfix" },
									React.createElement(
										"div",
										{ id: "section-buy", className: "heading-block title-center nobottomborder page-section" },
										React.createElement(
											"h2",
											null,
											"Enough? Start Building!"
										),
										React.createElement(
											"span",
											null,
											"Now that you have read all the Tid-Bits, so start with a plan"
										)
									),
									React.createElement(
										"div",
										{ className: "center" },
										React.createElement(
											"a",
											{ href: "#", "data-animate": "tada", className: "button button-3d button-teal button-xlarge nobottommargin" },
											React.createElement("i", { className: "icon-star3" }),
											"Start your FREE Trial"
										),
										" - OR - ",
										React.createElement(
											"a",
											{ href: "#", "data-scrollto": "#section-pricing", className: "button button-3d button-red button-xlarge nobottommargin" },
											React.createElement("i", { className: "icon-user2" }),
											"Sign Up for a Subscription"
										)
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

	return Home;
})(Component);

var stateToProps = function (state) {
	console.log("STATE TO PROPS: " + JSON.stringify(state));
	return {
		currentUser: state.profileReducer.currentUser,
		courses: state.courseReducer.courses
	};
};

// const StoreSelector = function(store){
// 	console.log('StoreSelector: '+JSON.stringify(store.profileReducer.currentUser));
// 	return {
// 		currentUser: store.profileReducer.currentUser
// 	}

// }

module.exports = connect(stateToProps)(Home);
//		getCurrentUser()