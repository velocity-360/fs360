import React, { Component } from 'react'

class ProjectCard extends Component {

	constructor(props, context){
		super(props, context)
	}

	render(){
		return (
			<div className="col-md-4 col-sm-6 bottommargin">
				<div className="ipost clearfix" style={{background:'#f9f9f9', border:'1px solid #ddd', padding:16}}>
					<div className="entry-image">
						<img style={{background:'#fff', border:'1px solid #ddd'}} className="image_fade" src={ 'https://media-service.appspot.com/site/images/'+this.props.project.image+'?crop=460' } alt="FullStack 360" />
					</div>
					<div className="entry-title">
						<h3>{ this.props.project.title }</h3>
						<hr />
					</div>
					<div className="entry-content">
						<p>{ this.props.project.description }</p>
					</div>
					<a style={{marginTop:16, marginBottom:12}} href="#" className="button button-border button-dark button-rounded noleftmargin">View</a>												
				</div>
			</div>

		)
	}

}

export default ProjectCard