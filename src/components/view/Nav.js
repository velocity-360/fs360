import React, { Component } from 'react'

export default (props) => {

	return (
        <div className="nav-container">
            <nav className="nav-centered">
                <div className="text-center">
                    <a href="index.html">
                        <img className="logo logo-light" alt="Foundry" src="/img/logo-light.png" />
                        <img className="logo logo-dark" alt="Foundry" src="/img/logo-dark.png" />
                    </a>
                </div>
                <div className="nav-bar text-center">
                    <div className="module widget-handle mobile-toggle right visible-sm visible-xs">
                        <i className="ti-menu"></i>
                    </div>
                    <div className="module-group text-left">
                        <div className="module left">
                            <ul className="menu">
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li className="has-dropdown">
                                    <a href="#">
                                        Courses
                                    </a>
                                    <ul className="mega-menu">
                                        <li>
                                            <ul>
                                                <li>
                                                    <a href="page-about-us-1.html">Online</a>
                                                </li>
                                                <li>
                                                    <a href="page-about-us-2.html">Live</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="#">Login</a></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </nav>
        </div>
	)

}