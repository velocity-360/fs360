import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { TextUtils, Stripe, APIManager } from '../../utils'
import styles from './styles'

class Tutorial extends Component {
    constructor(){
        super()
        this.state = {
            visitor: {
                name: '',
                email: '',
                subject: ''
            }
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if (this.props.tutorials == null)
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
                    // console.log('TEST: '+JSON.stringify(response))
                    this.props.toggleLoading(false)
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

    subscribe(event){
        event.preventDefault()
        if (this.props.currentUser == null)
            return

        const tutorial = this.props.tutorials[this.props.slug]
        if (tutorial == null)
            return

        if (tutorial.subscribers.indexOf(this.props.currentUser.id) != -1)
            return

        let subscribers = Object.assign([], tutorial.subscribers)
        subscribers.push(this.props.currentUser.id)
        this.props.updateTutorial(tutorial, {subscribers: subscribers})
    }

	render(){
        const tutorial = this.props.tutorials[this.props.slug]
        const style = styles.home

        let cta = null
        if (tutorial.price == 0) { // it's free
            if (this.props.currentUser == null)
                cta = purchase(tutorial, this)
            else if (this.props.currentUser.accountType == 'premium')
                cta = premium(this.props.currentUser, this)
            else 
                cta = purchase(tutorial, this)
        }

        else if (this.props.currentUser == null)
            cta = purchase(tutorial, this)

        else if (tutorial.subscribers.indexOf(this.props.currentUser.id) != -1)
            cta = subscribed(tutorial)

        else if (this.props.currentUser.accountType == 'premium')
            cta = premium(this.props.currentUser, this)
        
        else // logged in, not subscribed
            cta = purchase(tutorial, this)

        let units = null
        if (tutorial.posts.length == 0)
            units = <h3 style={styles.title}>Coming Soon</h3>
        else if (tutorial.price == 0)
            units = <h3 style={styles.title}>Units</h3>
        else
            units = <h3 style={styles.title}>Preview</h3>

		return (

        <div>
            <section className="parallax-window" id="short" data-parallax="scroll" data-image-src="/img/sub_header_short_2.jpg" data-natural-width="1400" data-natural-height="350">
                <div id="subheader">
                    <h1>{tutorial.title}</h1>
                </div>
            </section>

            <div className="container margin_60_35">
                <div className="row">
                
                    <div className="col-md-3" id="sidebar">
                        <div className="theiaStickySidebar">
                            <div id="faq_box">
                                <ul id="cat_nav">
                                    <li><a href="#overview" className="active">Overview</a></li>
                                    <li><a href="#units">Units</a></li>
                                    <li><a href="#downloads">Downloads</a></li>
                                    <li><a href="#takeaway">Subscribe</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-9">
                        <h3 className="nomargin_top">Overview</h3>
                        <hr />

                        <div className="panel-group" id="overview">
                            <div className="row">
                                <div className="col-md-9">
                                    <img style={{border:'1px solid #ddd', width:260, marginBottom:16}} alt={tutorial.title} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=320'} />
                                    <p dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(tutorial.description) }}></p>
                                </div>
                            </div>
                        </div>

                        <h3 className="nomargin_top">Units</h3>
                        <hr />
                        <div className="panel-group" id="units">
                            <div className="row">
                                <div className="col-md-9">
                                    <ul id="policies">
                                        { tutorial.posts.map((post, i) => {
                                                let youtube = null
                                                if (post.youtube != null)
                                                    youtube = (post.youtube.length == 0) ? null : <object style={localStyle.youtube} data={'https://www.youtube.com/embed/'+post.youtube}></object>
                                                
                                                return (
                                                    <li key={i}>
                                                        <i className="icon-video-5"></i>
                                                        <h5>{post.title}</h5>
                                                        <p>{post.description}</p>
                                                        { youtube }
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>

                                </div>
                            </div>
                        </div>


                        <h3 className="nomargin_top">Downloads</h3>
                        <hr />
                        <div className="panel-group" id="downloads">
                            <div className="row">
                                <div className="col-md-9">
                                    <p dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(tutorial.description) }}></p>
                                </div>
                            </div>
                        </div>

                        <h3 className="nomargin_top">Subscribe</h3>
                        <hr />
                        <div className="panel-group" id="subscribe">
                            <div className="row">
                                {cta}
                            </div>
                        </div>
                            
                    </div>
                </div>
            </div>  
        </div>

		)
	}
}

const premium = (user, context) => {
    return (
        <div className="col-md-6">
            <div className="heading-block fancy-title nobottomborder title-bottom-border">
                <h4 style={styles.title}>Premium <span>Member</span></h4>
            </div>

            <p style={styles.paragraph}>
                As a premium member, you can subscribe to this tutorial for free by clicking below:
            </p>
            <a href="#" onClick={context.subscribe.bind(context)} className="button button-small button-circle button-border button-aqua">Subscribe</a>
        </div>
    )    
}

const subscribed = (tutorial) => {
    return (
        <div className="col-md-6">
            <div className="heading-block fancy-title nobottomborder title-bottom-border">
                <h4 style={styles.title}>Subscribed</h4>
            </div>

            <p style={styles.paragraph}>
                You are subscribed to this tutorial series. To access all of the videos and code samples, 
                click on the link below:
            </p>
            <a target="_blank" href={'/premium/tutorial/'+tutorial.id} className="button button-small button-circle button-border button-aqua">Download</a>
        </div>
    )
}

const purchase = (tutorial, context) => {
    return (
        <div>
            <div className="col-md-6">
                <div className="box_style_3" id="general_facilities">
                    <h3>Premium Membership</h3>
                    <p>
                        Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, 
                        code samples, and forums on the site. There are no long term commitments and membership 
                        can be canceled at any time.
                    </p>

                    <ul className="list_ok">
                        <li>Downloadable Code Samples</li>
                        <li>Downloadable Videos</li>
                        <li>Q&A Forum Access</li>
                        <li>Discounts on Live Courses</li>
                    </ul>
                    <button onClick={context.showStripeModal.bind(context, 'subscription')} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white" href="#">Subscribe</button>
                </div>
            </div>

            { (tutorial.price == 0) ? null : 
                (
                    <div className="col-md-6">
                        <div className="box_style_3" id="general_facilities">
                            <h3>Purchase</h3>
                            <p>
                                Purchase this tutorial for ${tutorial.price} and receive all videos, code samples and 
                                access to the forum where people post questions and answers. 
                            </p>

                            <button onClick={context.showStripeModal.bind(context, 'charge')} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white" href="#">Purchase, ${tutorial.price}</button>
                        </div>
                    </div>
                )
            }

        </div> 
    )
}

const localStyle = {
    youtube: {
        background:'#fff',
        padding:3,
        border:'1px solid #ddd',
        width: 220,
        float:'none',
        clear:'both',
        margin:'4px auto'
    },
    input: {
        background: '#f9f9f9',
        border: 'none',
        padding: 12,
        marginTop: 12
    }
}

const stateToProps = (state) => {
    return {
        currentUser: state.account.currentUser,
        tutorials: state.tutorial
    }
}

const dispatchToProps = (dispatch) => {
    return {
        submitStripeCard: (token) => dispatch(actions.submitStripeCard(token)),
        submitStripeCharge: (token, product) => dispatch(actions.submitStripeCharge(token, product)),
        fetchTutorials: (params) => dispatch(actions.fetchTutorials(params)),
        updateTutorial: (tutorial, params) => dispatch(actions.updateTutorial(tutorial, params)),
        toggleLoading: (loading) => dispatch(actions.toggleLoading(loading))
    }
}

export default connect(stateToProps, dispatchToProps)(Tutorial)
