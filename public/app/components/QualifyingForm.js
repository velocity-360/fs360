import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import api from '../utils/APIManager'
import TrackingManager from '../utils/TrackingManager'

class QualifyingForm extends Component {

	constructor(props, context){
		super(props, context)
		this.closeModal = this.closeModal.bind(this)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.submitForm = this.submitForm.bind(this)
		this.state = {
			visitor: {
				name: '',
				email: ''
			}
		}
	}

	closeModal(){
		console.log('closeModal: ')
		this.props.closeModal()
	}

	updateVisitor(event){
		var updatedVisitor = Object.assign({}, this.state.visitor)
		updatedVisitor[event.target.id] = event.target.value
		this.setState({
			visitor: updatedVisitor
		})
	}

	submitForm(event){
		event.preventDefault()
		var missingField = this.validate(this.state.visitor, false)
		if (missingField != null){
			alert('Please enter your '+missingField)
			return
		}

		var pkg = Object.assign({}, this.state.visitor)
		var parts = pkg.name.split(' ')
		pkg['firstName'] = parts[0]
		if (parts.length > 1)
			pkg['lastName'] = parts[parts.length-1]

		if (this.props.subject != null){
			pkg['subject'] = this.props.subject.title
			if (this.props.subject.date != null)
				pkg['date'] = this.props.subject.date
		}


		var survey = []
		var questions = ['goal', 'history', 'previous courses', 'interest in Velocity']
		for (var i=0; i<questions.length; i++){
			var question = questions[i]
			survey.push({
				question: question,
				response: pkg[question]
			})
		}

		pkg['survey'] = survey

		var _this = this
		this.props.toggleLoader(true)
		api.handlePost(this.props.endpoint, pkg, function(err, response){
			_this.props.toggleLoader(false)
			_this.props.closeModal()
			if (err){
				alert(err.message)
				return
			}

			alert(response.message)

			var tracker = new TrackingManager() // this is a singelton so no need to reset page info:
			tracker.updateTracking((err, response) => {

				if (err){
					console.log('ERROR: '+JSON.stringify(err))
					return
				}

//				console.log(JSON.stringify(response))
			})
		})
	}

	validate(profile, withPassword){
		if (profile.name.length == 0)
			return 'Name'

		if (profile.email.length == 0)
			return 'Email'

		if (profile.email.indexOf('@') == -1) // invalid email
			return 'valid email address'			

		if (withPassword == false)
			return null

		if (profile.password.length == 0)
			return 'Password'

		return null // this is successful
	}

	render(){
		return (
	        <Modal show={this.props.show} onHide={this.closeModal}>
		        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
		        	<img style={{width:96, borderRadius:48}} src="/images/logo_round_green_260.png" />
		        </Modal.Header>
		        <Modal.Body style={{background:'#f9f9f9', padding:24, textAlign:'center'}}>
                    <div className="col_half" style={{marginBottom:24}}>
                        <input onChange={this.updateVisitor} id="name" type="text" className="form-control input-lg not-dark" placeholder="Name" />
                    </div>
                    <div className="col_half col_last" style={{marginBottom:24}}>
                        <input onChange={this.updateVisitor} id="email" type="text" className="form-control input-lg not-dark" placeholder="Email" />
                    </div>
                    <div className="col_full" style={{marginBottom:12}}>
                        <input onChange={this.updateVisitor} id="goal" type="text" className="form-control input-lg not-dark" placeholder="Are you changing career into software development?" /><br />
                        <input onChange={this.updateVisitor} id="history" type="text" className="form-control input-lg not-dark" placeholder="How have you tried to learn programming so far?" /><br />
                        <input onChange={this.updateVisitor} id="previous courses" type="text" className="form-control input-lg not-dark" placeholder="Have you taken a course or completed a coding bootcamp?" /><br />
                        <input onChange={this.updateVisitor} id="interest in Velocity" type="text" className="form-control input-lg not-dark" placeholder="Are you interested in taking a course with Velocity 360?" />
                    </div>
		        </Modal.Body>
		        <Modal.Footer style={{textAlign:'center'}}>
					<a onClick={this.submitForm} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
		        </Modal.Footer>
	        </Modal>
		)
	}
}

export default QualifyingForm