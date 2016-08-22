import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import { TextUtils, api } from '../../utils'
import { Nav } from '../../components'
import store from '../../stores/store'
import actions from '../../actions/actions'


class Tutorial extends Component {

	constructor(props, context){
		super(props, context)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.changeUnit = this.changeUnit.bind(this)
		this.findUnit = this.findUnit.bind(this)
		this.state = {
			showLoader: false,
			currentPost: '', // slug of the selected post
			visitor: {
				name: '',
				email: ''
			}
		}
	}

	componentDidMount(){
		const tutorial = this.props.tutorials[this.props.slug]
		if (tutorial.posts.length == 0)
			return

		const firstPost = tutorial.posts[0]
		this.findUnit(firstPost.slug)
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

	changeUnit(event){
		event.preventDefault()
		ReactDOM.findDOMNode(this).scrollIntoView()
		const postSlug = event.target.id
		this.findUnit(postSlug)

	}

	findUnit(postSlug){
		if (this.state.currentPost == postSlug)
			return

		this.setState({currentPost:postSlug})

		// check store first
		const selectedPost = this.props.posts[postSlug]
		if (selectedPost != null)
			return

		const url = '/api/post'
		api.handleGet(url, {slug:postSlug}, (err, response) => {
			if (err)
				return
			
			const posts = response.posts
			store.currentStore().dispatch(actions.postsRecieved(posts))
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

		const sidebar = tutorial.posts.map((post, i) => {
			const borderTop = (i==0) ? 'none' : '1px solid #ddd'
			const color = (post.slug == this.state.currentPost) ? '#1ABC9C' : '#86939f'
			return (
				<li key={post.id} style={{borderTop:borderTop, padding:6}}>
					<a id={post.slug} onClick={this.changeUnit} href="#top" style={{color:color}}>{i+1}. {post.title}</a>
				</li>				
			)
		})

		const selectedPost = this.props.posts[this.state.currentPost]
		var currentPostHtml = ''
		var currentPostTitle = ''
		if (selectedPost != null){
			currentPostHtml = selectedPost.text
			currentPostTitle = selectedPost.title
		}
		
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
									<nav style={style.sidebar}>
										<div style={{textAlign:'center', background:'#f9f9f9', padding:12}}>
											<h4 style={{marginBottom:6}}>Units</h4>
										</div>
										<ul>
											{sidebar}
											<li style={{borderTop:'1px solid #ddd', padding:6}}>
												<a href="#newsletter">Newsletter</a>
											</li>
										</ul>
									</nav>

								</aside>

								<div className="content" style={{background:'#f9f9f9', paddingTop:62}}>

									<article id="misc" className="overview">
										<div className="container">
											<div className="panel panel-default">
												<div className="panel-body" style={style.panelBody}>
													<h2 style={style.header}>{currentPostTitle}</h2>
												</div>

												<div dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(currentPostHtml) }} className="panel-body" style={{padding:36}}></div>
											</div>
										</div>
									</article>

									<article id="newsletter" className="overview" style={{marginTop:40}}>
										<div className="container">
											<div className="panel panel-default">
												<div className="panel-body" style={style.panelBody}>
													<h2 style={style.header}>Newsletter</h2>
												</div>

												<div className="panel-body" style={{padding:36}}>
													<p style={{marginBottom:16}}>
														Sign up below to recieve our newsletter, and to stay informed about upcoming tutorials, events, and courses.
													</p>
							                        <input onChange={this.updateVisitor} id="name" type="name" style={style.input} className="custom-input" placeholder="Name" /><br />
							                        <input onChange={this.updateVisitor} id="email" type="email" style={style.input} className="custom-input" placeholder="Email" /><br />
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

const style = {
	header: {
		marginBottom:0,
		marginTop:0,
	},

	panelBody: {
		padding:36,
		borderBottom:'1px solid #ddd'
	},
	sidebar: {
		padding:16,
		background:'#fff',
		border:'1px solid #ddd'
	},
	input: {
		borderRadius:'0px !important',
		background:'#FEF9E7'
	}
}

const stateToProps = function(state) {
    return {
        currentUser: state.profileReducer.currentUser,
        tutorials: state.tutorialReducer.tutorials,
        posts: state.postReducer.posts,
        loaderOptions: state.staticReducer.loaderConfig,
        faq: state.staticReducer.faq,
    }
}


export default connect(stateToProps)(Tutorial)