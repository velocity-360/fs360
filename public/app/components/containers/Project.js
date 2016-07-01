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

			console.log(JSON.stringify(response))
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
		var tags = this.props.project.tags.map(function(tag, i){
			return <a key={i} href="#">{tag}</a>

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
											<i onClick={this.toggleEditing} className="i-plain icon-edit"></i>															
											<h2>{this.props.project.title}</h2>
											<hr />
											<div className="tagcloud clearfix">
												{tags}
											</div>

											<div style={{marginTop:36, padding:16, border:'1px solid #ddd', textAlign:'center', background:'#f9f9f9'}}>
							                    <div className="masonry-thumbs col-4">
							                        <a href="/images/logo_round_blue_260.png" data-lightbox="image">
							                            <img style={{width:96}} src="/images/logo_round_blue_260.png" alt="Single Image" />
							                            <div style={{width:96}} className="overlay"><div className="overlay-wrap"><i className="icon-line-plus"></i></div></div>
							                        </a>
							                        <a href="/images/logo_round_blue_260.png" data-lightbox="image">
							                            <img style={{width:96}} src="/images/logo_round_blue_260.png" alt="Single Image" />
							                            <div style={{width:96}} className="overlay"><div className="overlay-wrap"><i className="icon-line-plus"></i></div></div>
							                        </a>
							                        <a href="/images/logo_round_blue_260.png" data-lightbox="image">
							                            <img style={{width:96}} src="/images/logo_round_blue_260.png" alt="Single Image" />
							                            <div style={{width:96}} className="overlay"><div className="overlay-wrap"><i className="icon-line-plus"></i></div></div>
							                        </a>
							                        <a href="/images/logo_round_blue_260.png" data-lightbox="image">
							                            <img style={{width:96}} src="/images/logo_round_blue_260.png" alt="Single Image" />
							                            <div style={{width:96}} className="overlay"><div className="overlay-wrap"><i className="icon-line-plus"></i></div></div>
							                        </a>
							                    </div>
							                </div>

							                <h3 style={{marginTop:36, marginBottom:0}}>Summary</h3>
											<p>
												{this.props.project.description}
											</p>											
										</div>
									</div>


									<div className="entry clearfix">
										<div className="entry-timeline">
											Unit<span></span>
											<div className="timeline-divider"></div>
										</div>
										<div className="panel panel-default" style={{padding:36}}>
											<h3>Comments</h3>
											<hr />
											{this.props.project.description}<br />
										</div>
									</div>


									<div className="entry clearfix">
										<div className="entry-timeline">
											Unit<span>1</span>
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
        project: (projects.length == 0) ? state.projectReducer.emptyProject : projects[0],
        loaderOptions: state.staticReducer.loaderConfig
    }
}

export default connect(stateToProps)(Project)