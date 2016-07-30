import React, { Component } from 'react'
import stripe from '../../utils/StripeUtils'
import api from '../../utils/APIManager'
import { connect } from 'react-redux'
import Nav from '../../components/Nav'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RightSidebar from '../../components/RightSidebar'


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
				_this.setState({
					showLoader: true
				})
				
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

		// course deposite:
		stripe.showModalWithText(this.props.course.title)
	}

	render(){
		return (
			<div>
				<Nav headerStyle='dark' />

				<section>
					<div className="content-wrap">

						<div className="container clearfix" style={{paddingTop:64}}>
							<div className="col_two_third bottommargin-sm">
			                    <div className="fancy-title title-bottom-border">
			                        <h2 style={{fontWeight:400}}>Premium Membership</h2>
			                    </div>
								<img style={{background:'#fff', float:'right', maxWidth: 220, marginLeft:16}} className="image_fade" src="/images/logo_round_blue_260.png" alt="Velocity 360" />
								<p>
									Premium Membership includes access to ALL videos, downloadable source code,
									and PDF tutorials.  
								</p>

								<a onClick={this.openStripeModal} href="#" className="button button-xlarge tright">Checkout<i class="icon-circle-arrow-right"></i></a>
							</div>

							<div className="col_one_third bottommargin-sm hidden-xs col_last" style={{borderLeft: '1px solid #ddd', padding: 36}}>
								<RightSidebar />
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