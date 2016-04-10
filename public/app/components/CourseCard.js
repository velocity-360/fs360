import React, { Component } from 'react'
import TextUtils from '../utils/TextUtils'


class CourseCard extends Component {

	render(){
		return (
			<div className="entry clearfix" style={{background:'#fff', border:'1px solid #ddd', marginBottom:24}}>
				<div className="entry-image">
					<img style={{border:'1px solid #ddd'}} src={'https://media-service.appspot.com/site/images/'+this.props.course.image+'?crop=512'} alt="Inventore voluptates velit totam ipsa tenetur" />
				</div>
				<div className="entry-c">
					<div className="entry-title">
						<h2><a style={{color:'#1ABC9C'}} href={'/course/'+this.props.course.slug}>{this.props.course.title}</a></h2>
					</div>
					<ul className="entry-meta clearfix">
						<li><i className="icon-time"></i> {this.props.course.units.length} Videos</li>
						<li><i className="icon-map-marker2"></i> Melbourne, Australia</li>
					</ul>
					<hr />
					<div className="entry-content">
						<p>{ TextUtils.truncateText(this.props.course.description, 220) }</p>
					</div>

				</div>
			</div>			
		)
	}

}

export default CourseCard