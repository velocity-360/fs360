import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import stripe from '../utils/StripeUtils'
import textUtils from '../utils/TextUtils'
import api from '../api/api'


class Register extends Component {
	constructor(props, context){
		super(props, context)
		this.hide = this.hide.bind(this)
		this.updateUserRegistration = this.updateUserRegistration.bind(this)
		this.showRegistrationForm = this.showRegistrationForm.bind(this)
		this.hideRegistrationForm = this.hideRegistrationForm.bind(this)
		this.register = this.register.bind(this)
		this.validate = this.validate.bind(this)
		this.state = {
			showLoader: false,
			showRegistration: false,
			membershipType: 'Basic',
			visitor: {
				name: '',
				email: '',
				password: '',
				course: '',
				referral: ''
			}
		}
	}

	showRegistrationForm(event){
		event.preventDefault()
		this.setState({
			membershipType: event.target.id,
			showRegistration: true
		})
	}	

	hideRegistrationForm(){
		this.setState({
			showRegistration: false
		})
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
				})
			})			
		})

	}

	updateUserRegistration(event){
		var updatedVisitor = Object.assign({}, this.state.visitor)
		updatedVisitor[event.target.id] = event.target.value
		this.setState({
			visitor: updatedVisitor
		})
	}

	register(event){
		event.preventDefault()
		var missingField = this.validate(this.state.visitor, true);
		if (missingField != null){
			alert('Please enter your '+missingField);
			return
		}

		var registrant = Object.assign({}, this.state.visitor)
		var parts = this.state.visitor.name.split(' ')
		registrant['firstName'] = parts[0]
		if (parts.length > 1)
			registrant['lastName'] = parts[1]

		this.setState({
			showLoader: true
		})

		var _this = this
		api.handlePost('/api/profile', registrant, function(err, response){
			if (err){
				alert(err.message)
				_this.setState({showLoader: false})
				return
			}

			if (_this.props.membershipType == 'basic'){
				window.location.href = '/account'
				return
			}

			// premium registration, show stripe modal
			stripe.showModal()
			_this.setState({showLoader: false})
		})
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


	hide(){
		this.props.hide()
	}


	render(){
		var loaderConfig = {
		    lines: 13,
		    length: 20,
		    width: 10,
		    radius: 30,
		    corners: 1,
		    rotate: 0,
		    direction: 1,
		    color: '#fff',
		    speed: 1,
		    trail: 60,
		    shadow: false,
		    hwaccel: false,
		    zIndex: 2e9,
		    top: '50%',
		    left: '50%',
		    scale: 1.00
		}

		return (
				<section id="register" className="section pricing-section nomargin" style={{backgroundColor: '#FFF'}}>
					<Loader options={loaderConfig} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
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

			        <Modal bsSize="sm" show={this.state.showRegistration} onHide={this.hideRegistrationForm}>
				        <Modal.Body style={{background:'#f9f9f9', padding:24, borderRadius:3}}>
				        	<div style={{textAlign:'center'}}>
					        	<img style={{width:96, borderRadius:48, border:'1px solid #ddd', background:'#fff', marginBottom:24}} src='/images/logo_round_green_260.png' />
					        	<h4>{ textUtils.capitalize(this.state.membershipType) } Membership</h4>
				        	</div>
				        	<input onChange={this.updateUserRegistration} id="name" className="form-control" style={{marginBottom:12}} type="text" placeholder="Name" />
				        	<input onChange={this.updateUserRegistration} id="email" className="form-control" style={{marginBottom:12}} type="text" placeholder="Email" />
				        	<input onChange={this.updateUserRegistration} id="password" className="form-control" style={{marginBottom:12}} type="password" placeholder="Password" />
				        	<input onChange={this.updateUserRegistration} id="promoCode" className="form-control" style={{marginBottom:12}} type="text" placeholder="Promo Code" />
							<div style={{textAlign:'center', marginTop:24}}>
								<a onClick={this.register} href="#" className="button button-border button-dark button-rounded button-large noleftmargin">Join</a>
							</div>
				        </Modal.Body>
			        </Modal>

				</section>	


		)
	}
}

export default Register