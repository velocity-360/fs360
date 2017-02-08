import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router'
import actions from '../../actions'
import { APIManager, Alert, TextUtils } from '../../utils'
import style from './styles'

class Nav extends Component {

	constructor(){
		super()
		this.state = {
			showLogin: false,
			credentials: {
				email: '',
				username: '',
				password: ''
			}
		}
	}

	showLogin(event){
		console.log('showLogin')

	}

	updateCredentials(event){
		var updatedCredentials = Object.assign({}, this.state.credentials)
		updatedCredentials[event.target.id] = event.target.value

		this.setState({
			credentials: updatedCredentials
		})
	}

	toggleLogin(event){
		if (event)
			event.preventDefault()
		
		this.setState({
			showLogin: !this.state.showLogin
		})
	}

	keyPress(action, event){
		if (event.charCode != 13)
			return

		if (action == 'register')
			this.register()
		else
			this.login()
	}

	login(event){
		if (event)
			event.preventDefault()

		// validate fields
		if (this.state.credentials.email.length == 0){
			alert('Please enter your email')
			// Alert.showAlert({
			// 	title: 'Oops!',
			// 	text: 'Please Enter Your Email'
			// })
			return
		}
		if (this.state.credentials.password.length == 0){
			alert('Please enter your password')
			// Alert.showAlert({
			// 	title: 'Oops!',
			// 	text: 'Please Enter Your Password'
			// })
			return
		}

		this.sendCredentials('/account/login')
	}


	sendCredentials(endpoint){
		APIManager
		.handlePost(endpoint, this.state.credentials)
		.then((result) => {
			this.setState({
				showLogin: false
			})

			window.location.href = '/account'
		})
		.catch((err) => {
			alert(err.message)
		})
	}

	render(){
		return (
	        <header>
	            <div className="container">
	                <div className="row">
	                    <div className="col--md-3 col-sm-3 col-xs-3">
	                        <a href="/" id="logo">
	                            <h2 style={{fontFamily:'Pathway Gothic One', marginTop:6}}>Velocity 360</h2>
	                        </a>
	                    </div>
	                    <nav className="col--md-9 col-sm-9 col-xs-9">
	                    <a className="cmn-toggle-switch cmn-toggle-switch__htx open_close" href="javascript:void(0);"><span>Menu mobile</span></a>
	                    <div className="main-menu">
	                        <div id="header_menu">
	                             <img src="/img/logo_m.png" width="141" height="40" alt="Velocity 360" data-retina="true" />
	                        </div>
	                        <a href="#" className="open_close" id="close_in"><i className="icon_set_1_icon-77"></i></a>
	                         <ul>
	                            <li><a href="/">Home</a></li>
	                            <li className="submenu">
	                                <a href="javascript:void(0);" className="show-submenu">Courses<i className="icon-down-open-mini"></i></a>
	                                <ul>
	                                    <li><a href="index.html">Home Booking</a></li>
	                                    <li><a href="index_5.html">Home Booking date 2</a></li>
	                                </ul>
	                            </li>
	                            { (this.props.account.currentUser) ? <li><a href="/account">Welcome {TextUtils.capitalize(this.props.account.currentUser.firstName)}</a></li> : <li><a onClick={this.toggleLogin.bind(this)} href="#">Login</a></li> }
	                            
	                        </ul>
	                    </div>
	                    </nav>
	                </div>
	            </div>

		        <Modal bsSize="sm" show={this.state.showLogin} onHide={this.toggleLogin.bind(this)}>
			        <Modal.Body style={localStyle.modal}>
			        	<div style={{textAlign:'center', marginBottom:24}}>
				        	<img style={localStyle.logo} src='/images/logo.png' />
				        	<hr />
				        	<h4>Log In</h4>
			        	</div>

			        	<input onChange={this.updateCredentials.bind(this)} id="email" style={localStyle.textField} type="text" className="form-control" placeholder="Email" />
			        	<input onChange={this.updateCredentials.bind(this)} id="password" onKeyPress={this.keyPress.bind(this, 'login')} style={localStyle.textField} type="password" className="form-control" placeholder="Password" />
						<div style={localStyle.btnLoginContainer}>
						    <button style={{height:36, borderRadius:18, marginBottom:24, width:100+'%'}} className="btn_1 white" onClick={this.login.bind(this)}>Login</button>
						</div>
			        </Modal.Body>
		        </Modal>

	        </header>
		)


	}
}

const localStyle = {
    title: {
        marginTop: 6,
        color:'#333',
        fontFamily: 'Pathway Gothic One',
        fontWeight: 100
    },
    titleWhite: {
        marginTop: 6,
        color:'#fff',
        fontFamily: 'Pathway Gothic One',
        fontWeight: 100
    },
	ul: {
		fontWeight: 100
	},
	title: {
		color:'#fff',
		fontFamily: 'Pathway Gothic One',
		fontWeight: 200,
		fontSize: 30
	},
	modal: {
		background:'#f9f9f9',
		padding:24,
		borderRadius:3,
		minHeight: 370
	},
	textField: {
		marginBottom: 12,
		className: 'form-control'
	},
	btnLoginContainer: {
		textAlign: 'center',
		marginTop: 24
	},
	btnLogin: {
		height:36,
		borderRadius:18,
		marginBottom:24,
		width:100+'%'
	}    
}

const stateToProps = (state) => {
	return {
		account: state.account,
		session: state.session
	}
}

const dispatchToProps = (dispatch) => {
	return {
		toggleLogin: () => dispatch(actions.toggleLogin())
	}
}

export default connect(stateToProps, dispatchToProps)(Nav)

