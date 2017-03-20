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
                                    <h3 className="rs-dashhead-title">Fixed Layout (Nav &amp; Sidebar)</h3>
                                    <div className="toggle-toolbar-btn">
                                        <span className="fa fa-sort"></span>
                                    </div>
                                </div>
                                <div className="rs-dashhead-toolbar">
                                    <h6 className="rs-dashhead-subtitle text-uppercase">Page Layouts</h6>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">

                            <div className="panel panel-plain panel-rounded">
                                <div className="panel-heading borderless">
                                    <h3 className="panel-title">Try scroll the page</h3>
                                    <p className="subtitle text-uppercase m-t">Short explaination</p>
                                    <div className="panel-toolbar">
                                        <ul className="list-inline m-a-0">
                                            <li><i className="rs-collapse-panel icon-toolbar-rotate icon-toolbar gcon gcon-chevron-up"></i></li>
                                            <li><i className="rs-refresh-panel icon-toolbar gcon gcon-cycle"></i></li>
                                            <li><i className="rs-close-panel icon-toolbar gcon gcon-cross"></i></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="panel-body p-t-0">
                                    <p>
                                        To make sidebar and header nav into a fixed position such as on this page, (please try to scroll the page to see it), we should add <code>.rs-header-fixed-top</code> and <code>.rs-sidebar-fixed</code> into the wrapper, then the nav also should be added <code>.navbar-fixed-top</code> and don't forget to add <code>.rs-scroll-custom</code> into <code>.rs-sidebar</code>.
                                    </p>
                                    <p>
                                        To make sidebar and header nav into a fixed position such as on this page, (please try to scroll the page to see it), we should add <code>.rs-header-fixed-top</code> and <code>.rs-sidebar-fixed</code> into the wrapper, then the nav also should be added <code>.navbar-fixed-top</code> and don't forget to add <code>.rs-scroll-custom</code> into <code>.rs-sidebar</code>.
                                    </p>
                                    <div className="alert alert-warning alert-simple iconic-alert alert-light-gray" role="alert">
                                        <div className="alert-icon">
                                            <span className="fa fa-info centered-xy"></span>
                                        </div>
                                        <p>
                                            Custom scroll will automatically disable when this page opened on mobile devices, means the scroll will change to default / traditional scroll
                                        </p>
                                    </div>
                                    <div className="pre-wrapper">
                                        <button className="btn btn-xs btn-lighten rs-pre-copy" data-clipboard-target="#foo">
                                        Copy
                                        </button>
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

