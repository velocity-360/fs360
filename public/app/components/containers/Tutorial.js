import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import { TextUtils, api, Stripe } from '../../utils'
import { Nav } from '../../components'
import store from '../../stores/store'
import actions from '../../actions/actions'


class Tutorial extends Component {

	constructor(props, context){
		super(props, context)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.subscribe = this.subscribe.bind(this)
		this.changeUnit = this.changeUnit.bind(this)
		this.showFirstUnit = this.showFirstUnit.bind(this)
		this.findUnit = this.findUnit.bind(this)
		this.fetchFeaturedTutorials = this.fetchFeaturedTutorials.bind(this)
		this.showStripeModal = this.showStripeModal.bind(this)
		this.state = {
			showLoader: false,
			currentPost: '', // slug of the selected post
			tutorials: [],
			authorized: true,
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

		if (tutorial.price == 0){ // free
			this.showFirstUnit(this.fetchFeaturedTutorials())
			return
		}

		const text = 'Subscribe - $'+tutorial.price
		Stripe.initializeWithText(text, (token) => {
			this.setState({showLoader: true})

			const currentUser = this.props.currentUser
			api.submitStripeCharge(token, tutorial, tutorial.price, 'tutorial', (err, response) => {
				this.setState({showLoader: false})
				if (err){
					alert(err.message)
					return
				}
				
				console.log('Stripe Charge: '+JSON.stringify(response))
				const currentStore = store.currentStore()
				currentStore.dispatch(actions.currentUserRecieved(response.profile))
				currentStore.dispatch(actions.tutorialsReceived([response.tutorial]))

				this.setState({authorized: true})
				this.showFirstUnit(null)
			})
		})

		if (this.props.currentUser.id == null){ // show subscirbe page
			this.setState({authorized: false})
			this.fetchFeaturedTutorials()
			return
		}

		const index = tutorial.subscribers.indexOf(this.props.currentUser.id)
		if (index == -1){ // show subscirbe page
			this.setState({authorized: false})
			this.fetchFeaturedTutorials()
			return
		}

		this.showFirstUnit(this.fetchFeaturedTutorials())
	}

	showFirstUnit(completion){
		const tutorial = this.props.tutorials[this.props.slug]
		const firstPost = tutorial.posts[0]
		this.findUnit(firstPost.slug, completion)
	}

	showStripeModal(event){
		event.preventDefault()
		const tutorial = this.props.tutorials[this.props.slug]
		Stripe.showModalWithText(tutorial.title)
	}

	fetchFeaturedTutorials() {
		const url = '/api/tutorial'
		api.handleGet(url, {status:'live'}, (err, response) => {
			if (err)
				return
			
			const tutorials = response.tutorials
//			console.log('TUTORIALS: '+JSON.stringify(tutorials))
			this.setState({
				tutorials: tutorials
			})
		})
	}

	findUnit(postSlug, completion){
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
			if (completion != null)
				completion()
		})
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

		const tutorial = this.props.tutorials[this.props.slug]
		if (tutorial.price == 0){ // free
			ReactDOM.findDOMNode(this).scrollIntoView()
			this.findUnit(event.target.id, null)
			return
		}

		if (this.props.currentUser.id == null){
			alert('Please log in to view this tutorial.')
			return
		}

		const index = tutorial.subscribers.indexOf(this.props.currentUser.id)
		if (index == -1){
			alert('Please subscribe to view this tutorial.')
			return
		}

