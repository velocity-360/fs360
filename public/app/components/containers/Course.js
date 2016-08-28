import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import { Nav, CourseCard, Application } from '../../components'
import { api, TrackingManager } from '../../utils'
import store from '../../stores/store'
import actions from '../../actions/actions'

class Course extends Component {

	constructor(props, context){
		super(props, context)
		this.toggleApplication = this.toggleApplication.bind(this)
		this.submitApplication = this.submitApplication.bind(this)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.showPaypal = this.showPaypal.bind(this)
		this.submitSyllabusRequest = this.submitSyllabusRequest.bind(this)
		this.validate = this.validate.bind(this)
		this.state = {
			showLoader: false,
			showApplication: false,
			visitor: {
				name: '',
				email: '',
				subject: 'Syllabus Request'
			}
		}
	}

	toggleApplication(event){
		if (event != null)
			event.preventDefault()

		const showApplication = !this.state.showApplication
		this.setState({
			showApplication: showApplication
		})
	}	

	submitApplication(application){
		const course = this.props.courses[this.props.slug]
		this.setState({
			showLoader: true,
			showApplication: false
		})

		application['course'] = course.title
		api.handlePost('/account/application', application, (err, response) => {
			this.setState({showLoader: false})

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		})
	}

	updateVisitor(event){
		var updatedVisitor = Object.assign({}, this.state.visitor)
		updatedVisitor[event.target.id] = event.target.value
		this.setState({
			visitor: updatedVisitor
		})		
	}

