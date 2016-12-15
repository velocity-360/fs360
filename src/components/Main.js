import React, { Component } from 'react'

class Main extends Component {
	render(){
		return (
			<div className="stretched side-header">
				<div id="wrapper">
					{this.props.children}
				</div>

			</div>
		)
	}
}

export default Main
