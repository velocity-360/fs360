import React, { Component } from 'react'

export default (props) => {

	return (
         <footer >
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-12 col-md-offset-2">
                        <h1 style={{fontFamily:'Pathway Gothic One', color:'#fff'}}>Velocity 360</h1>
                        <ul id="contact_details_footer">
                            <li>
                                <a href="/">www.velocity360.io</a>
                                <br />katrina@velocity360.io
                            </li>
                        </ul>  
                    </div>
                    <div className="col-md-2 col-sm-4">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Courses</a></li>
                            <li><a href="#">Account</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-4" id="newsletter">
                        <h3>Newsletter</h3>
                        <p>Join our newsletter to keep be informed about offers and news.</p>
                        <div id="message-newsletter_2"></div>
                        <form method="post" action="assets/newsletter.php" name="newsletter_2" id="newsletter_2">
                            <div className="form-group">
                                <input type="text" placeholder="Name" className="form-control" /><br />
                                <input type="text" placeholder="Email" className="form-control" />
                            </div>
                            <input style={{height:36, borderRadius:18}} type="submit" value="Subscribe" className="btn_1 white" id="submit-newsletter_2" />
                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div id="social_footer">
                            <ul>
                                <li><a target="_blank" href="https://www.facebook.com/Velocity-360-1631852427085987/"><i className="icon-facebook"></i></a></li>
                                <li><a target="_blank" href="https://www.youtube.com/channel/UCf5CgGVs6zEq6DUtyFw9e-Q/videos"><i className="icon-youtube-play"></i></a></li>
                            </ul>
                            <p>&copy; 2017. Velocity 360</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

	)

}

