import React, {Component} from 'react'

class Sidebar extends Component {

	render(){
		return (
			<header id="header" className="no-sticky">

	            <div id="header-wrap">
	                <div className="container clearfix">
	                    <div id="primary-menu-trigger"><i className="icon-reorder"></i></div>
	                    <div id="logo" className="nobottomborder">
	                        <a href="/" className="standard-logo" data-dark-logo="/images/logo-side-dark.png">
	                        	<img src="/images/logo-side.png" alt="Canvas Logo" />
	                        </a>
	                        <a href="/" className="retina-logo" data-dark-logo="/images/logo-side-dark@2x.png">
	                        	<img src="/images/logo-side@2x.png" alt="Canvas Logo" />
	                        </a>
	                    </div>

	                    <nav id="primary-menu">
	                        <ul>
	                            <li>
	                                <a href="/"><div>Home</div></a>
	                            </li>
	                            <li>
	                                <a href="/videos"><div>Videos</div></a>
	                            </li>
	                            
	                            <li><a href="/courses"><div>Courses</div></a>
	                                <ul>
	                                    <li><a href="/courses?type=live"><div>Part Time</div></a></li>
	                                    <li><a href="/courses?type=immersive"><div>Bootcamp</div></a></li>
	                                </ul>
	                            </li>
	                        </ul>
	                    </nav>

	                </div>
	            </div>
	        </header>
		)
	}
}

export default Sidebar