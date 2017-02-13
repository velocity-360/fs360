import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { Preview, Section } from '../view'

class Courses extends Component {
    componentDidMount(){
        window.scrollTo(0, 0)
        if (this.props.courses == null)
            this.props.fetchCourses(null)
    }

	render(){
        const style = styles.home

		return (
			<div>
                <div className="parallax-window" id="booking" data-parallax="scroll" data-image-src="/img/girl.jpg" data-natural-width="1400" data-natural-height="550">
                    <div className="promo_full_wp">
                        <div style={{paddingTop:164}}>
                            <h3>
                                Upcoming Courses
                                <span>Learn Node, React, and Redux in<br />Our Part Time Evening Courses</span>
                            </h3>
                            <button style={{height:36, borderRadius:18}} className="btn_1 white">Learn More</button>
                        </div>
                    </div>
                </div>

                { (this.props.courses == null) ? null :
                    this.props.courses.map((course, i) => {
                        return <Preview course={course} key={course.id} />
                    })
                }

                <div className="container margin_60">
                    <div className="row">
                        <div className="col-md-5 col-md-offset-1 col-md-push-5">
                            <figure className="room_pic left">
                                <a href="#"><img src="/img/girls.jpg" alt="Velocity 360" className="img-responsive" /></a>
                            </figure>
                        </div>
                        <div className="col-md-4 col-md-offset-1 col-md-pull-6">
                            <div className="room_desc_home">
                                <h3>Complete Explanations</h3>
                                <p>
                                    Our live courses take place in New York City at our 28th Street and Park Avenue 
                                    location. Taught by professional developers who currently work in the field, the courses 
                                    are always up-to-date and maintain highly relevant curriculum. In addition, our classes 
                                    are small (6-10 students) and personal.
                                </p>
                                <ul>
                                    <li>
                                        <div className="tooltip_styled tooltip-effect-4">
                                            <span className="tooltip-item"><i className="icon-chat"></i></span>
                                            <div className="tooltip-content">
                                                Live Forum
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="tooltip_styled tooltip-effect-4">
                                            <span className="tooltip-item"><i className="icon-meetup"></i></span>
                                            <div className="tooltip-content">
                                                Events in NYC
                                            </div>
                                        </div>
                                    </li>
                                </ul>
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
        courses: state.course.all
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchCourses: (params) => dispatch(actions.fetchCourses(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Courses)
