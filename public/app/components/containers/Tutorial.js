import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import { TextUtils, api } from '../../utils'
import { Nav } from '../../components'


class Tutorial extends Component {

	constructor(props, context){
		super(props, context)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.state = {
			showLoader: false,
			visitor: {
				name: '',
				email: ''
			}
		}
	}

	updateVisitor(event){
		var updatedVisitor = Object.assign({}, this.state.visitor)
		updatedVisitor[event.target.id] = event.target.value
		this.setState({
			visitor: updatedVisitor
		})		
	}

	subscribe(event){
		event.preventDefault()
		if (this.state.visitor.name.length == 0){
			alert('Please enter your name.')
			return
		}

		if (this.state.visitor.email.length == 0){
			alert('Please enter your email.')
			return
		}

		this.setState({showLoader: true})

		var s = Object.assign({}, this.state.visitor)
		var parts = s.name.split(' ')
		s['firstName'] = parts[0]
		if (parts.length > 1)
			s['lastName'] = parts[parts.length-1]

		const tutorial = this.props.tutorials[this.props.slug]
		s['source'] = tutorial.title
		
		s['subject'] = 'New Subscriber'
		s['confirmation'] = 'Thanks for subscribing! Stay tuned for more tutorials, events and upcoming courses!'
		api.handlePost('/account/subscribe', s, (err, response) => {
			this.setState({showLoader: false})

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		})
	}


	render(){
		const tutorial = this.props.tutorials[this.props.slug]

		const posts = tutorial.posts.map((post, i) => {
			const video = (post.wistia.length == 0) ? null : <div className={'wistia_embed wistia_async_'+post.wistia+' videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>
			return (
				<div key={i} className="entry clearfix">
					<div className="entry-timeline">
						Unit<span>{i+1}</span>
						<div className="timeline-divider"></div>
					</div>
					<div className="panel panel-default" style={{maxWidth:600}}>
						<div className="panel-body" style={{padding:36}}>
							<h3>
								<a href={'/post/'+post.slug} style={{marginRight:12}} className="btn btn-info"><strong>{post.title}</strong></a>
							</h3>
							<hr />
							{post.description}
							{video}
							<br /><br />
							Click <a href={'/post/'+post.slug}>HERE</a> to view full post.
						</div>
					</div>
				</div>
			)
		})

		const video = (tutorial.wistia.length == 0) ? null : <div className={'wistia_embed wistia_async_'+tutorial.wistia+' videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>

		return(
			<div id="wrapper" className="clearfix" style={{background:'#f9f9f9'}}>
				<Nav headerStyle="dark" />

				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
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
											<li><a href="#newsletter">Newsletter</a></li>
										</ul>
									</nav>
								</aside>

								<div className="content" style={{background:'#f9f9f9'}}>
									<article id="introduction" className="overview">
										<div className="container">
											<img className="visible-xs" style={{width:160, background:'#fff', padding:6, border:'1px solid #ddd', marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=460'} alt="Velocity 360" />
											<img className="hidden-xs" style={{width:160, float:'right', background:'#fff', padding:6, border:'1px solid #ddd', marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=460'} alt="Velocity 360" />
											<h2>{tutorial.title}</h2>
											<hr />
											<p className="about">{tutorial.description}</p>
											{video}
										</div>
									</article>

									<article id="curriculum" className="overview" style={{marginTop:20}}>
										<h2>Curriculum</h2>
										<div className="postcontent clearfix" style={{paddingBottom:64}}>
											<div id="posts" className="post-timeline clearfix">
												<div className="timeline-border"></div>
												{posts}
											</div>

										</div>
									</article>

									<article id="newsletter" className="overview">
										<div className="container">
											<h2 style={{marginTop:24}}>Newsletter</h2>
											<div className="panel panel-default">
												<div className="panel-body" style={{padding:36}}>
													<h3>Sign Up</h3>
													<hr />
													<p style={{marginBottom:16}}>
														Sign up below to recieve our newsletter, and to stay informed about upcoming tutorials, events, and courses.
													</p>
							                        <input onChange={this.updateVisitor} id="name" type="name" style={{borderRadius:'0px !important', background:'#FEF9E7'}} className="custom-input" placeholder="Name" /><br />
							                        <input onChange={this.updateVisitor} id="email" type="email" style={{borderRadius:'0px !important', background:'#FEF9E7'}} className="custom-input" placeholder="Email" /><br />
													<a onClick={this.subscribe} href="#" style={{marginRight:12}} className="btn btn-info">Submit</a>
												</div>
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