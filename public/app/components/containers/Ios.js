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
		this.updateVisitor = this.updateVisitor.bind(this)
		this.submitInfoRequest = this.submitInfoRequest.bind(this)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.syllabusRequest = this.syllabusRequest.bind(this)
		this.validate = this.validate.bind(this)
		this.state = {
			showRegistration: false,
			showLoader: false,
			showModal: false,
			visitor: {
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				course: 'ios-node-bootcamp'
			}
		}
	}

	componentWillMount(){
//		getCurrentUser()
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

	submitInfoRequest(event){
		event.preventDefault()
//		console.log('submitInfoRequest: '+JSON.stringify(this.state.visitor))

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
		api.handlePost('/api/info', this.state.visitor, function(err, response){
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


	validate(withPassword){
		var visitor = this.state.visitor
		console.log('VALIDATE: '+JSON.stringify(visitor))
		if (visitor.firstName.length == 0)
			return 'First Name'

		if (visitor.lastName.length == 0)
			return 'Last Name'

		if (visitor.email.length == 0)
			return 'Email'

		if (withPassword == false)
			return null

		if (visitor.password.length == 0)
			return 'Password'

		return null // this is successful
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

		var visitor = Object.assign({}, this.state.visitor)
		visitor['course'] = event.target.id

		this.setState({
			showModal: true,
			visitor: visitor
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

		        <section id="slider" style={{background: 'url("/images/ios-banner.jpg") center', overflow:'visible'}} data-height-lg="450" data-height-md="450" data-height-sm="600" data-height-xs="600" data-height-xxs="600">
		            <div className="container clearfix">

		                <form action="#" method="post" role="form" className="landing-wide-form landing-form-overlay dark clearfix">
		                    <div className="heading-block nobottommargin nobottomborder">
		                        <h2>Request More Info</h2>
		                    </div>
		                    <div className="line" style={{ margin: '15px 0 30px' }}></div>
		                    <div className="col_full">
		                        <input onChange={this.updateVisitor} id="firstName" type="text" className="form-control input-lg not-dark" placeholder="First Name" />
		                    </div>
		                    <div className="col_full">
		                        <input onChange={this.updateVisitor} id="lastName" type="text" className="form-control input-lg not-dark" placeholder="Last Name" />
		                    </div>
		                    <div className="col_full">
		                        <input onChange={this.updateVisitor} id="email" type="text" className="form-control input-lg not-dark" placeholder="Email" />
		                    </div>
		                    <div className="col_full">
		                        <input onChange={this.updateVisitor} id="phone" type="text" className="form-control input-lg not-dark" placeholder="Phone" />
		                    </div>
		                    <div className="col_full nobottommargin">
		                        <button onClick={this.submitInfoRequest} className="btn btn-lg btn-danger btn-block nomargin" value="submit">Submit</button>
		                    </div>
		                </form>

		            </div>
		        </section>


				<section id="content">
					<div className="content-wrap">

		                <div className="promo promo-dark promo-full landing-promo header-stick">
		                    <div className="container clearfix">
		                        <h3>Become a Professional iOS Developer in 24 Weeks</h3>
		                        <span>
		                        	Learn iOS and Web development in the evening without leaving your current job.
		                        </span>
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

								<h3>Beyond the Course</h3>
								<p>
									Whether you are looking for a job as a software developer or starting your own company, 
									FS360 will help the transition. We provide students with interview preparation, practice, 
									and assigments gathered from previous students who have gone through many interview 
									processes. Our former students have gone on to work at companies like the New York Times, 
									<a target="_blank" href="http://eranyc.com/"> ERA Accelerator</a>, and several NYC based 
									startups.
								</p>
							</div>

						</div>
					</div>
				</section>

				<section style={{background:'#f9f9f9', paddingTop:48, borderTop:'1px solid #ddd'}}>
					<div className="heading-block center">
						<h2>Courses</h2>
					</div>

					<div className="content-wrap" style={{paddingTop:0}}>
						<div className="container clearfix">

							<div className="team team-list clearfix">
								<div className="team-image">
									<img style={{border:'1px solid #ddd'}} src="/images/xcode.jpg" alt="FullStack 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS &amp; Node 24-Week Bootcamp</h4>
										<span>June 6th - Dec 2nd</span>
										<span>Tues/Thur, 6pm - 9pm</span>
										<span>Sat, 12pm - 4pm</span>
									</div>
									<div className="team-content">
										The 24-Week iOS Intensive is a comprehensive course in all aspects of iOS 
										development for beginners. 3 days a week, students will cover the key aspects 
										of iOS development from creating sleek UI’s, animations, GPS locator, 
										integrating 3rd party data, and publishing. This course is designed for 
										beginners with little to no programming experience and all development is 
										done with Swift. By the end of the course, students will have published at least 
										one app to the App Store and gained the skills neccessary to begin working as 
										junior iOS developers.
									</div>
									<br />
									<a onClick={this.openModal} id="ios-node-bootcamp" href="#" className="btn btn-success">
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
										<span>June 6 to July 27</span>
										<span>Mon/Wed, 6pm - 9pm</span>
									</div>
									<div className="team-content">
										The 8-week iOS Evening Course takes beginners through the process of designing 
										and programming a basic iOS app from start. Students will create a simple app 
										that utilizes key platform tools including the GPS locator, accelerator, and 
										camera. In addition, the course will explore third party APIs such as Google 
										Maps and Foursquare.
									</div>
									<br />
									<a onClick={this.openModal} id="ios-node-evening" href="#" className="btn btn-success">
										Learn More
									</a>
								</div>
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
			        	<input onChange={this.updateVisitor} value={this.state.visitor.firstName} id="firstName" className="form-control" type="text" placeholder="First Name" /><br />
			        	<input onChange={this.updateVisitor} value={this.state.visitor.lastName} id="lastName" className="form-control" type="text" placeholder="Last Name" /><br />
			        	<input onChange={this.updateVisitor} value={this.state.visitor.email} id="email" className="form-control" type="text" placeholder="Email" /><br />
			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.submitInfoRequest} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
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