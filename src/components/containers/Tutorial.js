import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { TextUtils, Stripe, APIManager } from '../../utils'
import { Login, Account } from '../view'
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

    updateVisitor(event){
        var updatedVisitor = Object.assign({}, this.state.visitor)
        updatedVisitor[event.target.id] = event.target.value
        this.setState({
            visitor: updatedVisitor
        })      
    }

    showStripeModal(type, event){
        event.preventDefault()
//        console.log('showStripeModal: '+type)

//        this.setState({showLoading: true})

        if (type == 'charge'){
            const tutorial = this.props.tutorials[this.props.slug]
            Stripe.initializeWithText('Purchase', (token) => {
                this.props.submitStripeCharge(token, tutorial)
                .then((response) => {
                    console.log('TEST: '+JSON.stringify(response))
                    // this.setState({showLoading: false})

                })
                .catch((err) => {

                })
            }, () => {
                setTimeout(() => {
                    this.props.toggleLoading(false)
                    // this.setState({showLoading: false})
                }, 100)
            })

            Stripe.showModalWithText(tutorial.title+' - $'+tutorial.price)
            return
        }

        if (type == 'subscription'){
            Stripe.initializeWithText('Subscribe', (token) => {
                this.props.submitStripeCard(token)
                .then((response) => {
                    console.log('TEST: '+JSON.stringify(response))
                    // this.setState({showLoading: false})

                })
                .catch((err) => {

                })
            }, () => {
                setTimeout(() => {
                    this.props.toggleLoading(false)
//                    this.setState({showLoading: false})
                }, 100)
            })

            Stripe.showModalWithText('Premium subscription - $19.99/mo')
        }
    }

    sendCredentials(visitor, mode){
        if (mode == 'register'){ // sign up

            return
        }

        // log in
        this.props.login(visitor)
        .then((profile) => {
//            console.log('THEN: '+JSON.stringify(profile))
        })
        .catch((err) => {
            alert(err)
        })
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

//        console.log('Subscribe')
        let subscribers = Object.assign([], tutorial.subscribers)
        subscribers.push(this.props.currentUser.id)
        this.props.updateTutorial(tutorial, {subscribers: subscribers})
    }

    componentDidUpdate(){
//        console.log('componentDidUpdate: ')
    }

	render(){
        const tutorial = this.props.tutorials[this.props.slug]
        const style = styles.home

        let cta = null
        if (tutorial.price == 0) // it's free
            cta = null

        else if (this.props.currentUser == null)
            cta = purchase(tutorial, this)

        else if (tutorial.subscribers.indexOf(this.props.currentUser.id) != -1)
            cta = subscribed(tutorial)

        else if (this.props.currentUser.accountType == 'premium')
            cta = premium(this.props.currentUser, this)
        
        else // logged in, not subscribed
            cta = purchase(tutorial, this)

		return (
			<div>
                <div className="heading-block topmargin-lg" style={{marginBottom:20}}>
                    <h2 style={styles.title}>{tutorial.title}</h2>
                </div>

                <p style={{fontFamily:'Pathway Gothic One', fontSize:18+'px', fontWeight:400}}>
                    <img style={{float:'right', width:180, border:'1px solid #ddd', background:'#fff', padding:3, marginLeft:12, marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=320'} />
                    {tutorial.posts.length} units<br />
                    { (tutorial.price == 0) ? <span>FREE</span> : <span>${TextUtils.numberWithCommas(tutorial.price)}</span> }
                    <br />
                </p>

                <p style={styles.paragraph} dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(tutorial.description) }}></p>

                <h3 style={styles.title}>{ (tutorial.price == 0) ? 'Units' : 'Preview' }</h3>
                <div className="accordion accordion-border clearfix" style={{borderTop:'none', background:'#FDFEFE'}}>
                    {
                        tutorial.posts.map((post, i) => {
                            return (
                                <div key={i} style={{borderTop:'1px solid #ddd'}}>
                                    <div className="acctitle">
                                        <i className="acc-closed icon-ok-circle"></i>
                                        <i className="acc-open icon-remove-circle"></i>
                                        {post.title}
                                    </div>

                                    <div className="acc_content clearfix" style={styles.paragraph}>
                                        {post.description}<br />
                                        { (post.youtube == null) ? null : 
                                            <object style={localStyle.youtube} data={'https://www.youtube.com/embed/'+post.youtube}></object>                                    
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                { cta }              

			</div>
		)
	}
}

const premium = (user, context) => {
    return (
        <div className="topmargin" style={{marginBottom:0}}>
            <div className="col_half col_last">
                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>Premium <span>Member</span></h4>
                </div>

                <p style={styles.paragraph}>
                    As a premium member, you can subscribe to this tutorial for free by clicking below:
                </p>
                <a href="#" onClick={context.subscribe.bind(context)} className="button button-small button-circle button-border button-aqua">Subscribe</a>
            </div>
        </div>
    )    
}

const subscribed = (tutorial) => {
    return (
        <div className="topmargin" style={{marginBottom:0}}>
            <div className="col_half col_last">
                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>Subscribed</h4>
                </div>

                <p style={styles.paragraph}>
                    You are subscribed to this tutorial series. To access all of the videos and code samples, 
                    click on the link below:
                </p>
                <a target="_blank" href={tutorial.link} className="button button-small button-circle button-border button-aqua">Download</a>
            </div>
        </div>
    )
}

const purchase = (tutorial, context) => {
    return (
        <div className="topmargin" style={{marginBottom:0}}>
            { (tutorial.price == 0) ? null : 
                (
                    <div className="col_half">
                        <div className="heading-block fancy-title nobottomborder title-bottom-border">
                            <h4 style={styles.title}>Purchase</h4>
                        </div>
                        <p style={styles.paragraph}>
                            Purchase this tutorial for ${tutorial.price} and receive all videos, code samples and 
                            access to the forum where people post questions and answers. 
                            <br /><br />
                        </p>
                        <a onClick={context.showStripeModal.bind(context, 'subscription')} href="#" className="button button-small button-circle button-border button-aqua">Subscribe</a>
                    </div>
                )
            }

            <div className="col_half col_last">
                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>Premium <span>Membership</span></h4>
                </div>

                <p style={styles.paragraph}>
                    Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, 
                    code samples, and forums on the site. There are no long term commitments and membership 
                    can be canceled at any time.
                </p>
                <a onClick={context.showStripeModal.bind(context, 'subscription')} href="#" className="button button-small button-circle button-border button-aqua">Subscribe</a>
            </div>
        </div> 
    )
}

const localStyle = {
    youtube: {
        background:'#fff',
        padding:3,
        border:'1px solid #ddd',
        width:'50%',
        float:'none',
        clear:'both',
        margin:'4px auto'
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
        register: (params) => dispatch(actions.register(params)),
        login: (params) => dispatch(actions.login(params)),
        fetchTutorials: (params) => dispatch(actions.fetchTutorials(params)),
        updateTutorial: (tutorial, params) => dispatch(actions.updateTutorial(tutorial, params)),
        toggleLoading: (loading) => dispatch(actions.toggleLoading(loading))
    }
}

export default connect(stateToProps, dispatchToProps)(Tutorial)
