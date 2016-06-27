import React, {Component} from 'react'
import store from '../stores/store'
import actions from '../actions/actions'
import Login from '../components/Login'
import { connect } from 'react-redux'
import api from '../api/api'
import ReactBootstrap, { Modal } from 'react-bootstrap'


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

	componentDidMount(){
		api.handleGet('/account/currentuser', {}, function(err, response){
			if (err){
				return
			}

			store.dispatch(actions.currentUserRecieved(response.profile));
		});
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

		return (

	        <header id="header" className="transparent-header page-section dark">
	            <div id="header-wrap">
	                <div className="container clearfix">
	                    <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

	                    <div id="logo">
	                        <a href="/" className="standard-logo" data-dark-logo="/images/logo-dark.png"><img src="/images/logo.png" alt="Velocity 360" /></a>
	                        <a href="/" className="retina-logo" data-dark-logo="/images/logo-dark@2x.png"><img src="/images/logo@2x.png" alt="Velocity 360" /></a>
	                    </div>

	                    <nav id="primary-menu">
	                        <ul className="one-page-menu">
	                            <li className="current"><a href="/"><div style={{padding:4}}>Home</div></a></li>
								<li><a href="#"><div style={{padding:4}}>Courses</div></a>
									<ul>
										<li><a href="/courses?type=online"><div style={{padding:4}}>Online</div></a></li>
										<li><a href="/courses?type=live"><div style={{padding:4}}>Part Time</div></a></li>
										<li><a href="/courses?type=immersive"><div style={{padding:4}}>Bootcamp</div></a></li>
									</ul>
								</li>
								<li><a href="/feed"><div style={{padding:4}}>Blog</div></a></li>
								{login}
	                        </ul>
	                    </nav>
	                </div>
	            </div>
	            <Login isVisible={this.state.showLogin} hide={this.closeLogin} />
            
	        </header>

		)
	}

}

const stateToProps = function(state) {
    return {
        currentUser: state.profileReducer.currentUser
    }
}


export default connect(stateToProps)(Nav)

