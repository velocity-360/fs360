import React, { Component } from 'react'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'
import DateUtils from '../../utils/DateUtils'
import TextUtils from '../../utils/TextUtils'


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
		
		var url = '/api/post?slug='+this.props.slug
		api.handleGet(url, {}, function(err, response){
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
		var _this = this
		api.handlePut(url, post, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			store.currentStore().dispatch(actions.postsRecieved([response.post]))
			_this.setState({isEditing: false})
		})
	}

	render(){
		var post = this.props.posts[this.props.slug]
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
			title = <h1>{post.title}</h1>
			content = (
				<div style={{background:'#fff', padding: 24}} dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(post.text) }} className="panel-body"></div>
			)
		}


		return (
			<div style={{background:'#f5f5f5'}}>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Sidebar />

				<section id="content">
					<div className="content-wrap" style={{background:'#f5f5f5'}}>

						<div className="entry clearfix">
							<div className="container clearfix">
								<div className="heading-block center">
									{title}
									{btnEdit}
									<img style={{border:'1px solid #ddd', background:'#fff', marginTop:12}} src={'https://media-service.appspot.com/site/images/'+post.image+'?crop=260'} alt="Velocity 360" />
								</div>

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
        posts: state.postReducer.posts,
//        post: state.postReducer.postsArray[0],
        loaderOptions: state.staticReducer.loaderConfig
    }
}

export default connect(stateToProps)(PostPage)