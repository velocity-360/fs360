import React, { Component } from 'react'
import BaseContainer from './BaseContainer'
import { connect } from 'react-redux'
import actions from '../../actions'

class Join extends Component {

	render(){
		return (
            <div className="container margin_60_35">
                <h2 className="main_title">Premium Membership
                    <span>Receive Full Access for $19.99 / Month</span>
                </h2>
                <div className="row add_top_20">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="box_style_1">
                            <div className="box_contact">
                                <i className="icon_set_1_icon-41"></i>
                                <h4>All Access</h4>
                                <p>
                                    Join as a premium member for $19.99 each month and receive unlimited access 
                                    to all tutorials, code samples, and forums on the site.
                                </p>
                                <ul style={{paddingLeft:16}}>
                                    <li>Downloadable Code Samples</li>
                                    <li>Downloadable Videos</li>
                                    <li>Q &amp; A Forum Access</li>
                                    <li>Discounts on Live Courses</li>
                                </ul>
                            </div>
                            <button onClick={this.props.showStripeModal.bind(this, {schema:'subscription'})} style={{height:36, borderRadius:18, marginBottom:24, marginTop:24, width:100+'%'}} className="btn_1 white">JOIN</button>
                       </div>
                    </div>   
                    
                </div>
            </div>
		)
	}
}

const stateToProps = (state) => {
	return {
		account: state.account
	}
}

const dispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(stateToProps)(BaseContainer(Join))

