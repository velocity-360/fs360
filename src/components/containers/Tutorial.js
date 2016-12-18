import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { TextUtils } from '../../utils'

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
                    { (tutorial.price == 0) ? null : <span>${TextUtils.numberWithCommas(tutorial.price)}</span> }
                    <br />
                </p>

                <p style={styles.paragraph}>
                    {tutorial.description}
                </p>

                <h3 style={styles.title}>Units</h3>
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
                                    <div className="acc_content clearfix" style={styles.paragraph}>{post.description}</div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="topmargin" style={{marginBottom:0}}>
                    <div className="col_half">
                        <div className="heading-block fancy-title nobottomborder title-bottom-border">
                            <h4 style={styles.title}>Purchase</h4>
                        </div>
                        <p style={styles.paragraph}>
                            To secure a spot in the next class, submit a deposit below. If the class does not run for 
                            any reason, the deposit will be fully refunded. The first payment installment is due on the 
                            first day of class.
                            <br /><br />
                            <a onClick={this.showPaypal.bind(this)} href="#register" className="btn btn-success">Submit Deposit</a>
                        </p>
                    </div>

                    <div className="col_half col_last">
                        <div className="heading-block fancy-title nobottomborder title-bottom-border">
                            <h4 style={styles.title}>Membership</h4>
                        </div>
                        <p style={styles.paragraph}>
                            Submit the full tution today to receive a $200 discount. If the class does not run for 
                            any reason, your payment will be fully refunded.
                            <br /><br />
                            <a onClick={this.showPaypal.bind(this)} href="#" className="btn btn-success">Full Tution</a>
                        </p>
                    </div>
                </div>                

			</div>
		)
	}
}

const stateToProps = (state) => {
    return {
        tutorials: state.tutorial
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchTutorials: (params) => dispatch(actions.fetchTutorials(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Tutorial)
