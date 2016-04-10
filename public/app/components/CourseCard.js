import React, { Component } from 'react'


class CourseCard extends Component {

	render(){
		return (
			<div className="entry clearfix" style={{background:'#fff', border:'1px solid #ddd', marginBottom:24}}>
				<div className="entry-image">
					<img src="/images/events/thumbs/1.jpg" alt="Inventore voluptates velit totam ipsa tenetur" />
				</div>
				<div className="entry-c">
					<div className="entry-title">
						<h2><a href="#">iOS Development Course</a></h2>
					</div>
					<ul className="entry-meta clearfix">
						<li><a href="#"><i className="icon-time"></i> 11:00 - 19:00</a></li>
						<li><a href="#"><i className="icon-map-marker2"></i> Melbourne, Australia</a></li>
					</ul>
					<div className="entry-content">
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, voluptatem, dolorem animi nisi autem blanditiis enim culpa reiciendis et explicabo tenetur voluptate rerum molestiae eaque possimus exercitationem eligendi fuga.</p>
						<a href="/course/first-course" className="btn btn-danger">Learn More</a>
					</div>
				</div>
			</div>			
		)
	}

}

export default CourseCard