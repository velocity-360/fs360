import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Nav, Footer, Header } from '../../components'


class Landing extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {

		}
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
	                            <span style={{color:'#444'}}>{course.dates}</span>
	                            <span style={{color:'#444'}}>{course.schedule}</span>
                            </div>
                            <div className="team-content">{course.description}</div>
                        </div>
                    </div>
                </div>
			)
		})

		return (
			<div>
				<Nav />
				<Header />

                <div className="section notopmargin nobottommargin">
                    <div className="container clearfix">
                        <div className="col_half nobottommargin topmargin-lg">
                            <img style={{padding:6, background:'#fff', border:'1px solid #ddd'}} src="/images/girl.png" alt="Velocity 360" className="center-block" />
                        </div>

                        <div className="col_half nobottommargin topmargin-lg col_last">
                            <div className="heading-block topmargin-lg">
                                <h2 style={{fontWeight:300}}>Plan Ahead</h2>
                                <span>Prepare for tomorrow.</span>
                            </div>

                            <p style={style.paragraph}>
                                Technology, more than any other industry, changes rapidly and many fall behind. 
                                As a newcomer to tech, it is imperative to understand the trends and develop the 
                                skills that will be valued tomorrow over those in demand today. Velocity 360 
                                strongly prepares students under that guiding principle. Our curriculum is highly 
                                focused on the bleeding edge of tech evolution: Node JS, React, and React Native.
                            </p>
                            <a href="#" className="button button-border button-rounded button-large button-dark noleftmargin">Learn More</a>
                        </div>
                    </div>
                </div>

                <section id="section-about" className="page-section section nobg nomargin">
                    <div className="container clearfix">
                        <div className="heading-block bottommargin-lg center">
                            <h2 style={style.heading}>The Velocity Advantage</h2>
                        </div>

                        <div className="col_one_third">
                            <div className="heading-block fancy-title nobottomborder title-bottom-border">
                                <h4 style={style.heading}>True Full <span>Stack</span></h4>
                            </div>
                            <img style={{maxWidth:220, marginBottom:12}} src="/images/aws.png" />
                            <p style={style.paragraph}>
                                At Velocity 360, students learn ALL areas of the stack: backend, frontend, mobile, 
                                and even dev ops. Through Node, React and React Native, we are able to focus on a 
                                wider range of areas because the concepts are transferrable. This is a key reason 
                                why React & React Native are becoming so popular - one set of concepts can be applied 
                                to both web and mobile development. Our course highly emphasizes this cross-compatability 
                                preparing students for careers in almost any aspect of software development.
                            </p>
                        </div>

                        <div className="col_one_third">
                            <div className="heading-block fancy-title nobottomborder title-bottom-border">
                                <h4 style={style.heading}>Small <span>Classes</span></h4>
                            </div>
                            <img style={{maxWidth:220, marginBottom:12}} src="/images/class-2.jpg" />
                            <p style={style.paragraph}>
                                The average class size at Velocity is 10 students. We take very careful measures to 
                                ensure that the students selected for each cohort are qualified, motivated and prepared 
                                to succeed beyond the course. The tech bootcamp industry is quickly developing a 
                                reputation for churning out unqualified devs and much of this is due to students enrolling 
                                for the wrong reasons. We make sure our students are pursuing a career in software for the 
                                right reasons.
                            </p>

                        </div>

                        <div className="col_one_third col_last">
                            <div className="heading-block fancy-title nobottomborder title-bottom-border">
                                <h4 style={style.heading}>Modern <span>Curriculum</span></h4>
                            </div>
                            <img style={{maxWidth:220, marginBottom:12}} src="/images/node-react.png" />
                            <p style={style.paragraph}>
                            	While other bootcamps continue to teach Ruby on Rails (Dev Bootcamp, Flatiron 
                            	School, General Assembly, NYCDA, App Academy, etc) and have been doing so for 
                            	several years, Velocity 360 is the only bootcamp in NYC that focuses on the 
                            	tremendously growing Node/React/React-Native ecosystem. Rather than joining the 
                            	mass of Ruby on Rails devs that graduate from bootcamps every three months, you 
                            	will leave Velocity 360 with the skills highly in demand yet hard to find in the 
                            	tech world.
                            </p>

                        </div>

                    </div>
                </section>

				<section style={{background:'#f9f9f9', paddingTop:48, borderTop:'1px solid #ddd'}}>
					<div className="content-wrap" style={{paddingTop:0}}>
                        <div className="heading-block bottommargin-lg center">
                            <h2 style={{fontWeight:400}}>Our Students Currently Work At</h2>
                        </div>

	                    <div className="container">
		                    <div className="row">
			                    <div className="col-md-3">
				                    <img style={{border:'1px solid #ddd', marginTop:24}} src="/images/crains.png" alt="Velocity 360" />
			                    </div>
			                    <div className="col-md-3">
				                    <img style={{border:'1px solid #ddd', marginTop:24}} src="/images/bloomberg.png" alt="Velocity 360" />
			                    </div>
			                    <div className="col-md-3">
				                    <img style={{border:'1px solid #ddd', marginTop:24}} src="/images/nytimes.png" alt="Velocity 360" />
			                    </div>
			                    <div className="col-md-3">
				                    <img style={{border:'1px solid #ddd', marginTop:24}} src="/images/codeacademy.png" alt="Velocity 360" />
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




				<Footer />
			</div>
		)
	}
}

const style = {
    paragraph: {
        lineHeight: 25+'px',
        fontSize:16
    },
    heading: {
        fontWeight: 300
    }
}

const stateToProps = function(state) {
    return {
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courseArray
    }
}

export default connect(stateToProps)(Landing)
