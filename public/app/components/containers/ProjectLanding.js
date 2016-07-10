import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import ProjectCard from '../../components/ProjectCard'
import Header from '../../components/Header'
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
		this.state = {

		}
	}

	componentDidMount(){
		if (this.props.projects.length > 0)
			return
		

		var _this = this
		api.handleGet('/api/project', null, function(err, response){
			if (err){
				return
			}

			store.currentStore().dispatch(actions.projectsRecieved(response.projects))
		})
	}

	render(){
		var projectList = this.props.projects.map(function(project, i){
			return <ProjectCard key={project.id} project={project} />
		})

		return (
			<div>
				<Nav />
				<Header />

				<section style={{background:'#f9f9f9', borderBottom:'1px solid #ddd'}}>
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
