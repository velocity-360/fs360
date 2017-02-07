import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import actions from '../../actions'
import { TextUtils, Stripe } from '../../utils'


class Tutorials extends Component {

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
				return (
				    <div key={tutorial.id} className="col-sm-6 col-md-6">
						<div className="thumbnail">
						    <div className="caption">
                                <img style={styles.icon} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=320'} />
				                <div className="heading-block fancy-title nobottomborder">
				                    <h4 style={styles.title}>
										<Link style={{color:'#333'}} to={'/tutorial/'+tutorial.slug}>{ TextUtils.truncateText(tutorial.title, 20) }</Link>
				                    </h4>
				                </div>
								<hr />
								<p style={styles.paragraph}>
									{ TextUtils.truncateText(tutorial.description, 175) }
								</p>
								<div style={{textAlign:'right'}}>
									<Link to={'/tutorial/'+tutorial.slug} className="btn btn-primary" role="button">Read More</Link>
								</div>
						    </div>
						</div>
				    </div>
				)
			})
		}

		return (
		    <section style={{background:'#FDFEFE', paddingTop:48, borderTop:'1px solid #ddd'}}>
		        <div className="content-wrap" style={{paddingTop:0}}>
		            <div className="container clearfix">
		                <div className="heading-block bottommargin-lg" style={{marginBottom:20}}>
		                    <h2 style={styles.title}>Tutorials</h2>
		                </div>

            			<div className="col_two_third">
							<div className="row">
								{ list }
							</div>
            			</div>

			            <div className="col_one_third col_last">
			                <div className="heading-block fancy-title nobottomborder title-bottom-border">
			                    <h4 style={styles.title}>Premium <span>Membership</span></h4>
			                </div>

			                <p style={styles.paragraph}>
			                    Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, 
			                    code samples, and forums on the site. There are no long term commitments and membership 
			                    can be canceled at any time.
			                    <br /><br />
			                    &#8226; <i style={{marginLeft:8}}>Downloadable Code Samples</i><br />
			                    &#8226; <i style={{marginLeft:8}}>Downloadable Videos</i><br />
			                    &#8226; <i style={{marginLeft:8}}>Q&A Forum Access</i><br />
			                    &#8226; <i style={{marginLeft:8}}>Discounts on Live Courses</i><br />
			                </p>
			                <a onClick={this.showStripeModal.bind(this, 'subscription')} href="#" className="button button-small button-circle button-border button-aqua">Subscribe</a>
			            </div>

		            </div>
		        </div>
		    </section>	    
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

export default connect(stateToProps, dispatchToProps)(Tutorials)



