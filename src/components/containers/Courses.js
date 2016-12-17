import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'

class Courses extends Component {
    componentDidMount(){
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

                <table style={{background:'#fff', border:'1px solid #ddd'}} className="table table-striped">
                    <thead>
                        <tr>
                            <td><strong>Course</strong></td>
                            <td><strong>Dates</strong></td>
                        </tr>
                    </thead>

                    <tbody>
                        { (this.props.courses == null) ? null :
                            this.props.courses.map((course, i) => {
                                const className = (i==0) ? 'info' : ''
                                return (
                                    <tr key={course.id} className={className}>
                                        <td><Link to={'/course/'+course.slug}>{course.title}</Link></td>
                                        <td>{course.dates}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <img style={{padding:6, background:'#fff', border:'1px solid #ddd', width:70+'%'}} src="/images/node-react-1.jpg" alt="Velocity 360" />
                <br />
                <i style={styles.paragraph}>* Node & React Intro Course, instructed by Roger Beaman.</i>
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
