import React, {Component} from 'react'
import store from '../stores/store'
import actions from '../actions/actions'
import api from '../api/api'
import { connect } from 'react-redux'


class Sidebar extends Component {
	constructor(props, context){
		super(props, context)
	}

	componentDidMount(){
		api.handleGet('/account/currentuser', {}, function(err, response){
			if (err){
				return
			}

//			console.log('TEST 2: '+JSON.stringify(response))
			store.dispatch(actions.currentUserRecieved(response.profile));
		});
	}


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
	                            
	                            <li><a href="#"><div>Courses</div></a>
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

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(state))

    return {
        currentUser: state.profileReducer.currentUser
    }
}


export default connect(stateToProps)(Sidebar)
