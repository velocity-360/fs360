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

	componentDidMount(){
		if (this.props.currentUser.id != null)
			return

		api.handleGet('/account/currentuser', {}, function(err, response){
//			console.log('CURRENT USER: '+JSON.stringify(response))
			if (err){
				return
			}

			store.currentStore().dispatch(actions.currentUserRecieved(response.profile))
		})
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
										<li><a href="/courses?type=live"><div style={{padding:4}}>Part Time</div></a></li>
										<li><a href="/courses?type=immersive"><div style={{padding:4}}>Bootcamp</div></a></li>
									</ul>
								</li>
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

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(state.profileReducer))
    return {
        currentUser: state.profileReducer.currentUser
    }
}


export default connect(stateToProps)(Nav)

