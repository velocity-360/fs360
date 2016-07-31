import React, { Component } from 'react'

class CourseSection extends Component {

	constructor(props, context){
		super(props, context)
		this.login = this.login.bind(this)
		this.subscribe = this.subscribe.bind(this)
	}

	login(event){
		event.preventDefault()
		this.props.loginAction(event)
	}

	subscribe(event){
		event.preventDefault()
		this.props.subscribeAction(event)
	}

	render(){
		var accountType = this.props.currentUser.accountType
		var videoThumb = null
		var course = this.props.course
		if (course.type == 'online'){
			if (this.props.unit.index < 1){ // always show first video
				videoThumb = <div className={'wistia_embed wistia_async_'+this.props.unit.wistia+' videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>
			}
			else if (accountType == 'premium'){ // premium subscriber
				videoThumb = <div className={'wistia_embed wistia_async_'+this.props.unit.wistia+' videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>
			}
			else if (this.props.currentUser.id == null){ // not logged in
				videoThumb = <div style={{border:'1px solid #ddd', padding:12, background:'#f9f9f9', marginTop:12, marginBottom:12}}>Please <a onClick={ this.login } style={{color:'red'}} href="#">log in</a> or <a style={{color:'red'}} href="/#register">register</a> to view this video.</div>
			}
			else if (course.subscribers.indexOf(this.props.currentUser.id) > -1){ // regular subscriber
				videoThumb = <div className={'wistia_embed wistia_async_'+this.props.unit.wistia+' videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>
			}
			else if (accountType == 'basic' || accountType == ''){
				videoThumb = <div style={{border:'1px solid #ddd', padding:12, background:'#f9f9f9', marginTop:12, marginBottom:12}}>To view this video, please <a href="#">subscribe</a> or <a style={{color:'red'}} href="/checkout">upgrade</a> your account to Premium</div>
			}
			
			// else { // not logged in
			// 	videoThumb = <div style={{border:'1px solid #ddd', padding:12, background:'#f9f9f9', marginTop:12, marginBottom:12}}>Please <a onClick={ this.login } style={{color:'red'}} href="#">log in</a> or <a style={{color:'red'}} href="/#register">register</a> to view this video.</div>
			// }
		}

		return (
			<div className="entry clearfix">
				<div className="entry-timeline">
					Unit<span>{this.props.unit.index+1}</span>
					<div className="timeline-divider"></div>
				</div>
				<div className="entry-image">
					<div className="panel panel-default">
						<div className="panel-body" style={{padding:36}}>
							<h2>{this.props.unit.topic}</h2>
							<hr />
							{this.props.unit.description}<br />
							{videoThumb}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CourseSection