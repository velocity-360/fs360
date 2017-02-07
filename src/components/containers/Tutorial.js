import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { TextUtils, Stripe, APIManager } from '../../utils'
import styles from './styles'

class Tutorial extends Component {
    constructor(){
        super()
        this.state = {
            visitor: {
                name: '',
                email: '',
                subject: ''
            }
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        if (this.props.tutorials == null)
            this.props.fetchTutorials(null)
    }

    showStripeModal(type, event){
        event.preventDefault()
        this.props.toggleLoading(true)

        if (type == 'charge'){
            const tutorial = this.props.tutorials[this.props.slug]
            Stripe.initializeWithText('Purchase', (token) => {
                this.props.submitStripeCharge(token, tutorial)
                .then((response) => {
                    console.log('TEST: '+JSON.stringify(response))
                    this.props.toggleLoading(false)
                })
                .catch((err) => {

                })
            }, () => {
                setTimeout(() => {
                    this.props.toggleLoading(false)
                }, 100)
            })

            Stripe.showModalWithText(tutorial.title+' - $'+tutorial.price)
            return
        }

        if (type == 'subscription'){
            Stripe.initializeWithText('Subscribe', (token) => {
                this.props.submitStripeCard(token)
                .then((response) => {
                    // console.log('TEST: '+JSON.stringify(response))
                    this.props.toggleLoading(false)
                })
                .catch((err) => {

                })
            }, () => {
                setTimeout(() => {
                    this.props.toggleLoading(false)
                }, 100)
            })

            Stripe.showModalWithText('Premium subscription - $19.99/mo')
        }
    }

    subscribe(event){
        event.preventDefault()
        if (this.props.currentUser == null)
            return

        const tutorial = this.props.tutorials[this.props.slug]
        if (tutorial == null)
            return

        if (tutorial.subscribers.indexOf(this.props.currentUser.id) != -1)
            return

        let subscribers = Object.assign([], tutorial.subscribers)
        subscribers.push(this.props.currentUser.id)
        this.props.updateTutorial(tutorial, {subscribers: subscribers})
    }

	render(){
        const tutorial = this.props.tutorials[this.props.slug]
        const style = styles.home

        let cta = null
        if (tutorial.price == 0) { // it's free
            if (this.props.currentUser == null)
                cta = purchase(tutorial, this)
            else if (this.props.currentUser.accountType == 'premium')
                cta = premium(this.props.currentUser, this)
            else 
                cta = purchase(tutorial, this)
        }

        else if (this.props.currentUser == null)
            cta = purchase(tutorial, this)

        else if (tutorial.subscribers.indexOf(this.props.currentUser.id) != -1)
            cta = subscribed(tutorial)

        else if (this.props.currentUser.accountType == 'premium')
            cta = premium(this.props.currentUser, this)
        
        else // logged in, not subscribed
            cta = purchase(tutorial, this)

        let units = null
        if (tutorial.posts.length == 0)
            units = <h3 style={styles.title}>Coming Soon</h3>
        else if (tutorial.price == 0)
            units = <h3 style={styles.title}>Units</h3>
        else
            units = <h3 style={styles.title}>Preview</h3>

		return (

        <div>
            <section className="parallax-window" id="short" data-parallax="scroll" data-image-src="/img/sub_header_short_2.jpg" data-natural-width="1400" data-natural-height="350">
                <div id="subheader">
                    <h1>{tutorial.title}</h1>
                </div>
            </section>

            <div className="container margin_60_35">
                <div className="row">
                
                    <div className="col-md-3" id="sidebar">
                        <div className="theiaStickySidebar">
                            <div id="faq_box">
                                <ul id="cat_nav">
                                    <li><a href="#overview" className="active">Overview</a></li>
                                    <li><a href="#units">Units</a></li>
                                    <li><a href="#delay">Delivery delay</a></li>
                                    <li><a href="#takeaway">Takeaway</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-9">
                        <h3 className="nomargin_top">Overview</h3>
                        <hr />

                            <div className="panel-group" id="overview">

                <div className="row">
                    <div className="col-md-9">
                        <img style={{border:'1px solid #ddd', width:260, marginBottom:16}} alt={tutorial.title} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=320'} />
                        <p>{tutorial.description}</p>
                        <h4>Room facilities</h4>
                        <p>
                            Lorem ipsum dolor sit amet, at omnes deseruisse pri. Quo aeterno legimus insolens ad. 
                            Sit cu detraxit constituam, an mel iudico constituto efficiendi.
                        </p>
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <ul className="list_ok">
                                    <li>Coffee machine</li>
                                    <li>Wifi</li>
                                    <li>Microwave</li>
                                    <li>Oven</li>
                                </ul>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <ul className="list_ok">
                                    <li>Fridge</li>
                                    <li>Hairdryer</li>
                                    <li>Towels</li>
                                    <li>Toiletries</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                            </div>
                            
                            <h3>Units</h3>
                     
                            <div className="panel-group" id="units">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#works" href="#collapseOne_works">Anim pariatur cliche reprehenderit?<i className="indicator icon_set_1_icon-11 pull-right"></i></a>
                                  </h4>
                                </div>
                                <div id="collapseOne_works" className="panel-collapse collapse">
                                  <div className="panel-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#works" href="#collapseTwo_works">Parsnip lotus root celery?<i className="indicator icon_set_1_icon-11 pull-right"></i></a>
                                  </h4>
                                </div>
                                <div id="collapseTwo_works" className="panel-collapse collapse">
                                  <div className="panel-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#works" href="#collapseThree_works">Beet greens peanut salad?<i className="indicator icon_set_1_icon-11 pull-right"></i></a>
                                  </h4>
                                </div>
                                <div id="collapseThree_works" className="panel-collapse collapse">
                                  <div className="panel-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                             <h3>Delivery delay</h3>
                     
                            <div className="panel-group" id="delay">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#delay" href="#collapseOne_delay">Anim pariatur cliche reprehenderit?<i className="indicator icon_set_1_icon-11 pull-right"></i></a>
                                  </h4>
                                </div>
                                <div id="collapseOne_delay" className="panel-collapse collapse">
                                  <div className="panel-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#delay" href="#collapseTwo_delay">Parsnip lotus root celery?<i className="indicator icon_set_1_icon-11 pull-right"></i></a>
                                  </h4>
                                </div>
                                <div id="collapseTwo_delay" className="panel-collapse collapse">
                                  <div className="panel-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#delay" href="#collapseThree_delay">Beet greens peanut salad?<i className="indicator icon_set_1_icon-11 pull-right"></i></a>
                                  </h4>
                                </div>
                                <div id="collapseThree_delay" className="panel-collapse collapse">
                                  <div className="panel-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                            </div>
                                            
                            <h3>Takeaway</h3>
                     
                            <div className="panel-group" id="takeaway">
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#takeaway" href="#collapseOne_takeaway">Anim pariatur cliche reprehenderit?<i className="indicator icon_set_1_icon-11 pull-right"></i></a>
                                  </h4>
                                </div>
                                <div id="collapseOne_takeaway" className="panel-collapse collapse">
                                  <div className="panel-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#takeaway" href="#collapseTwo_takeaway">Parsnip lotus root celery?<i className="indicator icon_set_1_icon-11 pull-right"></i></a>
                                  </h4>
                                </div>
                                <div id="collapseTwo_takeaway" className="panel-collapse collapse">
                                  <div className="panel-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                              <div className="panel panel-default">
                                <div className="panel-heading">
                                  <h4 className="panel-title">
                                    <a className="accordion-toggle" data-toggle="collapse" data-parent="#takeaway" href="#collapseThree_takeaway">Beet greens peanut salad?<i className="indicator icon_set_1_icon-11 pull-right"></i></a>
                                  </h4>
                                </div>
                                <div id="collapseThree_takeaway" className="panel-collapse collapse">
                                  <div className="panel-body">
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably havent heard of them accusamus labore sustainable VHS.
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                    </div>
                </div>
            </div>  
        </div>

		)
	}
}

const premium = (user, context) => {
    return (
        <div className="col-md-6">
            <div className="heading-block fancy-title nobottomborder title-bottom-border">
                <h4 style={styles.title}>Premium <span>Member</span></h4>
            </div>

            <p style={styles.paragraph}>
                As a premium member, you can subscribe to this tutorial for free by clicking below:
            </p>
            <a href="#" onClick={context.subscribe.bind(context)} className="button button-small button-circle button-border button-aqua">Subscribe</a>
        </div>
    )    
}

const subscribed = (tutorial) => {
    return (
        <div className="col-md-6">
            <div className="heading-block fancy-title nobottomborder title-bottom-border">
                <h4 style={styles.title}>Subscribed</h4>
            </div>

            <p style={styles.paragraph}>
                You are subscribed to this tutorial series. To access all of the videos and code samples, 
                click on the link below:
            </p>
            <a target="_blank" href={'/premium/tutorial/'+tutorial.id} className="button button-small button-circle button-border button-aqua">Download</a>
        </div>
    )
}

const purchase = (tutorial, context) => {
    return (
        <div>
            { (tutorial.price == 0) ? null : 
                (
                    <div className="col-md-6">
                        <div className="heading-block fancy-title nobottomborder title-bottom-border">
                            <h4 style={styles.title}>Purchase</h4>
                        </div>
                        <p style={styles.paragraph}>
                            Purchase this tutorial for ${tutorial.price} and receive all videos, code samples and 
                            access to the forum where people post questions and answers. 
                            <br /><br />
                        </p>
                        <a onClick={context.showStripeModal.bind(context, 'charge')} className="btn btn-lg" href="#">Purchase, ${tutorial.price}</a>
                    </div>
                )
            }

            <div className="col-md-6">
                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>Premium <span>Membership</span></h4>
                </div>

                <p style={styles.paragraph}>
                    Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, 
                    code samples, and forums on the site. There are no long term commitments and membership 
                    can be canceled at any time.
                    <br /><br />
                    &#8226; <i style={{marginLeft:8}}>Downloadable Code Samples</i><br />
                    &#8226; <i style={{marginLeft:8}}>Downloadable Videos</i><br />
                    &#8226; <i style={{marginLeft:8}}>Q&A Forum Access</i><br />
                    &#8226; <i style={{marginLeft:8}}>Discounts on Live Courses</i><br />                    
                </p>
                <a onClick={context.showStripeModal.bind(context, 'subscription')} className="btn btn-lg" href="#">Subscribe</a>
            </div>
        </div> 
    )
}

const localStyle = {
    youtube: {
        background:'#fff',
        padding:3,
        border:'1px solid #ddd',
        width: 220,
        float:'none',
        clear:'both',
        margin:'4px auto'
    },
    input: {
        background: '#f9f9f9',
        border: 'none',
        padding: 12,
        marginTop: 12
    }
}

const stateToProps = (state) => {
    return {
        currentUser: state.account.currentUser,
        tutorials: state.tutorial
    }
}

const dispatchToProps = (dispatch) => {
    return {
        submitStripeCard: (token) => dispatch(actions.submitStripeCard(token)),
        submitStripeCharge: (token, product) => dispatch(actions.submitStripeCharge(token, product)),
        fetchTutorials: (params) => dispatch(actions.fetchTutorials(params)),
        updateTutorial: (tutorial, params) => dispatch(actions.updateTutorial(tutorial, params)),
        toggleLoading: (loading) => dispatch(actions.toggleLoading(loading))
    }
}

export default connect(stateToProps, dispatchToProps)(Tutorial)
