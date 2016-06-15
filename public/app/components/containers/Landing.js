import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import EventCard from '../../components/EventCard'
import Testimonial from '../../components/Testimonial'
import store from '../../stores/store'
import actions from '../../actions/actions'
import stripe from '../../utils/StripeUtils'
import api from '../../api/api'

class Landing extends Component {

	constructor(props, context){
		super(props, context)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.updateUserRegistration = this.updateUserRegistration.bind(this)
		this.submitInfoRequest = this.submitInfoRequest.bind(this)
		this.openModal = this.openModal.bind(this)
		this.showRegistrationForm = this.showRegistrationForm.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.syllabusRequest = this.syllabusRequest.bind(this)
		this.register = this.register.bind(this)
		this.validate = this.validate.bind(this)
		this.state = {
			showRegistration: false,
			showLoader: false,
			showModal: false,
			visitor: {
				name: '',
				email: '',
				phone: '',
				course: 'ios-node-bootcamp',
				referral: ''
			}
		}
	}

	componentDidMount(){
		var _this = this
		stripe.initialize(function(token){
			_this.setState({showLoader: true})
			api.submitStripeToken(token, function(){
				api.handleGet('/account/currentuser', {}, function(err, response){
					_this.setState({showLoader: false})
					if (err){
						alert(response.message)
						return
					}

					window.location.href = '/account'
				});
			})			
		})
	}


	updateVisitor(event){
		console.log('updateVisitor: '+event.target.id)
		event.preventDefault()

		var visitor = Object.assign({}, this.state.visitor)
		visitor[event.target.id] = event.target.value
		this.setState({
			visitor: visitor
		})
	}

	updateUserRegistration(event){
//		console.log('updateUserRegistration: '+event.target.id)
		event.preventDefault()

		if (event.target.id == 'membershiptype'){
			this.setState({
				membershiptype: event.target.value
			})

			return
		}


		var updatedUser = Object.assign({}, this.props.currentUser);
		if (event.target.id == 'name'){
			var parts = event.target.value.split(' ')
			updatedUser['firstName'] = parts[0]
			if (parts.length > 1)
				updatedUser['lastName'] = parts[parts.length-1]
		}

		updatedUser[event.target.id] = event.target.value
		store.dispatch(actions.updateCurrentUser(updatedUser));
	}

	register(event){
		event.preventDefault()
		var missingField = this.validate(this.props.currentUser, true);
		if (missingField != null){
			alert('Please enter your '+missingField);
			return
		}

		this.setState({
			showModal: false,
			showLoader: true
		});

		var _this = this
		api.handlePost('/api/profile', this.props.currentUser, function(err, response){
			_this.setState({
				showRegistration: false,
				showLoader: false
			});

			if (err){
				alert(err.message)
				return
			}

			if (_this.state.membershiptype == 'basic'){
				window.location.href = '/account'
				return
			}

			// premium registration, show stripe modal
			stripe.showModal()
		});
	}

	submitInfoRequest(event){
		event.preventDefault()
//		console.log('submitInfoRequest: '+JSON.stringify(this.state.visitor))

		var missingField = this.validate(this.state.visitor, false);
		if (missingField != null){
			alert('Please enter your '+missingField);
			return
		}

		this.setState({
			showModal: false,
			showLoader: true
		});

		var pkg = Object.assign({}, this.state.visitor)
		pkg['headers'] = this.props.headers
		var _this = this
		api.handlePost('/api/info', pkg, function(err, response){
			_this.setState({
				showLoader: false
			});

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		});
	}


	validate(profile, withPassword){
//		var visitor = this.state.visitor
		console.log('VALIDATE: '+JSON.stringify(profile))
		if (profile.name.length == 0)
			return 'Name'

		// if (profile.lastName.length == 0)
		// 	return 'Last Name'

		if (profile.email.length == 0)
			return 'Email'

		if (withPassword == false)
			return null

		if (profile.password.length == 0)
			return 'Password'

		return null // this is successful
	}


	syllabusRequest(event){
		event.preventDefault()
//		console.log('SYLLABUS REQUEST: '+this.state.selectedCourse)

		var missingField = this.validate(false);
		if (missingField != null){
			alert('Please enter your '+missingField);
			return
		}

		var pkg = {
			course: this.state.selectedCourse,
			visitor: this.props.currentUser,
			headers: this.props.headers
		}

		this.setState({
			showModal: false,
			showLoader: true
		});

		var _this = this
		api.handlePost('/api/syllabus', pkg, function(err, response){
			_this.setState({
				showLoader: false
			});

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		});
	}


