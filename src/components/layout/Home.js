import React, { Component } from 'react'
import styles from './styles'
import { Header, Footer, Section, Nav } from '../view'
import { FeaturedTutorials } from '../containers'

class Home extends Component {
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    
	render(){

		return ( 
            <div>            
                <div className="layer"></div>
                <div id="preloader">
                    <div data-loader="circle-side"></div>
                </div>
                
                <Nav />
                <Section content="header" />
                <Section content="welcome" />
                <FeaturedTutorials />
                <Section content="testimonials" />
    
                <div className="container margin_60_35">
                    <h2 className="main_title">Premium Membership
                        <span>Receive Full Access for $19.99 / Month</span>
                    </h2>
                    <div className="row add_top_20">
                    
                        <div className="col-md-4 col-md-offset-2">
                            <div className="box_style_1">
                                <div className="box_contact">
                                    <i className="icon_set_1_icon-41"></i>
                                    <h4>All Access</h4>
                                    <p>
                                        Join as a premium member for $19.99 each month and receive unlimited access 
                                        to all tutorials, code samples, and forums on the site.
                                    </p>
                                    <ul style={{paddingLeft:16}}>
                                        <li>Downloadable Code Samples</li>
                                        <li>Downloadable Videos</li>
                                        <li>Q &amp; A Forum Access</li>
                                        <li>Discounts on Live Courses</li>
                                    </ul>
                                </div>
                           </div>
                        </div>   
                        
                        <div className="col-md-4">
                            <div id="message-contact"></div>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="form-control" id="email" placeholder="Email" />
                            </div>
                            <button className="btn_1 white" id="submit-newsletter_2">Join</button>
                        </div>
                    </div>
                </div>

                <div id="dtBox"></div>
                <Footer />
            </div>
		)
	}
}

export default Home
