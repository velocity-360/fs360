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
                            <h2 className="mb40 uppercase">Bold, Vibrant, You.</h2>
                            <a className="btn btn-lg" href="#">Explore Collection</a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </section>
)

const welcome = (
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
)

const join = (
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
)