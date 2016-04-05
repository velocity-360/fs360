import React from 'react'
import Home from './containers/Home'

class Main extends React.Component {

	constructor(props, context){
		super(props, context);
		this.state = {

		}

	}

	render(){
//		console.log('RENDER MAIN: '+JSON.stringify(this.props.page))
		return (
			<div>
				<Home />
			</div>
		)
	}

} 

export default Main;