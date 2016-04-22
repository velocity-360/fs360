import React, { Component } from 'react'

class Post extends Component {
	constructor(props, context){
		super(props, context)
	}

	render(){
		return (
			<div className="entry clearfix">
				<div className="entry-image">
					<img style={{border:'1px solid #ddd'}} className="image_fade" src={'https://media-service.appspot.com/site/images/'+this.props.post.image+'?crop=260'} alt="FullStack 360" />
				</div>
				<div className="entry-c">
					<div className="entry-title">
						<h2>
							<a href="blog-single.html">{this.props.post.title}</a>
						</h2>
					</div>
					<ul className="entry-meta clearfix">
						<li><i className="icon-calendar3"></i> 10th February 2014</li>
						<li><a href="#"><i className="icon-user"></i> {this.props.post.profile.name}</a></li>
						<li><a href="blog-single.html#comments"><i className="icon-comments"></i> {this.props.post.numReplies} comments</a></li>
					</ul>
					<div className="entry-content">
						<div className="panel panel-default">
							<div className="panel-body">
								{this.props.post.text}
							</div>
						</div>
					</div>
				</div>

				<hr style={{padding:12}} />

			</div>

		)

	}

}

export default Post