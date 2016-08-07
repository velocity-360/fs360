import React, { Component } from 'react'

class EventCard extends Component {

	constructor(props, context){
		super(props, context)
		this.selectEvent = this.selectEvent.bind(this)
	}

	selectEvent(event){
		event.preventDefault()
		var cbk = this.props.click
		cbk(event)

	}

	render(){
		const evt = this.props.event
		const rsvp = (evt.status == 'open') ? <a id={this.props.index} onClick={this.selectEvent} href="#" className="btn btn-success">RSVP</a> : <a id={this.props.index} onClick={this.selectEvent} href="#" className="btn btn-alert">Sold Out</a>
		return (

			<div className="entry clearfix" style={{marginBottom:24, border:'1px solid #ddd'}}>
				<div className="entry-image">
					<img style={{border:'1px solid #ddd', background:'#fff', width:360}} src={'https://media-service.appspot.com/site/images/'+evt.image+'?crop=400'} alt={evt.title} />
				</div>
				<div className="entry-c">
					<div className="entry-title">
						<h2><a href="#">{evt.title}</a></h2>
					</div>
					<ul className="entry-meta clearfix">
						<li><a href="#"><i className="icon-calendar"></i> {evt.date}</a></li>
						<li><a href="#"><i className="icon-time"></i> {evt.time}</a></li>
						<li><a href="#"><i className="icon-map-marker2"></i> {evt.address}, NYC</a></li>
					</ul>
					<div className="entry-content">
						{evt.description}<br /><br />
						{rsvp}
					</div>
				</div>
			</div>			
		)
	}

}

export default EventCard