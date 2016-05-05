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

class Ios extends Component {

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

	componentWillMount(){
//		getCurrentUser()
	}

	componentDidMount(){
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

		if (event.target.id == 'membershiptype'){
			this.setState({
				membershiptype: event.target.value
			})
		}

		var updatedUser = Object.assign({}, this.props.currentUser);
		updatedUser[event.target.id] = event.target.value
		store.dispatch(actions.updateCurrentUser(updatedUser));
	}

	validate(withPassword){
		console.log('VALIDATE: '+JSON.stringify(this.props.currentUser))
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
			console.log('REGISTER RESPONSE: '+JSON.stringify(response));

			if (err){
				_this.setState({
					showLoader: false
				});
				alert(err.message)
				return
			}

//			alert(response.message)
			window.location.href = '/courses'
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
		console.log('OPEN MODAL: '+event.target.id)
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

		return (
			<div>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />

		        <header id="header" className="transparent-header page-section dark">
		            <div id="header-wrap">
		                <div className="container clearfix">
		                    <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

		                    <div id="logo">
		                        <a href="/" className="standard-logo" data-dark-logo="/images/logo-dark.png"><img src="/images/logo.png" alt="FullStack 360" /></a>
		                        <a href="/" className="retina-logo" data-dark-logo="/images/logo-dark@2x.png"><img src="/images/logo@2x.png" alt="FullStack 360" /></a>
		                    </div>

		                    <nav id="primary-menu">
		                        <ul className="one-page-menu">
		                            <li className="current"><a href="/" data-href="#header"><div>Home</div></a></li>
		                            <li><a href="/application" data-href="#section-buy"><div>Apply</div></a></li>
		                        </ul>
		                    </nav>
		                </div>
		            </div>
		        </header>


		        <section id="slider" style={{background: 'url("/images/ios-banner.jpg") center', overflow:'visible'}} data-height-lg="450" data-height-md="450" data-height-sm="600" data-height-xs="600" data-height-xxs="600">
		            <div className="container clearfix">

		                <form action="#" method="post" role="form" className="landing-wide-form landing-form-overlay dark clearfix">
		                    <div className="heading-block nobottommargin nobottomborder">
		                        <h2>Request More Info</h2>
		                    </div>
		                    <div className="line" style={{ margin: '15px 0 30px' }}></div>
		                    <div className="col_full">
		                        <input type="text" className="form-control input-lg not-dark" placeholder="Name" />
		                    </div>
		                    <div className="col_full">
		                        <input type="text" className="form-control input-lg not-dark" placeholder="Last Name" />
		                    </div>
		                    <div className="col_full">
		                        <input type="email" className="form-control input-lg not-dark" placeholder="Email" />
		                    </div>
		                    <div className="col_full">
		                        <input type="password" className="form-control input-lg not-dark" placeholder="Phone" />
		                    </div>
		                    <div className="col_full nobottommargin">
		                        <button className="btn btn-lg btn-danger btn-block nomargin" value="submit" type="submit">Submit</button>
		                    </div>
		                </form>

		            </div>
		        </section>


				<section id="content">
					<div className="content-wrap">

		                <div className="promo promo-dark promo-full landing-promo header-stick">
		                    <div className="container clearfix">
		                        <h3>Beautiful Landing Page designs waiting for you inside</h3>
		                        <span>Youll love our beautiful &amp; interactive builder that makes your build process easier &amp; fun.</span>
		                    </div>
		                </div>

						<div className="container clearfix" style={{paddingTop:64}}>

							<div className="col_one_third bottommargin-sm" style={{background:'#f9f9f9'}}>
								<div className="widget clearfix" style={{padding:24}}>
									<h4>Spotlight</h4>
									<img style={{width:128, borderRadius:64}} src="/images/briancorrea.jpg" alt="FullStaack 360" />
									<hr />
									<h3 style={{marginBottom:6}}>Brian Correa</h3>
									<strong style={{color:'#1ABC9C'}}>iOS &amp; Node Course</strong>
									<br />
									<p>
										On the first day of class my instructor taught me more than I taught myself in 
										the three weeks. I immediately knew I made the right choice to learn iOS with 
										FS360. The hands-on structure of the class is the best use of my time and 
										prevents me from wasting time trying to get one thing off the ground. Instead, 
										I was immediately building projects. I am confident that after the FS360 class, 
										my skill-set will be appealing to companies looking to hire a junior developer.
									</p>

									<div className="tagcloud">
										<a href="#">iOS</a>
										<a href="#">Node JS</a>
										<a href="#">Swift</a>
										<a href="#">REST API</a>
										<a href="#">JavaScript</a>
									</div>
								</div>
							</div>

							<div className="col_two_third bottommargin-sm col_last">
								<h3>Learn to Build Real iPhone Apps</h3>
								<p>
									FullStack 360 is designed for part-time students who want to accelerate their learning through a
									flexible night and weekend schedule. Our iOS-focused curriculum will teach you the fundamentals
									of programming, how to solve problems like an engineer, and launch your own iPhone App to the App Store.
									<br /><br />
									Our focus is to teach the most up-to-date technologies to prepare students for the rapidly changing
									landscape in software. It all too common that aspiring developers waste valuable time learning 
									outdated languages and frameworks, only to find out they do not have the marketable skills to
									transition into tech.
								</p>

								<hr />

								<h3>Learn to Build Real iPhone Apps</h3>
								<p>
									FullStack 360 is designed for part-time students who want to accelerate their learning through a
									flexible night and weekend schedule. Our iOS-focused curriculum will teach you the fundamentals
									of programming, how to solve problems like an engineer, and launch your own iPhone App to the App Store.
								</p>

							</div>

						</div>
					</div>
				</section>

				<section style={{background:'#f9f9f9', paddingTop:48, borderTop:'1px solid #ddd'}}>
					<div className="heading-block center">
						<h2>iOS Courses</h2>
					</div>

					<div className="content-wrap" style={{paddingTop:0}}>
						<div className="container clearfix">

							<div className="team team-list clearfix">
								<div className="team-image">
									<img style={{border:'1px solid #ddd'}} src="/images/xcode.jpg" alt="FullStack 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS &amp; Node 24-Week Part Time Bootcamp</h4>
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

							<div style={{margin:36}}></div>

							<div className="team team-list clearfix">
								<div className="team-image">
									<img style={{border:'1px solid #ddd'}} src="/images/ios.jpg" alt="FullStack 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS &amp; Node Evening Course</h4>
										<span>June 6 to July 27 | Mon, Wed | 6pm - 9pm</span>
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
			        	<input onChange={this.updateUserRegistration} id="firstName" className="form-control" type="text" placeholder="First Name" /><br />
			        	<input onChange={this.updateUserRegistration} id="lastName" className="form-control" type="text" placeholder="Last Name" /><br />
			        	<input onChange={this.updateUserRegistration} id="email" className="form-control" type="text" placeholder="Email" /><br />
			        	<input onChange={this.updateUserRegistration} id="password" className="form-control" type="password" placeholder="Password" /><br />
						<select onChange={this.updateUserRegistration} id="membershiptype" value={this.state.membershiptype} className="form-control input-md not-dark">
							<option value="basic">Basic</option>
							<option value="starter">Starter</option>
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
//	console.log('STATE TO PROPS: '+JSON.stringify(state));
	var courseList = [];
	var keys = Object.keys(state.courseReducer.courses);
	for (var i=0; i<keys.length; i++){
		var key = keys[i];
		courseList.push(state.courseReducer.courses[key]);
	}

    return {
//    	events: state.eventReducer.eventArray,
        currentUser: state.profileReducer.currentUser,
        courses: courseList,
        testimonials: state.staticReducer.testimonials,
        loaderOptions: state.staticReducer.loaderConfig
    }
}


export default connect(stateToProps)(Ios)