import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './style'

class Preview extends Component {
	render(){
		const course = this.props.course
		return (
            <div className="entry clearfix" style={{borderBottom:'1px solid #EEE', marginBottom:24}}>
                <div className="entry-image hidden-sm" style={{width:120}}>
                    <a href="#">
                        <img style={{width:120}} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=320'} alt="Velocity 360" />
                    </a>
                </div>
                <div className="entry-c">
                    <div className="entry-title">
                        <h2 style={styles.title}><Link to={'/course/'+course.slug}>{course.title}</Link></h2>
                    </div>
                    <ul className="entry-meta clearfix" style={{borderTop:'1px solid #ddd', paddingTop:6}}>
                        <li>{course.dates}</li>
                    </ul>
                    <div className="entry-content">
	                    <Link style={{float:'right'}} to={'/course/'+course.slug} className="button button-small button-circle button-border button-aqua">Read More</Link>
                    </div>
                </div>
            </div>
		)
	}
}

export default Preview
