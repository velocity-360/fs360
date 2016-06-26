import React, { Component } from 'react'

class ProjectCard extends Component {

	constructor(props, context){
		super(props, context)
	}

	render(){
		var tags = this.props.project.tags.map(function(tag, i){
			return <a key={tag} style={{background:'#fff'}} href="#">{tag}</a>

		})

		return (
			<div className="col_one_third bottommargin-sm">
				<div className="widget clearfix" style={{borderRadius:2, padding:24, textAlign:'center', border:'1px solid #ddd', background:'#F9FCFF'}}>
					<h4>Featured App</h4>
					<img style={{width:128, border:'1px solid #ddd'}} src="/images/radius.png" alt="Velocity 360" />
					<h3 style={{marginBottom:6, marginTop:9}}>
						<a id="title" href="/project/123">{this.props.project.title}</a>
					</h3>
					<hr />
					<strong>iOS App</strong>
					<br />
					<p id="description">{this.props.project.description}</p>

					<div className="tagcloud">
						{tags}
					</div>
				</div>
			</div>

		)
	}

}

export default ProjectCard