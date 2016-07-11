import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Loader from 'react-loader'
import TextUtils from '../../utils/TextUtils'
import CourseCard from '../../components/CourseCard'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import store from '../../stores/store'
import actions from '../../actions/actions'
import api from '../../api/api'


class Account extends Component {
	constructor(props, context){
		super(props, context)
		this.uploadProfileImage = this.uploadProfileImage.bind(this)
		this.updateProfile = this.updateProfile.bind(this)
		this.updateCurrentUser = this.updateCurrentUser.bind(this)
		this.state = {
			showLoader: false
		}
	}

	componentDidMount(){

		api.handleGet('/api/course', {subscribders:this.props.profile.id}, function(err, response){
			console.log('Fetch Courses: '+JSON.stringify(response))
			if (err){
				return
			}

			store.currentStore().dispatch(actions.coursesRecieved(response.courses))
		})
	}

	uploadProfileImage(files){
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

			var updatedUser = Object.assign({}, _this.props.profile);
			updatedUser['image'] = response.id
			store.currentStore().dispatch(actions.updateCurrentUser(updatedUser));
		})
	}
	

	updateCurrentUser(event){
		event.preventDefault()
		var updatedUser = Object.assign({}, this.props.profile);
		updatedUser[event.target.id] = event.target.value
		store.currentStore().dispatch(actions.updateCurrentUser(updatedUser));
	}


	updateProfile(event){
		event.preventDefault()

		var profile = Object.assign({}, this.props.profile)
		profile['tags'] = TextUtils.stringToArray(profile.tagString, ',')

		var endpoint = '/api/profile/'+profile.id
		api.handlePut(endpoint, profile, function(err, response){
			if (err){
				alert(response.message)
				return
			}
			
			store.currentStore().dispatch(actions.currentUserRecieved(response.profile));
			alert('Profile Updated')
		})
	}

	render(){
		var courseList = this.props.courses.map(function(course){
			return <CourseCard key={course.id} course={course} />
		})

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
										<li><a href="#tabs-4">Courses</a></li>
										<li><a href="#tabs-2">Profile</a></li>
									</ul>

									<div className="tab-container">
										<div className="tab-content clearfix" id="tabs-4">
											<div id="posts" className="events small-thumbs">
												{courseList}
											</div>
										</div>


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

							                        <div className="col_half">
							                            <label for="template-contactform-message">Profile Image</label>
											            <Dropzone style={{width:100+'%', marginBottom:24, background:'#fff', border:'1px solid #ddd'}} onDrop={this.uploadProfileImage}>
											              <div style={{padding:24}}>
											              	{ (this.props.profile.image.length == 0) ? null : <img style={{width:64, border:'1px solid #ddd', marginRight:6}} src={'https://media-service.appspot.com/site/images/'+this.props.profile.image+'?crop=120'} /> }
											              	Drop file here, or click to select image to upload.
											              </div>
											            </Dropzone>
							                        </div>

							                        <div className="col_half col_last">
							                            <label>Skills</label>
							                            <input type="text" onChange={this.updateCurrentUser} id="tagString" value={this.props.profile.tagString} className="form-control" placeholder="iOS, Python, git..." />
							                        </div>


							                        <div className="clear"></div>

							                        <div className="col_full">
							                            <label for="template-contactform-message">Bio <small>*</small></label>
							                            <textarea className="form-control" onChange={this.updateCurrentUser} id="bio" value={this.props.profile.bio} rows="6" cols="30"></textarea>
							                        </div>


							                        <div className="col_full">
							                            <button onClick={this.updateProfile} className="button button-border button-dark button-rounded noleftmargin" type="submit">Update</button>
							                        </div>

							                    </form>

							                </div>
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

const stateToProps = function(state){
	return {
		profile: state.profileReducer.currentUser,
        loaderOptions: state.staticReducer.loaderConfig,
        courses: state.courseReducer.courseArray
	}
}

export default connect(stateToProps)(Account)


