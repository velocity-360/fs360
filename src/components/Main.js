import React, { Component } from 'react'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import actions from '../actions'
import { Link, browserHistory } from 'react-router'


class Main extends Component {
	constructor(){
		super()
		this.state = {
			menu: [
				'Home',
				'Courses',
				'Online'
			]
		}
	}

	select(item, event){
		event.preventDefault()
		$( '#primary-menu > ul, #primary-menu > div > ul' ).toggleClass('show')

		const lowerCaseItem = item.toLowerCase()
		this.props.selectMenuItem(lowerCaseItem)
		if (lowerCaseItem == 'home'){
			browserHistory.push('/')
			return
		}

		browserHistory.push('/'+lowerCaseItem)
	}

	render(){
		const list = this.state.menu.map((item, i) => {
			const itemStyle = (item.toLowerCase() == this.props.session.selectedMenuItem) ? style.selected : style.menuItem
			return (
				<li key={i}>
					<div style={itemStyle}><a onClick={this.select.bind(this, item)} style={{color:'#333'}} href="#"><div>{item}</div></a></div>
				</li>
			)
		})

		return (
			<div className="stretched side-header">
                <Loader options={style.loader} loaded={!this.props.session.isLoading} className="spinner" loadedClassName="loadedContent" />
				<div id="wrapper">

					<header id="header" className="no-sticky" style={{background:'#f9f9f9'}}>
			            <div id="header-wrap">
							<div className="container clearfix">

								<div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

								<div id="logo" className="nobottomborder">
									<a href="/" className="standard-logo" data-dark-logo="/images/logo-side-dark.png">
										<img src="/images/logo-side.png" alt="Velocity 360" />
									</a>
									<a href="/" className="retina-logo" data-dark-logo="/images/logo-side-dark@2x.png">
										<img src="/images/logo-side@2x.png" alt="Velocity 360" />
									</a>
									<hr className="hidden-xs" />
								</div>

								<nav id="primary-menu">
									<ul>{ list }</ul>
								</nav>
								<br />

				            </div>

			            </div>
					</header>

					{this.props.children}
				</div>

			</div>
		)
	}
}

const style = {
	selected: {
		padding: 8,
		background:'#fff',
		borderRadius: 2,
		border: '1px solid #ddd'
	},
	menuItem: {
		color: '#333',
		padding:8,
		background:'#f9f9f9',
		border: '1px solid #f9f9f9'
	},
	loader: {
	    lines: 13,
	    length: 20,
	    width: 10,
	    radius: 30,
	    corners: 1,
	    rotate: 0,
	    direction: 1,
	    color: '#fff',
	    speed: 1,
	    trail: 60,
	    shadow: false,
	    hwaccel: false,
	    zIndex: 2e9,
	    top: '50%',
	    left: '50%',
	    scale: 1.00
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
