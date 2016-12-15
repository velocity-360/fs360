import React, { Component } from 'react'

class Footer extends Component {
	render(){
		return (
			<footer id="footer" className="dark">
				<div id="copyrights">
					<div className="container clearfix">
						<div className="col_half">
							Copyright &copy; 2016 All Rights Reserved by The Grid Media, LLC.<br />
							27 East 28th Street, New York, NY 10016
						</div>

						<div className="col_half col_last tright">
							<div className="fright clearfix">
								<a target="_blank" href="https://www.facebook.com/Velocity-360-1631852427085987/" className="social-icon si-small si-borderless si-facebook">
									<i className="icon-facebook"></i>
									<i className="icon-facebook"></i>
								</a>

								<a target="_blank" href="https://twitter.com/velocity360_io" className="social-icon si-small si-borderless si-twitter">
									<i className="icon-twitter"></i>
									<i className="icon-twitter"></i>
								</a>

								<a target="_blank" href="https://github.com/velocity-360" className="social-icon si-small si-borderless si-github">
									<i className="icon-github"></i>
									<i className="icon-github"></i>
								</a>
							</div>
							<div className="clear"></div>
							<a style={{color:'rgba(255, 255, 255, 0.247059)'}} href="mailto:katrina@velocity360.io">katrina@velocity360.io </a>
							<span className="middot">&middot;</span> Velocity 360
						</div>
					</div>
				</div>
			</footer>
		)
	}
}

export default Footer
