import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../stores/store'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'


class Application extends Component {

	render (){
		return (
			<div>
				<Sidebar />

				<section id="content" style={{background:'#f9f9f9'}}>
					<div className="content-wrap">
						<div className="container clearfix">

							<div className="postcontent bothsidebar nobottommargin">
								<h3>Application</h3>
								<hr />

								<div className="contact-widget">

									<div className="contact-form-result"></div>

									<form className="nobottommargin" id="template-contactform" name="template-contactform" action="" method="post">
										<div className="form-process"></div>
										<div className="col_full">
											<label for="template-contactform-name">Name</label>
											<input type="text" id="template-contactform-name" name="template-contactform-name" value="" className="sm-form-control required" />
										</div>

										<div className="col_full">
											<label for="template-contactform-email">Email</label>
											<input type="email" id="template-contactform-email" name="template-contactform-email" value="" className="required email sm-form-control" />
										</div>

										<div className="col_full">
											<label for="template-contactform-phone">Phone</label>
											<input type="text" id="template-contactform-phone" name="template-contactform-phone" value="" className="sm-form-control" />
										</div>

										<div className="clear"></div>

										<div className="col_full">
											<label for="template-contactform-subject">Course</label>
											<select id="course" className="form-control input-lg not-dark">
												<option value="ios intensive">iOS Intensive</option>
												<option value="web intensive">Web Intensive</option>
												<option value="ios hs course">iOS HS Course</option>
												<option value="web hs course">Web HS Course</option>
												<option value="ios bootcamp">iOS Bootcamp</option>
												<option value="web bootcamp">Web Bootcamp</option>
											</select>
										</div>


										<div className="clear"></div>

										<div className="col_full">
											<label for="template-contactform-message">What is your goal in technology for the next 6 to 12 months?</label>
											<textarea className="required sm-form-control" id="template-contactform-message" name="template-contactform-message" rows="6" cols="30"></textarea>
										</div>

										<div className="col_full">
											<label for="template-contactform-message">What have your worked on so far? (GitHub, side projects, etc.)</label>
											<textarea className="required sm-form-control" id="template-contactform-message" name="template-contactform-message" rows="6" cols="30"></textarea>
										</div>

										<div className="col_full hidden">
											<input type="text" id="template-contactform-botcheck" name="template-contactform-botcheck" value="" className="sm-form-control" />
										</div>

										<div className="col_full">
											<a href="#" className="button button-border button-dark button-rounded noleftmargin">Submit</a>
										</div>
									</form>

								</div>

							</div>
						</div>
					</div>

				</section>


				<Footer />
			</div>
		)

	}

	
}

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(state));

    return {
        currentUser: state.profileReducer.currentUser
    }
}


export default connect(stateToProps)(Application)