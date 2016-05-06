import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseSection from '../../components/CourseSection'
import CourseCopy from '../../components/CourseCopy'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
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
			syllabusRequest: {
				name: '',
				email: '',
				course: ''
			}
		}
	}

	componentWillMount(){

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
			    var handler = StripeCheckout.configure({
			        key: 'pk_live_yKFwKJsJXwOxC0yZob29rIN5',
			        image: '/images/logo_round_blue_260.png',
			        locale: 'auto',
			        panelLabel: 'Subscribe: $19.99/month',
			        token: function(token) { // You can access the token ID with `token.id`

	//		        	FullStackActionCreator.submitStripeToken(token);
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

			        }
			    });
			}

		    _this.setState({
		    	stripeHandler:handler
		    });


			store.dispatch(actions.coursesRecieved(response.courses))
		})
	}

	openModal(event){
		console.log('OPEN MODAL')
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
//		console.log('SYLLABUS REQUEST: '+JSON.stringify(this.state.syllabusRequest))


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
			showLogin: false
		})
	}

	showLogin(){
		console.log('Show Login')
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
//		console.log('LOGIN: '+JSON.stringify(this.props.currentUser))
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

	openStripeModal(){
//		event.preventDefault()

	    this.state.stripeHandler.open({
		    name: 'FullStack 360',
		    description: 'Premium Subscription'
	    });
	}

	render(){
		var detailBox = null
		if (this.props.course.type != 'online'){
			detailBox =	<div className="col_half panel panel-default col_last">
							<div style={{backgroundColor:'#f1f9f5'}} className="panel-heading">Details</div>
							<div className="panel-body">
								{this.props.course.dates}<br />
								{this.props.course.schedule}<br />
								Tuition: ${this.props.course.tuition}<br />
								Depost: ${this.props.course.deposit}
								<hr />
								<a style={{marginRight:12}} href="/application" className="button button-border button-dark button-rounded noleftmargin">Apply</a>
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


		var bannerIndex = 0;
		if (this.props.course.type == 'online')
			bannerIndex = 1;
		if (this.props.course.type == 'immersive')
			bannerIndex = 2;

		var banner = this.props.banners[bannerIndex];

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


									{
										(this.props.course.type == 'online') ? null :
											<div className="entry clearfix">
												<div className="entry-timeline">
													Unit<span>!</span>
													<div className="timeline-divider"></div>
												</div>
												<div className="entry-image">
													<div className="panel panel-default">
														<div className="panel-body" style={{padding:36}}>
															<h2>Sign Up</h2>
															<hr />
															Ready to take the plunge? Need more information? Request a syllabus below or begin the application process.
															<br /><br />
															<a style={{marginRight:12}} href="/application" className="button button-border button-dark button-rounded noleftmargin">Apply</a>												
															<a onClick={this.openModal} href="#" className="button button-border button-dark button-rounded noleftmargin">Request Syllabus</a>
														</div>
													</div>
												</div>
											</div>										
									}

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