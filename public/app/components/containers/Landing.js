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

                <section id="section-about" className="page-section section nobg nomargin">
                    <div className="container clearfix">
                        <div className="heading-block bottommargin-lg center">
                            <h4>The Velocity Advantage</h4>
                        </div>

                        <div className="col_one_third">

                            <div className="heading-block fancy-title nobottomborder title-bottom-border">
                                <h4>Why choose <span>Us</span></h4>
                            </div>
                            <img style={{maxWidth:220, marginBottom:12}} src="/images/class-3.jpg" />
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi quidem minus id omnis, nam expedita, ea fuga commodi voluptas iusto, hic autem deleniti dolores explicabo labore enim repellat earum perspiciatis.</p>

                        </div>

                        <div className="col_one_third">
                            <div className="heading-block fancy-title nobottomborder title-bottom-border">
                                <h4>Industry <span>Driven</span></h4>
                            </div>
                            <img style={{maxWidth:220, marginBottom:12}} src="/images/class-2.jpg" />
                            <p>
                            	Technology, more than any other industry, changes rapidly and many fall behind. 
                            	As a newcomer to tech, it is imperative to understand the trends and develop the 
                            	skills that will be valued tomorrow over those in demand today. Velocity 360 
                            	strongly prepares students under that guiding principle. Our curriculum is highly 
                            	focused on the bleeding edge of tech evolution: Node JS, React, and React Native.
                            </p>

                        </div>

                        <div className="col_one_third col_last">
                            <div className="heading-block fancy-title nobottomborder title-bottom-border">
                                <h4>Modern <span>Curriculum</span></h4>
                            </div>
                            <img style={{maxWidth:220, marginBottom:12}} src="/images/react-wide.jpg" />
                            <p>
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
	                    <h4 className="center">Our Students Currently Work At</h4>
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

const stateToProps = function(state) {
    return {
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courseArray
    }
}

export default connect(stateToProps)(Landing)
