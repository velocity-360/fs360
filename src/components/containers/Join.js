import React, { Component } from 'react'
import BaseContainer from './BaseContainer'
import { connect } from 'react-redux'
import actions from '../../actions'

class Join extends Component {


	render(){
		return (
            <div className="container margin_60_35">
                <h2 className="main_title">Membership
                    <span>Get Notified When New Tutorials and Courses are Published</span>
                </h2>
                <div className="row add_top_20">
                    <div className="col-md-4 col-md-offset-2">
                        <div className="box_style_1">
                            <div className="box_contact">
                                <i className="icon_set_1_icon-41"></i>
                                <h4>Premium</h4>
                                <span>$19.99 / month</span>
                                <p style={{marginTop:12, paddingTop:12, borderTop:'1px solid #ddd'}}>
                                    Join as a premium member for $19.99 each month and receive unlimited access 
                                    to all tutorials, code samples, and forums on the site.
                                </p>
                                <ul style={{paddingLeft:16}}>
                                    <li>Downloadable Code Samples</li>
                                    <li>Downloadable Videos</li>
                                    <li>Q &amp; A Forum Access</li>
                                    <li>Discounts on Live Courses</li>
                                </ul>
                                <button onClick={this.props.showStripeModal.bind(this, {schema:'subscription'})} style={{height:36, borderRadius:18, marginBottom:24, marginTop:24, width:100+'%'}} className="btn_1 white">JOIN</button>
                            </div>
                       </div>
                    </div>
                    <div className="col-md-4">
                        <div className="box_style_1">
                            <div className="box_contact">
                                <i className="icon_set_1_icon-41"></i>
                                <h4>Basic</h4>
                                <span>Free</span>
                                <p style={{marginTop:12, paddingTop:12, borderTop:'1px solid #ddd'}}>
                                    Join as a basic member to gain access to the free tutorials, get notifications when 
                                    new tutorials and courses are published, and participate in the Q&A forums.
                                </p>
                                <input onChange={this.props.updateCredentials.bind(this)} className="form-control" type="text" id="username" placeholder="Username" /><br />
                                <input onChange={this.props.updateCredentials.bind(this)} className="form-control" type="text" id="email" placeholder="Email" />
                                <button onClick={this.props.register.bind(this)} style={{height:36, borderRadius:18, marginBottom:24, marginTop:24, width:100+'%'}} className="btn_1 white">JOIN</button>
                            </div>
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

