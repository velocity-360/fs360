import React from 'react'

class Footer extends React.Component {

	constructor(props, context){
		super(props, context)

	}

	render(){
		return (
			<footer id="footer" className="dark">
				<div id="copyrights">

					<div className="container clearfix">

						<div className="col_half">
							Copyright &copy; 2016 All Rights Reserved by The Grid Media, LLC.<br />
						</div>

						<div className="col_half col_last tright">
							<div className="fright clearfix">
								<a target="_blank" href="https://www.facebook.com/FullStack-360-1631852427085987/" className="social-icon si-small si-borderless si-facebook">
									<i className="icon-facebook"></i>
									<i className="icon-facebook"></i>
								</a>

								<a target="_blank" href="https://twitter.com/fullstack360" className="social-icon si-small si-borderless si-twitter">
									<i className="icon-twitter"></i>
									<i className="icon-twitter"></i>
								</a>

								<a target="_blank" href="https://github.com/fullstack360" className="social-icon si-small si-borderless si-github">
									<i className="icon-github"></i>
									<i className="icon-github"></i>
								</a>

							</div>

							<div className="clear"></div>

							<i className="icon-envelope2"></i> info@fullstack360.com <span className="middot">&middot;</span> FS360
						</div>

					</div>

				</div>

			</footer>
		)
	}

}

export default Footer