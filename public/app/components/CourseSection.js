import React, { Component } from 'react'

class CourseSection extends Component {

	render(){

		return (
			<div className="entry clearfix">
				<div className="entry-timeline">
					Unit<span>{this.props.unit.index+1}</span>
					<div className="timeline-divider"></div>
				</div>
				<div className="entry-image">
					<div className="panel panel-default">
						<div className="panel-body" style={{padding:36}}>
							<h2>{this.props.unit.topic}</h2>
							<hr />
							{this.props.unit.description}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CourseSection