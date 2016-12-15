import React, { Component } from 'react'

class Main extends Component {
	constructor(){
		super()

	}

	render(){
		return (
			<div className="stretched side-header">
				<div id="wrapper">

					<header id="header" className="no-sticky" style={{background:'#f9f9f9'}}>
			            <div id="header-wrap">
							<div className="container clearfix">

								<div id="logo" className="nobottomborder">
									<a href="/" className="standard-logo" data-dark-logo="/images/logo-side-dark.png">
										<img src="/images/logo-side.png" alt="Velocity 360" />
									</a>
									<a href="/" className="retina-logo" data-dark-logo="/images/logo-side-dark@2x.png">
										<img src="/images/logo-side@2x.png" alt="Velocity 360" />
									</a>
									<hr />
								</div>
				            </div>

			            </div>
					</header>

					{this.props.children}
				</div>

			</div>
		)
	}
}

export default Main
