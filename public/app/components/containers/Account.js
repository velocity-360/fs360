import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Loader from 'react-loader'
import store from '../../stores/store'
import actions from '../../actions/actions'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import ProjectCard from '../../components/ProjectCard'
import api from '../../api/api'


class Account extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.updateProject = this.updateProject.bind(this)
		this.uploadImage = this.uploadImage.bind(this)
		this.submitProject = this.submitProject.bind(this)
		this.updateProfile = this.updateProfile.bind(this)
		this.updateCurrentUser = this.updateCurrentUser.bind(this)
		this.state = {
			showLoader: false,
			showModal: false,
			selectedProject: null,
			project: {
				title: '',
				description: '',
				image: 'tHyPScSk', // blue logo
				link: '',
				tagString: ''
			}
		}
	}

	componentDidMount(){

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

		var _this = this
		api.upload(files[0], function(err, response){
			_this.setState({
				showLoader: false
			})

			if (err){
				alert(response.message)
				return
			}

			var project = Object.assign({}, _this.state.project)
			project['image'] = response.id
			_this.setState({
				project: project
			})

		})
	}

	updateProject(event){
		event.preventDefault()
		var proj = Object.assign({}, this.state.project)
		proj[event.target.id] = event.target.value
		this.setState({
			project: proj
		})
	}
	

	submitProject(event){
		event.preventDefault()
		var proj = Object.assign({}, this.state.project)

		var t = this.state.project.tagString.split(',')
		var tags = []
		for (var i=0; i<t.length; i++){
			var tag = t[i]
			if (tag.length == 0)
				continue

			tags.push(tag.trim())
		}

		proj['tags'] = tags
		proj['profile'] = {
			id: this.props.profile.id,
			image: this.props.profile.image,
			name: this.props.profile.username
		}

		this.setState({
			showLoader: true
		})

		api.handlePost('/api/project', proj, function(err, response){
			if (err){
				alert(response.message)
				return
			}

//			console.log('PROJECT CREATED: '+JSON.stringify(response))
			window.location.href = '/project/'+response.project.slug
		})
	}

	updateCurrentUser(event){
//		console.log('updateCurrentUser: '+event.target.id)
		event.preventDefault()
		var updatedUser = Object.assign({}, this.props.profile);
		updatedUser[event.target.id] = event.target.value
		store.dispatch(actions.updateCurrentUser(updatedUser));
	}


	updateProfile(event){
		event.preventDefault()

		var endpoint = '/api/profile/'+this.props.profile.id
		api.handlePut(endpoint, this.props.profile, function(err, response){
			if (err){
				alert(response.message)
				return
			}
			
			store.dispatch(actions.currentUserRecieved(response.profile));
			alert('Profile Updated')
		})
	}

	render(){

		var projectList = null
		if (this.props.projects != null){
			projectList = this.props.projects.map(function(project, i){
				return <ProjectCard key={project.id} project={project} />
			})
		}

		return (

			<div>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Sidebar />

				<section id="content">
					<div className="content-wrap">
						<div className="container clearfix">
							<div className="postcontent nobottommargin clearfix">	

								<div className="tabs clearfix" id="tab-1">

									<ul className="tab-nav clearfix">
										<li><a href="#tabs-2">Account</a></li>
										<li><a href="#tabs-4">Portfolio</a></li>
									</ul>

									<div className="tab-container">
										<div className="tab-content clearfix" id="tabs-2">

											 <div id="contact-form-overlay" className="clearfix">
							                    <div id="contact-form-result" data-notify-type="success" data-notify-msg="<i className=icon-ok-sign></i> Message Sent Successfully!"></div>

							                    <form className="nobottommargin" id="template-contactform" name="template-contactform" action="" method="post">

							                        <div className="col_half">
							                            <label>First Name</label>
							                            <input type="text" onChange={this.updateCurrentUser} id="firstName" value={this.props.profile.firstName} className="form-control" />
							                        </div>

							                        <div className="col_half col_last">
							                            <label>Last Name</label>
							                            <input type="text" onChange={this.updateCurrentUser} id="lastName" value={this.props.profile.lastName}  className="form-control" />
							                        </div>

							                        <div className="clear"></div>

							                        <div className="col_half">
							                            <label>Username</label>
							                            <input type="text" onChange={this.updateCurrentUser} id="username" value={this.props.profile.username}  className="form-control" />
							                        </div>

							                        <div className="col_half col_last">
							                            <label>GitHub</label>
							                            <input type="text" onChange={this.updateCurrentUser} id="githubId" value={this.props.profile.githubId} className="form-control" placeholder="e.g. https://github.com/fullstack360" />
							                        </div>

							                        <div className="clear"></div>

							                        <div className="col_full">
							                            <label for="template-contactform-message">Bio <small>*</small></label>
							                            <textarea className="form-control" onChange={this.updateCurrentUser} id="bio" value={this.props.profile.bio} rows="6" cols="30"></textarea>
							                        </div>

							                        <div className="col_full hidden">
							                            <input type="text" id="template-contactform-botcheck" name="template-contactform-botcheck" value="" className="sm-form-control" />
							                        </div>

							                        <div className="col_full">
							                            <button onClick={this.updateProfile} className="button button-border button-dark button-rounded noleftmargin" type="submit">Update</button>
							                        </div>
							                    </form>

							                </div>

										</div>
										<div className="tab-content clearfix" id="tabs-4">
											{ (this.props.profile.id == null) ? 
												null : <a style={{marginRight:12, marginBottom:24}} onClick={this.openModal} href="#" className="button button-border button-dark button-rounded noleftmargin">Add Project</a>												
											}

											<div className="row">
												{ projectList }
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>


				</section>


		        <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="large" >
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h3>Project</h3>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<div className="row">
				        	<div className="col-md-6">
					        	<input onChange={this.updateProject} id="title" value={this.state.project.title} className="form-control" type="text" placeholder="Title" /><br />
					        	<input onChange={this.updateProject} id="link" value={this.state.project.link} className="form-control" type="text" placeholder="http://" /><br />
					        	<input onChange={this.updateProject} id="tagString" value={this.state.project.tagString} className="form-control" type="text" placeholder="Python, iOS, JavaScript, etc." /><br />
					            <Dropzone style={{width:100+'%', marginBottom:24, background:'#fff', border:'1px dotted #ddd'}} onDrop={this.uploadImage}>
					              <div style={{padding:24}}>
					              	{ (this.state.project.image.length == 0) ? null : <img style={{width:64, border:'1px solid #ddd', marginRight:6}} src={'https://media-service.appspot.com/site/images/'+this.state.project.image+'?crop=120'} /> }
					              	Drop file here, or click to select image to upload.
					              </div>
					            </Dropzone>
				        	</div>

				        	<div className="col-md-6">
					        	<textarea onChange={this.updateProject} id="description" value={this.state.project.description} className="form-control" placeholder="Text" style={{minHeight:260}}></textarea><br />
				        	</div>
			        	</div>

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.submitProject} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
			        </Modal.Footer>
		        </Modal>

				<Footer />
			</div>
		)
	}

}

const stateToProps = function(state){
	var currentUser = state.profileReducer.currentUser
	var projectsArray = state.projectReducer.projectsArray

	if (projectsArray==null && currentUser.id!=null){
		api.handleGet('/api/project?profile.id='+currentUser.id, {}, function(err, response){
			if (err){
				return
			}

//			console.log('FETCH PROJECTS: '+JSON.stringify(response))
			store.dispatch(actions.projectsRecieved(response.projects))
		})
	}

	return {
		profile: currentUser,
		projects: projectsArray,
        loaderOptions: state.staticReducer.loaderConfig
	}
}

export default connect(stateToProps)(Account)