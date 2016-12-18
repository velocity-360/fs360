import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { TextUtils } from '../../utils'

class Course extends Component {
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
        const course = this.props.courses[this.props.slug]
//        console.log('COURSE: '+JSON.stringify(course))

        const style = styles.home

		return (
			<div>
                <div className="heading-block topmargin-lg" style={{marginBottom:20}}>
                    <h2 style={styles.title}>{course.title}</h2>
                </div>

                <p style={{fontFamily:'Pathway Gothic One', fontSize:18+'px', fontWeight:400}}>
                    <img style={{float:'right', width:180, border:'1px solid #ddd', background:'#fff', padding:3, marginLeft:12, marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=320'} />
                    {course.dates}<br />
                    ${ TextUtils.numberWithCommas(course.tuition) }
                    <br />
                </p>
                <p style={styles.paragraph} dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(course.description) }}></p>

                <div className="postcontent clearfix topmargin">
                    <h3 style={styles.title}>Curriculum</h3>
                    <div id="posts" className="post-timeline clearfix">
                        <div className="timeline-border"></div>
                        {
                            course.units.map((unit, i) => {
                                return (
                                    <div key={i} className="entry clearfix" style={{border:'none'}}>
                                        <div className="entry-timeline">
                                            Unit<span>{i+1}</span>
                                            <div className="timeline-divider"></div>
                                        </div>
                                        <div className="panel panel-default" style={{maxWidth:500, boxShadow:'none', background:'#FDFEFE'}}>
                                            <div className="panel-body" style={{padding:24}}>
                                                <h3 style={styles.title}>{unit.topic}</h3>
                                                <hr />
                                                <p style={styles.paragraph}>{unit.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="topmargin" style={{marginBottom:0}}>
                    <div className="col_half">
                        <div className="heading-block fancy-title nobottomborder title-bottom-border">
                            <h4 style={styles.title}>Submit <span>Deposit</span></h4>
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
                            <h4 style={styles.title}>Full <span>Tuition</span></h4>
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
        courses: state.course
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchCourses: (params) => dispatch(actions.fetchCourses(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Course)
