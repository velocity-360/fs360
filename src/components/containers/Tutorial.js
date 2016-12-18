import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { TextUtils } from '../../utils'
import { Login, Account } from '../view'

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

    showPaypal(event){
        event.preventDefault()
        const course = this.props.courses[this.props.slug]
        if (course.discountPaypalLink.length == 0){ // no discount code
            window.open(course.paypalLink, 'Velocity 360', 'width=650,height=900')
            return
        }

        // const promoCode = this.state.promoCode.trim()
        // if (promoCode.length == 0){
        //     window.open(course.paypalLink, 'Velocity 360', 'width=650,height=900')
        //     return
        // }

        // if (course.promoCodes.indexOf(promoCode) == -1){
        //     window.open(course.paypalLink, 'Velocity 360', 'width=650,height=900')
        //     return
        // }

        // successful promo code
//        window.open(course.discountPaypalLink, 'Velocity 360', 'width=650,height=900')
    }

    sendCredentials(visitor, mode){
//        console.log('SEND CREDENTIALS: '+JSON.stringify(visitor)+', '+mode)

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

	render(){
        const tutorial = this.props.tutorials[this.props.slug]
        const style = styles.home

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

                <p style={styles.paragraph} dangerouslySetInnerHTML={{__html: tutorial.description }}></p>

                <h3 style={styles.title}>Preview</h3>
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
                                            <object style={localStyle.youtube} data={'https://www.youtube.com/embed/'+post.youtube} allowfullscreen></object>                                    
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

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
                                    <a onClick={this.showPaypal.bind(this)} href="#register" className="btn btn-success">Submit Deposit</a>
                                </p>
                            </div>
                        )
                    }

                    <div className="col_half col_last">
                        <div className="heading-block fancy-title nobottomborder title-bottom-border">
                            <h4 style={styles.title}>Membership</h4>
                        </div>

                        { (this.props.currentUser) ? <Account currentUser={this.props.currentUser} /> : (
                            <div>
                                <p style={styles.paragraph}>
                                    Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, 
                                    code samples, and forums on the site. There are no long term commitments and membership 
                                    can be canceled at any time.
                                </p>
                                <Login onSubmit={this.sendCredentials.bind(this)} />
                            </div>
                        )}

                    </div>
                </div>                

			</div>
		)
	}
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
        register: (params) => dispatch(actions.register(params)),
        login: (params) => dispatch(actions.login(params)),
        fetchTutorials: (params) => dispatch(actions.fetchTutorials(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Tutorial)
