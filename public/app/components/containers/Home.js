import React, {Component} from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Home extends Component {

	constructor(props, context){
		super(props, context)
		this.updateUserRegistration = this.updateUserRegistration.bind(this)
		this.register = this.register.bind(this)
	}

	componentWillMount(){
//		getCurrentUser()
	}

	componentDidMount(){
		console.log('HOME: componentDidMount')
		api.handleGet('/api/course', {status: 'activ'});

	}

	updateUserRegistration(event){
		event.preventDefault()
		var updatedUser = Object.assign({}, this.props.currentUser);
		updatedUser[event.target.id] = event.target.value
		store.dispatch(actions.updateCurrentUser(updatedUser));
	}

	register(event){
		event.preventDefault()
		console.log('REGISTER: '+JSON.stringify(this.props.currentUser));

		
	}

	render(){
		var courses = this.props.courses.map(function(course, i){
			var index = i+1;
			var colClass = (index%3 == 0) ? "col_one_third" : "col_one_third col_last";
			return (
				<div className={colClass}>
					<div className="feature-box fbox-plain">
						<div className="fbox-icon" data-animate="bounceIn">
							<a href="#">
								<img src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=360'} alt="Responsive Layout" />
							</a>
						</div>
						<h3>{course.title}</h3>
						<p>{course.description}</p>
					</div>
				</div>
			)
		});

		return (

			<div>
				<Nav />


				<section id="slider" className="slider-parallax dark full-screen" style={{background: "url(images/programming.jpg) center"}}>

					<div>
						<div className="container clearfix">
							<div className="vertical-middle">

								<div className="heading-block center nobottomborder" style={{marginTop:164}}>
									<h1 data-animate="fadeInUp">Its your time to <strong>create</strong> Landing Pages for <strong>FREE</strong></h1>
									<span data-animate="fadeInUp" data-delay="300">Building a Landing Page was never so Easy &amp; Interactive.</span>
								</div>

								<form action="#" method="post" role="form" className="landing-wide-form clearfix">
									<div className="col_four_fifth nobottommargin">
										<div className="col_one_fourth nobottommargin">
											<input value={this.props.currentUser.firstName} onChange={this.updateUserRegistration} id="firstName" type="text" className="form-control input-lg not-dark" placeholder="First Name*" />
										</div>
										<div className="col_one_fourth nobottommargin">
											<input value={this.props.currentUser.lastName} onChange={this.updateUserRegistration} id="lastName" type="text" className="form-control input-lg not-dark" placeholder="Last Name*" />
										</div>
										<div className="col_one_fourth nobottommargin">
											<input value={this.props.currentUser.email} onChange={this.updateUserRegistration} id="email" type="email" className="form-control input-lg not-dark" placeholder="Email*" />
										</div>
										<div className="col_one_fourth col_last nobottommargin">
											<input id="password" type="password" className="form-control input-lg not-dark" value="" placeholder="Password*" />
										</div>
									</div>
									<div className="col_one_fifth col_last nobottommargin">
										<button className="btn btn-lg btn-danger btn-block nomargin" value="submit" type="submit">JOIN</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>


				<section id="content">
					<div className="content-wrap">
						<div className="container clearfix">

							<div id="section-features" className="heading-block title-center page-section">
								<div style={{background:'#f9f9f9', border:'1px solid #ddd', padding:24, marginBottom:24, fontSize:16}}>
									FullStack 360 conducts development courses that are relevant in the 
									startup and tech world today. We focus on the most up-to-date frameworks 
									and libraries such as React, Angular, and Node JS. Our students are always 
									prepared for rapid changes in the industry and are ready to work in tech 
									after a course.
								</div>
								<h2>Featured Courses</h2>
							</div>

							{courses}

							<div className="clear"></div>

							<div className="divider divider-short divider-center"><i className="icon-circle"></i></div>

							<div id="section-pricing" className="heading-block title-center nobottomborder page-section">
								<h2>Pricing Details</h2>
								<span>Our All inclusive Pricing Plan that covers you well</span>
							</div>

							<div className="pricing-box pricing-extended bottommargin clearfix">

								<div className="pricing-desc">
									<div className="pricing-title">
										<h3>How many Themes can you Download today?</h3>
									</div>
									<div className="pricing-features">
										<ul className="iconlist-color clearfix">
											<li><i className="icon-desktop"></i> Ultra Responsive Layouts</li>
											<li><i className="icon-eye-open"></i> Retina Ready Designs</li>
											<li><i className="icon-beaker"></i> Advanced Admin Panel</li>
											<li><i className="icon-magic"></i> Tons of Customization Options</li>
											<li><i className="icon-font"></i> Support for Custom Fonts</li>
											<li><i className="icon-stack3"></i> Premium Sliders Included</li>
											<li><i className="icon-file2"></i> Photoshop Source Files Included</li>
											<li><i className="icon-support"></i> 24x7 Priority Email Support</li>
										</ul>
									</div>
								</div>

								<div className="pricing-action-area">
									<div className="pricing-meta">
										As Low as
									</div>
									<div className="pricing-price">
										<span className="price-unit">&euro;</span>39<span className="price-tenure">monthly</span>
									</div>
									<div className="pricing-action">
										<a href="#" className="button button-3d button-large btn-block nomargin">Get Started</a>
									</div>
								</div>

							</div>

							<div className="clear"></div>

						</div>

						<div className="section">

							<div className="container clearfix">

								<div id="section-testimonials" className="heading-block title-center page-section">
									<h2>Testimonials</h2>
									<span>Our All inclusive Pricing Plan that covers you well</span>
								</div>

								<ul className="testimonials-grid grid-3 clearfix">
									<li>
										<div className="testimonial">
											<div className="testi-image">
												<a href="#"><img src="/images/testimonials/1.jpg" alt="Customer Testimonails" /></a>
											</div>
											<div className="testi-content">
												<p>Incidunt deleniti blanditiis quas aperiam recusandae consequatur ullam quibusdam cum libero illo rerum repellendus!</p>
												<div className="testi-meta">
													John Doe
													<span>XYZ Inc.</span>
												</div>
											</div>
										</div>
									</li>
									<li>
										<div className="testimonial">
											<div className="testi-image">
												<a href="#"><img src="/images/testimonials/2.jpg" alt="Customer Testimonails" /></a>
											</div>
											<div className="testi-content">
												<p>Natus voluptatum enim quod necessitatibus quis expedita harum provident eos obcaecati id culpa corporis molestias.</p>
												<div className="testi-meta">
													Collis Taeed
													<span>Envato Inc.</span>
												</div>
											</div>
										</div>
									</li>
									<li>
										<div className="testimonial">
											<div className="testi-image">
												<a href="#"><img src="/images/testimonials/7.jpg" alt="Customer Testimonails" /></a>
											</div>
											<div className="testi-content">
												<p>Fugit officia dolor sed harum excepturi ex iusto magnam asperiores molestiae qui natus obcaecati facere sint amet.</p>
												<div className="testi-meta">
													Mary Jane
													<span>Google Inc.</span>
												</div>
											</div>
										</div>
									</li>
									<li>
										<div className="testimonial">
											<div className="testi-image">
												<a href="#"><img src="/images/testimonials/3.jpg" alt="Customer Testimonails" /></a>
											</div>
											<div className="testi-content">
												<p>Similique fugit repellendus expedita excepturi iure perferendis provident quia eaque. Repellendus, vero numquam?</p>
												<div className="testi-meta">
													Steve Jobs
													<span>Apple Inc.</span>
												</div>
											</div>
										</div>
									</li>
									<li>
										<div className="testimonial">
											<div className="testi-image">
												<a href="#"><img src="/images/testimonials/4.jpg" alt="Customer Testimonails" /></a>
											</div>
											<div className="testi-content">
												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus, perspiciatis illum totam dolore deleniti labore.</p>
												<div className="testi-meta">
													Jamie Morrison
													<span>Adobe Inc.</span>
												</div>
											</div>
										</div>
									</li>
									<li>
										<div className="testimonial">
											<div className="testi-image">
												<a href="#"><img src="/images/testimonials/8.jpg" alt="Customer Testimonails" /></a>
											</div>
											<div className="testi-content">
												<p>Porro dolorem saepe reiciendis nihil minus neque. Ducimus rem necessitatibus repellat laborum nemo quod.</p>
												<div className="testi-meta">
													Cyan Taceed
													<span>Tutsplus</span>
												</div>
											</div>
										</div>
									</li>
								</ul>

							</div>

						</div>

						<div className="container clearfix">

							<div id="section-specs" className="heading-block title-center page-section">
								<h2>Product Specifications</h2>
								<span>Complete list of the Tech Specifications for your understanding</span>
							</div>

							<div id="side-navigation">

								<div className="col_one_third">

									<ul className="sidenav">
										<li className="ui-tabs-active"><a href="#snav-content1"><i className="icon-screen"></i>Responsive Layout<i className="icon-chevron-right"></i></a></li>
										<li><a href="#snav-content2"><i className="icon-magic"></i>Retina Ready Display<i className="icon-chevron-right"></i></a></li>
										<li><a href="#snav-content3"><i className="icon-tint"></i>Unlimited Color Options<i className="icon-chevron-right"></i></a></li>
										<li><a href="#snav-content4"><i className="icon-gift"></i>Bootstrap 3.1 Compatible<i className="icon-chevron-right"></i></a></li>
										<li><a href="#snav-content5"><i className="icon-adjust"></i>Light &amp; Dark Scheme<i className="icon-chevron-right"></i></a></li>
									</ul>

								</div>

								<div className="col_two_third col_last">

									<div id="snav-content1">
										<h3>Ultra Responsive Template</h3>
										<img className="alignright img-responsive" src="/images/landing/responsive.png" alt="" />

										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, ex, inventore, tenetur, repellat ipsam soluta libero amet nam aspernatur perspiciatis quos praesentium et debitis ea odit enim illo aliquid eligendi numquam neque. Ipsum, voluptatibus, perspiciatis a quam aliquid cumque cupiditate id ipsa tempora eveniet. Cupiditate, necessitatibus, consequatur odio. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, vitae, laboriosam libero nihil labore hic modi? Odit, veritatis nulla molestiae!
									</div>

									<div id="snav-content2">
										<h3>Retina Ready Display</h3>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, voluptatem reprehenderit natus facilis id deserunt iusto incidunt cumque odit molestias iste dolor eum esse soluta facere quidem minima in voluptate explicabo ducimus alias ratione aut molestiae omnis fuga labore quod optio modi voluptatum nemo suscipit porro maxime ex. Maiores, ratione eligendi labore quaerat veniam laborum nam rem delectus illum aspernatur quas sequi animi quae nulla alias hic inventore ex perspiciatis nisi consequatur enim a aut dolorum modi quod perferendis dicta impedit magni placeat repellat. Soluta, dicta, dolores, reiciendis, eum accusamus esse et debitis rem fugit fugiat dignissimos pariatur sint quod laborum autem. Nulla, ducimus, culpa, vel esse unde sapiente expedita corrupti consectetur veritatis quas autem laborum mollmquam amet eius. Numquam, ad, quaerat, ab, deleniti rem quae doloremque tenetur ea illum hic amet dolor suscipit porro ducimus excepturi perspiciatis modi praesentium voluptas quos expedita provident adipisci dolorem! Aliquam, ipsum voluptatem et voluptates impedit ab libero similique a. Nisi, ea magni et ab voluptatum nemo numquam odio quis libero aspernatur architecto tempore qui quisquam saepe corrupti necessitatibus natus quos aliquid non voluptatibus quod obcaecati fugiat quibusdam quidem inventore quia eveniet iusto culpa incidunt vero vel in accusamus eum. Molestiae nihil voluptate molestias illum eligendi esse nesciunt.
									</div>

									<div id="snav-content3">
										<img className="alignleft img-responsive" src="http://www.w3schools.com/tags/colormap.gif" alt="" />
										<h3>Unlimited Color Options</h3>Dolor aperiam modi aliquam dolores consequatur error commodi ad eius incidunt! Libero, odio incidunt ullam sunt fugiat? Laboriosam, perferendis, debitis, harum soluta iste eos sunt odit architecto porro eveniet sint optio nihil animi. Laudantium, quam, culpa, velit molestias exercitationem reprehenderit enim distinctio aliquam aut ex numquam sequi assumenda veritatis fuga voluptatum. Magni, voluptates adipisci unde sapiente eligendi ea maxime tempora pariatur ipsa.. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, aspernatur, saepe, quidem animi hic rem libero earum fuga voluptas culpa iure qui accusantium ab quae dolorum laborum quia repellat fugit aut minima molestias placeat mollitia doloribus quibusdam consectetur officia nesciunt ad. Ab, quod ipsum commodi assumenda doloribus possimus sed laudantium.Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									</div>

									<div id="snav-content4">
										<img className="alignleft img-responsive" src="/images/landing/bootstrap.png" alt="" />
										<h3>Bootstrap v3.2.0 Compatiable</h3>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, nostrum, dolores id quo nam repudiandae ad culpa architecto minima nemo eaque soluta nulla laborum neque provident saepe facilis expedita numquam quas alias in perferendis accusamus ipsam blanditiis sit voluptatem temporibus vero error veritatis repellat eos reiciendis repellendus quam. Officia dicta ipsam nostrum aperiam. Dolor, expedita enim modi nostrum commodi sint architecto aliquam aut mollitia repellendus deserunt quaerat aspernatur aperiam voluptatibus consequatur rerum consequuntur.
									</div>

									<div id="snav-content5">
										<h3>Light &amp; Dark Scheme Available</h3>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, temporibus, maxime, laudantium quidem sapiente deserunt error rerum illum explicabo voluptate velit tempora cupiditate reprehenderit consequuntur nemo in et blanditiis soluta tempore perspiciatis at atque excepturi culpa facere sequi impedit cumque illo molestias saepe eveniet ducimus fugiat reiciendis unde. Modi, at laboriosam ex velit commodi officiis! Neque, consequatur, modi, nulla, voluptatem quibusdam incidunt minus dolores repellat nihil consectetur ducimus aliquid. Eaque, tempora voluptatum accusantium expedita obcaecati magnam voluptates consequatur ut harum rem dolor id error. Officia, repudiandae, eos, quibusdam porro eius esse cupiditate non fugit dignissimos delectus et tempora sequi fugiat quo voluptatem temporibus vel obcaecati? Laboriosam, quis obcaecati quas veniam repellendus officiis et quos velit id natus mollitia dacilis ipsum et perspiciatis officia iste cupiditate ducimus nisi consequuntur excepturi dolorum. Sint, architecto, cumque facere officia harum dicta perferendis inventore excepturi sequi explicabo provident omnis dolore quasi fugit molestiae atque id consectetur reprehenderit laborum beatae consequatur similique.
									</div>

								</div>

							</div>

						</div>

						<div className="section footer-stick">

							<div className="container clearfix">

								<div id="section-buy" className="heading-block title-center nobottomborder page-section">
									<h2>Enough? Start Building!</h2>
									<span>Now that you have read all the Tid-Bits, so start with a plan</span>
								</div>

								<div className="center">

									<a href="#" data-animate="tada" className="button button-3d button-teal button-xlarge nobottommargin"><i className="icon-star3"></i>Start your FREE Trial</a> - OR - <a href="#" data-scrollto="#section-pricing" className="button button-3d button-red button-xlarge nobottommargin"><i className="icon-user2"></i>Sign Up for a Subscription</a>

								</div>

							</div>

						</div>

					</div>

				</section>
				<Footer />

			</div>

		)
	}

}

const stateToProps = function(state) {
	console.log('STATE TO PROPS: '+JSON.stringify(state));
    return {
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courses
    }
}

// const StoreSelector = function(store){
// 	console.log('StoreSelector: '+JSON.stringify(store.profileReducer.currentUser));
// 	return {
// 		currentUser: store.profileReducer.currentUser
// 	}

// }

export default connect(stateToProps)(Home)