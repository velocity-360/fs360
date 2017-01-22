import React, { Component } from 'react'
import styles from './styles'
import { Header, Footer, Section } from '../view'
import { FeaturedTutorials } from '../containers'

class Home extends Component {
    componentDidMount(){
        window.scrollTo(0 ,0)
    }
    
	render(){

		return ( 
            <div>

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
                                        Pages
                                    </a>
                                    <ul className="mega-menu">
                                        <li>
                                            <ul>
                                                <li>
                                                    <span className="title">Inner Pages</span>
                                                </li>
                                                <li>
                                                    <a href="page-about-us-1.html">About Us 1</a>
                                                </li>
                                                <li>
                                                    <a href="page-about-us-2.html">About Us 2</a>
                                                </li>
                                                <li>
                                                    <a href="page-about-us-3.html">About Us 3</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="#">Elements</a></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </nav>
        </div>

        <div className="main-container">
            <section className="image-slider slider-all-controls parallax controls-inside pt0 pb0">
                <ul className="slides">
                    <li className="overlay image-bg pt160 pb160 pt-xs-120 pb-xs-120">
                        <div className="background-image-holder">
                            <img alt="image" className="background-image" src="/img/girls.jpg" />
                        </div>
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-md-12">
                                    <h2 className="mb40 uppercase">Bold, Vibrant, You.</h2>
                                    <a className="btn btn-lg" href="#">Explore Collection</a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </section>

            <section style={{backgroundColor: '#f9f9f9'}}>
                <div className="container">
                    <div className="row v-align-children">
                        <div className="col-sm-5">
                            <h3>Join us for a day of<br /> ideas &amp; discussion.</h3>
                            <p className="lead mb40" style={{fontWeight:100}}>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                            <div className="overflow-hidden mb32 mb-xs-24">
                                <i className="ti-package icon icon-sm pull-left"></i>
                                <h6 className="uppercase mb0 inline-block p32">All Inclusive Package</h6>
                            </div>
                            <div className="overflow-hidden mb32 mb-xs-24">
                                <i className="ti-medall-alt icon icon-sm pull-left"></i>
                                <h6 className="uppercase mb0 inline-block p32">Foundry Club Access</h6>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                            <div className="pricing-table pt-1 text-center emphasis" style={{border:'1px solid #ddd'}}>
                                <h5 className="uppercase">Admit One</h5>
                                <span className="price">$89</span>
                                <p className="lead">Per Ticket</p>
                                <a className="btn btn-white btn-lg" href="#">Purchase Ticket</a>
                                <p>
                                    <a href="#">Contact Us for</a>
                                    <br /> large ticket volumes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section>
                <div className="container">
                    <div className="row mb0 mb-xs-24">
                        <div className="col-sm-12 text-center">
                            <h3>Strap yourself in for ideas</h3>
                            <p className="lead">
                                Prepare for a full day of discussion from some of the webs best and brightest.
                            </p>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="tabbed-content button-tabs">
                                <ul className="tabs thirds mb64 mb-xs-24">
                                    <li className="active">
                                        <div className="tab-content text-left">
                                            <div>
                                                <div className="overflow-hidden">
                                                    <img alt="Pic" className="mb24 pull-left" src="img/avatar1.png" />
                                                    <div className="pull-left p32 p0-xs pt24">
                                                        <h6 className="uppercase mb8 number">9:30am - 10:30am</h6>
                                                        <h4>Alice French - E-Commerce & Fashion</h4>
                                                    </div>
                                                </div>
                                                <p>
                                                    Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                                                </p>
                                                <hr className="mt40 mb40 mt-xs-0 mb-xs-24" />
                                            </div>
                                            <div>
                                                <div className="overflow-hidden">
                                                    <img alt="Pic" className="mb24 pull-left" src="img/avatar2.png" />
                                                    <div className="pull-left p32 p0-xs pt24">
                                                        <h6 className="uppercase mb8 number">11:00am - 12:00pm</h6>
                                                        <h4>Luke Hess - Better Selling Technique</h4>
                                                    </div>
                                                </div>
                                                <p>
                                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                                                </p>
                                                <hr className="mt40 mb40 mt-xs-0 mb-xs-24" />
                                            </div>
                                            <div>
                                                <div className="overflow-hidden">
                                                    <img alt="Pic" className="mb24 pull-left" src="img/avatar2.png" />
                                                    <div className="pull-left p32 p0-xs pt24">
                                                        <h6 className="uppercase mb8 number">11:00am - 12:00pm</h6>
                                                        <h4>Luke Hess - Better Selling Technique</h4>
                                                    </div>
                                                </div>
                                                <p>
                                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                                                </p>
                                                <hr className="mt40 mb40 mt-xs-0 mb-xs-24" />
                                            </div>
                                            <div>
                                                <div className="overflow-hidden">
                                                    <img alt="Pic" className="mb24 pull-left" src="img/avatar2.png" />
                                                    <div className="pull-left p32 p0-xs pt24">
                                                        <h6 className="uppercase mb8 number">11:00am - 12:00pm</h6>
                                                        <h4>Luke Hess - Better Selling Technique</h4>
                                                    </div>
                                                </div>
                                                <p>
                                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                                                </p>
                                                <hr className="mt40 mb40 mt-xs-0 mb-xs-24" />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row text-center">
                                <div className="col-md-12">
                                    <a className="btn btn-lg" href="#">Explore Tutorials</a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            
            
            <section className="pt96 bg-secondary">
                <div className="container">
                    <div className="row mb64 mb-xs-24">
                        <div className="col-sm-12 col-md-10 col-md-offset-1 text-center">
                            <h2 className="mb40 uppercase">Bold, Vibrant, You.</h2>
                        </div>
                    </div>
                    <div className="row masonry masonryFlyIn">
                        <div className="col-md-4 col-sm-12 masonry-item mb30">
                            <div className="feature boxed mb0">
                                <h2 className=" color-primary mb0">80+</h2>
                                <h6 className="uppercase color-primary">Page Templates</h6>
                                <p>
                                    Pre-made HTML page templates including fully realized shop, blog and portfolio layouts.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 masonry-item mb30">
                            <div className="boxed feature mb0">
                                <i className="icon ti-infinite color-primary inline-block mb0"></i>
                                <h6 className="uppercase color-primary">Layout Possibilities</h6>
                                <p>
                                    With tons of purpose-built content blocks, colors and fonts, Foundry presents a mind-boggling number of combinations. Test drive the builder now!
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 masonry-item mb30">
                            <div className="boxed feature mb0">
                                <h2 className=" color-primary mb8">Concepts</h2>
                                <h6 className="uppercase color-primary">Kickstart your project</h6>
                                <p>
                                    Fresh and unique concepts included out of the box. From portfolio to property showcase, Foundrys adaptable look is perfect for your next project.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-secondary">
                <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
                    <div className="feature boxed bg-secondary">
                        <form className="text-center form-email" data-error="There were errors, please check all required fields and try again" data-success="Thanks for taking the time to complete the planner. We'll be in touch shortly!">
                            <h4 className="uppercase mt48 mt-xs-0">Plan your Foundry project</h4>
                            <p className="lead mb64 mb-xs-24">
                                Share a little detail about your project so we<br /> can tailor the solution thats right for you.
                            </p>
                            <div className="overflow-hidden">
                                <div className="col-sm-6 col-sm-offset-3">
                                <input type="text" name="name" style={{background:'#ededed'}} placeholder="Name*" />
                                <input type="text" name="email" style={{background:'#ededed'}} placeholder="Email*" />
                                    <button type="submit">Submit Planner</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>


            <section className="pt40 pb40 bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-3 text-center">
                            <img alt="Logo" style={{maxWidth:180}} className="logo" src="/img/logo-light.png" />
                        </div>

                        <div className="col-sm-3 text-center pt8">
                            <ul className="list-inline social-list">
                                <li>
                                    <a href="#">
                                        <i className="ti-twitter-alt icon icon-sm"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="ti-facebook icon icon-sm"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="ti-vimeo-alt icon icon-sm"></i>
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
        </div>



            </div>
		)
	}
}

export default Home
