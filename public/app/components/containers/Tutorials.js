import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { api } from '../../utils'
import { Nav, Footer, CourseCard, RightSidebar, Register } from '../../components'
import actions from '../../actions/actions'
import store from '../../stores/store'


class Tutorials extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {

		}
	}


	render(){

		return(
			<div className="clearfix">
				<Nav headerStyle="dark" />

				<section>
					<div className="content-wrap">
						<div className="container clearfix">

							<div className="col_full bottommargin-sm">
								<div className="row">

									<div className="col-md-4">
										<div style={{width:92+'%', margin:'auto', background:'#f9f9f9', border:'1px solid #ddd', textAlign:'center', padding:16, marginBottom:32}}>
											<img style={{width:100, borderRadius:50, marginBottom:12}} src="https://media-service.appspot.com/site/images/uphd7w3A?crop=460" />
											<div className="fancy-title title-bottom-border">
												<h3 style={{fontWeight:400}}>Tutorial Title</h3>
											</div>
											<p style={{height:100}}>
												Tutorial description.
											</p>

											<a href="#" className="button button-3d button-mini button-rounded button-teal">View</a>
										</div>
									</div>

									<div className="col-md-4">
										<div style={{width:92+'%', margin:'auto', background:'#f9f9f9', border:'1px solid #ddd', textAlign:'center', padding:16, marginBottom:32}}>
											<img style={{width:100, borderRadius:50, marginBottom:12}} src="https://media-service.appspot.com/site/images/uphd7w3A?crop=460" />
											<div className="fancy-title title-bottom-border">
												<h3 style={{fontWeight:400}}>Tutorial Title</h3>
											</div>
											<p style={{height:100}}>
												Tutorial description.
											</p>

											<a href="#" className="button button-3d button-mini button-rounded button-teal">View</a>
										</div>
									</div>

									<div className="col-md-4">
										<div style={{width:92+'%', margin:'auto', background:'#f9f9f9', border:'1px solid #ddd', textAlign:'center', padding:16, marginBottom:32}}>
											<img style={{width:100, borderRadius:50, marginBottom:12}} src="https://media-service.appspot.com/site/images/uphd7w3A?crop=460" />
											<div className="fancy-title title-bottom-border">
												<h3 style={{fontWeight:400}}>Tutorial Title</h3>
											</div>
											<p style={{height:100}}>
												Tutorial description.
											</p>

											<a href="#" className="button button-3d button-mini button-rounded button-teal">View</a>
										</div>
									</div>

									<div className="col-md-4">
										<div style={{width:92+'%', margin:'auto', background:'#f9f9f9', border:'1px solid #ddd', textAlign:'center', padding:16, marginBottom:32}}>
											<img style={{width:100, borderRadius:50, marginBottom:12}} src="https://media-service.appspot.com/site/images/uphd7w3A?crop=460" />
											<div className="fancy-title title-bottom-border">
												<h3 style={{fontWeight:400}}>Tutorial Title</h3>
											</div>
											<p style={{height:100}}>
												Tutorial description.
											</p>

											<a href="#" className="button button-3d button-mini button-rounded button-teal">View</a>
										</div>
									</div>

								</div>
							</div>


						</div>
					</div>
				</section>
				<hr />
				<Register />

				<Footer />
			</div>
		)
	}
}

export default Tutorials