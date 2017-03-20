import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import BaseContainer from './BaseContainer'

class Dashboard extends Component {

	render(){
		return (
            <article className="rs-content-wrapper">
                <div className="rs-content">
                    <div className="rs-inner">

                        <div className="rs-dashhead m-b-lg">
                            <div className="rs-dashhead-content">
                                <div className="rs-dashhead-titles">
                                    <h3 className="rs-dashhead-title">My Courses</h3>
                                    <div className="toggle-toolbar-btn">
                                        <span className="fa fa-sort"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">

                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-8 col-sm-6">
                                        <div className="dropdown-menu dropdown-demo m-b-lg">

                                            <div className="panel-heading borderless">
                                                <h2 style={{fontFamily:'Pathway Gothic One', marginTop:0}}>React & Google Maps</h2>
                                                <p className="subtitle m-t">$25</p>
                                                <div className="panel-toolbar mobile-block">
                                                    <button className="btn btn-default btn-sm block-on-mobile"><i className="gcon gcon-print m-r"></i>Export CSV</button>
                                                </div>
                                                <hr />
                                            </div>

                                            <div className="panel-body p-t-0">
                                                <div className="media-body">
                                                    <img style={{float:'right', marginLeft:12, border:'1px solid #ddd', padding:3}} className="media-object" src="https://media-service.appspot.com/site/images/Jo4TJTkw?crop=160" alt="Velocity 360" />
                                                    <h4 className="media-heading bg-d">Overview</h4>
                                                    <p>
                                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
                                                    </p>
                                                </div>
                                            </div>


                                            <div className="panel-body p-t-0">
                                                <div className="media-body">
                                                    <h4 className="media-heading bg-d">Units</h4>
                                                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                                                </div>
                                            </div>


                                            <div className="panel-body p-t-0">
                                                <div className="media-body">
                                                    <h4 className="media-heading bg-d">Subscribe</h4>
                                                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                                                </div>
                                            </div>

                                            <div className="panel-body">
                                                <div className="rs-col-stacked full-width-on-mobile borderless border-items m-a-0">
                                                    <div className="stacked-item p-a text-center">
                                                        <p className="text-muted m-a-0">Subscribers</p>
                                                        <h3 className="m-t-0 f-w-400">213</h3>
                                                    </div>
                                                    <div className="stacked-item p-a text-center">
                                                        <p className="text-muted m-a-0">Category</p>
                                                        <h3 className="m-t-0 f-w-400 text-success">Node</h3>
                                                    </div>
                                                    <div className="stacked-item p-a text-center">
                                                        <p className="text-muted m-a-0">Level</p>
                                                        <h3 className="m-t-0 f-w-400 text-info">Beginner</h3>
                                                    </div>
                                                    <div className="stacked-item p-a text-center">
                                                        <p className="text-muted m-a-0">Units</p>
                                                        <h3 className="m-t-0 f-w-400 text-warning">10</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-md-4 col-sm-6">
                                        <ul className="dropdown-menu xl-dropdown p-b-0 p-t-0 dropdown-demo m-b-lg">
                                            <li className="dropdown-header text-uppercase has-divider hidden-xs">
                                                Courses
                                            </li>
                                            <li>
                                                <ul className="rs-inner-dropdown has-divider media-menu">
                                                    <li className="new">
                                                        <a href="javascript:void(0);">
                                                            <img style={{width:57, height:57, left:10}} className="media" src="https://media-service.appspot.com/site/images/Jo4TJTkw?crop=96" />
                                                            <span className="id">React & Google Maps<br />
                                                            </span> Add one of your items as favorite
                                                            <span className="time small">About 30 minutes ago</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <img style={{width:57, height:57, left:10}} className="media" src="https://media-service.appspot.com/site/images/nB0-S90s?crop=96" />
                                                            <span className="id">Social Bookmark<br />
                                                            </span> Add one of your items as favorite
                                                            <span className="time small">About 30 minutes ago</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <img style={{width:57, height:57, left:10}} className="media" src="https://media-service.appspot.com/site/images/hfYJXMjQ?crop=96" />
                                                            <span className="id">React, Redux & Foursquare<br />
                                                            </span> Add one of your items as favorite
                                                            <span className="time small">About 30 minutes ago</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <img style={{width:57, height:57, left:10}} className="media" src="https://media-service.appspot.com/site/images/nB0-S90s?crop=96" />
                                                            <span className="id">Social Bookmark<br />
                                                            </span> Add one of your items as favorite
                                                            <span className="time small">About 30 minutes ago</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0);">
                                                            <img style={{width:57, height:57, left:10}} className="media" src="https://media-service.appspot.com/site/images/hfYJXMjQ?crop=96" />
                                                            <span className="id">React, Redux & Foursquare<br />
                                                            </span> Add one of your items as favorite
                                                            <span className="time small">About 30 minutes ago</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>


                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </article>
        )
	}
}

const stateToProps = (state) => {
    return {

    }
}

const dispatchToProps = (dispatch) => {
    return {
		fetchTutorials: (params) => dispatch(actions.fetchTutorials(params)),
        fetchCourses: (params) => dispatch(actions.fetchCourses(params))
    }
}

export default connect(stateToProps, dispatchToProps)(BaseContainer(Dashboard))

