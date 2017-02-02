import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import actions from '../../actions'
import { TextUtils, Stripe } from '../../utils'


class FeaturedTutorials extends Component {

	componentDidMount(){
//		this.props.fetchTutorials(null)

	}

    showStripeModal(type, event){
        event.preventDefault()
        this.props.toggleLoading(true)

        if (type == 'charge'){
            const tutorial = this.props.tutorials[this.props.slug]
            Stripe.initializeWithText('Purchase', (token) => {
                this.props.submitStripeCharge(token, tutorial)
                .then((response) => {
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
				return (
                    <div key={tutorial.id}>
                        <div className="overflow-hidden">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="inline-block pull-left">
                                        <h6 className="uppercase mb0 mt0 number">{ tutorial.posts.length } Units | { (tutorial.price == 0) ? 'Free' : '$'+tutorial.price}</h6>
                                        <Link style={{color:'#333'}} to={'/tutorial/'+tutorial.slug}><h4 className="mb0 mt0">{ tutorial.title }</h4></Link>
                                        <p className="mb0 mt24">
                                            { TextUtils.truncateText(tutorial.description, 250) }
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-2 pull-right">
                                    <img alt="Pic" style={{maxWidth:90, border:'1px solid #ddd'}} className="mb24 pull-left" src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=120'} />
                                </div>
                            </div>
                            <div className="inline-block pull-right pt24 pt-xs-24">
                                <Link to={'/tutorial/'+tutorial.slug} className="btn btn-lg" role="button">View Tutorial</Link>
                            </div>
                        </div>
                        <hr className="mt40 mb40 mt-xs-0 mb-xs-24" />
                    </div>
				)
			})
		}

		return (
			<div className="container" id="tutorials">
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
                                        { list }
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div className="row">
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



