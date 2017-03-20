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
                <li className="menu-header">No Icon Menu</li>

                <li className="no-icon-menu">
                    <a href="javascript:void(0);">Gorengan</a>
                </li>
                <li className="no-icon-menu">
                    <a href="javascript:void(0);">Soto Ayam</a>
                    <ul>
                        <li>
                            <a href="javascript:void(0);">Paket Hemat Kampus</a>
                        </li>
                    </ul>
                </li>
                <li className="no-icon-menu">
                    <a href="javascript:void(0);">Tahu Bakso</a>
                </li>

                <li className="menu-block-divider"></li>
            </ul>
        </aside>
    	
    )
}