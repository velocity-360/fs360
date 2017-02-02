import React from 'react'
import styles from './style'

export default (props) => {
    switch (props.content){
        case 'header':
            return (header)

        case 'welcome':
            return (welcome)

        case 'testimonials':
            return (testimonials)

        case 'join':
            return (join)

        default:
            return (header)
    }
}

const header = (
    <section className="image-slider slider-all-controls parallax controls-inside pt0 pb0">
        <ul className="slides">
            <li className="overlay image-bg pt160 pb160 pt-xs-120 pb-xs-120">
                <div className="background-image-holder">
                    <img alt="image" className="background-image" src="/img/girl.jpg" />
                </div>
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-12">
                            <h2 className="mb40 uppercase">Learn Full<br />Stack Development</h2>
                            <a className="btn btn-lg" href="#welcome">Learn More</a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </section>
)

const welcome = (
    <section style={{backgroundColor: '#f9f9f9'}} id="welcome">
        <div className="container">
            <div className="row v-align-children">
                <div className="col-sm-5">
                    <h3>Project Based Learning</h3>
                    <p className="lead mb40" style={{fontWeight:100}}>
                        Our video tutorial series are based on full stack projects that incorporate all elements 
                        of realistic sites: front end, back end, database, design, and UI. Further, all series 
                        start from scrath.
                        <br /><br />
                        We do not start a 'beginner' tutorial with several hundred files and lines 
                        of pre-scaffolded code like so many other tutorials on the internet. Every series begins from 
                        step zero and goes all the way to deployment.
                    </p>
                    <div className="overflow-hidden mb16 mb-xs-24">
                        <span style={{fontWeight:800, fontSize:18+'px'}}>&#10003;</span>
                        <h6 className="uppercase mb0 inline-block p32">All Inclusive Package</h6>
                    </div>
                    <div className="overflow-hidden mb16 mb-xs-24">
                        <span style={{fontWeight:800, fontSize:18+'px'}}>&#10003;</span>
                        <h6 className="uppercase mb0 inline-block p32">Foundry Club Access</h6>
                    </div>
                    <div className="overflow-hidden mb16 mb-xs-24">
                        <span style={{fontWeight:800, fontSize:18+'px'}}>&#10003;</span>
                        <h6 className="uppercase mb0 inline-block p32">Foundry Club Access</h6>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6">
                    <div className="pricing-table pt-1 text-center emphasis" style={{border:'1px solid #ddd'}}>
                        <h5 className="uppercase">All Access</h5>
                        <span className="price">$19.99</span>
                        <p className="lead">Per Month</p>
                        <a className="btn btn-white btn-lg" href="#">Join</a>
                        <p>
                            Gain access to all tutorials, code samples and online forums for help and feedback for 
                            $19.99 each month. There is no long term commitment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

const testimonials = (
    <section className="pt96 bg-secondary">
        <div className="container">
            <div className="row mb64 mb-xs-24">
                <div className="col-sm-12 col-md-10 col-md-offset-1 text-center">
                    <h2 className="mb40 uppercase">Bold, Vibrant, You.</h2>
                </div>
            </div>
            <div className="row masonry masonryFlyIn">
                <div className="col-md-4 col-sm-12 masonry-item mb30">
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
                        <i className="icon ti-infinite color-primary inline-block mb0"></i>
                        <h6 className="uppercase color-primary">Layout Possibilities</h6>
                        <p>
                            With tons of purpose-built content blocks, colors and fonts, Foundry presents a mind-boggling number of combinations. Test drive the builder now!
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
            </div>
        </div>
    </section>
)

const join = (
    <section className="bg-secondary">
        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
            <div className="feature boxed bg-secondary">
                <form className="text-center form-email" data-error="There were errors, please check all required fields and try again" data-success="Thanks for taking the time to complete the planner. We'll be in touch shortly!">
                    <h4 className="uppercase mb12 mt24 mt-xs-0">Premium Membership</h4>
                    <hr />
                    <div className="overflow-hidden pt24">
                        <div className="col-sm-6 col-sm-offset-3">
                        <input type="text" name="name" style={{background:'#ededed'}} placeholder="Name" />
                        <input type="text" name="email" style={{background:'#ededed'}} placeholder="Email" />
                            <button type="submit">Join</button>
                        </div>
                    </div>

                    <div className="row mt24 mb16">
                        <div className="col-md-8 col-md-offset-2">
                            <div style={{padding:16, border:'1px solid #ddd', fontSize:14+'px'}}>
                                <p className="lead mb12 mb-xs-24" style={{fontWeight:100}}>
                                    Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, 
                                    code samples, and forums on the site. There are no long term commitments and membership can be 
                                    canceled at any time.
                                </p>
                                <hr />
                                &#8226; <strong style={{color:'#5fcf80'}}>Downloadable Code Samples</strong><br />
                                &#8226; <strong style={{color:'#5fcf80'}}>Downloadable Videos</strong><br />
                                &#8226; <strong style={{color:'#5fcf80'}}>Q&A Forum Access</strong><br />
                                &#8226; <strong style={{color:'#5fcf80'}}>Discounts on Live Courses</strong>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
)