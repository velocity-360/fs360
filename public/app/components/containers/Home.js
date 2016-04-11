import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import EventCard from '../../components/EventCard'
import Testimonial from '../../components/Testimonial'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
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
		this.state = {
			showLoader: false,
			showModal: false,
			bootcamp: {
				subject: 'Bootcamp',
				image: 'logo_round_green_260.png',
				button: 'Request Info'
			},
			selectedEvent: {
				id: null,
				subject: '',
				image: ''
			},
			selectedCourse: 'ios bootcamp' // for syllabus requests
		}
	}

	componentWillMount(){
//		getCurrentUser()
	}

	componentDidMount(){
//		console.log('HOME: componentDidMount')
		// api.handleGet('/api/course?isFeatured=yes', {});

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
		updatedUser[event.target.id] = event.target.value
		store.dispatch(actions.updateCurrentUser(updatedUser));
	}

	register(event){
		event.preventDefault()
		console.log('REGISTER: '+JSON.stringify(this.props.currentUser));

		// api.handlePost('/api/test', this.props.currentUser, null);
	}

	rsvp(event){
		event.preventDefault()

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
			console.log('RSVP REQUEST RESPONSE: '+JSON.stringify(response));
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
		console.log('SYLLABUS REQUEST: '+this.state.selectedCourse)

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
		this.setState({showModal: false})
	}

	render(){
		var testimonialList = this.props.testimonials.map(function(testimonial, i){
			return <Testimonial key={i} testimonial={testimonial} />
		});

		var _openModal = this.openModal;
		var events = this.props.events.map(function(e, i){
			return <EventCard key={i} event={e} click={_openModal} />
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
												<option value="ios intensive">iOS Intensive</option>
												<option value="web intensive">Web Intensive</option>
												<option value="ios hs course">iOS HS Course</option>
												<option value="web hs course">Web HS Course</option>
												<option value="ios bootcamp">iOS Bootcamp</option>
												<option value="web bootcamp">Web Bootcamp</option>
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
									in NYC focus on today. Flatiron School, General Assebmbly, Dev Bootcamp all 
									teach Rails while we focus on tomorrow. Our stack is Node JS with React on 
									the front end and ES2015. Will you be among the flood of Rails devs 
									saturating the NYC market or will you be ready for the tech stack of tomorrow?
								</p>

								<a href="/courses" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">View Courses</a>
							</div>

							<div id="events" className="divider divider-short divider-center">
								<i className="icon-circle"></i>
							</div>

							<div id="posts" className="events small-thumbs">
								<div style={{textAlign:'center', paddingTop:64}}>
									<h3>Events</h3>
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
									<img src="/images/ios.jpg" alt="John Doe" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS High School Course</h4>
										<span>2 Weeks | Mon - Fri | 9am - 5pm</span>
									</div>
									<div className="team-content">
										The iOS High School Course takes students through the process of 
										designing and programming a basic iOS app from start. Students will create a 
										simple app that utilizes key platform tools including the GPS locator, 
										accelerator, and camera. In addition, the course will explore third party APIs 
										such as Google Maps and Foursquare.
									</div>
									<br />
									<a href="/course/first-course" className="btn btn-success">
										Learn More
									</a>
								</div>
							</div>
						</div>

						<div className="col-md-6 bottommargin">
							<div className="team team-list clearfix">
								<div className="team-image">
									<img src="/images/xcode.jpg" alt="Nix Maxwell" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS Intensive</h4>
										<span>6 Weeks | Tue, Thu | 6pm - 9pm</span>
									</div>
									<div className="team-content">
										The iOS Intensive covers all aspects of iOS development 
										for beginners. For 4 hours a day, 4 days a week, students will 
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
									<img src="/images/node.jpg" alt="Josh Clark" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>Web High School Course</h4>
										<span>2 Weeks | Mon - Fri | 9am - 5pm</span>
									</div>
									<div className="team-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda similique unde mollitia.</div>
									<br />
									<a href="/course/first-course" className="btn btn-success">
										Learn More
									</a>
								</div>
							</div>
						</div>

						<div className="col-md-6 bottommargin">
							<div className="team team-list clearfix">
								<div className="team-image">
									<img src="/images/react.jpg" alt="Mary Jane" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>Web Intensive</h4>
										<span>6 Weeks | Mon, Wed | 6pm - 9pm</span>
									</div>
									<div className="team-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda similique unde mollitia.</div>
									<br />
									<a href="/course/first-course" className="btn btn-success">
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
										  <td><span>iOS + Node</span></td>
										  <td>May 2 - Oct 28</td>
										  <td>Closed</td>
										</tr>
										<tr>
										  <td><span>Full Stack Web</span></td>
										  <td>May 2 - Oct 28</td>
										  <td>Closed</td>
										</tr>
										<tr>
										  <td><span>iOS + Node</span></td>
										  <td>June 1 - Nov 28</td>
										  <td>Accepting Applications</td>
										</tr>
										<tr>
										  <td><span>Full Stack Web</span></td>
										  <td>June 1 - Nov 28</td>
										  <td>Accepting Applications</td>
										</tr>
									  </tbody>
									</table>
								</div>

								<a onClick={this.openModal} id="bootcamp" href="#" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">
									Request Information
								</a>
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

				<section className="section pricing-section nomargin" style={{backgroundColor: '#FFF'}}>
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
								<p className="pricing--sentence">Small business solution</p>
								<ul className="pricing--feature-list">
									<li className="pricing--feature">Unlimited calls</li>
									<li className="pricing--feature">Free hosting</li>
									<li className="pricing--feature">40MB of storage space</li>
								</ul>
								<button className="pricing--action">Join</button>
							</div>
							<div className="pricing--item">
								<h3 className="pricing--title">Starter</h3>
								<div style={{fontSize: '1.15em'}} className="pricing--price"><span className="pricing--currency">$</span>19.99/mo</div>
								<p className="pricing--sentence">Medium business solution</p>
								<ul className="pricing--feature-list">
									<li className="pricing--feature">Unlimited calls</li>
									<li className="pricing--feature">Free hosting</li>
									<li className="pricing--feature">10 hours of support</li>
									<li className="pricing--feature">Social media integration</li>
									<li className="pricing--feature">1GB of storage space</li>
								</ul>
								<button className="pricing--action">Join</button>
							</div>
							<div className="pricing--item">
								<h3 className="pricing--title">Premium</h3>
								<div style={{fontSize: '1.15em'}} className="pricing--price"><span className="pricing--currency">$</span>29.99/mo</div>
								<p className="pricing--sentence">Gigantic business solution</p>
								<ul className="pricing--feature-list">
									<li className="pricing--feature">Unlimited calls</li>
									<li className="pricing--feature">Free hosting</li>
									<li className="pricing--feature">Unlimited hours of support</li>
									<li className="pricing--feature">Social media integration</li>
									<li className="pricing--feature">Anaylitcs integration</li>
									<li className="pricing--feature">Unlimited storage space</li>
								</ul>
								<button className="pricing--action">Join</button>
							</div>
						</div>
					</div>
				</section>				

		        <Modal show={this.state.showModal} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>{this.state.selectedEvent.subject}</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<div style={{textAlign:'center'}}>
				        	<img style={{width:128, borderRadius:64, border:'1px solid #ddd', background:'#fff', marginBottom:24, padding:12}} src={'/images/'+this.state.selectedEvent.image} />
			        	</div>
			        	<input onChange={this.updateUserRegistration} id="firstName" className="form-control" type="text" placeholder="First Name" /><br />
			        	<input onChange={this.updateUserRegistration} id="lastName" className="form-control" type="text" placeholder="Last Name" /><br />
			        	<input onChange={this.updateUserRegistration} id="email" className="form-control" type="text" placeholder="Email" /><br />

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.rsvp} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">{this.state.selectedEvent.button}</a>
			        </Modal.Footer>
		        </Modal>


				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(state));
	var courseList = [];
	var keys = Object.keys(state.courseReducer.courses);
	for (var i=0; i<keys.length; i++){
		var key = keys[i];
		courseList.push(state.courseReducer.courses[key]);
	}

    return {
        currentUser: state.profileReducer.currentUser,
        courses: courseList,
        testimonials: state.staticReducer.testimonials,
        events: state.staticReducer.events,
        loaderOptions: state.staticReducer.loaderConfig
    }
}


export default connect(stateToProps)(Home)