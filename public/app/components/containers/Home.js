import React, {Component} from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
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
	}

	componentWillMount(){
//		getCurrentUser()
	}

	componentDidMount(){
		console.log('HOME: componentDidMount')
		api.handleGet('/api/course?isFeatured=yes', {});

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

//		api.handlePost('/api/test', this.props.currentUser);

		
	}

	render(){

		var testimonialList = this.props.testimonials.map(function(testimonial, i){
			return <Testimonial key={i} testimonial={testimonial} />
		});

		return (
			<div>
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
											<input value={this.props.currentUser.email} onChange={this.updateUserRegistration} id="lastName" type="text" className="form-control input-lg not-dark" placeholder="Email*" />
										</div>
										<div className="col_one_fourth col_last nobottommargin">
											<select className="form-control input-lg not-dark">
												<option>iOS Bootcamp</option>
												<option>Web Bootcamp</option>
												<option>iOS Part Time</option>
												<option>Web Part Time</option>
											</select>
										</div>
									</div>
									<div className="col_one_fifth col_last nobottommargin">
										<button onClick={this.register} className="btn btn-lg btn-danger btn-block nomargin" value="submit" type="submit">Request Syllabus</button>
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
								<a href="#" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">Learn more</a>
							</div>

							<div className="divider divider-short divider-center">
								<i className="icon-circle"></i>
							</div>

							<div className="clear"></div>

						</div>

						<div className="section">
							<div className="container clearfix">
								<div id="section-couple" className="heading-block title-center page-section">
									<h2>Meet Our Students</h2>
									<span>Meet the Bride &amp; the Groom</span>
								</div>

								{testimonialList}
							</div>
						</div>
					</div>
				</section>

				<section id="section-team" className="page-section">

					<div className="heading-block center">
						<h2>Summer 2016</h2>
						<span>The following courses will run in Spring and Summer</span>
					</div>

					<div className="container clearfix">

						<div className="col-md-6 bottommargin">
							<div className="team team-list clearfix">
								<div className="team-image">
									<img src="/images/iphone.jpg" alt="John Doe" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS High School Course</h4>
										<span>2 weeks</span>
									</div>
									<div className="team-content">
										The iOS Crash Course takes beginners through the process of 
										designing and programming a basic iOS app from start. Students will create a 
										simple app that utilizes key platform tools including the GPS locator, 
										accelerator, and camera. In addition, the course will explore third party APIs 
										such as Google Maps and Foursquare.
									</div>
									<br />
									<a href="/course/123" className="btn btn-success">
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
										<span>6 Weeks</span>
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
									<a href="/course/123" className="btn btn-success">
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
										<span>2 Weeks</span>
									</div>
									<div className="team-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda similique unde mollitia.</div>
									<br />
									<a href="/course/123" className="btn btn-success">
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
										<span>6 Weeks</span>
									</div>
									<div className="team-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda similique unde mollitia.</div>
									<br />
									<a href="/course/123" className="btn btn-success">
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

					<div className="row clearfix common-height">
						<div className="col-md-6 center col-padding" style={{background: 'url("/images/hacking.jpg") center center no-repeat', backgroundSize: 'cover'}}>
							<div>&nbsp;</div>
						</div>

						<div className="col-md-6 center col-padding" style={{backgroundColor: '#F5F5F5'}}>
							<div>
								<div className="heading-block nobottomborder">
									<h3>Walkthrough Videos &amp; Demos</h3>
								</div>

								<p className="lead">
									Democracy inspire breakthroughs, Rosa Parks; inspiration raise awareness natural 
									resources. Governance impact; transformative donation philanthropy, respect 
									reproductive.
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
										  <th>Class</th>
										  <th>Dates</th>
										  <th>Status</th>
										</tr>
									  </thead>
									  <tbody>
										<tr>
										  <td><span>iOS + Node</span></td>
										  <td>June 1 - Nov 28</td>
										  <td>Accepting Applications</td>
										</tr>
										<tr>
										  <td><span>Full Stack Web</span></td>
										  <td>June 1 - Nov 28</td>
										  <td>Closed</td>
										</tr>
									  </tbody>
									</table>
								</div>

								<a href="#" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">Apply</a>
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
	var courseList = [];
	var keys = Object.keys(state.courseReducer.courses);
	for (var i=0; i<keys.length; i++){
		var key = keys[i];
		courseList.push(state.courseReducer.courses[key]);
	}


    return {
        currentUser: state.profileReducer.currentUser,
        courses: courseList,
        testimonials: state.staticReducer.testimonials
    }
}


export default connect(stateToProps)(Home)