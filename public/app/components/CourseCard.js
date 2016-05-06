import React, { Component } from 'react'
import TextUtils from '../utils/TextUtils'


class CourseCard extends Component {

	render(){
		var units = null
		if (this.props.course.type == 'online')
			units = <li><i className="icon-video"></i> {this.props.course.units.length} Videos </li>
		else 
			units = <li><i className="icon-desktop"></i> {this.props.course.units.length} Sections </li>

		var tags = this.props.course.tags.map(function(tag, i){
			return <a style={{background:'#f9f9f9'}} href="#">{tag}</a>

		})

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
						{units}
						<li><i className="icon-star"></i> {this.props.course.level}</li>
					</ul>
					<hr />

					<div className="entry-content">
						<p>{ TextUtils.truncateText(this.props.course.description, 170) }</p>
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