import React, {Component} from 'react'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'
import api from '../api/api'
import ReactBootstrap, { Modal } from 'react-bootstrap'


class Nav extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.login = this.login.bind(this)
		this.updateLogin = this.updateLogin.bind(this)
		this.state = {
			showModal: false
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
		this.setState({showModal: true})
	}

	closeModal(){
		this.setState({showModal: false})
	}

	login(event){
		event.preventDefault()
		console.log('LOGIN: '+JSON.stringify(this.props.currentUser))
		this.setState({showModal: false})
		api.handlePost('/account/login', this.props.currentUser, function(err, response){
			if (err){
				alert(err.message)
				return
			}

			window.location.href = '/account'
		});
	}

	updateLogin(event){
		event.preventDefault()

		var updatedUser = Object.assign({}, this.props.currentUser);
		updatedUser[event.target.id] = event.target.value
		store.dispatch(actions.updateCurrentUser(updatedUser));
	}

	render(){

		var login = (this.props.currentUser.id == null) ? <li><a onClick={this.openModal} href="#"><div style={{padding:4}}>Login</div></a></li> : <li><a href="/account"><div style={{padding:4}}>{this.props.currentUser.firstName}</div></a></li>

		return (

	        <header id="header" className="transparent-header page-section dark">
	            <div id="header-wrap">
	                <div className="container clearfix">
	                    <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

	                    <div id="logo">
	                        <a href="/" className="standard-logo" data-dark-logo="/images/logo-dark.png"><img src="/images/logo.png" alt="FullStack 360" /></a>
	                        <a href="/" className="retina-logo" data-dark-logo="/images/logo-dark@2x.png"><img src="/images/logo@2x.png" alt="FullStack 360" /></a>
	                    </div>

	                    <nav id="primary-menu">
	                        <ul className="one-page-menu">
	                            <li className="current"><a href="/"><div style={{padding:4}}>Home</div></a></li>
								<li><a href="#"><div style={{padding:4}}>Code</div></a>
									<ul>
										<li><a href="/videos"><div style={{padding:4}}>Videos</div></a></li>
										<li><a href="/vault"><div style={{padding:4}}>Code Vault</div></a></li>
									</ul>
								</li>
								<li><a href="#"><div style={{padding:4}}>Courses</div></a>
									<ul>
										<li><a href="/courses?type=live"><div style={{padding:4}}>Part Time</div></a></li>
										<li><a href="/courses?type=immersive"><div style={{padding:4}}>Bootcamp</div></a></li>
									</ul>
								</li>
								<li><a href="/feed"><div style={{padding:4}}>Blog</div></a></li>
								{login}

	                            <li>
	                            	<a href="/application">
	                            		<div style={{background:'#5cb85c', padding:4, borderRadius:2, paddingRight:8, paddingLeft:8}}>Apply</div>
	                            	</a>
	                            </li>
	                        </ul>
	                    </nav>
	                </div>
	            </div>

		        <Modal show={this.state.showModal} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Log In</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<input onChange={this.updateLogin} value={this.props.currentUser.email} className="form-control" type="text" id="email" placeholder="Email" /><br />
			        	<input onChange={this.updateLogin} value={this.props.currentUser.password} className="form-control" type="password" id="password" placeholder="Password" /><br />
			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.login} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Log In</a>
			        </Modal.Footer>
		        </Modal>	            
	        </header>

		)
	}

}

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(state));

    return {
        currentUser: state.profileReducer.currentUser
    }
}


export default connect(stateToProps)(Nav)