	subscribe(event){
		event.preventDefault()
		if (this.state.visitor.name.length == 0){
			alert('Please enter your name.')
			return
		}

		if (this.state.visitor.email.length == 0){
			alert('Please enter your email.')
			return
		}

		this.setState({showLoader: true})

		var s = Object.assign({}, this.state.visitor)
		var parts = s.name.split(' ')
		s['firstName'] = parts[0]
		if (parts.length > 1)
			s['lastName'] = parts[parts.length-1]

		const course = this.props.courses[this.props.slug]
		s['source'] = course.title
		s['subject'] = 'New Subscriber'
		s['confirmation'] = 'Thanks for subscribing! Stay tuned for more tutorials, events and upcoming courses!'
		api.handlePost('/account/subscribe', s, (err, response) => {
			this.setState({showLoader: false})
			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
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

		const course = this.props.courses[this.props.slug]
		pkg['pdf'] = course.syllabus
		pkg['course'] = course.title
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

	showPaypal(event){
		event.preventDefault()
		const course = this.props.courses[this.props.slug]
		if (course.discountPaypalLink.length == 0){ // no discount code
			window.open(course.paypalLink, 'Velocity 360', 'width=650,height=900')
			return
		}

		const promoCode = this.state.promoCode.trim()
		if (promoCode.length == 0){
			window.open(course.paypalLink, 'Velocity 360', 'width=650,height=900')
			return
		}

		if (course.promoCodes.indexOf(promoCode) == -1){
			window.open(course.paypalLink, 'Velocity 360', 'width=650,height=900')
			return
		}

		// successful promo code
		window.open(course.discountPaypalLink, 'Velocity 360', 'width=650,height=900')
	}

	render(){
		const course = this.props.courses[this.props.slug]
		const units = course.units.map((unit, i) => {
			return (
				<div key={i} className="entry clearfix" style={{border:'none'}}>
					<div className="entry-timeline">
						Unit<span>{i+1}</span>
						<div className="timeline-divider"></div>
					</div>
					<div className="panel panel-default" style={{maxWidth:520}}>
						<div className="panel-body" style={{padding:36}}>
							<h3>
								<a href="#" style={{marginRight:12}} className="btn btn-info"><strong>{unit.topic}</strong></a>
							</h3>
							<hr />
							{unit.description}<br />
						</div>
					</div>
				</div>
			)
		})

		const faq = this.props.faq.general.map((question, i) => {
			return (
            	<div key={i}>
                    <div style={{background:'#fff'}} className="acctitle"><i className="acc-closed icon-question-sign"></i><i className="acc-open icon-question-sign"></i>{question.question}</div>
                    <div style={{background:'#fff'}} className="acc_content clearfix" dangerouslySetInnerHTML={{__html: question.answer }}></div>
               	</div>
			)
		})

		const instructors = this.props.instructors.map((instructor, i) => {
			return (
                <div key={i} className="col-md-12 bottommargin">
                    <div className="team team-list">
                        <div className="team-desc">
                            <div className="team-title">
                                <img style={{width:96, marginBottom:6}} src={'/images/'+instructor.image} alt="Velocity 360" />
                            	<h4 style={{marginBottom:12}}>{instructor.name}</h4>
								<div className="tagcloud">
                                    <a style={style.tag} href="#">Node JS</a>
                                    <a style={style.tag} href="#">React</a>
                                    <a style={style.tag} href="#">Angular JS</a>
                                    <a style={style.tag} href="#">JQuery</a>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                            <div className="team-content">{instructor.bio}</div>
                        </div>
                    </div>
                </div>
			)
		})

		var sidemenu = null
		var btnApply = null
		var who = null
		var tuition = null
		var admissions = null
		var syllabus = null
		var cta = null
		if (course.type == 'immersive'){ // bootcamp
			sidemenu = (
				<ul>
					<li><a href="#introduction">Introduction</a></li>
					<li><a href="#who">Who</a></li>
					<li><a href="#curriculum">Curriculum</a></li>
					<li><a href="#tuition">Tuition</a></li>
					<li><a href="#instructors">Instructors</a></li>
					<li><a href="#faq">FAQ</a></li>
					<li><a href="#admissions">Admissions</a></li>
				</ul>				
			)

			btnApply = <a onClick={this.toggleApplication} href="#" className="apply">Apply</a>
			cta = (
				<div style={{paddingTop:16}}>
					<hr />
					<a href="#newsletter">Request Syllabus</a>
	                <input onChange={this.updateVisitor} id="name" type="name" style={style.input} className="custom-input" placeholder="Name" /><br />
	                <input onChange={this.updateVisitor} id="email" type="email" style={style.input} className="custom-input" placeholder="Email" /><br />
					<a onClick={this.submitSyllabusRequest} href="#" style={{marginRight:12, color:'#fff'}} className="btn btn-info">Request Syllabus</a>
				</div>				
			)

			who = (
				<article id="who" className="overview" style={style.articleSection}>
					<h2>Who</h2>
					<div className="image">
						<img style={{width:220, background:'#fff', padding:6, border:'1px solid #ddd', marginLeft:12}} src="/images/group.JPG" alt="Velocity 360" />
					</div>
					<p>
						The {course.title} is designed for beginner to intermediate programmers. 
						A typical applicant has written basic code before, possibly 
						tinkered with jQuery and JavaScript and/or a framework like Ruby on Rails. 
						You should be comfortable writing  simple programs to perform string 
						manipulation, arithmetic operations, etc. HTML should be 
						familiar as well. This should not be your first time coding. 
						If you are a beginner who is looking for the next step and is 
						eager to learn, this course is for you.
					</p>
				</article>
			)
			
			tuition = (
				<article id="tuition" className="overview" style={style.articleSection}>
					<h2>Tuition</h2>
					<div className="col_full nobottommargin">
						<p className="about" style={{marginBottom:6}}>Tuition</p>
						<p>
							Tuition is ${course.tuition} with a ${course.deposit} deposit to reserve your spot. 
							A $500 discount will be applied to those who pay in full 
							at the start of the course. Otherwise, payments can be 
							made in bi-weekly installments throughout the duration of 
							the course.
						</p>
                    </div>
					<div style={{marginTop:24}} className="col_full nobottommargin">
						<p className="about" style={{marginBottom:6}}>Scholarships</p>
						<p>
							A $1,000 scholarship is available to any woman admitted to the course. Further, 
							two full scholarships are allotted in each class for highly qualified 
							candidates. Full scholarships will be awarded solely on merit. Our holistic 
							review considers factors such as aptitude, coding ability, and problem-solving 
							determination. An award determination is made after your in-person code review. 
							You will be notified of your scholarship award before the 
							start of class, if applicable.
						</p>
                    </div>
					<div style={{marginTop:24}} className="col_full nobottommargin">
						<p className="about" style={{marginBottom:6}}>Deadline</p>
						<p>
							The deadline for application is September 26th for regular applicants. To 
							be eligible for the full scholarship, the deadline is September 19th.
						</p>
                    </div>
				</article>
			)

			admissions = (
				<article id="admissions" className="overview" style={style.articleSection}>
					<h2>Admissions</h2>
					<a href="#" style={{marginRight:12}} className="btn btn-info">Step 1</a><strong>Apply</strong>
					<p style={{marginTop:10}}>
						Complete our online application by midnight August 29th to 
						apply for the course. All applicants will be considered for 
						the full scholarships.
					</p>

					<a href="#" style={{marginRight:12}} className="btn btn-info">Step 2</a><strong>Phone Interview</strong>
					<p style={{marginTop:10}}>
						All applicants will undergo a 15-30 minute phone interview as a first technical 
						assessment. You should feel comfortable speaking about prior programming experience.
					</p>

					<a href="#" style={{marginRight:12}} className="btn btn-info">Step 3</a><strong>In-person code review</strong>
					<p style={{marginTop:10}}>
						After the phone screen, the next step is  
						an in-person code review. Here you’ll sit down with one of 
						our instructors and complete our day 1 coding assignment. 
						Rather than an algorithms assignment, you will work with an 
						instructor to spin up a simple Node server to render a page. 
						This should take about an hour, and will determine your 
						preparedness for the pace of the course.
					</p>

					<a href="#" style={{marginRight:12}} className="btn btn-info">Step 4</a>
					<strong>Decision</strong>
					<p style={{marginTop:10}}>
						You will receive an email with your application decision. 
						You will have 7 days from your acceptance letter to make your 
						deposit. After 7 days, your spot will be forfeited.
					</p>

					<hr />
					<a onClick={this.toggleApplication} href="#" className="btn btn-lg btn-success">Apply</a>
				</article>
			)
			
			syllabus = (
				<article id="syllabus" className="overview">
					<div className="container">
						<h2 style={{marginTop:24}}>Request Syllabus</h2>
						<div className="panel panel-default">
							<div className="panel-body" style={{padding:36}}>
								<h3>Download Full syllabus</h3>
								<hr />
								<p style={{marginBottom:16}}>
									Sign up below to get our course syllabus, and to stay informed about Velocity 360.
								</p>
		                        <input onChange={this.updateVisitor} id="name" type="name" style={{borderRadius:'0px !important', background:'#FEF9E7'}} className="custom-input" placeholder="Name" /><br />
		                        <input onChange={this.updateVisitor} id="email" type="email" style={{borderRadius:'0px !important', background:'#FEF9E7'}} className="custom-input" placeholder="Email" /><br />
								<a onClick={this.submitSyllabusRequest} href="#" style={{marginRight:12}} className="btn btn-info">Submit</a>
							</div>
						</div>
					</div>
				</article>
			)
		}

		if (course.type == 'live'){ // part time course
			sidemenu = (
				<ul>
					<li><a href="#introduction">Introduction</a></li>
					<li><a href="#curriculum">Curriculum</a></li>
					<li><a href="#tuition">Tuition</a></li>
					<li><a href="#instructors">Instructors</a></li>
					<li><a href="#faq">FAQ</a></li>
					<li><a onClick={this.showPaypal} href="#register" className="apply">Register</a></li>
				</ul>				
			)

			cta = (
				<div style={{paddingTop:16}}>
					<a href="#newsletter">Newsletter</a>
					<p style={{marginBottom:16, fontSize:13}}>
						Sign up to our newsletter to stay informed about upcoming tutorials, events, and courses.
					</p>
                    <input onChange={this.updateVisitor} id="name" type="name" style={style.input} className="custom-input" placeholder="Name" /><br />
                    <input onChange={this.updateVisitor} id="email" type="email" style={style.input} className="custom-input" placeholder="Email" /><br />
					<a onClick={this.subscribe} href="#" style={{marginRight:12, color:'#fff'}} className="btn btn-info">Submit</a>
				</div>
			)

			tuition = (
				<article id="tuition" className="overview" style={style.articleSection}>
					<div className="container">
						<h2 style={{marginTop:24}}>Tuition</h2>
						<p>
							Tuition is ${course.tuition} with a ${course.deposit} deposit to reserve your spot. 
							A $200 discount will be applied to those who pay in full 
							at the start of the course. Otherwise, payments can be 
							made in bi-weekly installments throughout the duration of 
							the course.
						</p>
					</div>
				</article>
			)
		}

		return (
			<div id="wrapper" className="clearfix">
				<Nav headerStyle="dark" />

				<section id="lpf-header" style={{backgroundImage: "url('/images/joe_light_blue.png')"}}>
					<header>
						<div className="content-wrapper dark">
							<div className="content">
								<h2>{course.title}</h2>
								<h4 className="muted">
									Learn Fullstack Development for Web and Mobile with Node, React, React Native
								</h4>
								{	(course.type == 'immersive') ?
									<a onClick={this.toggleApplication} href="#" style={{marginTop:0}} className="button button-glass">Apply</a>
									:
									<a onClick={this.showPaypal} href="#" style={{marginTop:0}} className="button button-glass">Register</a>
								}
							</div>
						</div>
					</header>
				</section>

				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<section id="content" style={{background:'#f9f9f9'}}>
					<div className="content-wrap">
						<div id="lpf-content">
							<main>
								<div className="aside-toggle">
									<div></div>
								</div>

								<aside>
									<nav style={{padding:16, background:'#fff', border:'1px solid #ddd'}}>
										{sidemenu}
										{btnApply}
										{cta}
									</nav>
								</aside>

								<div className="content" style={{background:'#f9f9f9', paddingTop:22}}>

									<article className="overview" style={style.article}>
										<div className="container">
											<div className="panel panel-default">

												<article id="introduction" className="overview" style={style.articleSection}>
													<h2>{course.title}</h2>
													<div className="row">
														<div className="col-md-4">
															<img style={{width:180, background:'#fff', marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=320'} alt="Velocity 360" />

														</div>
														<div className="col-md-8">
															<p style={{background:'#f9f9f9', padding:12, border:'1px solid #ddd'}} className="about">
																{course.dates}<br />{course.schedule}
															</p>
														</div>
													</div>

													<p>{course.description}</p>
												</article>

												{who}

												<article id="curriculum" className="overview" style={{margin:'auto', padding:32}}>
													<h2>Curriculum</h2>
													<div className="postcontent clearfix" style={{paddingBottom:64}}>
														<div id="posts" className="post-timeline clearfix">
															<div className="timeline-border"></div>
															{units}
														</div>
													</div>
												</article>

								                <div className="clearfix"></div>
												{tuition}

												<article id="instructors" className="overview" style={{margin:'auto', padding:32}}>
													<h2>Instructors</h2>
													{instructors}
												</article>

								                <div className="clearfix"></div>

												<article id="faq" className="overview" style={style.articleSection}>
													<h2>FAQ</h2>
													<div className="col_full nobottommargin">
								                        <div className="accordion accordion-border clearfix" data-state="closed">
								                        	{faq}
								                        </div>
								                    </div>
												</article>

												{admissions}

											</div>
										</div>
									</article>

								</div>
							</main>
						</div>
					</div>
				</section>

				<Modal bsSize="large" show={this.state.showApplication} onHide={this.toggleApplication}>
					<Application onSubmit={this.submitApplication} />
				</Modal>

			</div>
		)
	}
}


const style = {
	header: {
		marginBottom:0,
		marginTop:0,
	},

	panelBody: {
		padding:36,
		borderBottom:'1px solid #ddd'
	},
	sidebar: {
		padding:16,
		background:'#fff',
		border:'1px solid #ddd'
	},
	input: {
		borderRadius:'0px !important',
		background:'#FEF9E7'
	},
	article: {
		marginTop: 46
	},
	articleSection: {
		margin: 'auto',
		padding: 32,
		borderBottom: '1px solid #ddd'
	},
	tag: {
		background: '#f9f9f9'
	}
}

const stateToProps = function(state) {
    return {
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courses,
        loaderOptions: state.staticReducer.loaderConfig,
        faq: state.staticReducer.faq,
        instructors: state.staticReducer.instructors

    }
}


export default connect(stateToProps)(Course)