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
                    <div key={tutorial.id} className="col-md-4 col-sm-4">
                        <div className="box_feat">
                            <a href={'/tutorial/'+tutorial.slug}>
                                <img style={{padding:3, border:'1px solid #ddd', background:'#fff', marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=96'} />
                            </a>
                            <h4><a href={'/tutorial/'+tutorial.slug}>{tutorial.title}</a></h4>
                            <hr />
                            <p style={{height:130}}>{ TextUtils.truncateText(tutorial.description, 160) }</p>
                            <span style={{padding:3, background:'#f9f9f9', border:'1px solid #ddd', marginRight:6}}>{ (tutorial.price == 0) ? 'Free' : '$'+tutorial.price+'.00'}</span>
                            <span style={{padding:3, background:'#f9f9f9', border:'1px solid #ddd', marginLeft:6, marginRight:6}}>{ (tutorial.posts.length==0) ? 'Coming Soon' : tutorial.posts.length+' Units' }</span>
                            <a href={'/tutorial/'+tutorial.slug} style={{marginLeft:6}} className="btn_1 white">View</a>
                        </div>
                    </div>
				)
			})
		}

		return (
            <div className="container_styled_1">
                <div className="container margin_60">
                    <h2 className="main_title" style={{fontFamily:'Pathway Gothic One'}}>
                        Tutorials
                    </h2>

                    <div className="row">
                        { list }
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



