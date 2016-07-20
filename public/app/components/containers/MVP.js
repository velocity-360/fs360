import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import Loader from 'react-loader'
import Nav from '../../components/Nav'
import Register from '../../components/Register'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RightSidebar from '../../components/RightSidebar'
import api from '../../api/api'


class MVP extends Component {

	constructor(props, context){
		super(props, context)
		this.updateProposal = this.updateProposal.bind(this)
		this.submitProposal = this.submitProposal.bind(this)
		this.state = {
			showLoader: false,
			proposal: {
				name: '',
				email: '',
				summary: ''
			}
		}
	}

	updateProposal(event){
		var proposal = Object.assign({}, this.state.proposal)
		proposal[event.target.id] = event.target.value
		this.setState({
			proposal: proposal
		})
	}

	submitProposal(event){
		event.preventDefault()
		console.log('submitProposal: '+JSON.stringify(this.state.proposal))

		if (this.state.proposal.name.length == 0){
			alert('Please enter your name.')
			return
		}

		if (this.state.proposal.email.length == 0){
			alert('Please enter your email.')
			return
		}

		if (this.state.proposal.summary.length == 0){
			alert('Please enter the summary for your project.')
			return
		}


		var _this = this
		_this.setState({showLoader: true})
		api.handlePost('/api/proposal', this.state.proposal, function(err, response){
			_this.setState({showLoader: false})

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		})
	}

	render(){
		return (
			<div>
				<Nav />

		        <section id="slider" className="slider-parallax dark full-screen" style={{background:'url("/images/lounge.jpg") center'}}>
		            <div className="container clearfix">

		                <div className="vertical-middle">

		                    <div className="heading-block center nobottomborder">
		                        <h1 data-animate="fadeInUp">8-Week MVP Program</h1>
								<img style={{width:124, borderRadius:62}} src='/images/logo_round_green_260.png' alt="Velocity 360" />
		                        <span data-animate="fadeInUp" data-delay="300">
		                        	Oct 31st - Jan 6th<br />
		                        	27 East 28th Street<br />
		                        	NYC
		                        </span>
		                    </div>

		                </div>
		            </div>
		        </section>

				<section id="content">
					<div className="content-wrap">
					<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />

						<div className="container clearfix">
							<div className="col_two_third bottommargin-sm">
			                    <div className="fancy-title title-bottom-border">
			                        <h2 style={{fontWeight:400}}>Overview</h2>
			                    </div>
								<img style={{background:'#fff', float:'right', border:'1px solid #ddd', maxWidth: 260, padding:6, marginLeft:12}} className="image_fade" src='/images/group.JPG' alt="Velocity 360" />
								<div>
									<p>
										The Velocity 360 MVP Program brings together local startups in need of 
										software development for an initial prototype - often referred to as a 
										"minimal viable product" or MVP. Over a period of eight weeks, our cohort 
										will work with a handful of startups from NYC to build a fully functional 
										product through our full time 8-week bootcamp program. The tech stack will 
										be very modern and scalable: Node JS, React, and React Native for mobile 
										development.
									</p>

									<h3 style={{fontWeight:400, marginBottom:0}}>Cohort Students</h3>
									<p>
										The students in the cohort are aspiring software developers mostly from the 
										area. As a result, startup founders and students can continue working beyond 
										the timeframe of the bootcamp. Students are generally professionals 5-10 years 
										out of college and in the process of changing careers. All students are vetted 
										for educational background, aptitude, and interpersonal dynamic.
									</p>

									<h3 style={{fontWeight:400, marginBottom:0}}>Startups</h3>
									<p>
										Velocity 360 works with startups in need of technical development for 
										their MVP. This means there should be no technical co-founder on the team and 
										development should not have begun. The MVP program is not a good fit if the 
										following applies your team:
										<br />1) At least one technical member
										<br />2) Outsourced development to a third-party development shop, domestic or overseas
									</p>

									<h3 style={{fontWeight:400, marginBottom:0}}>Terms</h3>
									<p>
										The 8-Week MVP Program will run from October 31st through January 6th (two 
										weeks scheduled off for Thanksgiving and Christmas/New Years). Velocity 
										360 will not have an equity position in any of the projects and will not own 
										the intellectual property rights of the software developed. These matters will 
										be coordinated between the students and the founders on an individual basis. 
										However, Velocity 360 will secure a $1,000 deposit from the startups to ensure 
										continued interest to completing the project.
									</p>

				                    <img style={{marginBottom:6, maxWidth:400}} src="/images/wework-2.jpg" /><br />
				                    <i style={{fontWeight:100}}>* All courses and events are held at our WeWork Location on 28th Street.</i>

								</div>

			                    <div style={{marginTop:64}} className="fancy-title title-bottom-border">
			                        <h2 style={{fontWeight:400}}>Submit Project Proposal</h2>
			                    </div>
								<div className='col_full panel panel-default'>
									<div style={{backgroundColor:'#f1f9f5', textAlign:'left'}} className="panel-heading">Proposal</div>
									<div className="panel-body" style={{textAlign:'left'}}>
										Date: Oct 31 - Jan 6th<br />
										Deposit: $1,000 (refunded upon completion)<br />
										<hr />
										<input onChange={this.updateProposal} type="text" id="name" placeholder="Name" className="form-control" style={{background:'#f9f9f9'}} /><br />
										<input onChange={this.updateProposal} type="text" id="email" placeholder="Email" className="form-control" style={{background:'#f9f9f9'}} /><br />
										<textarea onChange={this.updateProposal} id="summary" className="form-control" style={{background:'#f9f9f9', height:120}} placeholder="Please describe your project, team members, and current progress."></textarea><br />
										<a onClick={this.submitProposal} href="#" className="button button-border button-dark button-rounded noleftmargin">Submit</a>
									</div>

								</div>

							</div>

							<div className="col_one_third bottommargin-sm hidden-xs col_last" style={{borderLeft: '1px solid #ddd', padding: 36}}>
								<RightSidebar />
							</div>			

						</div>
					</div>
				</section>

			</div>
		)
	}
}

const stateToProps = function(state) {
    return {
        loaderOptions: state.staticReducer.loaderConfig,
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courseArray,
        events: state.eventReducer.events
    }
}

export default connect(stateToProps)(MVP)

