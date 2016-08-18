import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { Footer, Nav, RightSidebar } from '../../components'
import { TextUtils, DateUtils, api } from '../../utils'


class PostPage extends Component {
	constructor(props, context){
		super(props, context)
		this.toggleEditing = this.toggleEditing.bind(this)
		this.editPost = this.editPost.bind(this)
		this.state = {
			showLoader: false,
			isEditing: false
		}
	}

	componentDidMount(){
		if (this.props.posts[this.props.slug] != null)
			return
		
		const url = '/api/post?slug='+this.props.slug
		api.handleGet(url, null, (err, response) => {
			if (err){
				alert(response.message)
				return
			}

			store.currentStore().dispatch(actions.postsRecieved(response.posts))
		})
	}

	editPost(event){
		event.preventDefault()
		var post = this.props.posts[this.props.slug]
		if (post == null)
			return

		var updatedPost = Object.assign({}, post)
		updatedPost[event.target.id] = event.target.value
		store.currentStore().dispatch(actions.postEdited(updatedPost))
	}

	toggleEditing(event){
		event.preventDefault()
		if (this.state.isEditing == false){ 
			this.setState({isEditing: true})
			return
		}

		// commit changes
		var post = this.props.posts[this.props.slug]
		if (post == null)
			return

		var url = '/api/post/'+post.id
		api.handlePut(url, post, (err, response) => {
			if (err){
				alert(response.message)
				return
			}

			store.currentStore().dispatch(actions.postsRecieved([response.post]))
			this.setState({isEditing: false})
		})
	}

	render(){
		const post = this.props.posts[this.props.slug]
		var btnEdit = null

		if (this.state.isEditing == true){
			btnEdit = <div><button onClick={this.toggleEditing} className="button button-border button-dark button-rounded noleftmargin">Done</button></div>
		}
		else {
			if (this.props.currentUser.id != null){
				if (post.profile.id != null){
					if (this.props.currentUser.id == post.profile.id){ // author of post
						btnEdit = <div><button onClick={this.toggleEditing} className="button button-border button-dark button-rounded noleftmargin">Edit</button></div>
					}
				}

			}
		}

		var title = null
		var content = null
		var image = (post.image.length == 0) ? null : <img style={{border:'1px solid #ddd', background:'#fff', marginTop:12}} src={'https://media-service.appspot.com/site/images/'+post.image+'?crop=260'} alt="Velocity 360" />
		var video = (post.wistia.length == 0) ? null : <div className={'wistia_embed wistia_async_'+post.wistia+' videoFoam=true'} style={{height:100, width:178, marginTop:12}}>&nbsp;</div>

		if (this.state.isEditing == true) {
			title = (
				<div style={{padding:10.5}}>
					<input style={{border:'none', borderBottom:'1px solid #777', background:'#f5f5f5'}} type="text" id="title" onChange={this.editPost} placeholder="Title" value={post.title} />
					<br />
				</div>
			)

			content = (
				<div style={{background:'#fff', padding: 24}} className="panel-body">
					<textarea id="text" onChange={this.editPost} placeholder="Text" style={{padding:0, width:'100%', border:'1px solid #ddd', background:'#f9f9f9', minHeight:360}} className="panel-body">{post.text}</textarea>
				</div>
			)
		}
		else {
			title = (
				<div className="fancy-title title-bottom-border">
					<h2 style={{fontWeight:400}}>
						{post.title}
					</h2>
				</div>				
			)

			content = (
				<div style={{background:'#fff', padding: 24}}>
					<div style={{textAlign:'center'}}>
						{image}
					</div>

					<div dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(post.text) }} className="panel-body"></div>
					<div style={{width:'50%', minWidth:240}}>{video}</div>
				</div>
			)
		}

		var courses = this.props.courses.map(function(course, i){
			return (
                <div key={course.id} className="col-md-12 bottommargin">
                    <div className="team team-list clearfix">
                        <div className="team-image" style={{width: 150}}>
                            <img className="img-circle" src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=260'} alt="Velocity 360" />
                        </div>
                        <div className="team-desc">
                            <div className="team-title">
	                            <h4 style={{fontWeight:400}}><a href={'/course/'+course.slug}>{course.title}</a></h4>
	                            <span style={{color:'#444'}}>{course.dates}</span>
	                            <span style={{color:'#444'}}>{course.schedule}</span>
                            </div>
                            <div className="team-content">{course.description}</div>
                        </div>
                    </div>
                </div>
			)
		})

		return (
			<div className="clearfix">
				<Nav headerStyle="dark" />

				<section>
					<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
					<div className="content-wrap">
						<div className="container clearfix">

							<div className="col_two_third bottommargin-sm">
								{title}
								{btnEdit}

								<div className="entry-c">
									<div className="entry-content">
										<div className="panel panel-default" style={{background:'#f1f9f5'}}>

											<ul className="entry-meta clearfix" style={{paddingLeft:24, paddingTop:10, paddingBottom:16, borderBottom:'1px solid #eee'}}>
												<li><i className="icon-calendar3"></i> { DateUtils.formattedDate(post.timestamp) }</li>
												<li><a href="#"><i className="icon-user"></i> {post.profile.name}</a></li>
												<li><i className="icon-comments"></i> {post.numReplies} comments</li>
											</ul>

											{content}

										</div>
									</div>
								</div>
							</div>

							<div className="col_one_third bottommargin-sm hidden-xs col_last" style={{borderLeft: '1px solid #ddd', padding: 36}}>
								<RightSidebar />
							</div>			


						</div>
					</div>
				</section>

				<section style={{background:'#f9f9f9', paddingTop:48, borderTop:'1px solid #ddd'}}>
					<div className="heading-block center">
						<h2 style={{fontWeight:400}}>Bootcamps</h2>
					</div>

					<div className="content-wrap" style={{paddingTop:0}}>
						<div className="container clearfix">
			               	{courses}
						</div>
					</div>
				</section>

				<Footer />
			</div>
		)

	}
}

const stateToProps = function(state) {
    return {
        currentUser: state.profileReducer.currentUser,
        loaderOptions: state.staticReducer.loaderConfig,
        posts: state.postReducer.posts,
        courses: state.courseReducer.courseArray
    }
}

export default connect(stateToProps)(PostPage)