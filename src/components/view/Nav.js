import React, { Component } from 'react'

class Nav extends Component {

	render(){
		return (
	        <nav className="navbar navbar-default rs-navbar navbar-fixed-top">
	            <div className="container-fluid">
	                <div className="navbar-header has-right-divider">
	                    <div className="rs-logo fixed-width">
	                    	<h1 style={localStyle.headerLogo}>
		                        <a style={{color:'#333'}} href="/dashboard">Velocity 360</a>
	                    	</h1>
	                    </div>

	                    <button type="button" className="navbar-toggle collapsed sidebar-toggle" id="rs-sidebar-toggle-mobile">
	                        <span className="icon-bar"></span>
	                        <span className="icon-bar"></span>
	                        <span className="icon-bar"></span>
	                    </button>

	                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#roosa-nav-collapse" aria-expanded="false">
	                        <span className="gcon gcon-dots-three-vertical f-s-sm"></span>
	                    </button>
	                </div>

	                <div className="collapse navbar-collapse" id="roosa-nav-collapse">

	                    <div className="navbar-left">
	                        <form className="navbar-form navbar-left">
	                            <div className="form-group has-feedback">
	                                <input type="text" className="form-control" placeholder="Search and hit enter" />
	                                <span className="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span>
	                            </div>
	                        </form>

	                    </div>

	                    <div className="navbar-right">
	                        <ul className="nav navbar-nav">
	                            <li className="rs-user-nav dropdown">
	                                <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                                    <span className="circle-notification badge-notification bg-success"></span>
	                                    <img src="/dash/images/avatars/01.png" className="rs-nav-avatar img-circle" alt="Avatar" />
	                                    <span className="visible-xs-inline-block m-l">Welcome, <strong>Mister Bin</strong></span>
	                                </a>
	                                <ul className="dropdown-menu lg-dropdown">
	                                    <li className="inherit-bg">
	                                        <a href="javascript:void(0);">
	                                            <span className="f-s-xs f-w-500">Mister Bin, Jr</span><br />
	                                            <small className="text-muted">Earnings:<strong className="m-l-xs text-success">$25,441.35</strong></small>
	                                        </a>
	                                    </li>
	                                    <li role="separator" className="divider"></li>
	                                    <li className="dropdown-header text-uppercase">Account Settings</li>
	                                    <li className="menu-icon"><a href="javascript:void(0);"><span className="mcon mcon-face rs-dropdown-icon"></span>My Account</a></li>
	                                    <li className="menu-icon"><a href="javascript:void(0);"><span className="gcon gcon-cog rs-dropdown-icon"></span>General Settings</a></li>
	                                    <li className="menu-icon"><a href="javascript:void(0);"><span className="gcon gcon-lock-open rs-dropdown-icon"></span>Change Password</a></li>
	                                    <li className="menu-icon"><a href="javascript:void(0);"><span className="gcon gcon-log-out rs-dropdown-icon"></span>Log Out</a></li>
	                                </ul>
	                            </li>
	                        </ul>
	                    </div>
	                </div>
	            </div>
	        </nav>
		)

	}
}

const localStyle = {
	headerLogo: {
		fontFamily: 'Pathway Gothic One',
		fontSize: 36,
		marginTop: 16,
		marginLeft: 24
	}
}

export default Nav

