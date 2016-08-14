import React, { Component } from 'react'
import TextUtils from '../utils/TextUtils'


class CourseCard extends Component {

	render(){
		const course = this.props.course
		var units = null
		if (course.type == 'online')
			units = <li><i className="icon-video"></i> {course.units.length} Videos </li>
		else 
			units = <li><i className="icon-desktop"></i> {course.units.length} Sections </li>

		var tags = course.tags.map(function(tag, i){
			return <a key={i} style={{background:'#f9f9f9'}} href="#">{tag}</a>

		})

		var url = (course.type == 'online') ? '/video/'+course.slug : '/course/'+course.slug

		return (
			<div className="entry clearfix" style={{background:'#fff', border:'1px solid #ddd', marginBottom:24}}>
				<div className="entry-image">
					<img style={{border:'1px solid #ddd'}} src={'https://media-service.appspot.com/site/images/'+this.props.course.image+'?crop=512'} alt="Inventore voluptates velit totam ipsa tenetur" />
				</div>
				<div className="entry-c">
					<div className="entry-title">
						<h2><a style={{color:'#1ABC9C'}} href={url}>{course.title}</a></h2>
					</div>
					<ul className="entry-meta clearfix">
						{units}
						<li><i className="icon-star"></i> {course.level}</li>
					</ul>
					<hr style={{marginBottom:10}} />

					<div className="entry-content">
						<p style={{marginBottom:20}}>{ TextUtils.truncateText(course.description, 170) }</p>
						<div className="tagcloud">
							{tags}
						</div>
					</div>

				</div>
			</div>			
		)
	}

}

export default CourseCard