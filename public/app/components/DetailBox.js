import React, { Component } from 'react'
import api from '../utils/APIManager'

class DetailBox extends Component {

	constructor(props, context){
		super(props, context)
		this.updateVisitor = this.updateVisitor.bind(this)
		this.submitRequest = this.submitRequest.bind(this)
		this.state = {
			visitor: {
				name: '',
				email: ''
			}
		}
	}

	updateVisitor(event){
		event.preventDefault()
		var s = Object.assign({}, this.state.visitor)
		s[event.target.id] = event.target.value
		s['course'] = this.props.course.title
		this.setState({
			visitor: s
		})
	}

	submitRequest(event){
		event.preventDefault()

		if (this.state.visitor.name.length == 0){
			alert('Please enter your name.')
			return
		}

		if (this.state.visitor.email.length == 0){
			alert('Please enter your email.')
			return
		}

		this.props.showLoader()

		var s = Object.assign({}, this.state.visitor)
		var parts = s.name.split(' ')
		s['firstName'] = parts[0]
		if (parts.length > 1)
			s['lastName'] = parts[parts.length-1]

		var _this = this
		var url = ''

		const course = this.props.course
		if (course.type == 'immersive'){ // syllabus request
			s['pdf'] = course.syllabus
			s['subject'] = 'Syllabus Request'
			s['confirmation'] = 'Thanks for your interest! Check your email shortly for a direct download link to the syllabus.'
			url = '/account/syllabus'
		}
		if (course.type == 'online'){ 
			s['subject'] = 'New Subscriber'
			s['confirmation'] = 'Thanks for subscribing! We will reach out to you shortly with more information!'
			url = '/account/subscribe'
		}
		if (course.type == 'live'){ 
			s['subject'] = 'Free Session Request'
			s['confirmation'] = 'Thanks for your interest. We will contact you shortly with more information about attending a free session!'
			url = '/account/freesession'
		}

		api.handlePost(url, s, function(err, response){
			_this.props.hideLoader()

			if (err){
				alert(err.message)
				return
			}

			alert(response.message)
		})
	}

	render(){
		var detailContent = null
		const course = this.props.course
		if (course.type == 'online'){
			detailContent = {
				title: 'Newsletter',
				text: 'Join our newsletter for notifications on upcoming courses, events and tutorials.',
				path: '/account/subscribe'
			}
		}
		else if (course.type == 'immersive'){
			detailContent = {
				title: 'Request Syllabus',
				text: 'Complete the form below to receive a syllabus for '+course.title,
				path: '/account/syllabus'
			}
		}
		else {
			detailContent = {
				title: 'Preview Free Session',
				text: 'Complete the form below to attend a preview session of '+course.title+' for free.',
				path: '/account/subscribe'
			}
		}


		return (

			<div className="entry clearfix">
				<div className="entry-timeline">
					Preview<span></span>
					<div className="timeline-divider"></div>
				</div>
				<div className="entry-image">
					<div className="panel panel-default">
						<div className="panel-body" style={{padding:36, paddingBottom:0}}>
							<h2>{detailContent.title}</h2>
							<hr />

							<div className='col_full'>
								<p>{detailContent.text}</p>
								<input type="text" onChange={this.updateVisitor} value={this.state.visitor.name} id="name" placeholder="Name" className="custom-input" /><br />
								<input type="text" onChange={this.updateVisitor} value={this.state.visitor.email} id="email" placeholder="Email" className="custom-input" /><br />
								<a onClick={this.submitRequest} href="#" className="button button-border button-dark button-rounded noleftmargin">Submit</a>
							</div>
						</div>
					</div>
				</div>
			</div>

		)


	}

}

export default DetailBox