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
		this.state = {
			showLoader: false,
			isEditing: false
		}
	}

	componentDidMount(){
		if (this.props.posts[this.props.slug] != null)
			return
		
		const url = '/api/post'
		api.handleGet(url, {slug:this.props.slug}, (err, response) => {
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

			store.currentStore().dispatch(actions.postsRecieved([response.post]))
			if (callback == null)
				return

			callback()
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
				<div style={{background:'#fff', padding: 24}} className="panel-body">
					<textarea id="text" onChange={this.editPost} placeholder="Text" style={{padding:0, width:'100%', border:'1px solid #ddd', background:'#f9f9f9', minHeight:360}} className="panel-body">{post.text}</textarea>
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
				<div>
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
				<div className="panel panel-default">
					<div className="panel-body" style={style.panelBody}>
						<h2 style={style.header}>{post.title}</h2>
					</div>
					<div dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(post.text) }} className="panel-body" style={{padding:36}}></div>
					<div style={{width:'50%', minWidth:240}}>{video}</div>
				</div>
			)		
		}

		var courses = this.props.courses.map(function(course, i){
			if (course.type != 'online'){
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
			}
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

								<aside style={{background:'#fff', minHeight:600, borderRight:'1px solid #ddd', textAlign:'center'}}>
									<nav style={{width:'100%'}}>
										<ul>
											<li style={{padding:24}}>
												<div style={{paddingTop:16}}>
													<a href="#newsletter">Newsletter</a>
													<p style={{marginBottom:16, fontSize:13}}>
														Sign up to our newsletter to stay informed about upcoming tutorials, events, and courses.
													</p>
							                        <input onChange={this.updateVisitor} id="name" type="name" style={style.input} className="custom-input" placeholder="Name" /><br />
							                        <input onChange={this.updateVisitor} id="email" type="email" style={style.input} className="custom-input" placeholder="Email" /><br />
													<a onClick={this.subscribe} href="#" style={{marginRight:12, color:'#fff'}} className="btn btn-info">Submit</a>
												</div>

											</li>
										</ul>
									</nav>
								</aside>

								<div className="content" style={{background:'#f9f9f9', paddingTop:22}}>

									<article id="misc" className="overview" style={style.article}>
										<div className="container">
											{btnEdit}
											{content}
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