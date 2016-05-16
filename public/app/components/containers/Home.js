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

class Home extends Component {

	constructor(props, context){
		super(props, context)
		this.updateUserRegistration = this.updateUserRegistration.bind(this)
		this.register = this.register.bind(this)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.rsvp = this.rsvp.bind(this)
		this.syllabusRequest = this.syllabusRequest.bind(this)
		this.validate = this.validate.bind(this)
		this.showRegistrationForm = this.showRegistrationForm.bind(this)
		this.state = {
			showRegistration: false,
			showLoader: false,
			showModal: false,
			bootcamp: {
				subject: 'Bootcamp',
				image: 'logo_round_green_260.png',
				button: 'Request Info'
			},
			selectedEvent: {
				id: null,
				title: '',
				image: ''
			},
			membershiptype: 'premium',
			selectedCourse: 'ios bootcamp' // for syllabus requests
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

		api.handleGet('/api/event', {}, function(err, response){
			if (err){
				return
			}

			store.dispatch(actions.eventsRecieved(response.events))
		});
	}


	updateUserRegistration(event){
		console.log('updateUserRegistration: '+event.target.id)
		event.preventDefault()

		if (event.target.id == 'course'){
			this.setState({
				selectedCourse: event.target.value
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
		else if (event.target.id == 'membershiptype'){
			this.setState({
				membershiptype: event.target.value
			})
		}
		else {
			updatedUser[event.target.id] = event.target.value
		}

		store.dispatch(actions.updateCurrentUser(updatedUser));
	}

	validate(withPassword){
		if (this.props.currentUser.firstName.length == 0)
			return 'First Name'

		if (this.props.currentUser.lastName.length == 0)
			return 'Last Name'

		if (this.props.currentUser.email.length == 0)
			return 'Email'

		if (withPassword == false)
			return null

		if (this.props.currentUser.password.length == 0)
			return 'Password'

		return null // this is successful
	}

	register(event){
		event.preventDefault()
		var missingField = this.validate(true);
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

	rsvp(event){
		event.preventDefault()
		var missingField = this.validate(false);
		if (missingField != null){
			alert('Please enter your '+missingField);
			return
		}

		this.setState({
			showModal: false,
			showLoader: true
		});

		var _this = this
		var pkg = {
			visitor: this.props.currentUser,
			event: this.state.selectedEvent
		}

		api.handlePost('/api/rsvp', pkg, function(err, response){
//			console.log('RSVP REQUEST RESPONSE: '+JSON.stringify(response));
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

	syllabusRequest(event){
		event.preventDefault()

		var missingField = this.validate(false);
		if (missingField != null){
			alert('Please enter your '+missingField);
			return
		}

		var pkg = {
			course: this.state.selectedCourse,
			visitor: this.props.currentUser
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
		event.preventDefault()

		this.setState({
			showModal: true,
			selectedEvent: (event.target.id == 'bootcamp') ? this.state.bootcamp : this.props.events[event.target.id]
		})
	}

	closeModal(){
		this.setState({
			showRegistration: false,
			showModal: false
		})
	}

	showRegistrationForm(event){
		event.preventDefault()
		this.setState({
			membershiptype: event.target.id,
			showRegistration: true
		})
	}

	render(){
		var testimonialList = this.props.testimonials.map(function(testimonial, i){
			return <Testimonial key={i} testimonial={testimonial} />
		});

		var _openModal = this.openModal;
		var events = this.props.events.map(function(e, i){
			return <EventCard key={e.id} index={i} event={e} click={_openModal} />
		});


		return (
			<div>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Nav />
				<section id="slider" className="slider-parallax dark full-screen" style={{background: "url(images/programming.jpg) center"}}>

					<div className="slider-parallax-inner">
						<div className="container clearfix">
							<div className="vertical-middle">

								<div className="heading-block center nobottomborder">
									<h1 data-animate="fadeInUp">
										Become a <strong>Professional</strong> Software Developer 
									</h1>
									<span data-animate="fadeInUp" data-delay="300">
										Learn to code in our part time or full time classes for Web and iOS 
									</span>
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
											<input value={this.props.currentUser.email} onChange={this.updateUserRegistration} id="email" type="text" className="form-control input-lg not-dark" placeholder="Email*" />
										</div>
										<div className="col_one_fourth col_last nobottommargin">
											<select onChange={this.updateUserRegistration} id="course" className="form-control input-lg not-dark">
												<option value="ios bootcamp">iOS Bootcamp</option>
												<option value="web bootcamp">Web Bootcamp</option>
												<option value="ios hs course">iOS & Node HS Course</option>
												<option value="ios+node evening">iOS & Node Evening Course</option>
												<option value="react+node evening">React & Node Evening Course</option>
											</select>
										</div>
									</div>
									<div className="col_one_fifth col_last nobottommargin">
										<button onClick={this.syllabusRequest} id="bootcamp" className="btn btn-lg btn-danger btn-block nomargin" value="submit">Request Syllabus</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>

				<section id="content">
					<div className="content-wrap">
						<div className="container clearfix">

							<div className="col_one_third bottommargin-sm center">
								<img data-animate="fadeInLeft" src="/images/swift-react.png" alt="Iphone" />
							</div>

							<div className="col_two_third bottommargin-sm col_last">
								<div className="heading-block topmargin-sm">
									<h3>Coding Education for Tomorrow</h3>
								</div>
								<p>
									FullStack 360 conducts development courses that are relevant in the 
									startup and tech world today. We focus on the most up-to-date frameworks 
									and libraries such as React, Angular, and Node JS. Our students are always 
									prepared for rapid changes in the industry and are ready to work in tech 
									after a course.
								</p>
								<p>
									The only constant in the software industry is change. One day, PHP is the 
									king, the next day Ruby on Rails is highest in demand. The major bootcamps 
									in NYC focus on today. Flatiron School, General Assembly, Dev Bootcamp all 
									teach Rails while we focus on tomorrow. Our stack is Node JS with React on 
									the front end and ES2015. Will you be among the flood of Rails devs 
									saturating the NYC market or will you be ready for the tech stack of tomorrow?
								</p>

								<a href="/courses?type=live" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">View Courses</a><br />
								<a href="/courses?type=immersive" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">View Bootcamps</a>
							</div>

							<div id="events" className="divider divider-short divider-center">
								<i className="icon-circle"></i>
							</div>

							<div id="posts" className="events small-thumbs">
								<div style={{textAlign:'center', paddingTop:64}}>
									<h2>Events</h2>
								</div>

								{events}

							</div>		

							<div className="divider divider-short divider-center">
								<i className="icon-circle"></i>
							</div>

							<div className="clear"></div>
						</div>
					</div>
				</section>

				<section id="section-team" className="page-section" style={{background:'#f9f9f9', paddingTop:48, borderTop:'1px solid #ddd'}}>

					<div className="heading-block center">
						<h2>Summer 2016</h2>
						<span>The following courses will run in Spring and Summer</span>
					</div>

					<div className="container clearfix">

						<div className="col-md-6 bottommargin">
							<div className="team team-list clearfix">
								<div className="team-image">
									<img style={{border:'1px solid #ddd'}} src="/images/ios.jpg" alt="FullStack 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS &amp; Node High School Course</h4>
										<span>Jul 5 to Jul 15 | Mon - Fri | 9am - 5pm</span>
									</div>
									<div className="team-content">
										The iOS High School Course takes students through the process of 
										designing and programming a basic iOS app from start. Students will create a 
										simple app that utilizes key platform tools including the GPS locator, 
										accelerator, and camera. In addition, the course will explore third party APIs 
										such as Google Maps and Foursquare.
									</div>
									<br />
									<a href="/course/ios-high-school-course" className="btn btn-success">
										Learn More
									</a>
								</div>
							</div>
						</div>

						<div className="col-md-6 bottommargin">
							<div className="team team-list clearfix">
								<div className="team-image">
									<img src="/images/xcode.jpg" alt="FullStack 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS & Node Evening Course</h4>
										<span>8 Weeks | Mon, Wed | 6pm - 9pm</span>
									</div>
									<div className="team-content">
										The iOS Intensive covers all aspects of iOS development 
										for beginners. Students will 
										cover the key aspects of iOS development from creating sleek UI’s, 
										animations, GPS locator, integrating 3rd party data, and publishing. This 
										course is designed for beginners with little to no programming experience 
										and all development will be done using Swift.
									</div>
									<br />
									<a href="/course/ios-development" className="btn btn-success">
										Learn More
									</a>
								</div>
							</div>
						</div>

						<div className="clear"></div>

						<div className="col-md-6 bottommargin">
							<div className="team team-list clearfix">
								<div className="team-image">
									<img style={{border:'1px solid #ddd'}} src="/images/ios.jpg" alt="FullStack 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS &amp; Node High School Course</h4>
										<span>Jul 18 to Jul 29 | Mon - Fri | 9am - 5pm</span>
									</div>
									<div className="team-content">
										The iOS High School Course takes students through the process of 
										designing and programming a basic iOS app from start. Students will create a 
										simple app that utilizes key platform tools including the GPS locator, 
										accelerator, and camera. In addition, the course will explore third party APIs 
										such as Google Maps and Foursquare.
									</div>
									<br />
									<a href="/course/ios-high-school-course" className="btn btn-success">
										Learn More
									</a>
								</div>
							</div>
						</div>

						<div className="col-md-6 bottommargin">
							<div className="team team-list clearfix">
								<div className="team-image">
									<img src="/images/react.jpg" alt="FullStack 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>Node &amp; React Evening Course</h4>
										<span>8 Weeks | Tues, Thurs | 6pm - 9pm</span>
									</div>
									<div className="team-content">
										The Node &amp; React Development Intensive is a 6-week crash course on backend and 
										frontend development using the most up-to-date technologies. Using Node JS, 
										Mongo, Express and React (with ES6), we will create a fully functional 
										website with user registration, image uploading, email notification 
										functionality.
									</div>
									<br />
									<a href="/course/node-react-evening-course" className="btn btn-success">
										Learn More
									</a>
								</div>
							</div>

						</div>

						<div className="divider divider-short divider-center">
							<i className="icon-circle"></i>
						</div>

						<div className="clear"></div>
					</div>

					<div className="row clearfix common-height" style={{borderTop:'1px solid #ddd'}}>
						<div className="col-md-6 center col-padding" style={{background: 'url("/images/hacking.jpg") center center no-repeat', backgroundSize: 'cover'}}>
							<div>&nbsp;</div>
						</div>

						<div className="col-md-6 center col-padding" style={{backgroundColor: '#fff'}}>
							<div>
								<div className="heading-block nobottomborder">
									<h3>Bootcamps</h3>
								</div>

								<p className="lead">
									FS360 operates 24-week bootcamps that run during evenings and weekends. Designed 
									for working professionals, our bootcamps train students for a career change without 
									having to leave their current job.
								</p>

								<div className="table-responsive">
									<table className="table table-bordered table-striped" style={{background:'#fff', textAlign:'left'}}>
									  <colgroup>
										<col className="col-xs-2" />
										<col className="col-xs-4" />
										<col className="col-xs-4" />
									  </colgroup>
									  <thead>
										<tr>
										  <th>Class</th><th>Dates</th><th>Status</th>
										</tr>
									  </thead>
									  <tbody>
										<tr>
										  <td><span><a href="/course/ios-node-bootcamp">iOS + Node</a></span></td>
										  <td>June 6 - Dec 2, Mon/Wed/Sat</td>
										  <td>Accepting Applications</td>
										</tr>
										<tr>
										  <td><span><a href="/course/node-react-bootcamp">React + Node</a></span></td>
										  <td>June 7 - Dec 2, Tue/Thu/Sat</td>
										  <td>Accepting Applications</td>
										</tr>
									  </tbody>
									</table>
								</div>

							</div>
						</div>
					</div>

					<div className="section">
						<div className="container clearfix">
							<div id="section-couple" className="heading-block title-center page-section">
								<h2>Meet Our Students</h2>
								<span>Current &amp; Former Students</span>
							</div>

							{testimonialList}
						</div>
					</div>
				</section>

				<section id="register" className="section pricing-section nomargin" style={{backgroundColor: '#FFF'}}>
					<div className="container clearfix">
						<h2 className="pricing-section--title center">Sign Up</h2>
						<div style={{textAlign:'center'}}>
							<p style={{fontSize:15}}>
								Cant make it to our live courses? Join our online service. <br />Online members 
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
			        	<h2>{this.state.selectedEvent.title}</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<div style={{textAlign:'center'}}>
				        	<img style={{width:128, borderRadius:64, border:'1px solid #ddd', background:'#fff', marginBottom:24, padding:12}} src={'https://media-service.appspot.com/site/images/'+this.state.selectedEvent.image+'?crop=360'} />
			        	</div>
			        	<input onChange={this.updateUserRegistration} id="firstName" className="form-control" type="text" placeholder="First Name" /><br />
			        	<input onChange={this.updateUserRegistration} id="lastName" className="form-control" type="text" placeholder="Last Name" /><br />
			        	<input onChange={this.updateUserRegistration} id="email" className="form-control" type="text" placeholder="Email" /><br />

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.rsvp} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
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
	var courseList = [];
	var keys = Object.keys(state.courseReducer.courses);
	for (var i=0; i<keys.length; i++){
		var key = keys[i];
		courseList.push(state.courseReducer.courses[key]);
	}

    return {
    	events: state.eventReducer.eventArray,
        currentUser: state.profileReducer.currentUser,
        courses: courseList,
        testimonials: state.staticReducer.testimonials,
        loaderOptions: state.staticReducer.loaderConfig
    }
}


export default connect(stateToProps)(Home)