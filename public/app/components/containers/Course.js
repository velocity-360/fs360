import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseSection from '../../components/CourseSection'
import CourseCard from '../../components/CourseCard'
import Application from '../../components/Application'
import DetailBox from '../../components/DetailBox'
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
		this.submitApplication = this.submitApplication.bind(this)
		this.configureStripe = this.configureStripe.bind(this)
		this.showLoader = this.showLoader.bind(this)
		this.hideLoader = this.hideLoader.bind(this)
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
		if (this.props.course != null){
			this.configureStripe(this.props.course)
			return
		}

		var _this = this
		api.handleGet('/api/course?slug='+this.props.slug, {}, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			store.currentStore().dispatch(actions.coursesRecieved(response.courses))

			var course = response.courses[0]
			this.configureStripe(course)
		})
	}

	configureStripe(course){
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

	showLoader(){
		this.setState({showLoader: true})

	}

	hideLoader(){
		this.setState({showLoader: false})

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
		if (this.props.course.type == 'online')
			bannerIndex = 1
		else if (this.props.course.type == 'immersive')
			bannerIndex = 2
		
		var banner = this.props.banners[bannerIndex]
		var startDate = (this.props.course.dates == null) ? '' : this.props.course.dates.split('-')[0].trim()
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
											<div className='col_half'>
												<h2 style={{marginBottom:0}}>{this.props.course.title}</h2>
												<p>{this.props.course.description}</p>
											</div>
											<DetailBox showLoader={this.showLoader} hideLoader={this.hideLoader} course={this.props.course} />

										</div>
									</div>

									{ units }

									{ 
										(this.props.course.type != 'online') ? 

										<div className="entry clearfix">
											<div className="entry-timeline">
												Join<span></span>
												<div className="timeline-divider"></div>
											</div>
											<div className="entry-image">
												<div className="panel panel-default">
													<div className="panel-body" style={{padding:36, paddingBottom:0}}>
														{ (this.props.course.type == 'live') ? <h2>Register</h2> : <h2>Details</h2> }
														<hr />

														<div className='col_half'>
															Date: {this.props.course.dates}<br />
															Time: {this.props.course.schedule}<br />
															Deposit: ${this.props.course.deposit}<br />
															Regular Tuition: ${this.props.course.tuition}<br />
															Premium Member Tuition: ${this.props.course.premiumTuition}<br />
															<br />
															{ 
																(this.props.course.type == 'live') ? 
																(
																	<div className="col_full panel panel-default">
																		<div style={{backgroundColor:'#f1f9f5', textAlign:'left'}} className="panel-heading">Submit Deposit</div>
																		<div className="panel-body" style={{textAlign:'left'}}>
																			<a href={this.props.course.paypalLink} target="_blank" className="button button-xlarge tright">PayPal<i class="icon-circle-arrow-right"></i></a><br />
																			<a onClick={this.openStripeModal} href="#" className="button button-xlarge tright">Credit Card<i class="icon-circle-arrow-right"></i></a>
																		</div>
																	</div>
																)
																:
																<a href="#application" className="button button-xlarge tright">Apply<i class="icon-circle-arrow-right"></i></a>
															}

															
														</div>

														<div className="col_half col_last">
															<img style={{width:'80%', float:'right'}} src={'https://media-service.appspot.com/site/images/'+this.props.course.image+'?crop=460'} />
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

    return {
        currentUser: state.profileReducer.currentUser,
        course: state.courseReducer.courseArray[0],
        loaderOptions: state.staticReducer.loaderConfig,
        banners: state.staticReducer.banners
    }
}


export default connect(stateToProps)(Course)