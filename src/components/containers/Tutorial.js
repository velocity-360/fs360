import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { TextUtils, Stripe, APIManager } from '../../utils'
import styles from './styles'
import BaseContainer from './BaseContainer'

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

    subscribe(event){
        event.preventDefault()
        const currentUser = this.props.account.currentUser
        if (currentUser == null)
            return

        const tutorial = this.props.tutorials[this.props.slug]
        if (tutorial == null)
            return

        if (tutorial.subscribers.indexOf(currentUser.id) != -1)
            return

        let subscribers = Object.assign([], tutorial.subscribers)
        subscribers.push(currentUser.id)
        this.props.updateTutorial(tutorial, {subscribers: subscribers})
        .then(response => {
            window.location.href = '/account'
        })
        .catch(err => {

        })
    }

	render(){
        const currentUser = this.props.account.currentUser
        const tutorial = this.props.tutorials[this.props.slug]
        const style = styles.home

        let cta = null
        if (tutorial.price == 0) { // it's free
            if (currentUser == null)
                cta = purchase(tutorial, this.props, false)

            else if (tutorial.subscribers.indexOf(currentUser.id) != -1) // already subscribed
                cta = subscribed(tutorial)

            else if (currentUser.accountType == 'premium') // premium member
                cta = premium(currentUser, this)
            
            else 
                cta = purchase(tutorial, this.props, true) // show premium signup and subcribe
        }

        else if (currentUser == null)
            cta = purchase(tutorial, this.props, false)

        else if (tutorial.subscribers.indexOf(currentUser.id) != -1)
            cta = subscribed(tutorial)

        else if (currentUser.accountType == 'premium')
            cta = premium(currentUser, this)
        
        else // logged in, not subscribed
            cta = purchase(tutorial, this.props, true)

        let units = null
        if (tutorial.posts.length == 0)
            units = <h3 style={styles.title}>Coming Soon</h3>
        else if (tutorial.price == 0)
            units = <h3 style={styles.title}>Units</h3>
        else
            units = <h3 style={styles.title}>Preview</h3>

		return (
            <div>
                <section className="parallax-window" id="short" data-parallax="scroll" data-image-src="/img/desktop.jpg" data-natural-width="1400" data-natural-height="350">
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
                                        <li><a href="#subscribe">Subscribe</a></li>
                                        <li>
                                            <div style={{padding:'15px 15px'}}>
                                                <img src="/img/slack.png" /> 
                                                <p style={{marginTop:12}}>
                                                    Join our Slack channel to ask questions about tutorials, get feedback on 
                                                    your code and to discuss general programming and industry topics: 
                                                </p>
                                                <div id="message-newsletter_2"></div>
                                                <div className="form-group">
                                                    <input style={localStyle.input} onChange={this.props.updateCredentials.bind(this)} type="text" id="name" placeholder="Name" className="form-control" /><br />
                                                    <input style={localStyle.input} onChange={this.props.updateCredentials.bind(this)} type="text" id="email" placeholder="Email" className="form-control" />
                                                </div>
                                                <button onClick={this.props.subscribe.bind(this)} className="btn_1 white">Join</button>
                                            </div>
                                        </li>
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
                                        <br />
                                        <span style={{padding:4, background:'#f9f9f9', border:'1px solid #ddd', marginRight:6}}>{ (tutorial.price == 0) ? 'Free' : '$'+tutorial.price+'.00'}</span>
                                        <span style={{padding:4, background:'#f9f9f9', border:'1px solid #ddd', marginLeft:6}}>{ (tutorial.posts.length==0) ? 'Coming Soon' : tutorial.posts.length+' Units' }</span>
                                        <br /><br />
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
            <button onClick={context.subscribe.bind(context)} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white">Subscribe</button>
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
            <a target="_blank" href={'/premium/tutorial/'+tutorial.id} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white">Download</a>
        </div>
    )
}

const purchase = (tutorial, context, isLoggedIn) => {
    return (
        <div>
            <div className="col-md-6">
                <div className="box_style_3" id="general_facilities">
                    <h3>Premium Membership</h3>
                    <p style={{marginTop:12, paddingTop:12, borderTop:'1px solid #ddd'}}>
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
                    <button onClick={context.showStripeModal.bind(context, {schema:'subscription'})} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white" href="#">Subscribe</button>
                </div>
            </div>

            { (tutorial.price == 0) ? 
                (
                    <div className="col-md-6">
                        { (isLoggedIn) ? (
                                <div>
                                    <div className="heading-block fancy-title nobottomborder title-bottom-border">
                                        <h3 style={styles.title}>Subscribe</h3>
                                    </div>
                                    <p style={styles.paragraph}>
                                        You can subscribe to this tutorial for free by clicking below:
                                    </p>
                                    <button onClick={context.followTutorial.bind(context, tutorial)} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white">Subscribe</button>
                                </div>
                            ):
                            (
                                <div className="box_style_3" id="general_facilities">
                                    <h3>Basic Membership</h3>
                                    <p style={{marginTop:12, paddingTop:12, borderTop:'1px solid #ddd'}}>
                                        Join as a basic member to gain access to the free tutorials, get notifications when 
                                        new tutorials and courses are published, and participate in the Q&A forums.
                                    </p>
                                    <input onChange={context.updateCredentials.bind(context)} style={{marginTop:12}} className="form-control" type="text" id="username" placeholder="Username" />
                                    <input onChange={context.updateCredentials.bind(context)} style={{marginTop:12}} className="form-control" type="text" id="email" placeholder="Email" />
                                    <button onClick={context.followTutorial.bind(context, tutorial)} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white">Subscribe</button>
                                </div>
                            )
                        }

                    </div>
                ) 
                : 
                (
                    <div className="col-md-6">
                        <div className="box_style_3" id="general_facilities">
                            <h3>Purchase</h3>
                            <p style={{marginTop:12, paddingTop:12, borderTop:'1px solid #ddd'}}>
                                Purchase this tutorial for ${tutorial.price} and receive all videos, code samples and 
                                access to the forum where people post questions and answers. 
                            </p>

                            <button onClick={context.showStripeModal.bind(context, tutorial)} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white" href="#">Purchase, ${tutorial.price}</button>
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
        
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchTutorials: (params) => dispatch(actions.fetchTutorials(params)),
        updateTutorial: (tutorial, params) => dispatch(actions.updateTutorial(tutorial, params)),
        toggleLoading: (loading) => dispatch(actions.toggleLoading(loading))
    }
}

export default connect(stateToProps, dispatchToProps)(BaseContainer(Tutorial))
