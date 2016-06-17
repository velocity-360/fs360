import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseSection from '../../components/CourseSection'
import CourseCopy from '../../components/CourseCopy'
import store from '../../stores/store'
import actions from '../../actions/actions'
import stripe from '../../utils/StripeUtils'
import api from '../../api/api'

class Course extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.showLogin = this.showLogin.bind(this)
		this.login = this.login.bind(this)
		this.updateLogin = this.updateLogin.bind(this)
		this.openStripeModal = this.openStripeModal.bind(this)
		this.updateSyllabusRequest = this.updateSyllabusRequest.bind(this)
		this.syllabusRequest = this.syllabusRequest.bind(this)
		this.state = {
			showLoader: false,
			showModal: false,
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

			var course = response.courses[0]
			if (course.type == 'online'){ // for videos, show subscription prompt:
				stripe.initialize(function(token){
					_this.setState({showLoader: true})
					api.submitStripeToken(token, function(){
						api.handleGet('/account/currentuser', {}, function(err, response){
							_this.setState({showLoader: false})
							if (err){
								alert(response.message)
								return
							}

							store.dispatch(actions.currentUserRecieved(response.profile))
						});
					})
				})
			}
			else {
				stripe.initializeWithText('Submit Deposit', function(token){
					_this.setState({showLoader: true})
					
					api.submitStripeCharge(token, _this.props.course.id, _this.props.course.deposit, function(){
						api.handleGet('/account/currentuser', {}, function(err, response){
							_this.setState({
								showConfirmation: true,
								showLoader: false
							})

						});
					})
				})
			}

			store.dispatch(actions.coursesRecieved(response.courses))
		})
	}

	openModal(event){
//		console.log('OPEN MODAL')
		event.preventDefault()
		this.setState({showModal: true})
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

		this.setState({
			showModal: false,
			showLoader: true
		});

		var _this = this
		api.handlePost('/api/syllabus', _this.state.syllabusRequest, function(err, response){
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

	closeModal(){
		this.setState({
			showModal: false,
			showLogin: false,
			showConfirmation: false
		})
	}

	showLogin(event){
		event.preventDefault()
		this.setState({showLogin: true})
	}

	updateLogin(event){
		event.preventDefault()

		var updatedUser = Object.assign({}, this.props.currentUser);
		updatedUser[event.target.id] = event.target.value
		store.dispatch(actions.updateCurrentUser(updatedUser));
	}

	login(event){
		event.preventDefault()
		this.setState({
			showModal: false,
			showLogin: false,
			showLoader: true
		})

		var _this = this
		api.handlePost('/account/login', this.props.currentUser, function(err, response){
			_this.setState({
				showLoader: false
			})

			if (err){
				alert(err.message)
				return
			}

			store.dispatch(actions.currentUserRecieved(response.profile));
		});
	}

	openStripeModal(event){
		event.preventDefault()
		if (this.props.course.type == 'online')
			stripe.showModal()
		else 
			stripe.showModalWithText(this.props.course.title)
	}
	

	render(){
		var bannerIndex = 0;
		var btnRegister = null
		if (this.props.course.type == 'online'){
			bannerIndex = 1;
			btnRegister = <a onClick={this.openStripeModal} style={{marginRight:12}} href="#" className="button button-border button-dark button-rounded noleftmargin">Register</a>
		}
		else if (this.props.course.type == 'immersive'){
			bannerIndex = 2;
			btnRegister = <a style={{marginRight:12}} href="/application" className="button button-border button-dark button-rounded noleftmargin">Apply</a>
		}
		else {
			btnRegister = <a onClick={this.openStripeModal} style={{marginRight:12}} href="#" className="button button-border button-dark button-rounded noleftmargin">Register</a>
		}

		var banner = this.props.banners[bannerIndex]

		var startDate = (this.props.course.dates == null) ? '' : this.props.course.dates.split('-')[0].trim()
		var detailBox = null
		if (this.props.course.type != 'online'){
			detailBox =	<div className="col_half panel panel-default col_last">
							<div style={{backgroundColor:'#f1f9f5'}} className="panel-heading">Details</div>
							<div className="panel-body">
								{this.props.course.dates}<br />
								{this.props.course.schedule}<br />
								Tuition: ${this.props.course.tuition}<br />
								Deposit: ${this.props.course.deposit}
								<hr />
								{ btnRegister }
								<a onClick={this.openModal} href="#" className="button button-border button-dark button-rounded noleftmargin">Request Syllabus</a>
							</div>
						</div>
		}


		var _course = this.props.course
		var _accountType = this.props.currentUser.accountType
		var _showLogin = this.showLogin
		var _openStripeModal = this.openStripeModal
		var units = this.props.course.units.map(function(unit, i){
			return <CourseSection key={unit.index} subscribeAction={_openStripeModal} loginAction={_showLogin} unit={unit} course={_course} accountType={_accountType} />
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
											<div className="col_half">
												<h2 style={{marginBottom:0}}>{this.props.course.title}</h2>
												<p>{this.props.course.description}</p>
											</div>

											{ detailBox }

										</div>
									</div>

									{units}

								</div>
							</div>

						</div>
					</div>
				</section>

				{ (this.props.course.type == 'online') ? 
					null 
					: 
					<CourseCopy questions={this.props.faq.general} />
				}

		        <Modal show={this.state.showLogin} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Login</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<input onChange={this.updateLogin} value={this.props.currentUser.email} className="form-control" type="text" id="email" placeholder="Email" /><br />
			        	<input onChange={this.updateLogin} value={this.props.currentUser.password} className="form-control" type="password" id="password" placeholder="Password" /><br />
			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.login} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Log In</a>
			        </Modal.Footer>
		        </Modal>


		        <Modal show={this.state.showModal} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Request Syllabus</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<input onChange={this.updateSyllabusRequest} value={this.state.syllabusRequest.name} className="form-control" type="text" id="name" placeholder="Name" /><br />
			        	<input onChange={this.updateSyllabusRequest} value={this.state.syllabusRequest.email} className="form-control" type="text" id="email" placeholder="Email" /><br />

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.syllabusRequest} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
			        </Modal.Footer>
		        </Modal>

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
//	console.log('STATE TO PROPS: '+JSON.stringify(state))

    return {
        currentUser: state.profileReducer.currentUser,
        course: state.courseReducer.courses[keys[0]],
        testimonials: state.staticReducer.testimonials,
        faq: state.staticReducer.faq,
        loaderOptions: state.staticReducer.loaderConfig,
        banners: state.staticReducer.banners
    }
}


export default connect(stateToProps)(Course)