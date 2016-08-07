import React, { Component } from 'react'
import { connect } from 'react-redux'
import Landing from './containers/Landing'
import ProjectLanding from './containers/ProjectLanding'
import Courses from './containers/Courses'
import Event from './containers/Event'
import Feed from './containers/Feed'
import PostPage from './containers/PostPage'
import MVP from './containers/MVP'
import Project from './containers/Project'
import Course from './containers/Course'
import Account from './containers/Account'
import Unit from './containers/Unit'
import Checkout from './containers/Checkout'
import api from '../utils/APIManager'

class Main extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {
			
		}
	}

	componentDidMount(){
//		console.log('componentDidMount: '+this.props.page)
		var page = this.props.page
		var slug = (this.props.slug == null) ? '' : this.props.slug
		var params = (this.props.params == null) ? '' : this.props.params

		api.handlePost('/tracker', {page:page, slug:slug, params:params}, (err, response) => {
			if (err){
//				console.log(JSON.stringify(err))
				return
			}

//			console.log(JSON.stringify(response))
		})
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
