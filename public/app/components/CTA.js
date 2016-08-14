import React, { Component } from 'react'
import stripe from '../utils/StripeUtils'
import store from '../stores/store'
import actions from '../actions/actions'
import api from '../utils/APIManager'

class CTA extends Component {

	constructor(props, context){
		super(props, context)
		this.openStripeModal = this.openStripeModal.bind(this)
		this.configureStripe = this.configureStripe.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.updateCourse = this.updateCourse.bind(this)
		this.updateCurrentUser = this.updateCurrentUser.bind(this)
		this.updatePromoCode = this.updatePromoCode.bind(this)
		this.showPaypal = this.showPaypal.bind(this)
		this.login = this.login.bind(this)
		this.state = {
			promoCode: ''
		}
	}

	componentDidMount(){
		this.configureStripe(this.props.course)
	}

	login(event){
		event.preventDefault()
		this.props.loginAction(event)
	}

	subscribe(event){
		event.preventDefault()

		if (this.props.currentUser.id == null){ // not logged in
			this.props.loginAction(event)
			return
		}

		// check credits first:
		if (this.props.currentUser.credits < this.props.course.credits && this.props.currentUser.accountType=='basic'){
			alert('Not Enough Credits. Please Upgrade to Premium or Purchase More Credits.')
			return
		}

		// Fetch course first to get most updated subscriber list:
		const _this = this
		const endpoint = '/api/course/'+this.props.course.id
		api.handleGet(endpoint, null, (err, response) => {
			if (err){
				alert(err.message)
				return
			}

			const course = response.course
			var subscribers = course.subscribers
			if (subscribers.indexOf(_this.props.currentUser.id) != -1) // already subscribed
				return

			subscribers.push(_this.props.currentUser.id)
			_this.updateCourse({
				subscribers: subscribers
			})
		})
	}

