import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseCard from '../../components/CourseCard'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Videos extends Component {

	constructor(props, context){
		super(props, context)
	}

	componentWillMount(){

	}

	componentDidMount(){
		api.handleGet('/api/course?type=online', {}, function(err, response){
			if (err){

				return
			}

			store.dispatch(actions.coursesRecieved(response.courses))
		})
	}

	render(){

		var courseList = this.props.courses.map(function(course){
			return <CourseCard key={course.id} course={course} />

		})

		return (
			<div style={{background:'#f5f5f5'}}>
				<Sidebar />
				<section id="content">

					<div className="content-wrap" style={{background:'#f5f5f5'}}>
						<div className="container clearfix">
							<div className="postcontent nobottommargin col_last">

								<div className="entry clearfix">
									<div className="entry-content">
										<div className="col_half">
											<h2 style={{marginBottom:0}}>Videos</h2>
										</div>

									</div>
								</div>

								<div id="posts" className="events small-thumbs">
									{courseList}
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
//	console.log('STATE TO PROPS: '+JSON.stringify(state));

    return {
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courseArray,
    }
}


export default connect(stateToProps)(Videos)