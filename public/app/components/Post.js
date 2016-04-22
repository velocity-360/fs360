import React, { Component } from 'react'
import TextUtils from '../utils/TextUtils'
import DateUtils from '../utils/DateUtils'

class Post extends Component {
	constructor(props, context){
		super(props, context)
	}

	render(){
        var timestamp = new Date(this.props.post.timestamp);
        var date = DateUtils.formattedDate(timestamp)

		return (
			<div className="entry clearfix">
				<div className="entry-image">
					<img style={{border:'1px solid #ddd', background:'#fff'}} className="image_fade" src={'https://media-service.appspot.com/site/images/'+this.props.post.image+'?crop=260'} alt="FullStack 360" />
				</div>
				<div className="entry-c">
					<div className="entry-title">
						<h2>
							<a href={'/post/'+this.props.post.slug}>{this.props.post.title}</a>
						</h2>
					</div>
					<ul className="entry-meta clearfix">
						<li><i className="icon-calendar3"></i> {date}</li>
						<li><a href="#"><i className="icon-user"></i> {this.props.post.profile.name}</a></li>
						<li><a href="blog-single.html#comments"><i className="icon-comments"></i> {this.props.post.numReplies} comments</a></li>
					</ul>
					<div className="entry-content">
						<div className="panel panel-default">
							<div style={{padding: 16}} className="panel-body">
								{ TextUtils.truncateText(this.props.post.text, 260) }
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