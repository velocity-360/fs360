import React, { Component } from 'react'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'
import DateUtils from '../../utils/DateUtils'
import TextUtils from '../../utils/TextUtils'


class Project extends Component {
	constructor(props, context){
		super(props, context)
		this.state = {
			showLoader: false,
		}
	}

	componentDidMount(){
		var url = '/api/project?slug='+this.props.slug
		api.handleGet(url, {}, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			console.log(JSON.stringify(response))
			store.dispatch(actions.projectsRecieved(response.projects))
		})
	}

	render(){
		var tags = this.props.project.tags.map(function(tag, i){
			return <a key={i} href="#">{tag}</a>
		})

		var units = this.props.project.units.map(function(unit, i){
			return (
				<div className="entry clearfix">
					<div className="entry-timeline">
						Unit<span>{i+1}</span>
						<div className="timeline-divider"></div>
					</div>
					<div className="panel panel-default" style={{padding:36}}>
						<img style={{float:'right', marginRight:12, width:72}} src={'https://media-service.appspot.com/site/images/'+unit.icon+'?crop=260'} />
						<h3 style={{marginBottom:6}}>{unit.topic}</h3>
						<br /><hr />
						{unit.description}
						<br />
					</div>
				</div>				
			)
		})

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

										<div className="panel panel-default" style={{padding:36}}>
											<img style={{width:120, marginBottom:16, float:'left', marginRight:24}} src={'https://media-service.appspot.com/site/images/'+this.props.project.image+'?crop=420'} />
											<h2>{this.props.project.title}</h2>
											<hr />
											<div className="tagcloud clearfix">
												{tags}
											</div>

											<div className="clearfix"></div>
											<p>{this.props.project.description}</p>											
										</div>
									</div>


									{units}

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
        project: (projects.length == 0) ? state.projectReducer.emptyProject : projects[0],
        loaderOptions: state.staticReducer.loaderConfig
    }
}

export default connect(stateToProps)(Project)