	openModal(event){
		console.log('OPEN MODAL: '+event.target.id)
		event.preventDefault()

		var visitor = Object.assign({}, this.state.visitor)
		visitor['course'] = event.target.id

		this.setState({
			showModal: true,
			visitor: visitor
		})
	}

	showRegistrationForm(event){
		event.preventDefault()
		this.setState({
			membershiptype: event.target.id,
			showRegistration: true
		})
	}

	closeModal(){
		this.setState({
			showRegistration: false,
			showModal: false
		})
	}


	render(){

		return (
			<div>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Nav />

		        <section id="slider" style={{background: 'url("/images/joe_light_blue.png") center', overflow:'visible'}} data-height-lg="450" data-height-md="450" data-height-sm="600" data-height-xs="600" data-height-xxs="600">
		            <br />
		            <div className="container clearfix">
		                <form action="#" method="post" role="form" className="landing-wide-form landing-form-overlay dark clearfix">
		                    <div className="heading-block nobottommargin nobottomborder">
		                        <h4>Start your Programming Career</h4>
		                    </div>
		                    <div className="line" style={{ margin: '15px 0 30px' }}></div>
		                    <div className="col_full">
		                        <input onChange={this.updateVisitor} id="name" type="text" className="form-control input-lg not-dark" placeholder="Name" />
		                    </div>
		                    <div className="col_full">
		                        <input onChange={this.updateVisitor} id="email" type="text" className="form-control input-lg not-dark" placeholder="Email" />
		                    </div>
		                    <div className="col_full">
								<label for="template-contactform-subject">I am interested in</label>
								<select onChange={this.updateVisitor} value={this.state.visitor.course} id="course" className="form-control input-lg not-dark">
									<option value="ios-node-bootcamp">iOS & Node Bootcamp</option>
									<option value="node-react-bootcamp">React & Node Bootcamp</option>
								</select>
		                    </div>

		                    <div className="col_full nobottommargin">
		                        <button onClick={this.submitInfoRequest} className="btn btn-lg btn-danger btn-block nomargin" value="submit">Request Info</button>
		                    </div>
		                </form>

		            </div>
		        </section>


				<section>
					<div className="content-wrap">
		                <div className="promo promo-dark promo-full landing-promo header-stick">
		                    <div className="container clearfix">
		                        <h3>Build Real Projects</h3>
		                        <span>
		                        	Learn iOS and Web development by building actual projects.
		                        </span>
		                    </div>
		                </div>

						<div className="container clearfix" style={{paddingTop:64}}>
							<div className="col_two_third bottommargin-sm">
			                    <div className="fancy-title title-bottom-border">
			                        <h3>The True Experience</h3>
			                    </div>
								<p>
									<img style={{background:'#fff', float:'left', border:'1px solid #ddd', maxWidth: 260, padding:6, marginRight:12}} className="image_fade" src="/images/class.jpg" alt="Velocity 360" />
									The Velocity 360 program provides real development experience by partnering with local 
									startups to build their prototypes (often referred to as 'MVP' - Minimal Viable Product). 
									After a 6-week period covering programming fundamentals, students work in groups of 2-4 
									on an actual project that was pre-vetted by the Velocity 360 team.
									<br /><br />
									By the end of the program, students will have published a real, live product that will be 
									promoted by the startup team. As such, students will already have a professional project on 
									their portfolio immediately upon completion and may even continue with the project beyond 
									the course.
								</p>

			                    <div className="fancy-title title-bottom-border">
			                        <h3>How It Works</h3>
			                    </div>
								<p>
									The Velocity Bootcamp Program is divided into two parts.<br />
			                        <div className="col_half panel panel-default">
			                            <div className="panel-heading">
			                                <h2 className="panel-title">6-Week Fundamentals Course</h2>
			                            </div>
			                            <div className="panel-body">
											The Fundamentals Course covers backend and frontend development using the 
											most up-to-date technologies. Using Node JS, Mongo, Express and React 
											(with ES6), we will create a fully functional website with user registration, 
											image uploading, email notification functionality. We also touch on React 
											Native which leverages the powerful library to build native iOS apps in 
											JavaScript.			                            
				                            <br /><br />
				                            <ul style={{listStyle: 'none', fontWeight:'600'}}>
					                            <li>Jul 11th - Aug 19th</li>
					                            <li>Mon - Fri</li>
					                            <li>9am - 5pm</li>
				                            </ul>
											<a href="/application" className="button button-rounded button-reveal button-large button-border tright">
												<i className="icon-signal"></i>
												<span>Apply</span>
											</a>				                            
			                            </div>
			                        </div>

			                        <div className="col_half panel panel-default col_last">
			                            <div className="panel-heading">
			                                <h2 className="panel-title">6-Week MVP Bootcamp</h2>
			                            </div>
			                            <div className="panel-body">
				                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, at, vitae, 
				                            veritatis, temporibus soluta accusamus eum accusantium incidunt eius quisquam 
				                            suscipit inventore neque. Distinctio, impedit.
				                            <br /><br />
				                            <ul style={{listStyle: 'none', fontWeight:'600'}}>
					                            <li>Aug 22nd - Sep 30th</li>
					                            <li>Mon - Fri</li>
					                            <li>9am - 5pm</li>
				                            </ul>
											<a href="/application" className="button button-rounded button-reveal button-large button-border tright">
												<i className="icon-signal"></i>
												<span>Apply</span>
											</a>				                            

			                            </div>
			                        </div>

			                        <div className="clearfix"></div>
									Each section is a stand-alone course meaning students can enroll in just one and not the other. 
									However, the MVP Bootcamp requires working knowledge of the material covered in the Fundamentals 
									Course so students should not be complete beginners for this sequence. The tuition for each course 
									is $6,500 but when taken together, the combined tuition is $11,500.
								</p>
							</div>

							<div className="col_one_third bottommargin-sm hidden-xs col_last">
								<div className="widget clearfix" style={{padding:24, textAlign:'center', border:'1px solid #ddd', background:'#F9FCFF'}}>
									<h4>Featured App</h4>
									<img style={{width:128, border:'1px solid #ddd'}} src="/images/radius.png" alt="Velocity 360" />
									<h3 style={{marginBottom:6, marginTop:9}}>
										<a target="_blank" href="https://itunes.apple.com/us/app/mercurymq-radius/id926659377?mt=8">Radius</a>
									</h3>
									<hr />
									<strong>iOS App</strong>
									<br />
									<p>
										Radius is a job-searching app aimed at part time workers, students, and 
										short term service providers like dog-walkers or furniture movers. It utilizes 
										the GPS functionality on the iPhone to find jobs nearby and also to find workers 
										in the area.
										<br /><br />
										Radius was built using Node JS & Express for the backend, Mongo DB for database, and 
										Heroku for deployment. 

									</p>

									<div className="tagcloud">
										<a href="#">iOS</a>
										<a href="#">Node JS</a>
										<a href="#">REST API</a>
										<a href="#">JavaScript</a>
									</div>
								</div>

								<div className="widget clearfix" style={{padding:24, textAlign:'center', border:'1px solid #ddd', background:'#f9f9f9'}}>
									<h4>Featured App</h4>
									<img style={{width:128, border:'1px solid #ddd'}} src="/images/radius.png" alt="Velocity 360" />
									<h3 style={{marginBottom:6, marginTop:9}}>
										<a target="_blank" href="https://itunes.apple.com/us/app/mercurymq-radius/id926659377?mt=8">Radius</a>
									</h3>
									<hr />
									<strong>iOS App</strong>
									<br />
									<p>
										Radius is a job-searching app aimed at part time workers, students, and 
										short term service providers like dog-walkers or furniture movers. It utilizes 
										the GPS functionality on the iPhone to find jobs nearby and also to find workers 
										in the area.
									</p>
								</div>

							</div>							

						</div>
					</div>
				</section>

				<section style={{background:'#f9f9f9', paddingTop:48, borderTop:'1px solid #ddd'}}>
					<div className="heading-block center">
						<h2>Part Time Courses</h2>
					</div>

					<div className="content-wrap" style={{paddingTop:0}}>
						<div className="container clearfix">

							<div className="team team-list clearfix">
								<div className="team-image">
									<img style={{border:'1px solid #ddd'}} src="/images/xcode.jpg" alt="Velocity 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS &amp; Node 6-Week Bootcamp</h4>
										<span>July 11th - August 19th</span>
										<span>Mon - Fri, 9am - 5pm</span>
									</div>
									<div className="team-content">
										The 6-Week iOS Intensive is a comprehensive course in all aspects of iOS 
										development for beginners. 5 days a week, 8 hours a day, students cover the key aspects 
										of iOS development from creating sleek UI’s, animations, GPS locator, 
										integrating 3rd party data, and publishing. This course is designed for 
										beginners with little to no programming experience and all development is 
										done with Swift. By the end of the course, students will have published at least 
										one app to the App Store and gained the skills neccessary to begin working as 
										junior iOS developers.
									</div>
									<br />
									<a id="ios-node-bootcamp" href="/course/ios-node-bootcamp" className="btn btn-success">
										Learn More
									</a>
								</div>
							</div>

							<div style={{margin:36}}></div>

							<div className="team team-list clearfix">
								<div className="team-image">
									<img style={{border:'1px solid #ddd'}} src="/images/react.jpg" alt="Velocity 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>Node &amp; React 6-Week Bootcamp</h4>
										<span>August 22nd - September 30th</span>
										<span>Mon - Fri, 9am - 5pm</span>
									</div>
									<div className="team-content">
										The Node React Development Evening bootcamp is an 6-week course that 
										covers backend and frontend development using the most up-to-date 
										technologies. Using Node JS, Mongo, Express and React (with ES6), we 
										will create a fully functional website with user registration, image 
										uploading, email notification functionality. We also touch on React Native 
										which leverages the powerful library to build native iOS apps in JavaScript.
									</div>
									<br />
									<a id="node-react-evening" href="/course/node-react-bootcamp" className="btn btn-success">
										Learn More
									</a>
								</div>
							</div>

						</div>

					</div>
				</section>

				<section id="register" className="section pricing-section nomargin" style={{backgroundColor: '#FFF'}}>
					<div className="container clearfix">
						<h2 className="pricing-section--title center">Cant make it to our live courses?</h2>
						<div style={{textAlign:'center'}}>
							<p style={{fontSize:16}}>
								Join our online service. <br />Online members 
								have access to videos, code samples, the forum and more.
							</p>

						</div>
						<div className="pricing pricing--jinpa">
							<div className="pricing--item">
								<h3 className="pricing--title">Basic</h3>
								<div style={{fontSize: '1.15em'}} className="pricing--price">FREE</div>
								<div style={{ borderTop:'1px solid #eee', marginTop:24, paddingTop:24}}>
									<ul className="pricing--feature-list">
										<li className="pricing--feature">Limited Video Access</li>
										<li className="pricing--feature">Forum Access</li>
										<li className="pricing--feature">Discounts to Live Events</li>
									</ul>
								</div>
								<button onClick={this.showRegistrationForm} id="basic" className="pricing--action">Join</button>
							</div>
							<div className="pricing--item" style={{marginLeft:24, border:'1px solid #eee'}}>
								<h3 className="pricing--title">Premium</h3>
								<div style={{fontSize: '1.15em'}} className="pricing--price"><span className="pricing--currency">$</span>19.99/mo</div>
								<div style={{ borderTop:'1px solid #eee', marginTop:24, paddingTop:24}}>
									<ul className="pricing--feature-list">
										<li className="pricing--feature">Full Video Access</li>
										<li className="pricing--feature">Downloadable Code Samples</li>
										<li className="pricing--feature">Customized Job Listings</li>
										<li className="pricing--feature">Forum Access</li>
										<li className="pricing--feature">Discounts to Live Events</li>
									</ul>

								</div>
								<button onClick={this.showRegistrationForm} id="premium" className="pricing--action">Join</button>
							</div>
						</div>
					</div>
				</section>				

		        <Modal show={this.state.showModal} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Request Info</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<div style={{textAlign:'center'}}>
				        	<img style={{width:128, borderRadius:64, border:'1px solid #ddd', marginBottom:24}} src="/images/logo_round_green_260.png" />
			        	</div>
			        	<input onChange={this.updateVisitor} value={this.state.visitor.name} id="name" className="form-control" type="text" placeholder="Name" /><br />
			        	<input onChange={this.updateVisitor} value={this.state.visitor.email} id="email" className="form-control" type="text" placeholder="Email" /><br />
			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.submitInfoRequest} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
			        </Modal.Footer>
		        </Modal>

		        <Modal show={this.state.showRegistration} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h3>Join</h3>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<div style={{textAlign:'center'}}>
				        	<img style={{width:128, borderRadius:64, border:'1px solid #ddd', background:'#fff', marginBottom:24}} src='/images/logo_round_green_260.png' />
			        	</div>
			        	<input onChange={this.updateUserRegistration} id="name" className="form-control" type="text" placeholder="Name" /><br />
			        	<input onChange={this.updateUserRegistration} id="email" className="form-control" type="text" placeholder="Email" /><br />
			        	<input onChange={this.updateUserRegistration} id="password" className="form-control" type="password" placeholder="Password" /><br />
			        	<input onChange={this.updateUserRegistration} id="promoCode" className="form-control" type="text" placeholder="Promo Code" /><br />
						<select onChange={this.updateUserRegistration} id="membershiptype" value={this.state.membershiptype} className="form-control input-md not-dark">
							<option value="basic">Basic</option>
							<option value="premium">Premium</option>
						</select>

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.register} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Register</a>
			        </Modal.Footer>
		        </Modal>

				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {
    return {
        currentUser: state.profileReducer.currentUser,
        loaderOptions: state.staticReducer.loaderConfig
    }
}

export default connect(stateToProps)(Landing)
