import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseSection from '../../components/CourseSection'
import Application from '../../components/Application'
import Login from '../../components/Login'
import store from '../../stores/store'
import actions from '../../actions/actions'
import stripe from '../../utils/StripeUtils'
import api from '../../api/api'

class Course extends Component {

	constructor(props, context){
		super(props, context)
		this.closeModal = this.closeModal.bind(this)
		this.showLogin = this.showLogin.bind(this)
		this.closeLogin = this.closeLogin.bind(this)
		this.openStripeModal = this.openStripeModal.bind(this)
		this.updateSyllabusRequest = this.updateSyllabusRequest.bind(this)
		this.submitApplication = this.submitApplication.bind(this)
		this.syllabusRequest = this.syllabusRequest.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.sendRequest = this.sendRequest.bind(this)
		this.state = {
			showLogin: false,
			showConfirmation: false,
			syllabusRequest: {
				name: '',
				email: '',
				course: ''
			}
		}
	}

	componentDidMount(){
		var _this = this
		api.handleGet('/api/course?slug='+this.props.slug, {}, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			store.currentStore().dispatch(actions.coursesRecieved(response.courses))

			var course = response.courses[0]
			if (course.type == 'online'){ // for videos, show subscription prompt:
				stripe.initialize(function(token){
					_this.setState({showLoader: true})
					api.submitStripeToken(token, function(err, response){
						if (err){
							alert(err.message)
							return
						}

						window.location.href = '/account'
					})
				})
				return
			}

			stripe.initializeWithText('Submit Deposit', function(token){
				_this.setState({showLoader: true})
				api.submitStripeCharge(token, course, course.deposit, 'course', function(err, response){
					if (err){
						alert(err.message)
						_this.setState({showLoader: false})
						return
					}

					_this.setState({
						showConfirmation: true,
						showLoader: false
					})
				})					
			})
		})
	}



	updateSyllabusRequest(event){
		var s = Object.assign({}, this.state.syllabusRequest)
		s[event.target.id] = event.target.value
		s['course'] = this.props.course.title
		this.setState({
			syllabusRequest: s
		})
	}

	syllabusRequest(event){
		event.preventDefault()
		this.sendRequest('syllabus')
	}	

	subscribe(event){
		event.preventDefault()
		this.sendRequest('subscribe')
	}

	sendRequest(path){
		if (this.state.syllabusRequest.name.length == 0){
			alert('Please enter your name.')
			return
		}

		if (this.state.syllabusRequest.email.length == 0){
			alert('Please enter your email.')
			return
		}

		this.setState({
			showLoader: true
		})

		var s = Object.assign({}, this.state.syllabusRequest)
		s['pdf'] = this.props.course.syllabus
		var parts = s.name.split(' ')
		s['firstName'] = parts[0]
		if (parts.length > 1)
			s['lastName'] = parts[parts.length-1]

		var _this = this
		var url = '/api/'+path
		api.handlePost(url, s, function(err, response){
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

	openStripeModal(event){
		event.preventDefault()
		if (this.props.course.type == 'online')
			stripe.showModal()
		else 
			stripe.showModalWithText(this.props.course.title)
	}


	submitApplication(application){
		this.setState({showLoader: true})
		application['course'] = this.props.course.title
		var _this = this
		api.handlePost('/api/application', application, function(err, response){
			_this.setState({showLoader: false})

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		})
	}	

	render(){
		var bannerIndex = 0
		var btnRegister = null
		if (this.props.course.type == 'online'){
			bannerIndex = 1
		}
		else if (this.props.course.type == 'immersive'){
			bannerIndex = 2
		}
		else {
			btnRegister = (
				<div>
					Date: {this.props.course.dates}<br />
					Time: {this.props.course.schedule}<br />
					Deposit: ${this.props.course.deposit}<br />
					Regular Tuition: ${this.props.course.tuition}<br />
					Premium Member Tuition: ${this.props.course.premiumTuition}<br />
					<br />
					<a onClick={this.openStripeModal} href="#" className="button button-xlarge tright">Submit Deposit<i class="icon-circle-arrow-right"></i></a>				
				</div>
			)
		}

		var banner = this.props.banners[bannerIndex]

		var startDate = (this.props.course.dates == null) ? '' : this.props.course.dates.split('-')[0].trim()
		var detailBox = null

		if (this.props.course.syllabus.length == 0){
			detailBox =	<div className="col_half panel panel-default col_last">
							<div style={{backgroundColor:'#f1f9f5', textAlign:'center'}} className="panel-heading">Newsletter</div>
							<div className="panel-body" style={{textAlign:'center'}}>
								<img style={{width:96, marginBottom:12}} src="/images/logo_round_blue_260.png" />
								<p>
									Join our newsletter for notifications on upcoming courses,
									events and tutorials.
								</p>
								<hr />
								<input type="text" onChange={this.updateSyllabusRequest} value={this.state.syllabusRequest.name} id="name" placeholder="Name" className="form-control" style={{background:'#f9f9f9'}} /><br />
								<input type="text" onChange={this.updateSyllabusRequest} value={this.state.syllabusRequest.email} id="email" placeholder="Email" className="form-control" style={{background:'#f9f9f9'}} /><br />
								<a onClick={this.subscribe} href="#" className="button button-border button-dark button-rounded noleftmargin">Submit</a>
							</div>
						</div>
		}
		else {
			detailBox =	<div className="col_half panel panel-default col_last">
							<div style={{backgroundColor:'#f1f9f5'}} className="panel-heading">Details</div>
							<div className="panel-body">
								{this.props.course.dates}<br />
								{this.props.course.schedule}<br />
								Tuition: ${this.props.course.tuition}<br />
								Deposit: ${this.props.course.deposit}
								<hr />
								<input type="text" onChange={this.updateSyllabusRequest} value={this.state.syllabusRequest.name} id="name" placeholder="Name" className="form-control" style={{background:'#f9f9f9'}} /><br />
								<input type="text" onChange={this.updateSyllabusRequest} value={this.state.syllabusRequest.email} id="email" placeholder="Email" className="form-control" style={{background:'#f9f9f9'}} /><br />
								<a onClick={this.syllabusRequest} href="#" className="button button-border button-dark button-rounded noleftmargin">Request Syllabus</a>
							</div>
						</div>
		}


		var colClass = (detailBox == null) ? 'col_full' : 'col_half'
		var _course = this.props.course
		var _accountType = (this.props.currentUser.id == null) ? 'notLoggedIn' : this.props.currentUser.accountType
		var _showLogin = this.showLogin
		var _openStripeModal = this.openStripeModal
		var units = this.props.course.units.map(function(unit, i){
			return <CourseSection key={i} subscribeAction={_openStripeModal} loginAction={_showLogin} unit={unit} course={_course} accountType={_accountType} />
		})

		return (
			<div>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Sidebar />

				<section id="content" style={{backgroundColor: '#F5F5F5'}}>

					<div className="content-wrap">
						<div className="container clearfix">
							<div className="postcontent nobottommargin col_last clearfix">
								<div id="posts" className="post-timeline clearfix">
									<div className="timeline-border"></div>

									<div className="entry clearfix">
										<div className="entry-timeline">
											Intro<span></span>
											<div className="timeline-divider"></div>
										</div>
										<div className="entry-image">
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src={'/images/'+banner} alt="FullStack 360" />
										</div>
										<div className="entry-content">
											<div className={colClass}>
												<h2 style={{marginBottom:0}}>{this.props.course.title}</h2>
												<p>{this.props.course.description}</p>
												{ btnRegister }
											</div>

											{ detailBox }

										</div>
									</div>

									{ units }

									{ 
										(this.props.course.type == 'live') ? 

										<div className="entry clearfix">
											<div className="entry-timeline">
												Join<span></span>
												<div className="timeline-divider"></div>
											</div>
											<div className="entry-image">
												<div className="panel panel-default">
													<div className="panel-body" style={{padding:36, paddingBottom:0}}>
														<h2>Register</h2>
														<hr />

														<div className='col_half'>
															Date: {this.props.course.dates}<br />
															Time: {this.props.course.schedule}<br />
															Deposit: ${this.props.course.deposit}<br />
															Regular Tuition: ${this.props.course.tuition}<br />
															Premium Member Tuition: ${this.props.course.premiumTuition}<br />
															<br />
															<a onClick={this.openStripeModal} href="#" className="button button-xlarge tright">Submit Deposit<i class="icon-circle-arrow-right"></i></a>				
														</div>

														<div className="col_half col_last">
															<img style={{width:200, float:'right'}} src={'https://media-service.appspot.com/site/images/'+this.props.course.image+'?crop=360'} />
														</div>
													</div>
												</div>
											</div>
										</div>
										: 
										null
									}

								</div>
							</div>

						</div>
					</div>
				</section>

				<section id="content" style={{backgroundColor: '#fff', paddingBottom:0}}>
					<div className="row common-height clearfix" style={{background:'#fff', border:'1px solid #ddd'}}>
						<div className="col-sm-8 col-padding">
							<div>
								<div className="heading-block">
									<h3>Prepare for Tomorrow</h3>
								</div>

								<div className="row clearfix">
									<div className="col-md-10">
										<p>
											Our Mission is to teach tomorrow’s technology, today.  If you want 
											to work for a leading tech firm, for a technology startup, or become an 
											entrepreneur, our classes will put you on the right track to achieve 
											these goals.  This iOS class is based entirely on Swift language, which 
											is the main language you will need to know while developing the majority 
											of iOS app.  In our iOS class you will not be learning how to program 
											games, however you will be able to learn how to develop social media 
											applications similar to Snapchat and Instagram.
										</p>
										<p>
											Even if you do not want to become a professional developer and have it 
											become your lifelong career, learning how an iOS app developed will give 
											you the edge both in the immediate and distant future.  It might be a 
											cliché, but learning how to code will empower you to act on future ideas. 
											For example if you are sitting in class one day and think of the next great 
											social media app, it doesn’t have to just be a pipe dream or something that 
											you would have to rely on someone else to build, it could be a project that 
											you start building right away.
										</p>
										<a target="_blank" href="https://www.facebook.com/Velocity-360-1631852427085987/" className="social-icon inline-block si-small si-light si-rounded si-facebook">
											<i className="icon-facebook"></i>
											<i className="icon-facebook"></i>
										</a>
										<a target="_blank" href="https://twitter.com/velocity360_io" className="social-icon inline-block si-small si-light si-rounded si-twitter">
											<i className="icon-twitter"></i>
											<i className="icon-twitter"></i>
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-sm-4 col-padding" style={{background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: 'cover'}}></div>
					</div>
				</section>

				{ (this.props.course.type == 'immersive') ? <Application onSubmit={this.submitApplication} /> : null }
	            <Login isVisible={this.state.showLogin} hide={this.closeLogin} redirect={null} />

		        <Modal show={this.state.showConfirmation} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Deposit Confirmed</h2>
			        	<img style={{width:120, borderRadius:60}} src="/images/logo_round_blue_260.png" />
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24, textAlign:'center'}}>
			        	<p>
			        		Thank you for submitting a deposit to the {this.props.course.title}. We look forward
			        		to meeting you on {startDate}. If you have any questions or concerns, feel
			        		free to contact us at katrina@velocity360.io. Thank you.
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
	var keys = Object.keys(state.courseReducer.courses)

    return {
        currentUser: state.profileReducer.currentUser,
        course: state.courseReducer.courses[keys[0]],
        testimonials: state.staticReducer.testimonials,
        loaderOptions: state.staticReducer.loaderConfig,
        banners: state.staticReducer.banners
    }
}


export default connect(stateToProps)(Course)