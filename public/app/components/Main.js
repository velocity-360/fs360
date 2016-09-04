import React, { Component } from 'react'
import { connect } from 'react-redux'
import Landing from './containers/Landing'
import Courses from './containers/Courses'
import Event from './containers/Event'
import Feed from './containers/Feed'
import PostPage from './containers/PostPage'
import MVP from './containers/MVP'
import Project from './containers/Project'
import Tutorials from './containers/Tutorials'
import Tutorial from './containers/Tutorial'
import Course from './containers/Course'
import Video from './containers/Video'
import Account from './containers/Account'
import Unit from './containers/Unit'
import Checkout from './containers/Checkout'
import TrackingManager from '../utils/TrackingManager'

class Main extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {
			
		}
	}

	componentDidMount(){
		var tracker = new TrackingManager()

		tracker.setCurrentPage({
			page: this.props.page,
			slug: (this.props.slug == null) ? '' : this.props.slug,
			params: (this.props.params == null) ? '' : this.props.params
		})

		tracker.updateTracking((err, response) => {
			if (err){
				console.log('ERROR: '+JSON.stringify(err))
				return
			}

//			console.log(JSON.stringify(response))
		})
	}

	render(){
		var page = null
		switch (this.props.page){
			case 'home':
				return page = <Landing />

			case 'course':
				return page = <Course slug={this.props.slug} />

			case 'tutorial':
				return page = <Tutorial slug={this.props.slug} />

			case 'video':
				return page = <Video slug={this.props.slug} />

			case 'courses':
				return page = <Courses params={this.props.params} />

			case 'tutorials':
				return page = <Tutorials params={this.props.params} />

			case 'event':
				return page = <Event slug={this.props.slug} />

			case 'feed':
				return page = <Feed />

			case 'mvp':
				return page = <MVP />

			case 'checkout':
				return page = <Checkout params={this.props.params} />

			case 'post':
				return page = <PostPage slug={this.props.slug} />

			case 'project':
				return page = <Project slug={this.props.slug} />

			case 'unit':
				return page = <Unit slug={this.props.slug} />

			case 'account':
				return page = <Account />

			default:
				return page = null
		}

		return (
			<div>
				{page}
			</div>
		)
	}

} 

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(state))

    return {

    }
}


export default connect(stateToProps)(Main)
