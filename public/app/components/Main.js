import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from './containers/Home'
import Landing from './containers/Landing'
import Courses from './containers/Courses'
import Events from './containers/Events'
import Feed from './containers/Feed'
import PostPage from './containers/PostPage'
import Project from './containers/Project'
import Course from './containers/Course'
import Vault from './containers/Vault'
import Account from './containers/Account'
import Unit from './containers/Unit'

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
				return page = <Landing headers={this.props.headers} />

			case 'ios':
				return page = <Landing headers={this.props.headers} />

			case 'course':
				return page = <Course slug={this.props.slug} />

			case 'courses':
				return page = <Courses params={this.props.params} />

			case 'vault':
				return page = <Vault params={this.props.params} />

			case 'events':
				return page = <Events />

			case 'feed':
				return page = <Feed />

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
//	console.log('STATE TO PROPS: '+JSON.stringify(state));

    return {

    }
}


export default connect(stateToProps)(Main)
