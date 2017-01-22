import React, { Component } from 'react'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import actions from '../actions'
import { Link, browserHistory } from 'react-router'


class Main extends Component {
	constructor(){
		super()
		this.state = {
			
		}
	}

	render(){

		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}


const stateToProps = (state) => {
	return {
		session: state.session
	}
}

const dispatchToProps = (dispatch) => {
	return {
		selectMenuItem: (item) => dispatch(actions.selectMenuItem(item))
	}
}

export default connect(stateToProps, dispatchToProps)(Main)
