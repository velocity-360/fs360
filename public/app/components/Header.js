import React, {Component} from 'react'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import { api, TrackingManager } from '../utils'
import ReactBootstrap, { Modal } from 'react-bootstrap'


class Header extends Component {
	constructor(props, context){
		super(props, context)
		this.submitInfoRequest = this.submitInfoRequest.bind(this)
		this.toggleLoader = this.toggleLoader.bind(this)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.submitSyllabusRequest = this.submitSyllabusRequest.bind(this)
		this.validate = this.validate.bind(this)
		this.state = {
			showLoader: false,
			visitor: {
				name: '',
				email: '',
				pdf: 'FullStackImmersive.pdf',
				subject: 'Syllabus Request'
			}
		}
	}

	toggleLoader(show){
		this.setState({
			showLoader: show
		})
	}

	submitInfoRequest(event){
		event.preventDefault()
		this.setState({
			showForm: true
		})
	}

	submitSyllabusRequest(event){
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

		pkg['pdf'] = 'FundamentalsBootcamp.pdf'
		pkg['course'] = 'Full Stack Immersive'
		pkg['subject'] = 'Syllabus Request'
		pkg['confirmation'] = 'Thanks for your interest! Check your email shortly for a direct download link to the syllabus.'

		this.setState({showLoader:true})
		api.handlePost('/account/syllabus', pkg, (err, response) => {
			this.setState({showLoader:false})
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
	updateVisitor(event){
		var updatedVisitor = Object.assign({}, this.state.visitor)
		updatedVisitor[event.target.id] = event.target.value
		this.setState({
			visitor: updatedVisitor
		})		
	}

	render(){
		return (
	        <section id="slider" className="dark full-screen" style={{background: 'url("/images/oc-dark-blue.jpg") center', overflow:'visible'}} data-height-lg="600" data-height-md="600" data-height-sm="600" data-height-xs="600" data-height-xxs="600">
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
                <div className="vertical-middle">
                    <div className="heading-block center nobottomborder">
                        <h1 style={{textTransform:'none', fontWeight:300}} data-animate="fadeInUp">Become a Full Stack Developer</h1>
                        <span style={{fontWeight:400}} data-animate="fadeInUp" data-delay="300">
	                        Velocity 360 is the only coding bootcamp that trains students for the future 
							of software - Node, React, and React Native.
                        </span>
                        <br /><br />
                    	<div data-animate="fadeIn" data-delay="800" style={{margin:'auto', maxWidth:320, background:'rgba(0,0,0,0.65)', padding:24}}>
	                    	Next Cohort Begins October 3rd
	                    	<br /><br />
	                        <input id="name" onChange={this.updateVisitor} style={style.input} type="text" className="form-control input-lg not-dark" placeholder="Name" />
	                        <input id="email" onChange={this.updateVisitor} style={style.input} type="text" className="form-control input-lg not-dark" placeholder="Email" />
		                    <button onClick={this.submitSyllabusRequest} className="btn btn-lg btn-info nomargin" value="submit" type="submit">Request Syllabus</button>
                    	</div>
                    </div>
                </div>
	        </section>
		)
	}
}

const style = {
	input: {
		maxWidth:280,
		margin:'auto',
		marginBottom:16
	}
}

const stateToProps = function(state) {
    return {
        loaderOptions: state.staticReducer.loaderConfig
    }
}

export default connect(stateToProps)(Header)
