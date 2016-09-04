import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Loader from 'react-loader'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { TextUtils, api } from '../../utils'
import { Footer, Nav, Sidebar, CourseCard } from '../../components'


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
		api.handleGet('/api/course', {subscribers:this.props.profile.id}, (err, response) => {
//			console.log('Fetch Courses: '+JSON.stringify(response))
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

			var updatedUser = Object.assign({}, _this.props.profile)
			updatedUser['image'] = response.id
			store.currentStore().dispatch(actions.updateCurrentUser(updatedUser))
		})
	}
	

	updateCurrentUser(event){
		event.preventDefault()
		var updatedUser = Object.assign({}, this.props.profile)
		updatedUser[event.target.id] = event.target.value
		store.currentStore().dispatch(actions.updateCurrentUser(updatedUser))
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
			
			store.currentStore().dispatch(actions.currentUserRecieved(response.profile))
			alert('Profile Updated')
		})
	}

	render(){
		var courseList = null
		if (this.props.courses.length == 0){
			courseList = <p>Subscribe to video courses <a href="/courses?type=online">HERE</a></p>
		}
		else {
			courseList = this.props.courses.map(function(course){
				return <CourseCard key={course.id} course={course} />
			})
		}

		return (
			<div id="wrapper" className="clearfix" style={{background:'#f9f9f9'}}>
				<Nav headerStyle="dark" />

				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />

				<section>
					<div className="content-wrap">
						<div className="container clearfix">

							<div className="col_full bottommargin-sm">
								<div className="row">
									tutorialsList
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


