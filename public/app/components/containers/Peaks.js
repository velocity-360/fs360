import React, { Component } from 'react'
import Loader from 'react-loader'
import Nav from '../../components/Nav'
import Register from '../../components/Register'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import RightSidebar from '../../components/RightSidebar'

class Peaks extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {

		}
	}


	render(){
		return (
			<div>
				<Nav />

		        <section id="slider" className="slider-parallax dark full-screen" style={{background:'url("/images/mountains.jpg") center'}}>
		            <div className="container clearfix">

		                <div className="vertical-middle">

		                    <div className="heading-block center nobottomborder">
		                        <h1 data-animate="fadeInUp">Introducing Peaks Academy</h1>
								<img style={{width:124, borderRadius:62}} src='/images/peaks.png' alt="Velocity 360" />
		                        <span style={{fontSize:18}} data-animate="fadeInUp" data-delay="300">
		                        	Data Science Bootcamp<br />
		                        	Learn data science from anywhere in the world,<br />
		                        	without quitting your job<br />
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
			                        <h2 style={{fontWeight:400}}>Overview</h2>
			                    </div>
								<img style={{background:'#fff', float:'right', border:'1px solid #ddd', maxWidth: 260, padding:6, marginLeft:12}} className="image_fade" src='/images/group.JPG' alt="Velocity 360" />
								<div>
									<p>
										Through an advanced curriculum and project based structure, students learn today’s cutting edge analytic technologies. The program is designed for students who prefer not to leave their day jobs and are ready to take on an extra educational challenge during their evenings and weekends.
										<br /><br />
										The program features a Python-driven curriculum, and immerses you in the world of data science and machine learning algorithms. The course is well suited for professionals who have a strong technical background.
									</p>
									<a target="_blank" href="http://www.peaksacademy.com/" className="button button-border button-dark button-rounded noleftmargin">Learn More</a>

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

export default Peaks