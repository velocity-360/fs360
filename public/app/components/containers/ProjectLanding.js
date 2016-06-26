import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import ProjectCard from '../../components/ProjectCard'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import store from '../../stores/store'
import actions from '../../actions/actions'
import stripe from '../../utils/StripeUtils'
import api from '../../api/api'

class Landing extends Component {

	constructor(props, context){
		super(props, context)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.updateUserRegistration = this.updateUserRegistration.bind(this)
		this.openModal = this.openModal.bind(this)
		this.showRegistrationForm = this.showRegistrationForm.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.register = this.register.bind(this)
		this.validate = this.validate.bind(this)
		this.state = {
			showRegistration: false,
			showLoader: false,
			showModal: false,
			visitor: {
				name: '',
				email: '',
				phone: '',
				course: '',
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

	updateUserRegistration(event){
		event.preventDefault()

		if (event.target.id == 'membershiptype'){
			this.setState({
				membershiptype: event.target.value
			})

			return
		}


		var updatedUser = Object.assign({}, this.props.currentUser);
		if (event.target.id == 'name'){
			var parts = event.target.value.split(' ')
			updatedUser['firstName'] = parts[0]
			if (parts.length > 1)
				updatedUser['lastName'] = parts[parts.length-1]
		}

		updatedUser[event.target.id] = event.target.value
		store.dispatch(actions.updateCurrentUser(updatedUser));
	}

	register(event){
		event.preventDefault()
		var missingField = this.validate(this.props.currentUser, true);
		if (missingField != null){
			alert('Please enter your '+missingField);
			return
		}

		this.setState({
			showModal: false,
			showLoader: true
		});

		var _this = this
		api.handlePost('/api/profile', this.props.currentUser, function(err, response){
			_this.setState({
				showRegistration: false,
				showLoader: false
			});

			if (err){
				alert(err.message)
				return
			}

			if (_this.state.membershiptype == 'basic'){
				window.location.href = '/account'
				return
			}

			// premium registration, show stripe modal
			stripe.showModal()
		});
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

	openModal(event){
		event.preventDefault()

		var visitor = Object.assign({}, this.state.visitor)
		visitor['course'] = event.target.id

		this.setState({
			showModal: true,
			visitor: visitor
		})
	}

	showRegistrationForm(event){
		event.preventDefault()
		this.setState({
			membershiptype: event.target.id,
			showRegistration: true
		})
	}

	closeModal(){
		this.setState({
			showRegistration: false,
			showModal: false
		})
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
		                        	Velocity 360 is the only coding bootcamp that uses real <br />
		                        	projects from local startups to teach students.
		                        </span>
		                    </div>
		                </div>

						<div className="container clearfix" style={{paddingTop:64}}>
							<ProjectCard />

							<div className="col_one_third bottommargin-sm col_last">
								<div className="widget clearfix" style={{borderRadius:2, padding:24, textAlign:'center', border:'1px solid #ddd', background:'#F9FCFF'}}>
									<h4>Featured App</h4>
									<img style={{width:128, border:'1px solid #ddd'}} src="/images/radius.png" alt="Velocity 360" />
									<h3 style={{marginBottom:6, marginTop:9}}>
										<a href="/project/123">Radius</a>
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

				<section id="register" className="section pricing-section nomargin" style={{backgroundColor: '#FFF'}}>
					<div className="container clearfix">
						<h2 className="pricing-section--title center">Cant make it to our live courses?</h2>
						<div style={{textAlign:'center'}}>
							<p style={{fontSize:16}}>
								Join our online service. <br />Online members 
								have access to videos, code samples, the forum and more.
							</p>

						</div>
						<div className="pricing pricing--jinpa">
							<div className="pricing--item" style={{marginRight:24}}>
								<h3 className="pricing--title">Basic</h3>
								<div style={{fontSize: '1.15em'}} className="pricing--price">FREE</div>
								<div style={{ borderTop:'1px solid #eee', marginTop:24, paddingTop:24}}>
									<ul className="pricing--feature-list">
										<li className="pricing--feature">Limited Video Access</li>
										<li className="pricing--feature">Forum Access</li>
										<li className="pricing--feature">Discounts to Live Events</li>
									</ul>
								</div>
								<button onClick={this.showRegistrationForm} id="basic" className="pricing--action">Join</button>
							</div>
							<div className="pricing--item" style={{marginRight:24, border:'1px solid #eee'}}>
								<h3 className="pricing--title">Premium</h3>
								<div style={{fontSize: '1.15em'}} className="pricing--price"><span className="pricing--currency">$</span>19.99/mo</div>
								<div style={{ borderTop:'1px solid #eee', marginTop:24, paddingTop:24}}>
									<ul className="pricing--feature-list">
										<li className="pricing--feature">Full Video Access</li>
										<li className="pricing--feature">Downloadable Code Samples</li>
										<li className="pricing--feature">Customized Job Listings</li>
										<li className="pricing--feature">Forum Access</li>
										<li className="pricing--feature">Discounts to Live Events</li>
									</ul>

								</div>
								<button onClick={this.showRegistrationForm} id="premium" className="pricing--action">Join</button>
							</div>
						</div>
					</div>
				</section>				

		        <Modal show={this.state.showRegistration} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h3>Join</h3>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<div style={{textAlign:'center'}}>
				        	<img style={{width:128, borderRadius:64, border:'1px solid #ddd', background:'#fff', marginBottom:24}} src='/images/logo_round_green_260.png' />
			        	</div>
			        	<div className="row">
			        		<div className="col-md-6">
					        	<input onChange={this.updateUserRegistration} id="name" className="form-control" style={{marginBottom:12}} type="text" placeholder="Name" />
					        	<input onChange={this.updateUserRegistration} id="email" className="form-control" style={{marginBottom:12}} type="text" placeholder="Email" />
			        		</div>

			        		<div className="col-md-6">
					        	<input onChange={this.updateUserRegistration} id="password" className="form-control" style={{marginBottom:12}} type="password" placeholder="Password" />
					        	<input onChange={this.updateUserRegistration} id="promoCode" className="form-control" style={{marginBottom:12}} type="text" placeholder="Promo Code" />
			        		</div>
			        	</div>
						<select onChange={this.updateUserRegistration} id="membershiptype" value={this.state.membershiptype} className="form-control input-md not-dark">
							<option value="basic">Basic</option>
							<option value="premium">Premium</option>
						</select>

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.register} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Register</a>
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
        loaderOptions: state.staticReducer.loaderConfig
    }
}

export default connect(stateToProps)(Landing)
