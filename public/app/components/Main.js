import React from 'react'
import Home from './containers/Home'
import Courses from './containers/Courses'
import Course from './containers/Course'
import Videos from './containers/Videos'
import iOSHighSchool from './containers/iOSHighSchool'

class Main extends React.Component {

	constructor(props, context){
		super(props, context);
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

			case 'videos':
				return page = <Videos />

			case 'ios-hs:':
				return page = <iOSHighSchool />

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

export default Main;