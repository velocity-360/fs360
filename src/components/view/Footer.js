import React, { Component } from 'react'

export default (props) => {

	return (
        <section className="pt40 pb40 bg-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-3 text-center">
                        <img alt="Logo" style={{maxWidth:120}} className="logo" src="/img/logo-light.png" />
                    </div>

                    <div className="col-sm-3 text-center pt8">
                        <ul className="list-inline social-list">
                            <li>
                                <a href="#">
                                    <i className="ti-twitter-alt icon icon-sm"></i>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.facebook.com/Velocity-360-1631852427085987/?ref=bookmarks">
                                    <i className="ti-facebook icon icon-sm"></i>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.youtube.com/channel/UCf5CgGVs6zEq6DUtyFw9e-Q/videos">
                                    <i className="ti-youtube icon icon-sm"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm-6">
                        <form className="form-newsletter halves" data-success="Thanks for your registration, we will be in touch shortly." data-error="Please fill all fields correctly.">
                            <input type="text" name="email" className="mb24" placeholder="Email Address" />
                            <button type="submit" className="mb24">Join Newsletter</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
	)

}

