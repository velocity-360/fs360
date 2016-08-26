import React, {Component} from 'react'
import store from '../stores/store'
import actions from '../actions/actions'
import Login from '../components/Login'
import { connect } from 'react-redux'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import api from '../utils/APIManager'


class Nav extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeLogin = this.closeLogin.bind(this)
		this.state = {
			showModal: false,
			showLogin: false
		}
	}

	openModal(event){
		event.preventDefault()
		this.setState({showLogin: true})
	}

	closeLogin(){
		this.setState({showLogin: false})
	}

	render(){
		var login = (this.props.currentUser.id == null) ? <li><a onClick={this.openModal} href="#"><div className="login" style={{padding:4}}>Login</div></a></li> : <li><a href="/account"><div className="user" style={{padding:4}}>{this.props.currentUser.firstName}</div></a></li>
		const headerStyle = (this.props.headerStyle == 'dark') ? 'full-header dark sticky-style-1' : 'transparent-header page-section dark'

		const immersive = this.props.courses.map((course, i) => {
			if (course.type == 'immersive'){
				return (
					<li key={course.id}>
						<a href={'https://www.velocity360.io/course/'+course.slug}>
							<div className="menu-item">{course.title}</div>
						</a>
					</li>
				)
			}
		})

		const partTime = this.props.courses.map((course, i) => {
			if (course.type == 'live'){
				return (
					<li key={course.id}>
						<a href={'https://www.velocity360.io/course/'+course.slug}>
							<div className="menu-item">{course.title}</div>
						</a>
					</li>
				)
			}			
		})


		return (

	        <header id="header" className={headerStyle}>
	            <div id="header-wrap">
	                <div className="container clearfix">
	                    <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

	                    <div id="logo">
	                        <a href="/" className="standard-logo" data-dark-logo="/images/logo-dark.png"><img src="/images/logo.png" alt="Velocity 360" /></a>
	                        <a href="/" className="retina-logo" data-dark-logo="/images/logo-dark@2x.png"><img src="/images/logo@2x.png" alt="Velocity 360" /></a>
	                    </div>

	                    <nav id="primary-menu">
	                        <ul className="one-page-menu" style={{border:'none'}}>
	                            <li className="current"><a href="/"><div style={{padding:4}}>Home</div></a></li>
								<li><a href="#"><div style={{padding:4}}>Courses</div></a>
									<ul>
										<li>
											<div style={style.menuHeader}><strong>Bootcamp</strong></div>
										</li>
										{immersive}
										<li>
											<div style={style.menuHeader}><strong>Part Time</strong></div>
										</li>
										{partTime}
									</ul>
								</li>
	                            <li><a href="https://www.velocity360.io/tutorials"><div style={{padding:4}}>Tutorials</div></a></li>
	                            <li><a target="_blank" href="https://www.coursereport.com/schools/velocity"><div style={{padding:4}}>Reviews</div></a></li>
								{login}
	                        </ul>
	                    </nav>
	                </div>
	            </div>
	            <Login isVisible={this.state.showLogin} hide={this.closeLogin} redirect={'/account'} />
            
	        </header>
		)
	}
}

const style = {
	menuHeader: {
		padding:8,
		background:'#444'
	}
}

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(state.profileReducer))
    return {
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courseArray
    }
}


export default connect(stateToProps)(Nav)

