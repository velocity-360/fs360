import React, {Component} from 'react'

class Application extends Component {

	constructor(props, context){
		super(props, context)
		this.updateApplication = this.updateApplication.bind(this)
		this.submitApplication = this.submitApplication.bind(this)
		this.state = {
			application: {
				name: '',
				email: '',
				phone: '',
				course: '',
				goal: '',
				history: '',
				linkedin: '',
				github:'',
				college:'',
				major:'',
				currentLevel:'total beginner',
				subject: 'Course Application'
			}
		}
	}

	componentDidMount(){

	}

	updateApplication(event){
//		console.log('updateUserApplication: '+event.target.id)
		event.preventDefault()


		var updatedApplication = Object.assign({}, this.state.application)
		updatedApplication[event.target.id] = event.target.value
		this.setState({
			application: updatedApplication
		})
	}


	submitApplication(event){
		event.preventDefault()
		var application = Object.assign({}, this.state.application)
		this.props.onSubmit(application)
	}


	render(){

		return (
			<section id="content" style={{background:'#f9f9f9'}}>
				<div id="application" className="content-wrap">
					<div className="container clearfix">

						<div className="postcontent bothsidebar nobottommargin">
							<h3>Apply</h3>
							<hr />

							<div className="contact-widget">

								<div className="contact-form-result"></div>

								<form className="nobottommargin" id="template-contactform" name="template-contactform" action="" method="post">
									<div className="form-process"></div>
									<div className="col_full">
										<label for="template-contactform-name">Name</label>
										<input type="text" onChange={this.updateApplication} id="name" value={this.state.application.name} name="template-contactform-name" className="sm-form-control required" />
									</div>

									<div className="col_full">
										<label for="template-contactform-email">Email</label>
										<input type="email" onChange={this.updateApplication} id="email" value={this.state.application.email} name="template-contactform-email" className="required email sm-form-control" />
									</div>

									<div className="col_full">
										<label for="template-contactform-phone">Phone</label>
										<input type="text" onChange={this.updateApplication} id="phone" value={this.state.application.phone} name="template-contactform-phone" className="sm-form-control" />
									</div>

									<div className="clear"></div>

									<div className="col_full">
										<label for="template-contactform-message">What is your goal in technology for the next 6 to 12 months?</label>
										<textarea onChange={this.updateApplication} value={this.state.application.goal} className="required sm-form-control" id="goal" name="template-contactform-message" rows="6" cols="30"></textarea>
									</div>

									<div className="col_full">
										<label>GitHub</label>
										<input type="text" onChange={this.updateApplication} id="github" value={this.state.application.github} className="sm-form-control" />
									</div>

									<div className="col_full">
										<label>LinkedIn</label>
										<input type="text" onChange={this.updateApplication} id="linkedin" value={this.state.application.linkedin} className="sm-form-control" />
									</div>

									<div className="col_full hidden">
										<input type="text" id="template-contactform-botcheck" name="template-contactform-botcheck" value="" className="sm-form-control" />
									</div>

									<div className="col_full">
										<label for="template-contactform-subject">Current Level</label>
										<select onChange={this.updateApplication} value={this.state.application.currentLevel} id="currentLevel" className="form-control input-lg not-dark">
											<option value="total beginner">Total beginner - Never coded before</option>
											<option value="getting there">Getting There - A couple online tutorials</option>
											<option value="intermediate">Intermediate - Can build a few projects on my own</option>
											<option value="advanced">Advanced - Professional, looking to learn new skills</option>
										</select>
									</div>

									<div className="col_full">
										<label>Undergraduate College</label>
										<input type="text" onChange={this.updateApplication} id="college" value={this.state.application.college} className="sm-form-control" />
									</div>

									<div className="col_full">
										<label>Undergraduate Major</label>
										<input type="text" onChange={this.updateApplication} id="major" value={this.state.application.major} className="sm-form-control" />
									</div>

									<div className="col_full">
										<a onClick={this.submitApplication} href="#" className="button button-border button-dark button-rounded noleftmargin">Apply</a>
									</div>
								</form>

							</div>

						</div>
					</div>
				</div>
			</section>

		)
	}

}


export default Application

