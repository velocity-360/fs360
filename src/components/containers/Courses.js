import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { Preview } from '../view'

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
                <div className="heading-block topmargin-lg" style={{marginBottom:20}}>
                    <h2 style={styles.title}>Courses</h2>
                </div>

                <p style={styles.paragraph}>
                    Our live courses take place in New York City at our 28th Street and Park Avenue 
                    location. Taught by professional developers who currently work in the field, the courses 
                    are always up-to-date and maintain highly relevant curriculum. In addition, our classes 
                    are small (6-10 students) and personal.
                </p>
                
                <div id="posts" className="events small-thumbs">
                    { (this.props.courses == null) ? null :
                        this.props.courses.map((course, i) => {
                            return <Preview course={course} key={course.id} />
                        })
                    }
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
