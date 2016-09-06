import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import Dropzone from 'react-dropzone'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { Footer, Nav } from '../../components'
import { TextUtils, DateUtils, api } from '../../utils'


class PostPage extends Component {
	constructor(props, context){
		super(props, context)
		this.toggleEditing = this.toggleEditing.bind(this)
		this.uploadImage = this.uploadImage.bind(this)
		this.editPost = this.editPost.bind(this)
		this.updatePost = this.updatePost.bind(this)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.state = {
			showLoader: false,
			isEditing: false,
			visitor: {
				name: '',
				email: ''
			}
		}
	}

	componentDidMount(){
		const url = '/api/post'
		api.handleGet(url, {limit:3, isPublic:'yes'}, (err, response) => {
			if (err){
				alert(response.message)
				return
			}

			store.currentStore().dispatch(actions.postsRecieved(response.posts))

		})
	}

	uploadImage(files){
		this.setState({showLoader: true})

		api.upload(files[0], (err, response) => {
			this.setState({
				showLoader: false
			})

			if (err){
				alert(response.message)
				return
			}

			const post = this.props.posts[this.props.slug]
			var updatedPost = Object.assign({}, post)
			updatedPost.images.push(response.id)
			this.updatePost(post, null)
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

		this.updatePost(post, () => {
			this.setState({isEditing: false})
		})
	}

	updatePost(post, callback){
		var url = '/api/post/'+post.id
		api.handlePut(url, post, (err, response) => {
			if (err){
				alert(response.message)
				return
			}

			store.currentStore().dispatch(actions.postEdited(response.post))
			if (callback == null)
				return

			callback()
		})
	}

	updateVisitor(event){
		var updatedVisitor = Object.assign({}, this.state.visitor)
		updatedVisitor[event.target.id] = event.target.value
		this.setState({
			visitor: updatedVisitor
		})		
	}

	subscribe(event){
		event.preventDefault()
		if (this.state.visitor.name.length == 0){
			alert('Please enter your name.')
			return
		}

		if (this.state.visitor.email.length == 0){
			alert('Please enter your email.')
			return
		}

		this.setState({showLoader: true})

		var s = Object.assign({}, this.state.visitor)
		var parts = s.name.split(' ')
		s['firstName'] = parts[0]
		if (parts.length > 1)
			s['lastName'] = parts[parts.length-1]

		const post = this.props.posts[this.props.slug]
		s['source'] = post.title
		
		s['subject'] = 'New Subscriber'
		s['confirmation'] = 'Thanks for subscribing! Stay tuned for more tutorials, events and upcoming courses!'
		api.handlePost('/account/subscribe', s, (err, response) => {
			this.setState({showLoader: false})

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
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
		var upload = null
		var upcoming = null
		var image = (post.image.length == 0) ? null : <img style={{border:'1px solid #ddd', background:'#fff', marginTop:12}} src={'https://media-service.appspot.com/site/images/'+post.image+'?crop=260'} alt="Velocity 360" />
		var video = (post.wistia.length == 0) ? null : <div className={'wistia_embed wistia_async_'+post.wistia+' videoFoam=true'} style={{height:100, width:178, marginTop:12}}>&nbsp;</div>

		if (this.state.isEditing == true) {
			title = (
				<div style={{padding:10.5}}>
					<input style={{border:'none', borderBottom:'1px solid #777', background:'#f5f5f5'}} type="text" id="title" onChange={this.editPost} placeholder="Title" value={post.title} /><br />
					<input style={{border:'none', borderBottom:'1px solid #777', background:'#f5f5f5'}} type="text" id="isPublic" onChange={this.editPost} placeholder="Public" value={post.isPublic} /><br />
				</div>
			)

			content = (
				<div className="panel panel-default">
					<div className="panel-body" style={style.panelBody}>
						<textarea id="text" onChange={this.editPost} placeholder="Text" style={{padding:0, width:'100%', border:'1px solid #ddd', background:'#f9f9f9', minHeight:360}} className="panel-body">{post.text}</textarea>
					</div>
				</div>
			)

			const images = post.images.map((image, i) => {
				return (
					<div key={image} className="col-md-4">
						<div style={{padding:4}}>
							<img src={'https://media-service.appspot.com/site/images/'+image+'?crop=260'} />
						</div>
					</div>
				)
			})

			upload = (
				<div className="panel panel-default" style={{marginTop:24}}>
					<div className="panel-body" style={style.panelBody}>
		                <div className="col_half">
				            <Dropzone style={{width:100+'%', marginBottom:24, background:'#f9f9f9', border:'1px solid #ddd'}} onDrop={this.uploadImage}>
				              <div style={{padding:24}}>
				              	Upload Images Here.
				              </div>
				            </Dropzone>
		                </div>

		                <div className="col_half col_last">
	                		<div className="row">
	                			{images}
	                		</div>
		                </div>

					</div>
				</div>
			)
		}
		else {
			content = (
				<div className="panel panel-default">
					<div className="panel-body" style={style.panelBody}>
						<h2 style={style.header}>{post.title}</h2>
					</div>
					<div dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(post.text) }} className="panel-body" style={{padding:36}}></div>
					<div style={{width:'50%', minWidth:240}}>{video}</div>
				</div>
			)

			const courses = this.props.courses.map((course, i) => {
				if (course.type != 'online'){
					return (
						<div key={course.id} className="col-md-4">
							<div style={{width:92+'%', margin:'auto', background:'#f9f9f9', border:'1px solid #ddd', textAlign:'center', padding:16, marginBottom:32}}>
								<img style={{width:100, borderRadius:50, marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=460'} />
								<div className="fancy-title title-bottom-border">
									<h3 style={{fontWeight:400}}>
										<a style={{color:'#444'}} href={'/course/'+course.slug}>{course.title}</a>
									</h3>
								</div>
								<h5 style={{marginBottom:0, fontWeight:200}}>
									{course.dates}
								</h5>
							</div>
						</div>
					)
				}
			})			

			upcoming = (
				<div className="panel panel-default">
					<div className="panel-body" style={style.panelBody}>
						<h2 style={style.header}>Upcoming Courses</h2>
						<hr />
						{courses}
					</div>
				</div>
			)

		}

		const recentPosts = this.props.postsArray.map((recentPost, i) => {
			const image = (recentPost.image.indexOf('http') == -1) ? 'https://media-service.appspot.com/site/images/'+recentPost.image+'?crop=128' : recentPost.image
			const link = (recentPost.link.length == 0) ? '/post/'+recentPost.slug : recentPost.link
			return (
				<div key={recentPost.id} className="clearfix" style={{marginTop:16, lineHeight:'4px'}}>
					<img style={style.icon} src={image} />
					<a href={link} style={{color:'#444'}}>{TextUtils.truncateText(recentPost.title, 28)}</a><br />
					<span style={{fontSize:12, color:'#999'}}>{recentPost.profile.name}</span>
				</div>
			)
		})

		return (
			<div id="wrapper" className="clearfix" style={{background:'#f9f9f9'}}>
				<Nav headerStyle="dark" />
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />

				<section>
					<div className="content-wrap">
						<div id="lpf-content">
							<main>
								<div className="aside-toggle">
									<div></div>
								</div>

								<aside style={{background:'#fff', minHeight:750, borderRight:'1px solid #ddd'}}>
									<nav style={{width:'100%', padding:32}}>
										<h4 style={{marginBottom:0}}>Recent Posts</h4>
										<hr style={{marginTop:6}} />
										{recentPosts}

										<div style={{padding:20, background:'#f9f9f9', marginTop:24}}>
											<a href="#newsletter">Newsletter</a>
											<p style={{marginBottom:16, fontSize:13}}>
												Sign up to our newsletter to stay informed about upcoming tutorials, events, and courses.
											</p>
					                        <input onChange={this.updateVisitor} id="name" type="name" style={style.input} className="custom-input" placeholder="Name" /><br />
					                        <input onChange={this.updateVisitor} id="email" type="email" style={style.input} className="custom-input" placeholder="Email" /><br />
											<a onClick={this.subscribe} href="#" style={{marginRight:12, color:'#fff'}} className="btn btn-info">Submit</a>
										</div>
									</nav>
								</aside>

								<div className="content" style={{background:'#f9f9f9', paddingTop:22}}>
									<article id="misc" className="overview" style={style.article}>
										<div className="container">
											{btnEdit}
											{title}
											{content}
											{upload}

											<br /><br />

											{upcoming}
										</div>
									</article>
								</div>
							</main>
						</div>
					</div>

				</section>

			</div>
		)

	}
}

const style = {
	header: {
		marginBottom:0,
		marginTop:0,
	},

	panelBody: {
		padding:36,
		borderBottom:'1px solid #ddd'
	},
	sidebar: {
		padding:16,
		background:'#fff',
		border:'1px solid #ddd'
	},
	input: {
		borderRadius:'0px !important',
		background:'#FEF9E7'
	},
	article: {
		marginTop: 40
	},
	icon: {
		float:'left',
		width:42,
		height:42,
		borderRadius:21,
		marginRight:12
	}
}

const stateToProps = function(state) {
    return {
        currentUser: state.profileReducer.currentUser,
        loaderOptions: state.staticReducer.loaderConfig,
        posts: state.postReducer.posts,
        postsArray: state.postReducer.postsArray,
        courses: state.courseReducer.courseArray
    }
}

export default connect(stateToProps)(PostPage)