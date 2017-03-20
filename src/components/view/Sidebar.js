import React, { Component } from 'react'

export default (props) => {

    return (
        <aside className="rs-sidebar rs-scroll-custom">
            <ul className="rs-sidebar-nav default-sidebar-nav">
                <li className="rs-user-sidebar">
                    <a href="javascript:void(0);">
                        <img src="/dash/images/avatars/01.png" alt="Avatar" className="avatar img-circle" />
                        Mister Bin, Jr
                        <span className="subname text-uppercase m-t">GentoLab, LLC</span>
                    </a>
                    <ul>
                        <li><a href="javascript:void(0);">My Profile</a></li>
                        <li><a href="javascript:void(0);">Account Settings</a></li>
                        <li><a href="javascript:void(0);">Author Level<span className="label label-success p-x text-uppercase">Elite</span></a></li>
                        <li><a href="javascript:void(0);">Log Out</a></li>
                    </ul>
                </li>

                <li className="menu-block-divider"></li>
                <li className="menu-header">Dashboard</li>

                <li className="active no-icon-menu">
                    <a href="javascript:void(0);">My Courses</a>
                </li>
                <li className="no-icon-menu">
                    <a href="javascript:void(0);">Featured</a>
                    <ul>
                        <li className="p-y p-x-md">
                            <div className="radio radio-custom radio-lighten m-b-md">
                                <label>
                                    <input type="radio" name="rs-revenue" value="" checked />
                                    <span className="checker bg-transparent"></span>
                                    All
                                </label>
                            </div>
                            <div className="radio radio-custom radio-lighten m-b-md">
                                <label>
                                    <input type="radio" name="rs-revenue" value="" />
                                    <span className="checker bg-transparent"></span>
                                    React / Redux
                                </label>
                            </div>
                            <div className="radio radio-custom radio-lighten m-b-md">
                                <label>
                                    <input type="radio" name="rs-revenue" value="" />
                                    <span className="checker bg-transparent"></span>
                                    Node
                                </label>
                            </div>
                            <div className="radio radio-custom radio-lighten m-b-md">
                                <label>
                                    <input type="radio" name="rs-revenue" value="" />
                                    <span className="checker bg-transparent"></span>
                                    Full Stack
                                </label>
                            </div>
                        </li>
                    </ul>
                </li>

                <li className="menu-block-divider"></li>
            </ul>
        </aside>    	
    )
}