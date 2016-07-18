import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import store from '../stores/store'
import actions from '../actions/actions'
import TextUtils from '../utils/TextUtils'
import api from '../api/api'

class RightSidebar extends Component {
	constructor(props, context){
		super(props, context)
		this.fetchEvents = this.fetchEvents.bind(this)
		this.state = {
			posts: [],
			events: []
		}
	}

	componentDidMount(){
		var _this = this
		api.handleGet('/api/post', {limit:'3'}, function(err, response){

			if (err){
				return
			}

			var posts = response.posts
			_this.setState({
				posts: posts
			})

			_this.fetchEvents()
		})
	}

	fetchEvents(){
		var _this = this
		api.handleGet('/api/event', {limit:'3'}, function(err, response){

			if (err){
				return
			}

//			console.log(JSON.stringify(response))
			var events = response.events
			_this.setState({
				events: events
			})
		})
	}

	render(){
		var posts = this.state.posts.map(function(post, i){
			var name = (post.profile.name == null ) ? 'anon' : post.profile.name
			return (
				<div key={post.id} style={{border:'1px solid #ddd', padding:12, background:'#f9f9f9', marginBottom:16}}>
					<h5 style={{fontWeight:400, marginBottom:0}}><a href={'/post/'+post.slug}>{post.title}</a></h5>
					<span style={{fontWeight:100, fontSize:14}}>{name}</span>
				</div>
			)
		})

		var events = this.state.events.map(function(event, i){
			return (
				<div key={event.id} style={{border:'1px solid #ddd', background:'#f9f9f9', marginBottom:16}}>
					<img style={{width:104, float:'left', marginRight:12}} src={'https://media-service.appspot.com/site/images/'+event.image+'?crop=260'} alt="Velocity 360" />
					<div style={{padding:12, height:104, textAlign:'right'}}>
						<h5 style={{fontWeight:200, marginBottom:0}}><a href={'/event/'+event.slug}>{event.title}</a></h5>
						<span style={{fontWeight:100, fontSize:14}}>{event.date}, {event.time}</span><br />
						<a href={'/event/'+event.slug} style={{marginRight:0}} className="button button-3d button-mini button-rounded button-teal">Attend</a>
					</div>
				</div>
			)
		})		
		return (
			<div>
				<div className="widget clearfix">
					<h4>Recent Posts</h4>
					<hr />
					{posts}
					<a href="/feed">View All</a>
				</div>

				<div className="widget clearfix">
					<h4>Events</h4>
					<hr />

					{events}

				</div>

			</div>

		)
	}
}

export default RightSidebar