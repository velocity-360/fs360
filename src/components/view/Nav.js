import React, { Component } from 'react'
import styles from './style'
import { Link } from 'react-router'

export default (props) => {
    const type = (props.type) ? props.type : 'large'
    let nav = null

    if (type == 'large'){
        nav = (
            <nav className="nav-centered">
                <div className="text-center">
                    <a href="/">
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
                                    <a href="#">Courses</a>
                                    <ul className="mega-menu">
                                        <li>
                                            <ul>
                                                <li>
                                                    <a href="/online">Online</a>
                                                </li>
                                                <li>
                                                    <a href="/courses">Live</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li className="modal-container">
                                    <a className="btn-modal" href="#">
                                        Login
                                    </a>
                                    <div className="foundry_modal text-center">
                                        <h3 className="uppercase">Login</h3>
                                        <input type="text" name="email" className="mb12 signup-email-field" placeholder="Email" />
                                        <input type="text" name="email" className="mb12 signup-email-field" placeholder="Password" />
                                        <button type="submit" className="btn-white mb0">Submit</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </nav>
        )    
    }
    else {
        nav = (
            <nav>
                <div className="nav-bar bg-dark">
                    <div className="module left">
                        <a href="/">
                            <h3 style={localStyle.titleWhite}>Velocity 360</h3>
                        </a>
                    </div>
                    <div className="module widget-handle mobile-toggle right visible-sm visible-xs">
                        <i className="ti-menu"></i>
                    </div>
                    <div className="module-group right">
                        <div className="module left">
                            <ul className="menu">
                                <li><a style={{color:'#fff'}} href="/">Home</a></li>
                                <li className="has-dropdown">
                                    <a style={{color:'#fff'}} href="#">Courses</a>
                                    <ul>
                                        <li>
                                            <a href="/online">Online</a>
                                        </li>
                                        <li>
                                            <a href="/courses">Live</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="modal-container">
                                    <a style={{color:'#fff'}} className="btn-modal" href="#">
                                        Login
                                    </a>
                                    <div className="foundry_modal text-center">
                                        <h3 className="uppercase">Login</h3>
                                        <input type="text" name="email" className="mb12 signup-email-field" placeholder="Email" />
                                        <input type="text" name="email" className="mb12 signup-email-field" placeholder="Password" />
                                        <button type="submit" className="btn-white mb0">Submit</button>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col--md-3 col-sm-3 col-xs-3">
                        <a href="/" id="logo">
                            <h2 style={{fontFamily:'Pathway Gothic One', marginTop:6}}>Velocity 360</h2>
                        </a>
                    </div>
                    <nav className="col--md-9 col-sm-9 col-xs-9">
                    <a className="cmn-toggle-switch cmn-toggle-switch__htx open_close" href="javascript:void(0);"><span>Menu mobile</span></a>
                    <div className="main-menu">
                        <div id="header_menu">
                             <img src="/img/logo_m.png" width="141" height="40" alt="Velocity 360" data-retina="true" />
                        </div>
                        <a href="#" className="open_close" id="close_in"><i className="icon_set_1_icon-77"></i></a>
                         <ul>
                            <li><a href="/">Home</a></li>
                            <li className="submenu">
                                <a href="javascript:void(0);" className="show-submenu">Courses<i className="icon-down-open-mini"></i></a>
                                <ul>
                                    <li><a href="index.html">Home Booking</a></li>
                                    <li><a href="index_5.html">Home Booking date 2</a></li>
                                </ul>
                            </li>
                            <li><a href="/">Login</a></li>
                        </ul>
                    </div>
                    </nav>
                </div>
            </div>
        </header>
    )

}

const localStyle = {
    title: {
        marginTop: 6,
        color:'#333',
        fontFamily: 'Pathway Gothic One',
        fontWeight: 100
    },
    titleWhite: {
        marginTop: 6,
        color:'#fff',
        fontFamily: 'Pathway Gothic One',
        fontWeight: 100
    }
}