import React from 'react'
import Home from './containers/Home'
import Course from './containers/Course'

class Main extends React.Component {

	constructor(props, context){
		super(props, context);
		this.state = {

		}

	}

	render(){
		console.log('RENDER MAIN: '+JSON.stringify(this.props.page))

		var page = null
		switch (this.props.page){
			case 'home':
				return page = <Home />

			case 'course':
				return page = <Course />

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