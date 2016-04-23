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
		return (

			<div className="entry clearfix" style={{marginBottom:24, border:'1px solid #ddd'}}>
				<div className="entry-image">
					<img style={{border:'1px solid #ddd', background:'#fff'}} src={'/images/'+this.props.event.image} alt={this.props.event.title} />
				</div>
				<div className="entry-c">
					<div className="entry-title">
						<h2><a href="#">{this.props.event.title}</a></h2>
					</div>
					<ul className="entry-meta clearfix">
						<li><a href="#"><i className="icon-calendar"></i> {this.props.event.date}</a></li>
						<li><a href="#"><i className="icon-time"></i> {this.props.event.time}</a></li>
						<li><a href="#"><i className="icon-map-marker2"></i> {this.props.event.address}, NYC</a></li>
					</ul>
					<div className="entry-content">
						{this.props.event.description}<br /><br />
						<a id={this.props.index} onClick={this.selectEvent} href="#" className="btn btn-success">RSVP</a>
					</div>
				</div>
			</div>			
		)
	}

}

export default EventCard