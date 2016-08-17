import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Post from '../../components/Post'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../utils/APIManager'

class Feed extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.updatePost = this.updatePost.bind(this)
		this.submitPost = this.submitPost.bind(this)
		this.uploadImage= this.uploadImage.bind(this)
		this.state = {
			showLoader: false,
			showModal: false,
			post: {
				title: '',
				link: '',
				text: '',
				wistia: '',
				image: 'y_I3PXcQ'
			}
		}
	}

	componentDidMount(){
		if (this.props.posts.length > 0)
			return

		api.handleGet('/api/post', {}, (err, response) => {
			if (err){
				alert(response.message)
				return
			}

			store.currentStore().dispatch(actions.postsRecieved(response.posts))
		})
	}

	openModal(event){
		event.preventDefault()
		this.setState({
			showModal: true
		})
	}

	closeModal(){
		this.setState({
			showModal: false
		})
	}	

	uploadImage(files){
		this.setState({
			showLoader: true
		})

		api.upload(files[0], (err, response) => {
			this.setState({
				showLoader: false
			})

			if (err){
				alert(response.message)
				return
			}

			var post = Object.assign({}, this.state.post)
			post['image'] = response.id
			this.setState({
				post: post
			})
		})
	}

	updatePost(event){
		event.preventDefault()

		var post = Object.assign({}, this.state.post)
		post[event.target.id] = event.target.value
		this.setState({
			post: post
		})
	}

	submitPost(event){
		event.preventDefault()
		var post = Object.assign({}, this.state.post)

		if (this.props.currentUser.id != null){
			post['profile'] = {
				id: this.props.currentUser.id,
				image: this.props.currentUser.image,
				name: this.props.currentUser.username
			}
		}

		api.handlePost('/api/post', post, (err, response) => {
			if (err){
				alert(err)
				return
			}

			store.currentStore().dispatch(actions.postCreated(response.post))
			this.setState({
				showModal: false,
			})
		})
	}

	render(){
		var postList = this.props.posts.map(function(post){
			return <Post key={post.id} post={post} />
		})

		var btnSubmit = (this.props.currentUser.id == null) ? null : <a onClick={this.openModal} id="bootcamp" href="#" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">Submit Post</a>

		return (
			<div style={{background:'#f5f5f5'}}>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Sidebar />
				<section id="content">

					<div className="content-wrap" style={{background:'#f5f5f5'}}>

						<div className="container clearfix">
							<div className="heading-block center">
								<h1>Blog</h1>
								{btnSubmit}
							</div>

							<div className="postcontent nobottommargin clearfix">
								<div id="posts" className="small-thumbs">
									{postList}

								</div>
							</div>
						</div>

					</div>
				</section>
		        <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="large" >
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h3>Submit Post</h3>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<div className="row">
				        	<div className="col-md-6">
					        	<input onChange={this.updatePost} value={this.state.post.title} id="title" className="form-control" type="text" placeholder="Title" /><br />
					        	<input onChange={this.updatePost} value={this.state.post.link} id="link" className="form-control" type="text" placeholder="http://" /><br />
					        	<input onChange={this.updatePost} value={this.state.post.wistia} id="wistia" className="form-control" type="text" placeholder="Video" /><br />
					            <Dropzone style={{width:100+'%', marginBottom:24, background:'#fff', border:'1px dotted #ddd'}} onDrop={this.uploadImage}>
					              <div style={{padding:24}}>
					              	{
					              		(this.state.post.image.length == 0) ? null : <img style={{width:64, border:'1px solid #ddd', marginRight:6}} src={'https://media-service.appspot.com/site/images/'+this.state.post.image+'?crop=120'} />
					              	}
					              	
					              	Drop file here, or click to select image to upload.
					              </div>
					            </Dropzone>
				        	</div>

				        	<div className="col-md-6">
					        	<textarea onChange={this.updatePost} value={this.state.post.text} id="text" className="form-control" placeholder="Text" style={{minHeight:260}}></textarea><br />
				        	</div>
			        	</div>

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.submitPost} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
			        </Modal.Footer>
		        </Modal>


				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {

    return {
        currentUser: state.profileReducer.currentUser,
        posts: state.postReducer.postsArray,
        loaderOptions: state.staticReducer.loaderConfig
    }
}


export default connect(stateToProps)(Feed)