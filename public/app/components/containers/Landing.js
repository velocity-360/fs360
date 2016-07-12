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
			var cls = (i==0) ? 'col_half panel panel-default' : 'col_half panel panel-default col_last'
			return (
                <div key={course.id} className={cls}>
                    <div className="panel-heading">
                        <h2 className="panel-title">
                        	<a style={{color:'#1ABC9C'}} href="#">{course.title}</a>
                        </h2>
                    </div>
                    <div className="panel-body" style={{background:'#FFFDFD'}}>
                    	{course.description}
                        <br /><br />
                        <ul style={{listStyle: 'none', fontWeight:'600'}}>
                            <li>{course.dates}</li>
                            <li>{course.schedule}</li>
                        </ul>
						<a href={'/course/'+course.slug} className="button button-rounded button-reveal button-large button-border tright">
							<i className="icon-signal"></i>
							<span>Apply</span>
						</a>
                    </div>
                </div>
			)

		})

		return (
			<div>
				<Nav />
				<Header />

				<section>
					<div className="content-wrap">
		                <div className="promo promo-dark promo-full landing-promo header-stick">
		                    <div className="container clearfix">
		                        <h3>Build Real Products</h3>
		                        <span>
		                        	Velocity 360 is the only coding bootcamp that uses real projects from<br />
		                        	local startups to teach students.
		                        </span>
		                    </div>
		                </div>

						<div className="container clearfix" style={{paddingTop:64}}>
							<div className="col_two_third bottommargin-sm">
			                    <div className="fancy-title title-bottom-border">
			                        <h3>Real World Experience</h3>
			                    </div>
								<p>
									<img style={{background:'#fff', float:'left', border:'1px solid #ddd', maxWidth: 260, padding:6, marginRight:12}} className="image_fade" src="/images/class.jpg" alt="Velocity 360" />
									The Velocity 360 program provides real development experience by partnering with local 
									startups to build their prototypes (often referred to as 'MVP' - Minimal Viable Product). 
									After a 6-week period covering programming fundamentals, students work in groups of 2-4 
									on an actual project that was pre-vetted by the Velocity 360 team.
									<br /><br />
									At the end of the program, students will publish a real, live product that will be 
									further supported by the startup team. As such, students will already have a professional project on 
									their portfolio immediately upon completion and may even continue with the project beyond 
									the course.
								</p>

			                    <div className="fancy-title title-bottom-border">
			                        <h3>How It Works</h3>
			                    </div>
								The Velocity Bootcamp Program is divided into two parts.
								<br /><br />

								{courses}

		                        <div className="clearfix"></div>
								Each section is a stand-alone course meaning students can enroll in one and not the other. 
								However, the MVP Bootcamp requires working knowledge of the material covered in the Fundamentals 
								Course so students should not be complete beginners for this sequence. The tuition for each course 
								is $6,500 but when taken together, the combined tuition is $11,500.<br />
								All live classes take place in our NYC location:<br /><br />
								<strong>Velocity 360</strong><br />
								<strong>27 East 28th Street</strong><br />
								<strong>New York, NY, 10016</strong>
							</div>

							<div className="col_one_third bottommargin-sm hidden-xs col_last">

								<div className="widget clearfix" style={{padding:24, textAlign:'center', border:'1px solid #ddd', background:'#f9f9f9'}}>
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

								<div className="widget clearfix" style={{padding:24, textAlign:'center', border:'1px solid #ddd', background:'#F9FCFF'}}>
									<h4>Featured App</h4>
									<img style={{width:128, border:'1px solid #ddd'}} src="/images/radius.png" alt="Velocity 360" />
									<h3 style={{marginBottom:6, marginTop:9}}>
										<a target="_blank" href="https://itunes.apple.com/us/app/mercurymq-radius/id926659377?mt=8">Radius</a>
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

				<section style={{background:'#f9f9f9', paddingTop:48, borderTop:'1px solid #ddd'}}>
					<div className="heading-block center">
						<h2>Part Time Courses</h2>
					</div>

					<div className="content-wrap" style={{paddingTop:0}}>
						<div className="container clearfix">

							<div className="team team-list clearfix">
								<div className="team-image">
									<img style={{border:'1px solid #ddd'}} src="/images/xcode.jpg" alt="Velocity 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>iOS &amp; Node Evening Course</h4>
										<span>August 8th - September 28th</span>
										<span>Mon/Weds 6pm - 9pm</span>
									</div>
									<div className="team-content">
										The 8-week iOS & Node Evening Course takes beginners through the process of 
										designing and programming a basic iOS app from start. Students will create a 
										simple app that utilizes key platform tools including the GPS locator, 
										accelerator, and camera. In addition, the course will explore third party APIs 
										such as Google Maps and Foursquare.
									</div>
									<br />
									<a href="/course/ios-node-evening-course" className="btn btn-success">
										Learn More
									</a>
								</div>
							</div>

							<div style={{margin:36}}></div>

							<div className="team team-list clearfix">
								<div className="team-image">
									<img style={{border:'1px solid #ddd'}} src="/images/react.jpg" alt="Velocity 360" />
								</div>
								<div className="team-desc">
									<div className="team-title">
										<h4>Node &amp; React Evening Course</h4>
										<span>August 9th - September 29th</span>
										<span>Tues/Thurs 6pm - 9pm</span>
									</div>
									<div className="team-content">
										React and NodeThe Node & React Development Evening course is an 8-week class 
										that covers backend and frontend development using the most up-to-date 
										technologies. Using Node JS, Mongo, Express and React (with ES6), we will 
										create a fully functional website with user registration, image uploading, 
										email notification functionality.
									</div>
									<br />
									<a href="/course/node-react-evening-course" className="btn btn-success">
										Learn More
									</a>
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
        courses: state.courseReducer.courseArray
    }
}

export default connect(stateToProps)(Landing)
