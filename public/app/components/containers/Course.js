import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseSection from '../../components/CourseSection'
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
		this.state = {
			showLoader: false,
			showModal: false,
			showLogin: false
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
		event.preventDefault()
		this.setState({showModal: true})
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
		console.log('LOGIN: '+JSON.stringify(this.props.currentUser))
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

		var questions = null;
		if (this.props.slug=='ios-high-school-course' || this.props.slug=='web-high-school-course')
			questions = this.props.faq.highschool		
		else 
			questions = this.props.faq.general
		

		var faq = questions.map(function(qa, i){
			return (
				<div key={i}>
					<h4><strong>Q.</strong> {qa.question}</h4>
					<p dangerouslySetInnerHTML={{__html: qa.answer}}></p>
					<div className="line"></div>
				</div>
			)
		});

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

				<section id="content" style={{backgroundColor: '#fff', paddingBottom:48}}>
					<div className="row common-height clearfix" style={{background:'#fff', border:'1px solid #ddd'}}>
						<div className="col-sm-8 col-padding">
							<div>
								<div className="heading-block">
									<h3>Prepare for Tomorrow</h3>
								</div>

								<div className="row clearfix">
									<div className="col-md-10">
										<p>
											Our Mission is to teach you tomorrow’s technology, today.  If you want to work for a leading tech firm, for a technology startup, or become an entrepreneur, this 2-week class will put you on the right track to achieve any of these goals.  This iOS class is based entirely on Swift language, which is the main language you will need to know while developing the majority of iOS app.  In our iOS class you will not be learning how to program games, however you will be able to learn how to develop social media applications similar to Snapchat and Instagram.
										</p>
										<p>
											Even if you do not want to become a professional developer and have it become your lifelong career, learning how an iOS app developed will give you the edge both in the immediate and distant future.  It might be a cliché, but learning how to code will empower you to act on future ideas.  For example if you are sitting in class one day and think of the next great social media app, it doesn’t have to just be a pipe dream or something that you would have to rely on someone else to build, it could be a project that you start building right away.
										</p>
										<a target="_blank" href="https://www.facebook.com/FullStack-360-1631852427085987/" className="social-icon inline-block si-small si-light si-rounded si-facebook">
											<i className="icon-facebook"></i>
											<i className="icon-facebook"></i>
										</a>
										<a target="_blank" href="https://twitter.com/fullstack360" className="social-icon inline-block si-small si-light si-rounded si-twitter">
											<i className="icon-twitter"></i>
											<i className="icon-twitter"></i>
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-sm-4 col-padding" style={{background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: 'cover'}}></div>
					</div>

					<div className="content-wrap" style={{background:'#f9f9f9', borderBottom:'1px solid #ddd'}}>

						<div className="container clear-bottommargin clearfix">
							<div className="row">

								<div className="col-md-4 col-sm-6 bottommargin">
									<div className="ipost clearfix">
										<div className="entry-image">
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/class.jpg" alt="FullStack 360" />
										</div>
										<div className="entry-title">
											<h3>Small Classes</h3>
											<hr />
										</div>
										<div className="entry-content">
											<p>
												Our average class size is six students and the maximum per class is ten. Every student recieves individual attenttion and no one falls far behind.
											</p>
										</div>
									</div>
								</div>

								<div className="col-md-4 col-sm-6 bottommargin">
									<div className="ipost clearfix">
										<div className="entry-image">
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/phone.jpg" alt="FullStack 360" />
										</div>
										<div className="entry-title">
											<h3>Realistic Projects</h3>
											<hr />
										</div>
										<div className="entry-content">
											<p>
												All courses are taught by current professionals who work on real projects. As such, our curriculum is heavily driven by the skills required in the tech industry and prepares our students for the challenges they will face.
											</p>
										</div>
									</div>
								</div>

								<div className="col-md-4 col-sm-6 bottommargin">
									<div className="ipost clearfix">
										<div className="entry-image">
											<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/joe.jpg" alt="FullStack 360" />
										</div>
										<div className="entry-title">
											<h3>Cutting Edge Curriculum</h3>
											<hr />
										</div>
										<div className="entry-content">
											<p>
												Ruby on Rails? Django? Ember? Backbone? PHP? Angular? Swift? Objective C? Node? JavaScript? React? To beginners, the tech landscape is overwhelming and the wrong choice can waste a lot of time and money. We make the right choices for you. Simple as that.
											</p>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>


					<div className="container clearfix">
						<div id="faqs" className="faqs">
							<h3 style={{marginTop:48}}>Frequently Asked Questions:</h3>
							<div className="divider"><i className="icon-circle"></i></div>

							<div className="col_full nobottommargin">
								{faq}
							</div>
						</div>
					</div>
				</section>

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
			        	<input className="form-control" type="text" id="name" placeholder="Name" /><br />
			        	<input className="form-control" type="text" id="email" placeholder="Email" /><br />

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
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