import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import actions from '../../actions'
import { TextUtils, Stripe } from '../../utils'


class FeaturedTutorials extends Component {

	componentDidMount(){
		this.props.fetchTutorials(null)

	}

    showStripeModal(type, event){
        event.preventDefault()
        this.props.toggleLoading(true)

        if (type == 'charge'){
            const tutorial = this.props.tutorials[this.props.slug]
            Stripe.initializeWithText('Purchase', (token) => {
                this.props.submitStripeCharge(token, tutorial)
                .then((response) => {
                    console.log('TEST: '+JSON.stringify(response))
                    this.props.toggleLoading(false)
                })
                .catch((err) => {

                })
            }, () => {
                setTimeout(() => {
                    this.props.toggleLoading(false)
                }, 100)
            })

            Stripe.showModalWithText(tutorial.title+' - $'+tutorial.price)
            return
        }

        if (type == 'subscription'){
            Stripe.initializeWithText('Subscribe', (token) => {
                this.props.submitStripeCard(token)
                .then((response) => {
                    this.props.toggleLoading(false)
                    browserHistory.push('/online')
                })
                .catch((err) => {

                })
            }, () => {
                setTimeout(() => {
                    this.props.toggleLoading(false)
                }, 100)
            })

            Stripe.showModalWithText('Premium subscription - $19.99/mo')
        }
    }


	render(){
		let list = null
		if (this.props.tutorials != null){
			list = this.props.tutorials.map((tutorial, i) => {
				if (i < 4){ // only show 4
					return (
	                    <div key={tutorial.id}>
	                        <div className="overflow-hidden">
	                            <img alt="Pic" style={{width:120}} className="mb24 pull-left" src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=220'} />
	                            <div className="pull-left p32 p0-xs pt24">
	                                <h6 className="uppercase mb8 number">9:30am - 10:30am</h6>
									<Link style={{color:'#333'}} to={'/tutorial/'+tutorial.slug}><h4>{ TextUtils.truncateText(tutorial.title, 20) }</h4></Link>
	                            </div>
	                        </div>
	                        <p>
								{ TextUtils.truncateText(tutorial.description, 175) }
								<Link style={{float:'right'}} to={'/tutorial/'+tutorial.slug} className="btn btn-sm btn-rounded" role="button">Read More</Link>
	                        </p>

	                        <hr className="mt40 mb40 mt-xs-0 mb-xs-24" />
	                    </div>
					)
				}
			})
		}

		return (
			<div className="container">
                <div className="row mb0 mb-xs-24">
                    <div className="col-sm-12 text-center">
                        <h3>Strap yourself in for ideas</h3>
                        <p className="lead">
                            Prepare for a full day of discussion from some of the webs best and brightest.
                        </p>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="tabbed-content button-tabs">
                            <ul className="tabs thirds mb64 mb-xs-24">
                                <li className="active">
                                    <div className="tab-content text-left">

                                    	{list}
                                        <div>
                                            <div className="overflow-hidden">
                                                <img alt="Pic" className="mb24 pull-left" src="img/avatar1.png" />
                                                <div className="pull-left p32 p0-xs pt24">
                                                    <h6 className="uppercase mb8 number">9:30am - 10:30am</h6>
                                                    <h4>Alice French - E-Commerce & Fashion</h4>
                                                </div>
                                            </div>
                                            <p>
                                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                                            </p>
                                            <hr className="mt40 mb40 mt-xs-0 mb-xs-24" />
                                        </div>





                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row text-center">
                            <div className="col-md-12">
                                <a className="btn btn-lg" href="#">Explore Tutorials</a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
		)
	}
}

const stateToProps = (state) => {
	return {
        currentUser: state.account.currentUser,
		tutorials: state.tutorial.all
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchTutorials: (params) => dispatch(actions.fetchTutorials(params)),
        submitStripeCard: (token) => dispatch(actions.submitStripeCard(token)),
        submitStripeCharge: (token, product) => dispatch(actions.submitStripeCharge(token, product)),
        toggleLoading: (loading) => dispatch(actions.toggleLoading(loading))
	}
}

export default connect(stateToProps, dispatchToProps)(FeaturedTutorials)



