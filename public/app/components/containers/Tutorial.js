import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import { TextUtils, api } from '../../utils'
import { Nav, Footer, CourseCard, RightSidebar, Register } from '../../components'


class Tutorial extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {

		}
	}

	componentDidMount(){

	}

	render(){
		const tutorial = this.props.tutorials[this.props.slug]
		const video = (tutorial.wistia.length == 0) ? null : <div className={'wistia_embed wistia_async_'+post.wistia+' videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>

		const posts = tutorial.posts.map((post, i) => {
			return (
				<div key={i} className="entry clearfix">
					<div className="entry-timeline">
						Unit<span>{i+1}</span>
						<div className="timeline-divider"></div>
					</div>
					<div className="panel panel-default" style={{maxWidth:600}}>
						<div className="panel-body" style={{padding:36}}>
							<h3>
								<a href={'/post/'+tutorial.slug} style={{marginRight:12}} className="btn btn-info"><strong>{post.title}</strong></a>
							</h3>
							<hr />
							{post.description}
							{video}
							<br />
							Click <a href=href={'/post/'+tutorial.slug}>HERE</a> to view full post.
						</div>
					</div>
				</div>
			)
		})

		return(
			<div id="wrapper" className="clearfix" style={{background:'#f9f9f9'}}>
				<Nav headerStyle="dark" />

				<section>
					<div className="content-wrap">
						<div id="lpf-content">
							<main>
								<div className="aside-toggle">
									<div></div>
								</div>

								<aside style={{background:'#f9f9f9'}}>
									<nav style={{padding:16, background:'#fff', border:'1px solid #ddd'}}>
										<ul>
											<li><a href="#introduction">Overview</a></li>
											<li><a href="#curriculum">Curriculum</a></li>
											<li><a href="#subscribe">Subscribe</a></li>
										</ul>
									</nav>
								</aside>

								<div className="content" style={{background:'#f9f9f9'}}>
									<article id="introduction" className="overview">
										<div className="container">
											<h2>{tutorial.title}</h2>
											<hr />
											<img style={{width:280, background:'#fff', padding:6, border:'1px solid #ddd', marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=460'} alt="Velocity 360" />
											<p className="about">{tutorial.description}</p>
										</div>
									</article>

									<article id="curriculum" className="overview">
										<h2>Curriculum</h2>
										<div className="postcontent clearfix" style={{paddingBottom:64}}>
											<div id="posts" className="post-timeline clearfix">
												<div className="timeline-border"></div>
												{posts}
											</div>

										</div>
									</article>

								</div>
							</main>
						</div>
					</div>
				</section>

			</div>
		)
	}
}

const stateToProps = function(state) {
    return {
        currentUser: state.profileReducer.currentUser,
        tutorials: state.tutorialReducer.tutorials,
        loaderOptions: state.staticReducer.loaderConfig,
        faq: state.staticReducer.faq
    }
}


export default connect(stateToProps)(Tutorial)