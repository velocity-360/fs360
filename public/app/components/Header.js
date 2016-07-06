import React, {Component} from 'react'
import store from '../stores/store'
import actions from '../actions/actions'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import api from '../api/api'
import ReactBootstrap, { Modal } from 'react-bootstrap'


class Header extends Component {

	constructor(props, context){
		super(props, context)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.submitInfoRequest = this.submitInfoRequest.bind(this)
		this.validate = this.validate.bind(this)
		this.state = {
			showLoader: false,
			visitor: {
				name: '',
				email: '',
				phone: '',
				course: 'Fundamentals Bootcamp',
				referral: ''
			}
		}
	}

	componentDidMount(){

	}

	updateVisitor(event){
		event.preventDefault()

		var visitor = Object.assign({}, this.state.visitor)
		visitor[event.target.id] = event.target.value
		this.setState({
			visitor: visitor
		})
	}

	submitInfoRequest(event){
		event.preventDefault()

		var missingField = this.validate(this.state.visitor, false);
		if (missingField != null){
			alert('Please enter your '+missingField);
			return
		}

		this.setState({
			showLoader: true
		})

		var pkg = Object.assign({}, this.state.visitor)
		var _this = this
		api.handlePost('/api/info', pkg, function(err, response){
			_this.setState({
				showLoader: false
			})

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		})
	}


	validate(profile, withPassword){
		if (profile.name.length == 0)
			return 'Name'

		if (profile.email.length == 0)
			return 'Email'

		if (withPassword == false)
			return null

		if (profile.password.length == 0)
			return 'Password'

		return null // this is successful
	}


	render(){

		return (
		        <section id="slider" style={{background: 'url("/images/joe_light_blue.png") center', overflow:'visible'}} data-height-lg="450" data-height-md="450" data-height-sm="600" data-height-xs="600" data-height-xxs="600">
					<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
		            <br />
		            <div className="container clearfix">
		                <form action="#" method="post" role="form" className="landing-wide-form landing-form-overlay dark clearfix">
		                    <div className="heading-block nobottommargin nobottomborder">
		                        <h4>Start your Programming Career</h4>
		                    </div>
		                    <div className="line" style={{ margin: '15px 0 30px' }}></div>
		                    <div className="col_full">
		                        <input onChange={this.updateVisitor} id="name" type="text" className="form-control input-lg not-dark" placeholder="Name" />
		                    </div>
		                    <div className="col_full">
		                        <input onChange={this.updateVisitor} id="email" type="text" className="form-control input-lg not-dark" placeholder="Email" />
		                    </div>
		                    <div className="col_full">
								<label for="template-contactform-subject">I am interested in</label>
								<select onChange={this.updateVisitor} value={this.state.visitor.course} id="course" className="form-control input-lg not-dark">
									<option value="fundamentals-bootcamp">Fundamentals Bootcamp</option>
									<option value="mvp-bootcamp">MVP Bootcamp</option>
								</select>
		                    </div>

		                    <div className="col_full nobottommargin">
		                        <button onClick={this.submitInfoRequest} className="btn btn-lg btn-danger btn-block nomargin" value="submit">Request Syllabus</button>
		                    </div>
		                </form>

		            </div>
		        </section>

		)
	}

}

const stateToProps = function(state) {
    return {
        loaderOptions: state.staticReducer.loaderConfig
    }
}

export default connect(stateToProps)(Header)