	updateCourse(pkg){
		var _this = this
		const endpoint = '/api/course/'+this.props.course.id
		api.handlePut(endpoint, pkg, (err, response) => {
			if (err){
				alert(err.message)
				return
			}

			const course = response.course
			store.currentStore().dispatch(actions.courseRecieved(course))

			if (_this.props.currentUser.accountType == 'premium')
				return
			
			const credits = _this.props.currentUser.credits-course.credits
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

	configureStripe(course){
		var course = this.props.course
		var _this = this
		if (course.type == 'online'){ // for videos, show subscription prompt:
			stripe.initialize(function(token){
				_this.props.showLoader()
				api.submitStripeToken(token, function(err, response){
					_this.props.hideLoader()
					if (err){
						alert(err.message)
						return
					}

					window.location.href = '/account'
				})
			})
			return
		}

		var text = 'Submit Deposit - $'+course.deposit
		stripe.initializeWithText(text, function(token){
			_this.props.showLoader()
			api.submitStripeCharge(token, course, course.deposit, 'course', function(err, response){
				_this.props.hideLoader()
				if (err){
					alert(err.message)
					_this.setState({showLoader: false})
					return
				}
				
				_this.props.showConfirmation()
			})					
		})
	}

	openStripeModal(event){
		event.preventDefault()
		if (this.props.course.type == 'online')
			stripe.showModal()
		else 
			stripe.showModalWithText(this.props.course.title)
	}

	updatePromoCode(event){
		event.preventDefault()
		this.setState({
			promoCode: event.target.value
		})

	}

	showPaypal(event){
		console.log('showPaypal')
		event.preventDefault()
		if (this.props.course.discountPaypalLink.length == 0){ // no discount code
			window.open(this.props.course.paypalLink, 'Velocity 360', 'width=650,height=900')
			return
		}

		const promoCode = this.state.promoCode.trim()
		if (promoCode.length == 0){
			window.open(this.props.course.paypalLink, 'Velocity 360', 'width=650,height=900')
			return
		}

		if (this.props.course.promoCodes.indexOf(promoCode) == -1){
			window.open(this.props.course.paypalLink, 'Velocity 360', 'width=650,height=900')
			return
		}

		// successful promo code
		window.open(this.props.course.discountPaypalLink, 'Velocity 360', 'width=650,height=900')
	}

	render(){
		const course = this.props.course
		const user = this.props.currentUser
		var cta = null
		var date = null
		var schedule = null
		var deposit = null
		var tuition = null
		var premiumTuition = null
		var register = null

		switch (course.type){
			case 'online':
				cta = 'Subscribe'
				premiumTuition = (
					<p style={{marginBottom:0}}>
						Subscribe to this course to receive email notifications when new videos 
						are published. If you are a <a href={(user.id==null) ? '/#register' : '/checkout'}>premium</a> member, 
						all online video courses are included in membership.
					</p>
				)

				var creditsRemaining = null				
				if (user.accountType == 'basic')
					creditsRemaining = <span>Hello {user.firstName}! You have {user.credits} credits remaining</span>
				else 
					creditsRemaining = <span>Hello {user.firstName}. You are a premium member, feel free to subscribe to this series for free!</span>
				

				var isSubscriber = (course.subscribers.indexOf(user.id) > -1)
				register = (
					<div className="col_full panel panel-default">
						<div style={{backgroundColor:'#f1f9f5', textAlign:'left'}} className="panel-heading">Fee: {course.credits} credits</div>
						<div className="panel-body" style={{textAlign:'left'}}>
							{
								(user.id == null) ?
								<span><a onClick={this.login} href="#">Login</a> or <a href="/#register">register</a> to subscribe.</span>
								:
								creditsRemaining
							}

							<br /><br />
							
							{
								(isSubscriber) ? 
								<div>
									<hr />
									<span>You are subscribed to this series</span>
								</div>
								:
								<div>
									<a onClick={this.subscribe} href="#" target="_blank" className="button button-xlarge tright">Subscribe<i class="icon-circle-arrow-right"></i></a><br />
								</div>
							}
						</div>
					</div>
				)
				break

			case 'immersive':
				cta = 'Details'
				date = <span>Date: {course.dates}<br /></span>			
				schedule = <span>Time: {course.schedule}<br /></span>
				deposit = <span>Deposit: ${course.deposit}<br /></span>
				tuition = <span>Regular Tuition: ${course.tuition}<br /></span>
				premiumTuition = <span>Premium Member Tuition: ${course.premiumTuition}<br /></span>
				register = (
					<a href="#application" className="button button-xlarge tright">Apply<i class="icon-circle-arrow-right"></i></a>

				)
				break

			case 'live':
				cta = 'Register'
				date = <span>Date: {course.dates}<br /></span>			
				schedule = <span>Schedule: {course.schedule}<br /></span>			
				deposit = <span>Deposit: ${course.deposit}<br /></span>
				tuition = <span>Regular Tuition: ${course.tuition}<br /></span>
				premiumTuition = <span>Premium Member Tuition: ${course.premiumTuition}<br /></span>
				register = (
					<div className="col_full panel panel-default">
						<div style={{backgroundColor:'#f1f9f5', textAlign:'left'}} className="panel-heading">Submit Deposit</div>
						<div className="panel-body" style={{textAlign:'left', paddingRight:24}}>
							<input type="text" onChange={this.updatePromoCode} id="promo" placeholder="Promo Code" className="custom-input" /><br />
							<a onClick={this.showPaypal} href={course.paypalLink} style={{width:'100%', textAlign:'center'}} className="button button-xlarge">PayPal</a><br />
							<a onClick={this.openStripeModal} href="#" style={{width:'100%', textAlign:'center'}} className="button button-xlarge">Credit Card</a><br />
						</div>
					</div>
				)
				break

			default:
				break
		}

		return (
			<div className="entry clearfix">
				<div className="entry-timeline">
					Join<span></span>
					<div className="timeline-divider"></div>
				</div>
				<div className="entry-image">
					<div className="panel panel-default" style={{maxWidth:600}}>
						<div className="panel-body" style={{padding:36, paddingBottom:0}}>
							<h2>{cta}</h2>
							<hr />

							<div className='col_full col_last'>
								{date}
								{schedule}
								{deposit}
								{tuition}
								{premiumTuition}
								<br />
								{register}

							</div>

						</div>
					</div>
				</div>
			</div>
		)

	}
}

export default CTA