import React, {Component} from 'react'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseSection from '../../components/CourseSection'
//import Testimonial from '../../components/Testimonial'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Course extends Component {

	constructor(props, context){
		// this.updateUserRegistration = this.updateUserRegistration.bind(this)
		// this.register = this.register.bind(this)
		super(props, context)
	}

	componentWillMount(){
		// var course = this.props.courses[this.props.slug]
		// this.setState({
		// 	course: course
		// });

	}

	componentDidMount(){
		api.handleGet('/api/course?slug='+this.props.slug, {});

	}


	render(){
		var units = this.props.course.units.map(function(unit, i){
			return <CourseSection key={unit.index} unit={unit} />

		})

		return (
			<div>
				<Sidebar />
				<section id="content" style={{backgroundColor: '#F5F5F5'}}>

					<div className="content-wrap">
						<div className="container clearfix">
							<div className="postcontent nobottommargin col_last clearfix">
								<div id="posts" className="post-timeline clearfix">
									<div className="timeline-border"></div>

									<div className="entry clearfix">
										<div className="entry-timeline">
											10<span>Feb</span>
											<div className="timeline-divider"></div>
										</div>
										<div className="entry-image">
											<a href="images/blog/full/17.jpg" data-lightbox="image">
												<img className="image_fade" src="/images/blog/standard/17.jpg" alt="Standard Post with Image" />
											</a>
										</div>
										<div className="entry-title">
											<h2>{this.props.course.title}</h2>
										</div>
										<div className="entry-content">
											<div className="col_half">
												<p>{this.props.course.description}</p>
											</div>

											<div className="col_half panel panel-default col_last">
												<div className="panel-heading">Panel heading without title</div>
												<div className="panel-body">
												Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, esse, velit, eaque officiis mollitia inventore ipsum minus quo itaque provident error adipisci quisquam ratione assumenda at illo doloribus beatae totam?
												</div>
											</div>
										</div>
									</div>

									{units}


									<div className="entry clearfix">
										<div className="entry-timeline">
											Unit<span>!</span>
											<div className="timeline-divider"></div>
										</div>
										<div className="entry-image">
											<div className="panel panel-default">
												<div className="panel-body" style={{padding:36}}>
													<h2>Sign Up</h2>
													<hr />
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>

						</div>

					</div>

				</section>			
				
				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {
	console.log('STATE TO PROPS: '+JSON.stringify(state));
	var keys = Object.keys(state.courseReducer.courses)


    return {
        currentUser: state.profileReducer.currentUser,
        course: state.courseReducer.courses[keys[0]],
        testimonials: state.staticReducer.testimonials
    }
}


export default connect(stateToProps)(Course)