import React, { Component } from 'react'
import stripe from '../utils/StripeUtils'
import api from '../api/api'

class CTA extends Component {

	constructor(props, context){
		super(props, context)
		this.openStripeModal = this.openStripeModal.bind(this)
		this.configureStripe = this.configureStripe.bind(this)
		this.state = {

		}
	}

	componentDidMount(){
		this.configureStripe(this.props.course)

	}

	configureStripe(course){
		var course = this.props.course
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

	openStripeModal(event){
		event.preventDefault()
		if (this.props.course.type == 'online')
			stripe.showModal()
		else 
			stripe.showModalWithText(this.props.course.title)
	}


	render(){
		const course = this.props.course
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
				register = (

					<div className="col_full panel panel-default">
						<div style={{backgroundColor:'#f1f9f5', textAlign:'left'}} className="panel-heading">Submit Deposit</div>
						<div className="panel-body" style={{textAlign:'left'}}>
							{course.tuition} credits<br /><br />
							<a href={course.paypalLink} target="_blank" className="button button-xlarge tright">Subcscribe<i class="icon-circle-arrow-right"></i></a><br />
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
				schedule = <span>Time: {course.schedule}<br /></span>			
				deposit = <span>Deposit: ${course.deposit}<br /></span>
				tuition = <span>Regular Tuition: ${course.tuition}<br /></span>
				premiumTuition = <span>Premium Member Tuition: ${course.premiumTuition}<br /></span>
				register = (
					<div className="col_full panel panel-default">
						<div style={{backgroundColor:'#f1f9f5', textAlign:'left'}} className="panel-heading">Submit Deposit</div>
						<div className="panel-body" style={{textAlign:'left'}}>
							<a href={course.paypalLink} target="_blank" className="button button-xlarge tright">PayPal<i class="icon-circle-arrow-right"></i></a><br />
							<a onClick={this.openStripeModal} href="#" className="button button-xlarge tright">Credit Card<i class="icon-circle-arrow-right"></i></a>
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
					<div className="panel panel-default">
						<div className="panel-body" style={{padding:36, paddingBottom:0}}>
							<h2>{cta}</h2>
							<hr />

							<div className='col_half'>
								{date}
								{schedule}
								{deposit}
								{tuition}
								{premiumTuition}
								<br />
								{register}

							</div>

							<div className="col_half col_last">
								<img style={{width:'80%', float:'right'}} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=460'} />
							</div>
						</div>
					</div>
				</div>
			</div>

		)

	}
}

export default CTA