import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { TextUtils, Stripe, APIManager } from '../../utils'

const BaseContainer = (Container) => {

	class Base extends Component {
		constructor(){
			super()
			this.state = {
				credentials: {
					name: '',
					email: '',
					password: ''
				}
			}
		}

		updateCredentials(event){
			let updated = Object.assign({}, this.state.credentials)
			updated[event.target.id] = event.target.value
			this.setState({
				credentials: updated
			})
		}

		register(event){
			console.log('register: '+JSON.stringify(this.state.credentials))

		}


	    showStripeModal(product, event){
	        event.preventDefault()
//	        this.props.toggleLoading(true)

	        if (product.schema == 'subscription'){
	            Stripe.initializeWithText('Subscribe', (token) => {
	                this.props.submitStripeCard(token)
	                .then(response => {
	                	window.location.href = '/account'
	                    // console.log('TEST: '+JSON.stringify(response))
//	                    this.props.toggleLoading(false)
	                })
	                .catch(err => {
	                	alert(err.message)
	                })
	            }, () => {
	                setTimeout(() => {
//	                    this.props.toggleLoading(false)
	                }, 100)
	            })

	            Stripe.showModalWithText('Premium Subscription - $19.99/mo')
	            return
	        }

            Stripe.initializeWithText('Purchase', (token) => {
                this.props.submitStripeCharge(token, product)
                .then(response => {
	                	window.location.href = '/account'
//                    console.log('TEST: '+JSON.stringify(response))
//                    this.props.toggleLoading(false)
                })
                .catch(err => {

                })
            }, () => {
                setTimeout(() => {
//                    this.props.toggleLoading(false)
                }, 100)
            })

            Stripe.showModalWithText(product.title+' - $'+product.price)
	    }

		render(){
			return (
				<div>
					<Container
						updateCredentials={this.updateCredentials.bind(this)}
						register={this.register.bind(this)}
						showStripeModal={this.showStripeModal.bind(this)} 
						{...this.props} />
				</div>
			)
		}
	}

	const stateToProps = (state) => {
		return {
			account: state.account,
	        tutorials: state.tutorial
		}
	}

	const dispatchToProps = (dispatch) => {
		return {
	        submitStripeCard: (token) => dispatch(actions.submitStripeCard(token)),
	        submitStripeCharge: (token, product) => dispatch(actions.submitStripeCharge(token, product))
		}
	}


	return connect(stateToProps, dispatchToProps)(Base)
}

export default BaseContainer