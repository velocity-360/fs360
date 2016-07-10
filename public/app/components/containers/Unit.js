import React, { Component } from 'react'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import DateUtils from '../../utils/DateUtils'
import TextUtils from '../../utils/TextUtils'


class Unit extends Component {
	constructor(props, context){
		super(props, context)
		this.state = {

		}
	}

	componentDidMount(){

	}

	render(){

		return (

			<div style={{background:'#f5f5f5'}}>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Sidebar />

				<section id="content">
					<div className="content-wrap" style={{background:'#f5f5f5'}}>

						<div className="container clearfix">
							<div className="postcontent nobottommargin col_last clearfix">

								<div id="posts" className="post-timeline clearfix">
									<div className="timeline-border"></div>

									<div className="entry clearfix">
										<div className="entry-timeline">
											Intro<span></span>
											<div className="timeline-divider"></div>
										</div>

									</div>


								</div>
							</div>
						</div>

					</div>

				</section>



				<Footer />
			</div>

		)

	}
}

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(projects))

    return {
        currentUser: state.profileReducer.currentUser,
        loaderOptions: state.staticReducer.loaderConfig
    }
}

export default connect(stateToProps)(Unit)