import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import Nav from '../../components/Nav'
import Register from '../../components/Register'
import Footer from '../../components/Footer'
import store from '../../stores/store'
import actions from '../../actions/actions'
import stripe from '../../utils/StripeUtils'
import api from '../../api/api'

class Landing extends Component {

	constructor(props, context){
		super(props, context)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.submitInfoRequest = this.submitInfoRequest.bind(this)
		this.validate = this.validate.bind(this)
		this.state = {
			showLoader: false,
			visitor: {
				name: '',
				email: '',
				phone: '',
				course: 'Fundamentals Bootcamp',
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
		event.preventDefault()

		var visitor = Object.assign({}, this.state.visitor)
		visitor[event.target.id] = event.target.value
		this.setState({
			visitor: visitor
		})
	}

	submitInfoRequest(event){
		event.preventDefault()

		var missingField = this.validate(this.state.visitor, false);
		if (missingField != null){
			alert('Please enter your '+missingField);
			return
		}

		this.setState({
			showLoader: true
		})

		var pkg = Object.assign({}, this.state.visitor)
		var _this = this
		api.handlePost('/api/info', pkg, function(err, response){
			_this.setState({
				showLoader: false
			})

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		})
	}


	validate(profile, withPassword){
		if (profile.name.length == 0)
			return 'Name'

		if (profile.email.length == 0)
			return 'Email'

		if (withPassword == false)
			return null

		if (profile.password.length == 0)
			return 'Password'

		return null // this is successful
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
									<option value="fundamentals-bootcamp">Fundamentals Bootcamp</option>
									<option value="mvp-bootcamp">MVP Bootcamp</option>
								</select>
		                    </div>

		                    <div className="col_full nobottommargin">
		                        <button onClick={this.submitInfoRequest} className="btn btn-lg btn-danger btn-block nomargin" value="submit">Request Syllabus</button>
		                    </div>
		                </form>

		            </div>
		        </section>


				<section>
					<div className="content-wrap">
		                <div className="promo promo-dark promo-full landing-promo header-stick">
		                    <div className="container clearfix">
		                        <h3>Build Real Products</h3>
		                        <span>
		                        	Velocity 360 is the only coding bootcamp that uses real projects from<br />
		                        	local startups to teach students.
		                        </span>
		                    </div>
		                </div>

						<div className="container clearfix" style={{paddingTop:64}}>
							<div className="col_two_third bottommargin-sm">
			                    <div className="fancy-title title-bottom-border">
			                        <h3>Real World Experience</h3>
			                    </div>
								<p>
									<img style={{background:'#fff', float:'left', border:'1px solid #ddd', maxWidth: 260, padding:6, marginRight:12}} className="image_fade" src="/images/class.jpg" alt="Velocity 360" />
									The Velocity 360 program provides real development experience by partnering with local 
									startups to build their prototypes (often referred to as 'MVP' - Minimal Viable Product). 
									After a 6-week period covering programming fundamentals, students work in groups of 2-4 
									on an actual project that was pre-vetted by the Velocity 360 team.
									<br /><br />
									At the end of the program, students will publish a real, live product that will be 
									further supported by the startup team. As such, students will already have a professional project on 
									their portfolio immediately upon completion and may even continue with the project beyond 
									the course.
								</p>

			                    <div className="fancy-title title-bottom-border">
			                        <h3>How It Works</h3>
			                    </div>
								The Velocity Bootcamp Program is divided into two parts.
								<br /><br />
		                        <div className="col_half panel panel-default">
		                            <div className="panel-heading">
		                                <h2 className="panel-title">
		                                	<a style={{color:'#1ABC9C'}} href="#">6-Week Fundamentals Bootcamp</a>
		                                	</h2>
		                            </div>
		                            <div className="panel-body" style={{background:'#FEFEFA'}}>
										The Fundamentals Bootcamp covers backend and frontend development using the 
										most up-to-date technologies. Using Node JS, Mongo, Express and React 
										(with ES6), we create a fully functional website with user registration, 
										image uploading, email notification functionality. We also touch on React 
										Native which leverages the powerful library to build native iOS apps in 
										JavaScript.			                            
			                            <br /><br />
			                            <ul style={{listStyle: 'none', fontWeight:'600'}}>
				                            <li>Jul 11th - Aug 19th</li>
				                            <li>Mon - Fri</li>
				                            <li>9am - 5pm</li>
			                            </ul>
										<a href="/course/fundamentals-bootcamp" className="button button-rounded button-reveal button-large button-border tright">
											<i className="icon-signal"></i>
											<span>Apply</span>
										</a>				                            
		                            </div>
		                        </div>

		                        <div className="col_half panel panel-default col_last">
		                            <div className="panel-heading">
		                                <h2 className="panel-title">
		                                	<a style={{color:'#1ABC9C'}} href="#">6-Week MVP Bootcamp</a>
		                                </h2>
		                            </div>
		                            <div className="panel-body" style={{background:'#FFFDFD'}}>
		                            	The MVP Bootcamp builds real projects with local startups. All 
		                            	projects are carefully vetted by our staff for feasibility, originality of idea, and 
		                            	strength founding team. The startups are from incubators, accelerators and nearby 
		                            	universities. By the end of the bootcamp, all students will have a professional 
		                            	project on their resumes and may even continue with the startup beyond the course.
			                            <br /><br />
			                            <ul style={{listStyle: 'none', fontWeight:'600'}}>
				                            <li>Aug 22nd - Sep 30th</li>
				                            <li>Mon - Fri</li>
				                            <li>9am - 5pm</li>
			                            </ul>
										<a href="/course/mvp-bootcamp" className="button button-rounded button-reveal button-large button-border tright">
											<i className="icon-signal"></i>
											<span>Apply</span>
										</a>				                            

		                            </div>
		                        </div>

		                        <div className="clearfix"></div>
								Each section is a stand-alone course meaning students can enroll in one and not the other. 
								However, the MVP Bootcamp requires working knowledge of the material covered in the Fundamentals 
								Course so students should not be complete beginners for this sequence. The tuition for each course 
								is $6,500 but when taken together, the combined tuition is $11,500.<br />
								All live classes take place in our NYC location:<br /><br />
								<strong>Velocity 360</strong><br />
								<strong>27 East 28th Street</strong><br />
								<strong>New York, NY, 10016</strong>
							</div>

							<div className="col_one_third bottommargin-sm hidden-xs col_last">

								<div className="widget clearfix" style={{padding:24, textAlign:'center', border:'1px solid #ddd', background:'#f9f9f9'}}>
									<h4>Featured Tutorial</h4>
									<div className={'wistia_embed wistia_async_ehbr4b234p videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>
									<hr />
									<strong>Setting Up a Node JS Project</strong>
									<br /><br />
									<p>
										Set up a basic project using Express and use http request details from the 
										browser to generate dynamic responses. 
									</p>
									<div className="tagcloud">
										<a style={{background:'#fff'}} href="#">JavaScript</a>
										<a style={{background:'#fff'}} href="#">Node JS</a>
										<a style={{background:'#fff'}} href="#">Express</a>
										<a style={{background:'#fff'}} href="#">Mongo DB</a>
									</div>

								</div>

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
									</p>

									<div className="tagcloud">
										<a style={{background:'#fff'}} href="#">iOS</a>
										<a style={{background:'#fff'}} href="#">Node JS</a>
										<a style={{background:'#fff'}} href="#">REST API</a>
										<a style={{background:'#fff'}} href="#">JavaScript</a>
									</div>
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
										<h4>iOS &amp; Node Evening Course</h4>
										<span>August 8th - September 28th</span>
										<span>Mon/Weds 6pm - 9pm</span>
									</div>
									<div className="team-content">
										The 8-week iOS & Node Evening Course takes beginners through the process of 
										designing and programming a basic iOS app from start. Students will create a 
										simple app that utilizes key platform tools including the GPS locator, 
										accelerator, and camera. In addition, the course will explore third party APIs 
										such as Google Maps and Foursquare.
									</div>
									<br />
									<a href="/course/ios-node-evening-course" className="btn btn-success">
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
										<h4>Node &amp; React Evening Course</h4>
										<span>August 9th - September 29th</span>
										<span>Tues/Thurs 6pm - 9pm</span>
									</div>
									<div className="team-content">
										React and NodeThe Node & React Development Evening course is an 8-week class 
										that covers backend and frontend development using the most up-to-date 
										technologies. Using Node JS, Mongo, Express and React (with ES6), we will 
										create a fully functional website with user registration, image uploading, 
										email notification functionality.
									</div>
									<br />
									<a href="/course/node-react-evening-course" className="btn btn-success">
										Learn More
									</a>
								</div>
							</div>

						</div>

					</div>
				</section>

				<Register />
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
