import React, { Component } from 'react'
import Loader from 'react-loader'
import stripe from '../../utils/StripeUtils'
import api from '../../utils/APIManager'
import { connect } from 'react-redux'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Footer from '../../components/Footer'


class Checkout extends Component {

	constructor(props, context){
		super(props, context)
		this.configureStripe = this.configureStripe.bind(this)
		this.openStripeModal = this.openStripeModal.bind(this)
		this.state = {
			showLoader: false
		}
	}

	componentDidMount(){
//		console.log('CHECKOUT: componentDidMount = '+JSON.stringify(this.props.params))
		if (this.props.params == null){ // premium membership registration
			var _this = this
			stripe.initialize(function(token){
				_this.setState({showLoader: true})
				api.submitStripeToken(token, (err, response) => {
					if (err){
						alert(err.message)
						return
					}

					window.location.href = '/account'
				})
			})
			return
		}

		var path = ''
		const keys = Object.keys(this.props.params)
		for (var i=0; i<keys.length; i++){
			var key = keys[i]
			var value = this.props.params[key]
			path += key+'/'+value
		}

		const endpoint = '/api/'+path
		api.handleGet(endpoint, null, (err, response) => {
			if (err){
				alert(err.message)
				return
			}

			console.log(JSON.stringify(response))
		})
	}


	configureStripe(){
		const course = this.props.course
		if (course == null){ // premium registration
			stripe.initialize(function(token){
				api.submitStripeToken(token, (err, response) => {
					if (err){
						alert(err.message)
						return
					}

					console.log(JSON.stringify(response))
					window.location.href = '/account'
				})
			})
			return
		}

		if (course.type == 'online'){ // for videos, show subscription prompt:
			stripe.initialize(function(token){
				_this.setState({showLoader: true})
				api.submitStripeToken(token, (err, response) => {
					if (err){
						alert(err.message)
						return
					}

					console.log(JSON.stringify(response))
					window.location.href = '/account'
				})
			})
			return
		}

		stripe.initializeWithText('Submit Deposit', function(token){
			api.submitStripeCharge(token, course, course.deposit, 'course', (err, response) => {
				if (err){
					alert(err.message)
					return
				}

				console.log(JSON.stringify(response))
			})
		})
	}

	openStripeModal(event){
		event.preventDefault()
		const course = this.props.course
		if (course == null){ // premium registration
			stripe.showModal()
			return
		}

		if (this.props.course.type == 'online'){
			stripe.showModal()
			return
		}

		// course deposit:
		stripe.showModalWithText(this.props.course.title)
	}

	render(){
		const loaderConfig = {
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
			<div>
				<Nav headerStyle='dark' />

				<section>
					<Loader options={loaderConfig} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
					<div className="content-wrap">

						<div className="container clearfix" style={{paddingTop:64}}>
							<div className="col_two_third bottommargin-sm">
			                    <div className="fancy-title title-bottom-border">
			                        <h2 style={{fontWeight:400}}>Premium Membership</h2>
			                    </div>
								<img style={{background:'#fff', float:'right', maxWidth:200, marginLeft:16, marginBottom:16}} className="image_fade hidden-xs" src="/images/logo_round_blue_260.png" alt="Velocity 360" />
								<p>
									Premium Membership includes:<br /><br />
									&#10003; Unlimited access to ALL videos<br />
									&#10003; Downloadable code samples, and PDF tutorials<br />
									&#10003; Discounts and exclusive access to live events<br />
									&#10003; Discounts to live courses<br />
								</p>

								<div className="col_full panel panel-default">
									<div style={{backgroundColor:'#f1f9f5', textAlign:'left'}} className="panel-heading">Upgrade to Premium - $19.99/month</div>
									<div className="panel-body" style={{textAlign:'left'}}>
										Your account will be charged $19.99 on the first of each month. You card will NOT be charged
										upon registration.<br /><br />
										<a onClick={this.openStripeModal} href="#" className="button button-xlarge tright">Checkout<i class="icon-circle-arrow-right"></i></a>
									</div>
								</div>
							</div>

							<div className="col_one_third bottommargin-sm hidden-xs col_last" style={{borderLeft: '1px solid #ddd', padding: 36}}>
							</div>			

						</div>
					</div>
				</section>

				<Footer />
			</div>
		)
	}
}

export default Checkout