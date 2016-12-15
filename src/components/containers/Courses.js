import React, { Component } from 'react'
import styles from './styles'

class Courses extends Component {
	render(){
        const style = styles.home
        
		return (
			<div>
                <div className="heading-block topmargin-lg" style={{marginBottom:20}}>
                    <h2 style={styles.title}>Courses</h2>
                </div>

                <p style={style.paragraph}>
                    Our live courses take place in New York City at our 28th Street and Park Avenue 
                    location. Taught by professional developers who currently work in the field, the courses 
                    are always up-to-date and maintain highly relevant curriculum. In addition, our classes 
                    are small (6-10 students) and personal.
                </p>

                <table style={{background:'#fff', border:'1px solid #ddd'}} className="table table-striped">
                    <thead>
                        <tr>
                            <td><strong>Course</strong></td>
                            <td><strong>Start Date</strong></td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="info"><td><a target="_blank" href="http://stackoverflow.com/research/developer-survey-2016#technology-trending-tech-on-stack-overflow">Full Stack Immersive</a></td><td>Jan 9th</td></tr>
                        <tr><td><a target="_blank" href="https://www.youtube.com/watch?v=sBzRwzY7G-k">Evening Immersive</a></td><td>Jan 9th</td></tr>
                        <tr className="info"><td><a target="_blank" href="https://blog.whoishiring.io/hacker-news-who-is-hiring-thread-part-3/#front endframeworks">Node & React Intro</a></td><td>Feb 7th</td></tr>
                    </tbody>
                </table>
                <img style={{padding:6, background:'#fff', border:'1px solid #ddd', width:70+'%'}} src="/images/node-react-1.jpg" alt="Velocity 360" />
                <br />
                <i style={style.paragraph}>* Node & React Intro Course, instructed by Roger Beaman.</i>
			</div>
		)
	}
}

export default Courses
