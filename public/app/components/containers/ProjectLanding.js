import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import ProjectCard from '../../components/ProjectCard'
import Register from '../../components/Register'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import store from '../../stores/store'
import actions from '../../actions/actions'
import stripe from '../../utils/StripeUtils'
import api from '../../api/api'

class Landing extends Component {

	constructor(props, context){
		super(props, context)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.state = {
			membershiptype: 'Basic',
			visitor: {
				name: '',
				email: '',
				phone: '',
				course: '',
				referral: ''
			}
		}
	}

	componentDidMount(){
		var _this = this
		api.handleGet('/api/project', null, function(err, response){
			if (err){
				return
			}

			store.dispatch(actions.projectsRecieved(response.projects))
		})
	}

	updateVisitor(event){
		event.preventDefault()

		var visitor = Object.assign({}, this.state.visitor)
		visitor[event.target.id] = event.target.value
		this.setState({
			visitor: visitor
		})
	}

	
	render(){
		var projectList = this.props.projects.map(function(project, i){
			return <ProjectCard key={project.id} project={project} />
		})

		return (
			<div>
				<Nav />

		        <section id="slider" style={{background: 'url("/images/joe_light_blue.png") center', overflow:'visible'}} data-height-lg="450" data-height-md="450" data-height-sm="600" data-height-xs="600" data-height-xxs="600">
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


				<section>
					<div className="content-wrap">
		                <div className="promo promo-dark promo-full landing-promo header-stick">
		                    <div className="container clearfix">
		                        <h3>Build Real Products</h3>
		                        <span>
		                        	Velocity 360 is the only coding bootcamp that uses real <br />
		                        	projects from local startups to teach students.
		                        </span>
		                    </div>
		                </div>

						<div className="container clearfix" style={{paddingTop:64}}>

							{ projectList }

							<div className="col_one_third bottommargin-sm col_last">
								<div className="widget clearfix" style={{borderRadius:2, padding:24, textAlign:'center', border:'1px solid #ddd', background:'#F9FCFF'}}>
									<h4>Featured App</h4>
									<img style={{width:128, border:'1px solid #ddd'}} src="/images/radius.png" alt="Velocity 360" />
									<h3 style={{marginBottom:6, marginTop:9}}>
										<a href="/project/123">Radius</a>
									</h3>
									<hr />
									<strong>iOS App</strong>
									<br />
									<p>
										Radius is a job-searching app aimed at part time workers, students, and 
										short term service providers like dog-walkers or furniture movers. It utilizes 
										the GPS functionality on the iPhone to find jobs nearby and also to find workers 
										in the area.
									</p>

									<div className="tagcloud">
										<a style={{background:'#fff'}} href="#">iOS</a>
										<a style={{background:'#fff'}} href="#">Node JS</a>
										<a style={{background:'#fff'}} href="#">REST API</a>
										<a style={{background:'#fff'}} href="#">JavaScript</a>
									</div>
								</div>
							</div>


						</div>
					</div>
				</section>

				<Register />
				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {
    return {
        currentUser: state.profileReducer.currentUser,
        projects: state.projectReducer.projectsArray
    }
}

export default connect(stateToProps)(Landing)
