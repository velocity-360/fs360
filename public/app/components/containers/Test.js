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

class Test extends Component {

	constructor(props, context){
		super(props, context)
		this.closeModal = this.closeModal.bind(this)
		this.closeLogin = this.closeLogin.bind(this)
		this.submitApplication = this.submitApplication.bind(this)
		this.showLoader = this.showLoader.bind(this)
		this.hideLoader = this.hideLoader.bind(this)
		this.showLogin = this.showLogin.bind(this)
		this.showConfirmation = this.showConfirmation.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.updateCourse = this.updateCourse.bind(this)
		this.updateCurrentUser = this.updateCurrentUser.bind(this)
		this.state = {
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

	componentDidMount(){
		
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
		this.setState({showLoader: true})
		application['course'] = course.title
		var _this = this
		api.handlePost('/account/application', application, function(err, response){
			_this.setState({showLoader: false})

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

		var units = course.units.map(function(unit, i){
			return <CourseSection key={i} loginAction={_showLogin} unit={unit} course={_course} subscribeAction={_subscribe} currentUser={_currentUser} />
		})

		return (
			<div id="wrapper" className="clearfix">
				<Nav headerStyle="dark" />

				<section id="lpf-header" style={{backgroundImage: "url('/images/joe_light_blue.png')"}} >
					<header>
						<div className="content-wrapper dark">
							<div className="content">
								<h2>{course.title}</h2>
								<h4 className="muted">Learn Software Development in 13 Weeks with Fullstack Academys Software Engineering Immersive</h4>
								<a href="http://www.fullstackacademy.com/apply" target="_blank" className="button button-glass">
								Start your application
								</a>
							</div>
						</div>
					</header>
				</section>

				<section id="content">
					<div className="content-wrap">
						<div id="lpf-content">
							<main>
								<div className="aside-toggle">
									<div></div>
								</div>

								<aside>
									<nav>
										<ul>
											<li><a href="#overview">Overview</a></li>
											<li><a href="#fullstack-experience">The Fullstack Experience</a></li>
											<li><a href="#syllabus">Syllabus</a></li>
											<li><a href="#projects">Projects</a></li>
											<li><a href="#schedule">Daily Schedule</a></li>
											<li><a href="#pair-programming">Pair Programming</a></li>
											<li><a href="#instructors">Instructors</a></li>
											<li><a href="#faq">FAQ</a></li>
											<li><a href="#next-steps">Get More Info</a></li>
											<li><a href="#overview">Overview</a></li>
											<li><a href="#fullstack-experience">The Fullstack Experience</a></li>
											<li><a href="#syllabus">Syllabus</a></li>
											<li><a href="#projects">Projects</a></li>
											<li><a href="#faq">FAQ</a></li>
											<li><a href="#next-steps">Get More Info</a></li>
										</ul>

										<a href="http://www.fullstackacademy.com/apply" className="apply" target="_blank">Apply</a>
									</nav>
								</aside>

								<div className="content" style={{background:'#f9f9f9', borderLeft:'1px solid #ddd'}}>

									<article id="overview" className="overview">
										<h2>{course.title}</h2>
										<hr />
										<p className="about">
											{course.dates}<br />
											{course.schedule}
										</p>
										<div className="container">
											<div className="image">
												<img style={{width:280, background:'#fff', padding:3, border:'1px solid #ddd'}} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=460'} alt="Velocity 360" />
											</div>

											<div className="text">
												<p>{course.description}</p>
											</div>
										</div>
									</article>

									<hr style={{marginTop:24}} />

									<article id="fullstack-experience" className="overview">
										<h2>Passionate Teachers + Cutting-Edge Curriculum. This is Fullstack.</h2>
										<p className="about">Fullstack Academy’s flagship course, the Full-Time Software Engineering Immersive is a 13 week career accelerator.</p>
										<div className="container">

											<div className="image">
												<img src="/images/remote-immersive/article1-img.jpg" alt="" />
											</div>

											<div className="text">
												<p>Through an advanced curriculum and project based structure, students learn todays cutting edge development technologies. The Fullstack Immersive prepares graduates for software engineer roles at top-tier technology companies.</p>
												<p>Our JavaScript-driven curriculum immerses you in the latest web technologies such as Node.js and AngularJS. You bring the energy, curiosity and dedication — well provide a world-class school for becoming an expert software developer. New classes start every 7 weeks.</p>
											</div>
										</div>
									</article>

									<article id="fullstack-experience" className="overview">
										<h2>This is Fullstack.</h2>
										<p className="about">Fullstack Academy’s flagship course, the Full-Time Software Engineering Immersive is a 13 week career accelerator.</p>
										<div className="container">

											<div className="image">
												<img src="/images/remote-immersive/article1-img.jpg" alt="" />
											</div>

											<div className="text">
												<p>Through an advanced curriculum and project based structure, students learn todays cutting edge development technologies. The Fullstack Immersive prepares graduates for software engineer roles at top-tier technology companies.</p>
												<p>Our JavaScript-driven curriculum immerses you in the latest web technologies such as Node.js and AngularJS. You bring the energy, curiosity and dedication — well provide a world-class school for becoming an expert software developer. New classes start every 7 weeks.</p>
											</div>
										</div>
									</article>



								</div>

							</main>
						</div>
					</div>


				</section>


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
        banners: state.staticReducer.banners
    }
}


export default connect(stateToProps)(Test)