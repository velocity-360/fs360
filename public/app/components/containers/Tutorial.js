import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { TextUtils, api } from '../../utils'
import { Nav, Footer, CourseCard, RightSidebar, Register } from '../../components'


class Tutorial extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {
			tutorial: {
				title:'',
				description:'',
				image:'',
				posts: []
			}
		}
	}

	componentDidMount(){
		var params = {slug: this.props.slug}
		api.handleGet('/api/tutorial', params, (err, response) => {
			if (err){
				alert(err.message)
				return
			}

			console.log(JSON.stringify(response))
			const tutorials = response.tutorials
			if (tutorials.length == 0){
				return
			}


			const tutorial = tutorials[0]
			this.setState({
				tutorial: tutorial
			})

		})
	}

	render(){
		const tutorial = this.state.tutorial
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
								<a href="#" style={{marginRight:12}} className="btn btn-info"><strong>{post.title}</strong></a>
							</h3>
							<hr />
							{post.description}
							<div className={'wistia_embed wistia_async_'+post.wistia+' videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>
							<br />
							Click <a href="#">HERE</a> to view full post.
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
											<p className="about">{tutorial.description}</p>
											<div className="container">
												<div className="image">
													<img style={{width:280, background:'#fff', padding:6, border:'1px solid #ddd'}} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=460'} alt="Velocity 360" />
												</div>

												<div className="text">{tutorial.description}</div>
											</div>
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

export default Tutorial