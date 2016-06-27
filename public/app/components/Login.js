import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'

class Login extends Component {
	constructor(props, context){
		super(props, context)
		this.hide = this.hide.bind(this)
		this.state = {
			isVisible: false,
			membershiptype: 'basic'
		}
	}

	hide(){
		this.props.hide()
	}


	render(){
		return (
	        <Modal bsSize="sm" show={this.props.isVisible} onHide={this.hide}>
		        <Modal.Body style={{background:'#f9f9f9', padding:24, borderRadius:3}}>
		        	<div style={{textAlign:'center'}}>
			        	<img style={{width:96, borderRadius:48, border:'1px solid #ddd', background:'#fff', marginBottom:24}} src='/images/logo_round_green_260.png' />
		        	</div>
		        	<input onChange={this.updateUserRegistration} id="name" className="form-control" style={{marginBottom:12}} type="text" placeholder="Name" />
		        	<input onChange={this.updateUserRegistration} id="email" className="form-control" style={{marginBottom:12}} type="text" placeholder="Email" />
		        	<input onChange={this.updateUserRegistration} id="password" className="form-control" style={{marginBottom:12}} type="password" placeholder="Password" />
		        	<input onChange={this.updateUserRegistration} id="promoCode" className="form-control" style={{marginBottom:12}} type="text" placeholder="Promo Code" />
					<select onChange={this.updateUserRegistration} id="membershiptype" value={this.state.membershiptype} className="form-control input-md not-dark">
						<option value="basic">Basic</option>
						<option value="premium">Premium</option>
					</select>
					<div style={{textAlign:'center', marginTop:24}}>
						<a onClick={this.register} href="#" className="button button-border button-dark button-rounded button-large noleftmargin">Join</a>
					</div>
		        </Modal.Body>

	        </Modal>
		)
	}
}

export default Login