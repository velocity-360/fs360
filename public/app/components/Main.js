import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from './containers/Home'
import Courses from './containers/Courses'
import Events from './containers/Events'
import Feed from './containers/Feed'
import Course from './containers/Course'
import Videos from './containers/Videos'
import Application from './containers/Application'

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
				return page = <Home />

			case 'course':
				return page = <Course slug={this.props.slug} />

			case 'courses':
				return page = <Courses params={this.props.params} />

			case 'application':
				return page = <Application params={this.props.params} />

			case 'videos':
				return page = <Videos />

			case 'events':
				return page = <Events />

			case 'feed':
				return page = <Feed />

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
