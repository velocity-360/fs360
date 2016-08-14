import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import CTA from '../../components/CTA'
import CourseSection from '../../components/CourseSection'
import CourseCard from '../../components/CourseCard'
import Application from '../../components/Application'
import DetailBox from '../../components/DetailBox'
import Login from '../../components/Login'
import store from '../../stores/store'
import actions from '../../actions/actions'
import api from '../../utils/APIManager'

class Course extends Component {

	constructor(props, context){
		super(props, context)
		this.closeModal = this.closeModal.bind(this)
		this.closeLogin = this.closeLogin.bind(this)
		this.toggleApplication = this.toggleApplication.bind(this)
		this.submitApplication = this.submitApplication.bind(this)
		this.showLoader = this.showLoader.bind(this)
		this.hideLoader = this.hideLoader.bind(this)
		this.showLogin = this.showLogin.bind(this)
		this.showConfirmation = this.showConfirmation.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.updateCourse = this.updateCourse.bind(this)
		this.updateCurrentUser = this.updateCurrentUser.bind(this)
		this.state = {
			showApplication: false,
			showLogin: false,
			showConfirmation: false,
			syllabusRequest: {
				name: '',
				email: '',
				course: '',
				subject: 'Syllabus Request'
			}
		}
	}

	closeModal(){
		this.setState({
			showLogin: false,
			showConfirmation: false
		})
	}

	closeLogin(){
		this.setState({showLogin: false})
	}

	showLogin(){
		this.setState({showLogin: true})
	}

	showConfirmation(){
		this.setState({showConfirmation: true})
	}

	showLoader(){
		this.setState({showLoader: true})
	}

	hideLoader(){
		this.setState({showLoader: false})
	}

	toggleApplication(event){
		if (event != null)
			event.preventDefault()

		const showApplication = !this.state.showApplication
		this.setState({
			showApplication: showApplication
		})
	}

	subscribe(event){
		event.preventDefault()
		console.log('Subscribe')

		if (this.props.currentUser.id == null){ // not logged in
			this.showLogin()
			return
		}

		// check credits first:
		const course = this.props.courses[this.props.slug]
		if (this.props.currentUser.credits < course.credits && this.props.currentUser.accountType=='basic'){
			alert('Not Enough Credits. Please Upgrade to Premium or Purchase More Credits.')
			return
		}

		// Fetch course first to get most updated subscriber list:
		const _this = this
		const endpoint = '/api/course/'+course.id
		api.handleGet(endpoint, null, (err, response) => {
			if (err){
				alert(err.message)
				return
			}

			const updatedCourse = response.course
			var subscribers = updatedCourse.subscribers
			if (subscribers.indexOf(_this.props.currentUser.id) != -1) // already subscribed
				return

			subscribers.push(_this.props.currentUser.id)
			_this.updateCourse({
				subscribers: subscribers
			})
		})
	}


	updateCourse(pkg){
		const course = this.props.courses[this.props.slug]
		var _this = this
		const endpoint = '/api/course/'+course.id
		api.handlePut(endpoint, pkg, (err, response) => {
			if (err){
				alert(err.message)
				return
			}

			const updatedCourse = response.course
			store.currentStore().dispatch(actions.courseRecieved(updatedCourse))

			if (_this.props.currentUser.accountType == 'premium')
				return
			
			const credits = _this.props.currentUser.credits-updatedCourse.credits
			_this.updateCurrentUser({
				credits: credits
			})
		})
	}

	updateCurrentUser(pkg){
		const endpoint = '/api/profile/'+this.props.currentUser.id
		api.handlePut(endpoint, pkg, (err, response) => {
			if (err){
				alert(err.message)
				return
			}

			store.currentStore().dispatch(actions.currentUserRecieved(response.profile))
		})
	}	

	submitApplication(application){
		const course = this.props.courses[this.props.slug]
		this.setState({
			showLoader: true,
			showApplication: false
		})

		application['course'] = course.title
//		var _this = this
		api.handlePost('/account/application', application, (err, response) => {
			this.setState({showLoader: false})

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		})
	}	

