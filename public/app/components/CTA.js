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
		var cta = 'Register'
		if (course.type == 'online'){
			cta = 'Subscribe'
		}
		else if (course.type == 'immersive'){
			cta = 'Details'
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
								Date: {course.dates}<br />
								Time: {course.schedule}<br />
								Deposit: ${course.deposit}<br />
								Regular Tuition: ${course.tuition}<br />
								Premium Member Tuition: ${course.premiumTuition}<br />
								<br />
								{ 
									(this.props.course.type == 'live') ? 
									(
										<div className="col_full panel panel-default">
											<div style={{backgroundColor:'#f1f9f5', textAlign:'left'}} className="panel-heading">Submit Deposit</div>
											<div className="panel-body" style={{textAlign:'left'}}>
												<a href={course.paypalLink} target="_blank" className="button button-xlarge tright">PayPal<i class="icon-circle-arrow-right"></i></a><br />
												<a onClick={this.openStripeModal} href="#" className="button button-xlarge tright">Credit Card<i class="icon-circle-arrow-right"></i></a>
											</div>
										</div>
									)
									:
									<a href="#application" className="button button-xlarge tright">Apply<i class="icon-circle-arrow-right"></i></a>
								}

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