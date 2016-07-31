import React, { Component } from 'react'
import { connect } from 'react-redux'
import Landing from './containers/Landing'
import ProjectLanding from './containers/ProjectLanding'
import Courses from './containers/Courses'
import Event from './containers/Event'
import Feed from './containers/Feed'
import PostPage from './containers/PostPage'
import MVP from './containers/MVP'
import Peaks from './containers/Peaks'
import Project from './containers/Project'
import Course from './containers/Course'
import Account from './containers/Account'
import Unit from './containers/Unit'
import Checkout from './containers/Checkout'

class Main extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {
			
		}
	}

	render(){
//		console.log('RENDER MAIN: '+JSON.stringify(this.props.page)+', '+JSON.stringify(this.props.slug))

		var page = null
		switch (this.props.page){
			case 'home':
				return page = <Landing />

			case 'landing':
				return page = <ProjectLanding />

			case 'course':
				return page = <Course slug={this.props.slug} />

			case 'courses':
				return page = <Courses params={this.props.params} />

			case 'event':
				return page = <Event slug={this.props.slug} />

			case 'feed':
				return page = <Feed />

			case 'mvp':
				return page = <MVP />

			case 'peaks':
				return page = <Peaks />

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
