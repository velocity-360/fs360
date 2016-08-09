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

		var bootcamps = this.props.bootcamps.map(function(bootcamp, i){
			return (
                <div key={bootcamp.id} className="col-md-12 bottommargin">
                    <div className="team team-list clearfix">
                        <div className="team-image" style={{width: 150}}>
                            <img className="img-circle" src={'https://media-service.appspot.com/site/images/'+bootcamp.image+'?crop=260'} alt="Velocity 360" />
                        </div>
                        <div className="team-desc">
                            <div className="team-title">
	                            <h4 style={{fontWeight:400}}><a href={'/course/'+bootcamp.slug}>{bootcamp.title}</a></h4>
	                            <span style={{color:'#444'}}>{bootcamp.dates}</span>
	                            <span style={{color:'#444'}}>{bootcamp.schedule}</span>
                            </div>
                            <div className="team-content">{bootcamp.description}</div>
                        </div>
                    </div>
                </div>
			)
		})		

		return (
			<div>
				<Nav />
		        <section id="slider" className="slider-parallax dark full-screen" style={{background:'url("/images/joe_light_blue.png") center'}} data-height-lg="400" data-height-md="400" data-height-sm="200" data-height-xs="200" data-height-xxs="200">
		            <div className="container clearfix">
		                <div className="vertical-middle">
		                    <div className="heading-block center nobottomborder">
		                        <h1 style={{textTransform:'none'}} data-animate="fadeInUp">{course.title}</h1>
		                        <hr style={{maxWidth:120, borderTop:'2px solid #fff'}} />
		                        <span data-animate="fadeInUp" data-delay="300">
		                        	{course.dates}<br />{course.schedule}
		                        </span>
		                    </div>
		                </div>
		            </div>
		        </section>

				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />

				<section id="content" style={{backgroundColor: '#F5F5F5'}}>
					<div className="content-wrap">
						<div className="container clearfix">

							<div className="postcontent nobottommargin clearfix">
								<div id="posts" className="post-timeline clearfix">
									<div className="timeline-border"></div>

									<div className="entry clearfix">
										<div className="entry-timeline">
											Intro<span></span>
											<div className="timeline-divider"></div>
										</div>
										<div className="entry-content">
											<div className='col_full'>
												<img className="hidden-xs" style={{width:190, float:'right', marginLeft:16}} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=460'} />
												<h2 style={{marginBottom:0}}>{course.title}</h2>
												<p>{course.description}</p>
											</div>
										</div>
									</div>

									{ units }

									<DetailBox hideLoader={this.hideLoader} showLoader={this.showLoader} course={course} />
									<CTA course={course} currentUser={this.props.currentUser} loginAction={_showLogin} showLoader={this.showLoader} hideLoader={this.hideLoader} showConfirmation={this.showConfirmation} />
								</div>
							</div>

						</div>
					</div>
				</section>

				<section style={{background:'#fff', paddingTop:48, borderTop:'1px solid #ddd'}}>
					<div className="heading-block center">
						<h2 style={{fontWeight:400}}>Bootcamps</h2>
					</div>

					<div className="content-wrap" style={{paddingTop:0}}>
						<div className="container clearfix">
							{bootcamps}
						</div>
					</div>
				</section>				

				<section id="content" style={{backgroundColor: '#fff', paddingBottom:0}}>
					<div className="row common-height clearfix" style={{background:'#f9f9f9', border:'1px solid #ddd'}}>
						<div className="col-sm-8 col-padding">
							<div>
								<div className="heading-block">
									<h3>Prepare for Tomorrow</h3>
								</div>

								<div className="row clearfix">
									<div className="col-md-10">
										<p>
											Technology, more than any other industry, changes rapidly and many fall behind. As a 
											newcomer to tech, it is imperative to understand the trends and develop the skills
											that will be valued tomorrow over those in demand today. Velocity 360 strongly prepares 
											students under that guiding principle. Our curriculum is highly focused on the bleeding 
											edge of tech evolution: Node JS, React, Redux, and React Native. 
										</p>
										<p>
											While other bootcamps continue to teach Ruby on Rails (Dev Bootcamp, Flatiron School, 
											General Assembly, NYCDA, App Academy, etc) and have been doing so for several years, 
											Velocity 360 is the only bootcamp in NYC that focuses on the tremendously growing 
											Node/React/React-Native ecosystem. Rather than joining the mass of Ruby on Rails 
											devs that graduate from bootcamps every three months, you will leave Velocity 360 with 
											the skills highly in demand yet hard to find in the tech world. 
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="col-sm-4 col-padding" style={{background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: 'cover'}}></div>
					</div>
				</section>

				{ (course.type == 'immersive') ? <Application onSubmit={this.submitApplication} /> : null }
	            <Login isVisible={this.state.showLogin} hide={this.closeLogin} redirect={null} />

		        <Modal show={this.state.showConfirmation} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Deposit Confirmed</h2>
			        	<img style={{width:120, borderRadius:60}} src="/images/logo_round_blue_260.png" />
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24, textAlign:'center'}}>
			        	<p>
			        		Thank you for submitting a deposit to the {course.title}. We look forward
			        		to meeting you on {startDate}. If you have any questions or concerns, feel
			        		free to contact us at <a href="mailto:katrina@velocity360.io">katrina@velocity360.io</a>. Thank you.
			        	</p>
			        </Modal.Body>
			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.closeModal} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">OK</a>
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
        courses: state.courseReducer.courses,
        bootcamps: state.courseReducer.courseArray,
        loaderOptions: state.staticReducer.loaderConfig,
        banners: state.staticReducer.banners
    }
}


export default connect(stateToProps)(Course)