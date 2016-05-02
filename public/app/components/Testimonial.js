import React, { Component } from 'react'

class Testimonial extends Component {

	render(){
		return (
			<div className="col-md-6 bottommargin">
				<div className="team team-list clearfix">
					<div className="team-image" style={{width:150}}>
						<img className="img-circle" src={'/images/'+this.props.testimonial.image} alt="FullStaack 360" />
					</div>
					<div className="team-desc">
						<div className="team-title"><h4>{this.props.testimonial.name}</h4><span>{this.props.testimonial.course}</span></div>
						<div className="team-content">
							{this.props.testimonial.quote}
						</div>
						<div className="line topmargin-sm nobottommargin"></div>
						<a href="#" className="social-icon si-small si-borderless si-github">
							<i className="icon-github"></i>
							<i className="icon-github"></i>
						</a>
						<a href="#" className="social-icon si-borderless si-small si-twitter" title="Twitter">
							<i className="icon-twitter"></i>
							<i className="icon-twitter"></i>
						</a>
					</div>
				</div>
			</div>			
		)
	}

}

export default Testimonial