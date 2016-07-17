import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import Nav from '../../components/Nav'
import Register from '../../components/Register'
import Header from '../../components/Header'
import Footer from '../../components/Footer'


class Landing extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {

		}
	}

	componentDidMount(){

	}

	render(){
		var courses = this.props.courses.map(function(course, i){
			return (
                <div key={course.id} className="col-md-12 bottommargin">
                    <div className="team team-list clearfix">
                        <div className="team-image" style={{width: 150}}>
                            <img className="img-circle" src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=260'} alt="Velocity 360" />
                        </div>
                        <div className="team-desc">
                            <div className="team-title">
	                            <h4 style={{fontWeight:400}}><a href={'/course/'+course.slug}>{course.title}</a></h4>
	                            <span style={{color:'#444'}}>{course.dates}</span><br />
	                            <span style={{color:'#444'}}>{course.schedule}</span>
                            </div>
                            <div className="team-content">{course.description}</div>
                        </div>
                    </div>
                </div>
			)
		})

		var headerString = 'Learn Tomorrow\'s Technology Today'

		return (
			<div>
				<Nav />
				<Header />

				<section>
					<div className="content-wrap">
		                <div className="promo promo-dark promo-full landing-promo header-stick">
		                    <div className="container clearfix">
		                        <h3>{headerString}</h3>
		                        <span>
		                        	Velocity 360 is the only coding bootcamp that delivers a full stack education <br />
		                        	with the most cutting edge tech: Node, React, Redux, and React Native.
		                        </span>
		                    </div>
		                </div>

						<div className="container clearfix" style={{paddingTop:64}}>
							<div className="col_two_third bottommargin-sm">
			                    <div className="fancy-title title-bottom-border">
			                        <h2 style={{fontWeight:400}}>In Demand Technology</h2>
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
									<h4>Featured Tutorial</h4>
									<div className={'wistia_embed wistia_async_ehbr4b234p videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>
									<hr />
									<strong>Setting Up a Node JS Project</strong>
									<br /><br />
									<p>
										Set up a basic project using Express and use http request details from the 
										browser to generate dynamic responses. 
									</p>
									<div className="tagcloud">
										<a style={{background:'#fff'}} href="#">JavaScript</a>
										<a style={{background:'#fff'}} href="#">Node JS</a>
										<a style={{background:'#fff'}} href="#">Express</a>
										<a style={{background:'#fff'}} href="#">Mongo DB</a>
									</div>

								</div>
							</div>							

						</div>
					</div>
				</section>

				<section style={{background:'#f9f9f9', paddingTop:48, borderTop:'1px solid #ddd'}}>
					<div className="heading-block center">
						<h2 style={{fontWeight:400}}>Bootcamps</h2>
					</div>

					<div className="content-wrap" style={{paddingTop:0}}>
						<div className="container clearfix">

			                    {courses}

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
        courses: state.courseReducer.courseArray
    }
}

export default connect(stateToProps)(Landing)
