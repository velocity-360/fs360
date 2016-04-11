import React from 'react'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'
import api from '../api/api'


class Nav extends React.Component {

	constructor(props, context){
		super(props, context)
	}

	componentDidMount(){
		api.handleGet('/account/currentuser', {}, function(err, response){
			if (err){
				return
			}

			store.dispatch(actions.currentUserRecieved(response.profile));
		});
	}


	render(){
		return (
			<header id="header" className="full-header static-sticky dark">
				<div id="header-wrap">
					<div className="container clearfix">
						<div id="primary-menu-trigger"><i className="icon-reorder"></i></div>

						<div id="logo">
							<a href="/" className="standard-logo" data-dark-logo="/images/logo-dark.png">
								<img src="/images/logo-dark.png" alt="Canvas Logo" />
							</a>
							<a href="/" className="retina-logo" data-dark-logo="/images/logo-dark@2x.png">
								<img src="/images/logo-dark@2x.png" alt="Canvas Logo" />
							</a>
						</div>

						<nav id="primary-menu">
							<ul className="one-page-menu">
								<li className="current"><a href="#" data-href="#header"><div>Home</div></a></li>
								<li><a href="/videos" data-href="#"><div>Videos</div></a></li>
								<li><a href="/courses"><div>Courses</div></a>
									<ul>
										<li><a href="/courses?type=live"><div>Part Time</div></a></li>
										<li><a href="/courses?type=immersive"><div>Bootcamp</div></a></li>
									</ul>
								</li>
								<li><a href="/login" data-href="#"><div>Login</div></a></li>

							</ul>
						</nav>
					</div>
				</div>

			</header>
		)
	}

}

const stateToProps = function(state) {

    return {
        currentUser: state.profileReducer.currentUser
    }
}


export default connect(stateToProps)(Nav)