	render(){
		const course = this.props.courses[this.props.slug]

		var startDate = (course.dates == null) ? '' : course.dates.split('-')[0].trim()
		var _course = course
		var _currentUser = this.props.currentUser
		var _showLogin = this.showLogin
		var _subscribe = this.subscribe

		// var units = course.units.map(function(unit, i){
		// 	return <CourseSection key={i} loginAction={_showLogin} unit={unit} course={_course} subscribeAction={_subscribe} currentUser={_currentUser} />
		// })

		var units = course.units.map((unit, i) => {
			return (
				<div key={i} className="entry clearfix">
					<div className="entry-timeline">
						Unit<span>{i+1}</span>
						<div className="timeline-divider"></div>
					</div>
					<div className="panel panel-default" style={{maxWidth:600}}>
						<div className="panel-body" style={{padding:36}}>
							<h3>{unit.topic}</h3>
							<hr />
							{unit.description}<br />
						</div>
					</div>
				</div>
			)
		})

		const faq = this.props.faq.general.map((question, i) => {
			return (
            	<div key={i}>
                    <div style={{background:'#fff'}} className="acctitle"><i className="acc-closed icon-question-sign"></i><i className="acc-open icon-question-sign"></i>{question.question}</div>
                    <div style={{background:'#fff'}} className="acc_content clearfix" dangerouslySetInnerHTML={{__html: question.answer }}></div>
               	</div>
			)
		})

		return (
			<div id="wrapper" className="clearfix">
				<Nav headerStyle="dark" />

				<section id="lpf-header" style={{backgroundImage: "url('/images/joe_light_blue.png')"}} >
					<header>
						<div className="content-wrapper dark">
							<div className="content">
								<h2>{course.title}</h2>
								<h4 className="muted">
									Learn Fullstack Development for Web and Mobile with Node, React, React Native
								</h4>
								<a href="https://www.velocity360.io/event/open-house" className="button button-glass">
									Attend Info Session
								</a>
							</div>
						</div>
					</header>
				</section>

				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<section id="content" style={{background:'#f9f9f9'}}>
					<div className="content-wrap">
						<div id="lpf-content">
							<main>
								<div className="aside-toggle">
									<div></div>
								</div>

								<aside>
									<nav style={{padding:16, background:'#fff', border:'1px solid #ddd'}}>
										<ul>
											<li><a href="#introduction">Introduction</a></li>
											<li><a href="#who">Who</a></li>
											<li><a href="#curriculum">Curriculum</a></li>
											<li><a href="#tuition">Tuition, Scholarships</a></li>
											<li><a href="#instructors">Instructors</a></li>
											<li><a href="#faq">FAQ</a></li>
											<li><a href="#admissions">Admissions</a></li>
										</ul>

										<a onClick={this.toggleApplication} href="#" className="apply">Apply</a>
									</nav>
								</aside>

								<div className="content" style={{background:'#f9f9f9'}}>
									<article id="introduction" className="overview">
										<div className="container">
											<h2>{course.title}</h2>
											<hr />
											<p className="about">
												{course.dates}<br />
												{course.schedule}
											</p>
											<div className="container">
												<div className="image">
													<img style={{width:280, background:'#fff', padding:6, border:'1px solid #ddd'}} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=460'} alt="Velocity 360" />
												</div>

												<div className="text">
													<p>{course.description}</p>
												</div>
											</div>
										</div>
									</article>

									<hr style={{marginTop:24}} />

									<article id="who" className="overview">
										<div className="container">
											<h2>Who</h2>
											<p className="about">
												Are you right for this class?
											</p>
											<div className="image">
												<img style={{width:280, background:'#fff', padding:6, border:'1px solid #ddd'}} src="/images/group.JPG" alt="Velocity 360" />
											</div>

											<div className="text">
												<p>
													The {course.title} is designed for beginner to intermediate programmers. 
													A typical applicant has written basic code before, possibly 
													tinkered with jQuery and JavaScript and/or a framework like Ruby on Rails. 
													You should be comfortable writing  simple programs to perform string 
													manipulation, arithmetic operations, etc. HTML should be 
													familiar as well. This should not be your first time coding. 
													If you’re a beginner programming who is looking for the next step and is 
													eager to learn, this course is for you.
												</p>
											</div>
										</div>
									</article>

									<hr style={{marginTop:24}} />

									<article id="curriculum" className="overview">
										<h2>Curriculum</h2>
										<div className="postcontent clearfix" style={{paddingBottom:64}}>
											<div id="posts" className="post-timeline clearfix">
												<div className="timeline-border"></div>
												{units}
											</div>
										</div>
									</article>

									<article id="tuition" className="overview">
										<div className="container">
											<h2 style={{marginTop:24}}>Tuition, Scholarships, Deadlines</h2>
											<div className="col_full nobottommargin">
												<p className="about" style={{marginBottom:6}}>Tuition</p>
												<p>
													Tuition is $8,500 with a $2,000 deposit to reserve your spot. 
													A $500 discount will be applied to those who pay in full 
													at the start of the course. Otherwise, payments can be 
													made in bi-weekly installments throughout the duration of 
													the course.
												</p>
						                    </div>
											<div style={{marginTop:24}} className="col_full nobottommargin">
												<p className="about" style={{marginBottom:6}}>Scholarships</p>
												<p>
													A $1,000 scholarship is available to any woman is admittted to the 
													course. Further, two full scholarships are allocated in each class
													for highly qualified applicants.
												</p>
						                    </div>
											<div style={{marginTop:24}} className="col_full nobottommargin">
												<p className="about" style={{marginBottom:6}}>Deadline</p>
												<p>
													The deadline for application is August 29th for regular applicants. To 
													be eligible for the full scholarship, the deadline is August 22nd.
												</p>
						                    </div>
										</div>
									</article>

									<article id="instructors" className="overview">
										<div className="container">
											<h2 style={{marginTop:24}}>Instructors</h2>
						                    <div className="col-md-12 bottommargin">
						                        <div className="team team-list clearfix">
						                            <div className="team-image" style={{width:150}}>
						                                <img className="img-circle" src="/images/kwon.png" alt="Velocity 360" />
						                            </div>
						                            <div className="team-desc">
						                                <div className="team-title">
						                                	<h4 style={{marginBottom:12}}>Dan Kwon</h4>
															<div className="tagcloud">
							                                    <a style={{background:'#fff'}} href="#">Node JS</a>
							                                    <a style={{background:'#fff'}} href="#">React</a>
							                                    <a style={{background:'#fff'}} href="#">React Native</a>
							                                    <a style={{background:'#fff'}} href="#">Angular JS</a>
							                                    <a style={{background:'#fff'}} href="#">iOS</a>
							                                    <a style={{background:'#fff'}} href="#">Swift</a>
							                                    <a style={{background:'#fff'}} href="#">Objective C</a>
							                                </div>                                	
						                                </div>
						                                <div className="clearfix"></div>
						                                <div className="team-content">
						                                	Dan is a full stack developer focusing on building MVPs for early stage 
						                                	startups in New York. As a consultant, he has worked with several startups 
						                                	and development agencies over a five year span. Dan specializes in iOS, 
						                                	backend technologies such as Node JS, Google Compute Engine, Heroku, and 
						                                	AWS as well as front end libraries such as React and Angular JS. Dan 
						                                	graduated from Cornell University where he walked to class in the snow, 
						                                	uphill both ways.
						                                </div>
						                            </div>
						                        </div>
						                    </div>

						                    <div className="col-md-12 bottommargin">
						                        <div className="team team-list clearfix">
						                            <div className="team-image" style={{width:150}}>
						                                <img className="img-circle" src="/images/beaman.png" alt="Velocity 360" />
						                            </div>
						                            <div className="team-desc">
						                                <div className="team-title">
						                                	<h4 style={{marginBottom:12}}>Roger Beaman</h4>
															<div className="tagcloud">
							                                    <a style={{background:'#fff'}} href="#">Node JS</a>
							                                    <a style={{background:'#fff'}} href="#">React</a>
							                                    <a style={{background:'#fff'}} href="#">Angular JS</a>
							                                    <a style={{background:'#fff'}} href="#">JQuery</a>
							                                </div>                                	
						                                </div>
						                                <div className="clearfix"></div>
						                                <div className="team-content">
						                                	Roger Beaman is a passionate Fullstack JavaScript developer that took the 
						                                	unusual route to software development which perhaps you are on right now. 
						                                	He started work in finance and found that writing Excel formulas was by far 
						                                	the most exciting part of his job. Thus began a journey to joining you in the 
						                                	exciting career that is software development. In under a year he was able to 
						                                	go from a bootcamp to a lead developer at Shutterstock and he is excited about 
						                                	sharing the knowledge and advice he has to help you do the same.
						                                </div>
						                            </div>
						                        </div>
						                    </div>

										</div>
									</article>

									<article id="faq" className="overview">
										<div className="container">
											<h2 style={{marginTop:24}}>FAQ</h2>
											<div className="col_full nobottommargin">
						                        <div className="accordion accordion-border clearfix" data-state="closed">
						                        	{faq}
						                        </div>
						                    </div>
										</div>
									</article>

									<article id="admissions" className="overview">
										<div className="container">

											<h2 style={{marginTop:24}}>Admissions</h2>
											<div className="panel panel-default">
												<div className="panel-body" style={{padding:36}}>
													<h3>The Process</h3>
													<hr />
													<span className="step">Step 1</span><strong>Apply</strong>
													<p style={{marginTop:10}}>
														Complete our online application by midnight August 29th to 
														apply for the course. To be eligible for a scholarship you 
														must apply by midnight August 22nd.
													</p>

													<span className="step">Step 2</span><strong>Phone Interview</strong>
													<p style={{marginTop:10}}>
														All applicants will undergo a 15-30 minute phone interview to as a first technical 
														assessment. You should feel comfortable speaking about prior programming experience.
													</p>

													<span className="step">Step 3</span><strong>In-person code review</strong>
													<p style={{marginTop:10}}>
														After the phone screen, the next step is  
														an in-person code review. Here you’ll sit down with one of 
														our instructors and complete our day 1 coding assignment. 
														Rather than an algorithms assignment, you will work with an 
														instructor to spin up a simple Node server to render a page. 
														This should take about an hour, and will determine your 
														preparedness for the pace of the course.
													</p>

													<span className="step">Step 4</span><strong>Decision</strong>
													<p style={{marginTop:10}}>
														You will receive an email with your application decision. 
														You will have 7 days from your acceptance letter to make your 
														deposit. After 7 days, your spot will be forfeited.
													</p>

												</div>
											</div>
										</div>
									</article>									

								</div>

							</main>
						</div>
					</div>
				</section>

				<Modal bsSize="large" show={this.state.showApplication} onHide={this.toggleApplication}>
					<Application onSubmit={this.submitApplication} />
				</Modal>

			</div>
		)
	}
}

const stateToProps = function(state) {

    return {
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courses,
        bootcamps: state.courseReducer.courseArray,
        loaderOptions: state.staticReducer.loaderConfig,
        faq: state.staticReducer.faq
    }
}


export default connect(stateToProps)(Course)