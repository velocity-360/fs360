import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import api from '../api/api'

class Login extends Component {
	constructor(props, context){
		super(props, context)
		this.hide = this.hide.bind(this)
		this.login = this.login.bind(this)
		this.updateCredentials = this.updateCredentials.bind(this)
		this.state = {
			showLoader: false,
			credentials: {
				email: '',
				password: ''
			}
		}
	}

	hide(){
		this.props.hide()
	}

	updateCredentials(event){
		event.preventDefault()

		var updatedCredentials = Object.assign({}, this.state.credentials)
		updatedCredentials[event.target.id] = event.target.value
		this.setState({
			credentials: updatedCredentials
		})
	}


	login(event){
		event.preventDefault()
//		console.log('LOGIN: '+JSON.stringify(this.state.credentials))

		this.setState({showLoader: true})
		var _this = this
		api.handlePost('/account/login', this.state.credentials, function(err, response){
			if (err){
				alert(err.message)
				_this.setState({showLoader: false})
				return
			}

			window.location.href = '/account'
		})
	}

	render(){
		var loaderConfig = {
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

		return (
			<div>
				<Loader options={loaderConfig} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
		        <Modal bsSize="sm" show={this.props.isVisible} onHide={this.hide}>
			        <Modal.Body style={{background:'#f9f9f9', padding:24, borderRadius:3}}>
			        	<div style={{textAlign:'center'}}>
				        	<img style={{width:96, borderRadius:48, border:'1px solid #ddd', background:'#fff', marginBottom:24}} src='/images/logo_round_blue_260.png' />
				        	<h4>Log In</h4>
			        	</div>
			        	<input onChange={this.updateCredentials} id="email" className="form-control" style={{marginBottom:12}} type="text" placeholder="Email" />
			        	<input onChange={this.updateCredentials} id="password" className="form-control" style={{marginBottom:12}} type="password" placeholder="Password" />
						<div style={{textAlign:'center', marginTop:24}}>
							<a onClick={this.login} href="#" className="button button-border button-dark button-rounded button-large noleftmargin">Log In</a>
						</div>
			        </Modal.Body>

		        </Modal>
			</div>
		)
	}
}

export default Login