		ReactDOM.findDOMNode(this).scrollIntoView()
		this.findUnit(event.target.id, null)
	}

	render(){
		const tutorial = this.props.tutorials[this.props.slug]
		const units = tutorial.posts
		const sidebar = units.map((post, i) => {
			const borderTop = (i==0) ? 'none' : '1px solid #ddd'
			var color = (post.slug == this.state.currentPost) ? '#1ABC9C' : '#86939f'
			return (
				<li key={post.id} style={{borderTop:'1px solid #ddd', padding:6}}>
					<a id={post.slug} onClick={this.changeUnit} href="#" style={{color:color}}>{i+1}. {post.title}</a>
				</li>				
			)
		})

		var nextUnit = null
		for (var i=0; i<units.length; i++){
			if (i == units.length-1) // end
				break

			var post = units[i]
			if (post.slug == this.state.currentPost){
				nextUnit = units[i+1]
				break
			}
		}

		const nextUnitTitle = (nextUnit == null) ? '' : nextUnit.title
		const nextUnitSlug = (nextUnit == null) ? '' : nextUnit.slug
		var nextUnitLink = null
		if (nextUnitSlug.length == 0){
			nextUnitLink = (
				<div className="panel-body" style={{padding:36}}>
					<h2 style={style.header}>End of Tutorial, Congratulations!</h2>
				</div>
			)
		}
		else {
			nextUnitLink = (
				<div className="panel-body" style={{padding:36}}>
					<h2 style={style.header}>Next Unit: <a id={nextUnitSlug} onClick={this.changeUnit} href='#'>{nextUnitTitle}</a></h2>
					<button id={nextUnitSlug} onClick={this.changeUnit} className="btn btn-info">View</button>
				</div>
			)
		}

		const selectedPost = this.props.posts[this.state.currentPost]
		var currentPostHtml = ''
		var currentPostTitle = ''
		if (selectedPost != null){
			currentPostHtml = selectedPost.text
			currentPostTitle = selectedPost.title
		}

		const content = (this.state.authorized == true) ?
		(
			<div className="panel panel-default">
				<div className="panel-body" style={style.panelBody}>
					<h2 style={style.header}>{currentPostTitle}</h2>
				</div>
				<div dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(currentPostHtml) }} className="panel-body" style={{padding:36}}></div>
				{nextUnitLink}
			</div>
		)
		:
		(
			<div className="panel panel-default">
				<div className="panel-body" style={style.panelBody}>
					<h2 style={style.header}>{tutorial.title}</h2>
				</div>
				<div dangerouslySetInnerHTML={{__html: TextUtils.convertToHtml(tutorial.description) }} className="panel-body" style={{padding:36}}></div>
				<div className="panel-body" style={style.panelBody}>
					<a onClick={this.showStripeModal} href="#" className="button button-3d button-xlarge button-rounded button-dirtygreen">Subscribe</a>				
				</div>
			</div>
		)


		const featured = this.state.tutorials.map((tutorial, i) => {
			const price = (tutorial.price == 0) ? 'FREE' : '$'+tutorial.price
			return (
				<div key={tutorial.id} className="col-md-4">
					<div style={{width:92+'%', margin:'auto', background:'#f9f9f9', border:'1px solid #ddd', textAlign:'center', padding:16, marginBottom:32}}>
						<img style={{width:100, borderRadius:50, marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=460'} />
						<div className="fancy-title title-bottom-border">
							<h3 style={{fontWeight:400}}>
								<a style={{color:'#444'}} href={'/tutorial/'+tutorial.slug}>{tutorial.title}</a>
							</h3>
						</div>
						<h5 style={{marginBottom:0, fontWeight:200}}>
							{tutorial.posts.length} units
							<span style={{margin:10}}>|</span>
							{price}
						</h5>
					</div>
				</div>
			)
		})

		return (
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
												<div style={{paddingTop:16}}>
													<a href="#newsletter">Newsletter</a>
													<p style={{marginBottom:16, fontSize:13}}>
														Sign up to our newsletter to stay informed about upcoming tutorials, events, and courses.
													</p>
							                        <input onChange={this.updateVisitor} id="name" type="name" style={style.input} className="custom-input" placeholder="Name" /><br />
							                        <input onChange={this.updateVisitor} id="email" type="email" style={style.input} className="custom-input" placeholder="Email" /><br />
													<a onClick={this.subscribe} href="#" style={{marginRight:12, color:'#fff'}} className="btn btn-info">Submit</a>
												</div>

											</li>
										</ul>
									</nav>
								</aside>

								<div className="content" style={{background:'#f9f9f9', paddingTop:22}}>

									<article id="misc" className="overview" style={style.article}>
										<div className="container">
											{content}
											<br /><br />
											<div className="panel panel-default">
												<div className="panel-body" style={style.panelBody}>
													<h2 style={style.header}>Featured Tutorials</h2>
													<hr />
													{featured}
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
	},
	article: {
		marginTop: 40
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