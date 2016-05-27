import React, { Component } from 'react'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import ProjectView from '../../components/ProjectView'
import EditProject from '../../components/EditProject'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'
import DateUtils from '../../utils/DateUtils'
import TextUtils from '../../utils/TextUtils'


class Project extends Component {
	constructor(props, context){
		super(props, context)
		this.toggleEditing = this.toggleEditing.bind(this)
		this.state = {
			showLoader: false,
			isEditing: false,
		}
	}

	componentDidMount(){
		var url = '/api/project?slug='+this.props.slug
		api.handleGet(url, {}, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			console.log(JSON.stringify(response));
			store.dispatch(actions.projectsRecieved(response.projects))
		})
	}

	toggleEditing(event){
		event.preventDefault()
		console.log('toggleEditing: '+this.state.isEditing)
		var isEditing = !this.state.isEditing
		this.setState({
			isEditing: isEditing
		})

	}

	render(){
		var content = (this.props.project == null) ? '' : <ProjectView project={this.props.project} />

		return (

			<div style={{background:'#f5f5f5'}}>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Sidebar />

				<section id="content">
					<div className="content-wrap" style={{background:'#f5f5f5'}}>

						<div className="container clearfix">
							<div className="postcontent nobottommargin col_last clearfix">

								<div id="posts" className="post-timeline clearfix">
									<div className="timeline-border"></div>

									<div className="entry clearfix">
										<div className="entry-timeline">
											Intro<span></span>
											<div className="timeline-divider"></div>
										</div>

										{content}

									</div>


									<div className="entry clearfix">
										<div className="entry-timeline">
											Intro<span></span>
											<div className="timeline-divider"></div>
										</div>
										<div className="panel panel-default" style={{padding:36}}>
											<h3>Comments</h3>
											<hr />
											{this.props.project.description}<br />
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
	var projects = state.projectReducer.projectsArray
//	console.log('STATE TO PROPS: '+JSON.stringify(projects))

    return {
        currentUser: state.profileReducer.currentUser,
        project: (projects==null) ? state.projectReducer.emptyProject : projects[0],
        loaderOptions: state.staticReducer.loaderConfig
    }
}

export default connect(stateToProps)(Project)