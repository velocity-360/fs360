import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseCard from '../../components/CourseCard'
import actions from '../../actions/actions'
import store from '../../stores/store'
import { connect } from 'react-redux'
import api from '../../api/api'

class Courses extends Component {

	constructor(props, context){
		super(props, context)
	}

	componentDidMount(){
		if (this.props.courses.length > 0)
			return

		var endpoint = '/api/course'
		if (this.props.params == null){
			api.handleGet(endpoint+'?isFeatured=yes', {}, function(err, response){
				if (err){
					alert(response.message)
					return
				}

				store.currentStore().dispatch(actions.coursesRecieved(response.courses))
			})
			return
		}

		// TODO: move this to api.js soon
		endpoint = endpoint+'?'
		var keys = Object.keys(this.props.params)
		for (var i=0; i<keys.length; i++){
			var key = keys[i]
			endpoint = endpoint+key
			endpoint = endpoint+'='
			endpoint = endpoint+this.props.params[key]
		}

		endpoint = endpoint+'&isFeatured=yes'
		console.log('ENDPOINT == '+endpoint)
		api.handleGet(endpoint, {}, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			store.currentStore().dispatch(actions.coursesRecieved(response.courses))
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
											<h2 style={{marginBottom:0}}>Courses</h2>
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


export default connect(stateToProps)(Courses)