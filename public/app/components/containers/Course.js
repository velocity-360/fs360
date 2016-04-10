import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseSection from '../../components/CourseSection'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Course extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.state = {
			showLoader: false,
			showModal: false,
		}
	}

	componentWillMount(){

	}

	componentDidMount(){
		api.handleGet('/api/course?slug='+this.props.slug, {})
	}

	openModal(event){
		event.preventDefault()
		this.setState({showModal: true})
	}

	closeModal(){
		this.setState({showModal: false})
	}


	render(){
		var _course = this.props.course
		var units = this.props.course.units.map(function(unit, i){
			return <CourseSection key={unit.index} unit={unit} course={_course} />
		})



		return (
			<div>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
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
										<div className="entry-content">
											<div className="col_half">
												<h2 style={{marginBottom:0}}>{this.props.course.title}</h2>
												<p>{this.props.course.description}</p>
											</div>

											<div className="col_half panel panel-default col_last">
												<div style={{backgroundColor:'#f1f9f5'}} className="panel-heading">Details</div>
												<div className="panel-body">
													{this.props.course.dates}<br />
													{this.props.course.schedule}<br />
													Tuition: ${this.props.course.tuition}<br />
													Depost: ${this.props.course.deposit}
													<hr />
													<a href="#" onClick={this.openModal} style={{marginRight:12}} className="button button-border button-dark button-rounded noleftmargin">Apply</a>
													<a href="#" onClick={this.openModal} className="button button-border button-dark button-rounded noleftmargin">Request Syllabus</a>
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
													Ready to take the plunge? Need more information? Request a syllabus below or begin the application process.
													<a onClick={this.openModal} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">Apply</a>
													<a onClick={this.openModal} href="#" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">Request Syllabus</a>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>

						</div>

					</div>

				</section>

		        <Modal show={this.state.showModal} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Request Syllabus</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<input className="form-control" type="text" id="name" placeholder="Name" /><br />
			        	<input className="form-control" type="text" id="email" placeholder="Email" /><br />

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
			        </Modal.Footer>
		        </Modal>

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
        //course: state.courseReducer.courseArray[0],
        testimonials: state.staticReducer.testimonials,
        loaderOptions: state.staticReducer.loaderConfig

    }
}


export default connect(stateToProps)(Course)