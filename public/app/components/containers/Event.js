import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import Nav from '../../components/Nav'
import Register from '../../components/Register'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'


class Event extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {
			showLoader: false
		}
	}

	render(){

		return (
			<div>
				<Nav />

		        <section id="slider" className="slider-parallax dark full-screen" style={{background:'url("/images/lounge.jpg") center'}}>
					<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
		            <div className="container clearfix">

		                <div className="vertical-middle">

		                    <div className="heading-block center nobottomborder">
		                        <h1 data-animate="fadeInUp">{this.props.event.title}</h1>
								<img style={{width:124, borderRadius:62}} src={'https://media-service.appspot.com/site/images/'+this.props.event.image+'?crop=260'} alt="Velocity 360" />
		                        <span data-animate="fadeInUp" data-delay="300">
		                        	{this.props.event.date} | {this.props.event.time}
		                        </span>
		                    </div>

		                </div>
		            </div>
		        </section>


				<section id="content">
					<div className="content-wrap">

						<div className="container clearfix">
							<div className="col_two_third bottommargin-sm">
			                    <div className="fancy-title title-bottom-border">
			                        <h2 style={{fontWeight:400}}>Highly Demanded Skills</h2>
			                    </div>
								<img style={{background:'#fff', float:'left', border:'1px solid #ddd', maxWidth: 260, padding:6, marginRight:12}} className="image_fade" src="/images/class.jpg" alt="Velocity 360" />
								<h3 style={{marginBottom:6, fontWeight:400}}>Industry Driven</h3>
								<p>
									Technology, more than any other industry, changes rapidly and many fall behind. As a 
									newcomer to tech, it is imperative to understand the trends and develop the skills
									that will be valued tomorrow over those in demand today. Velocity 360 strongly prepares 
									students under that guiding principle. Our curriculum is highly focused on the bleeding 
									edge of tech evolution: Node JS, React, Redux, and React Native. 
								</p>

								<h3 style={{marginBottom:6, fontWeight:400}}>Modern Curriculum</h3>
								<p>
									While other bootcamps continue to teach Ruby on Rails (Dev Bootcamp, Flatiron School, 
									General Assembly, NYCDA, App Academy, etc) and have been doing so for several years, 
									Velocity 360 is the only bootcamp in NYC that focuses on the tremendously growing 
									Node/React/React-Native ecosystem. Rather than joining the mass of Ruby on Rails 
									devs that graduate from bootcamps every three months, you will leave Velocity 360 with 
									the skills highly in demand yet hard to find in the tech world. 
								</p>

			                    <img src="/images/wework.jpg" />
			                    <i style={{fontWeight:100}}>* Courses are held at our WeWork Location on 28th Street.</i>
							</div>

							<div className="col_one_third bottommargin-sm hidden-xs col_last" style={{borderLeft: '1px solid #ddd', padding: 36}}>

								<div className="widget clearfix">
									<h4>Recent Posts</h4>
									<hr />
									<a href="/feed">View All</a>
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
        loaderOptions: state.staticReducer.loaderConfig,
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courseArray,
        event: state.eventReducer.eventArray[0]
    }
}

export default connect(stateToProps)(Event)

