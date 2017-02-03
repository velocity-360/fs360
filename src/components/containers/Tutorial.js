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

            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 mb-xs-24">
                            <div className="post-snippet mb64">
                                <img className="mb24" style={{border:'1px solid #ddd', width:260}} alt={tutorial.title} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=320'} />
                                <div className="post-title">
                                    <h4 className="inline-block">{tutorial.title}</h4>
                                </div>
                                <ul className="post-meta">
                                    <li>
                                        <span className="label">{(tutorial.price == 0) ? 'FREE' : '$'+TextUtils.numberWithCommas(tutorial.price)}</span>
                                    </li>
                                    <li>
                                        <i className="ti-tag"></i>
                                        <span><a href="#">Beginner</a></span>
                                    </li>
                                </ul>
                                <hr />
                                <p className="lead" dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(tutorial.description) }}></p>
                                { units }

                                <div style={{border:'1px solid #ddd', borderRadius:3, marginBottom:24, background:'#FDFEFE'}}>
                                    { tutorial.posts.map((post, i) => {
                                            let youtube = null
                                            if (post.youtube != null)
                                                youtube = (post.youtube.length == 0) ? null : <object style={localStyle.youtube} data={'https://www.youtube.com/embed/'+post.youtube}></object>
                                            
                                            return (
                                                <div key={i} style={{borderBottom:'1px solid #ddd', padding:16}}>
                                                    <h4 style={styles.title}>{post.title}</h4>

                                                    <div style={styles.paragraph}>
                                                        {post.description}<br />
                                                        { youtube }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <div className="row">
                                    { cta }
                                </div>

                            </div>
                        </div>

                        <div className="col-md-3 hidden-sm">
                            <div className="widget">
                                <h6 className="title">Account</h6>
                                <hr />
                                Receive updates for new tutorials or courses:
                                <input style={localStyle.input} className="mb0" type="text" placeholder="Full Name" />
                                <input style={localStyle.input} className="mb0" type="text" placeholder="Email" />
                                <input style={localStyle.input} className="mb0" type="password" placeholder="Password" />
                            </div>
                            <div className="widget">
                                <h6 className="title">Recent Posts</h6>
                                <hr />
                                <ul className="link-list recent-posts">
                                    <li>
                                        <a href="#">A simple image post for starters</a>
                                        <span className="date">September 23, 2015</span>
                                    </li>
                                    <li>
                                        <a href="#">An audio post for good measure</a>
                                        <span className="date">September 19, 2015</span>
                                    </li>
                                    <li>
                                        <a href="#">A thoguhtful blockquote post on life</a>
                                        <span className="date">September 07, 2015</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                </div>
            </section>


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
            { (tutorial.price == 0) ? null : 
                (
                    <div className="col-md-6">
                        <div className="heading-block fancy-title nobottomborder title-bottom-border">
                            <h4 style={styles.title}>Purchase</h4>
                        </div>
                        <p style={styles.paragraph}>
                            Purchase this tutorial for ${tutorial.price} and receive all videos, code samples and 
                            access to the forum where people post questions and answers. 
                            <br /><br />
                        </p>
                        <a onClick={context.showStripeModal.bind(context, 'charge')} className="btn btn-lg" href="#">Purchase, ${tutorial.price}</a>
                    </div>
                )
            }

            <div className="col-md-6">
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
                <a onClick={context.showStripeModal.bind(context, 'subscription')} className="btn btn-lg" href="#">Subscribe</a>
            </div>
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
