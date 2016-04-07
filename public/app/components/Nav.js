import React from 'react'

class Nav extends React.Component {

	constructor(props, context){
		super(props, context)

	}

	render(){
		return (
			<header id="header" className="full-header static-sticky dark">
				<div id="header-wrap">
					<div className="container clearfix">
						<div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

						<div id="logo">
							<a href="/" className="standard-logo" data-dark-logo="/images/logo-dark.png">
								<img src="images/logo-dark.png" alt="Canvas Logo" />
							</a>
							<a href="/" className="retina-logo" data-dark-logo="/images/logo-dark@2x.png">
								<img src="images/logo-dark@2x.png" alt="Canvas Logo" />
							</a>
						</div>

						<nav id="primary-menu">
							<ul className="one-page-menu">
								<li className="current"><a href="#" data-href="#header"><div>Home</div></a></li>
								<li><a href="#" data-href="#"><div>Videos</div></a></li>
								<li><a href="#" data-href="#"><div>Courses</div></a></li>
							</ul>
						</nav>
					</div>
				</div>

			</header>

		)
	}

}

export default Nav