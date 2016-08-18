import React, { Component } from 'react'
import { TextUtils, DateUtils } from '../utils'

class Post extends Component {
	constructor(props, context){
		super(props, context)
	}

	render(){
		const post = this.props.post
        const timestamp = new Date(post.timestamp)
        const date = DateUtils.formattedDate(timestamp)
        const image = (post.image.indexOf('http') == -1) ? 'https://media-service.appspot.com/site/images/'+post.image+'?crop=260' : post.image
        const link = (post.link.length == 0) ? <a href={'/post/'+post.slug}>{post.title}</a> : <a target="_blank" href={post.link}>{post.title}</a>

		return (
			<div className="entry clearfix">
				<div className="entry-image">
					<img style={{border:'1px solid #ddd', background:'#fff', width:220}} className="image_fade" src={image} alt="Velocity 360" />
				</div>
				<div className="entry-c">
					<div className="entry-title">
						<h2>{link}</h2>
					</div>
					<ul className="entry-meta clearfix">
						<li><i className="icon-calendar3"></i> {date}</li>
						<li><a href="#"><i className="icon-user"></i> {post.profile.name}</a></li>
						<li><a href="blog-single.html#comments"><i className="icon-comments"></i> {post.numReplies} comments</a></li>
					</ul>
					<div className="entry-content">
						<div className="panel panel-default">
							<div style={{padding: 16}} className="panel-body">
								{ TextUtils.truncateText(post.text, 260) }
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