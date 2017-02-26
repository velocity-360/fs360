import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { Preview, Section } from '../view'
import { TextUtils, Stripe } from '../../utils'
import BaseContainer from './BaseContainer'


class Tutorials extends Component {
    constructor(){
        super()
        this.state = {
            selected: 'All',
            showModal: false,
            showCreateTeam: false,
            passwords: {},
            updatedProfile: null
        }
    }

    selectItem(item, event){
        event.preventDefault()
//        window.scrollTo(0, 0)
        const divPosition = $('#tutorials').offset()
        $('html, body').animate({scrollTop: divPosition.top}, 'slow')


        this.setState({
            selected: item
        })
    }


	render(){
        const style = styles.home
        const selected = this.state.selected
        const list = this.props.tutorials[selected.toLowerCase()] || []

        let content = (
            <div>
                { list.map((tutorial, i) => {
                        return (
                            <div key={tutorial.id} className="review_strip_single">
                                <img alt="Pic" className="img-circle" src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=68'} />
                                <small> - { tutorial.posts.length } Units -</small>
                                <h4><a href={'/tutorial/'+tutorial.slug}>{ tutorial.title }</a></h4>
                                <p>{ TextUtils.truncateText(tutorial.description, 175) }</p>
                                <div style={{textAlign:'right'}}>
                                    <a href={'/tutorial/'+tutorial.slug} style={{height:36, borderRadius:18, marginTop:12, paddingTop:9}} className="btn_1 white">View</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )


		return (
			<div>
			    <section className="parallax-window" id="short" data-parallax="scroll" data-image-src="/img/joe_light_blue.png" data-natural-width="1400" data-natural-height="350">
			        <div id="subheader">
			            <h1>Tutorials</h1>
				    </div>
			    </section>

                <div id="tutorials" className="container margin_60_35" style={{paddingTop:64}}>

                    <div className="row">
                        <div className="col-md-3" id="sidebar">
                            <div className="theiaStickySidebar">
                                <div id="faq_box">
                                    <ul id="cat_nav">
                                        <li><a onClick={this.selectItem.bind(this, 'All')} href="#" className="active">All</a></li>
                                        <li><a onClick={this.selectItem.bind(this, 'Fullstack')} href="#">Fullstack</a></li>
                                        <li><a onClick={this.selectItem.bind(this, 'Node')} href="#">Node</a></li>
                                        <li><a onClick={this.selectItem.bind(this, 'React')} href="#">React</a></li>
                                        <li>
                                            <div style={{padding:'15px 15px'}}>
                                                <img src="/img/slack.png" /> 
                                                <p style={{marginTop:12}}>
                                                    Join our Slack channel to ask questions about tutorials, get feedback on 
                                                    your code and to discuss general programming and industry topics: 
                                                </p>
                                                <div id="message-newsletter_2"></div>
                                                <div className="form-group">
                                                    <input style={localStyle.input} onChange={this.props.updateCredentials.bind(this)} type="text" id="name" placeholder="Name" className="form-control" /><br />
                                                    <input style={localStyle.input} onChange={this.props.updateCredentials.bind(this)} type="text" id="email" placeholder="Email" className="form-control" />
                                                </div>
                                                <button onClick={this.props.subscribe.bind(this)} className="btn_1 white">Join</button>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-9">
                            <h3 className="nomargin_top">{selected}</h3>
                            <hr />

                            <div className="panel-group" id="courses">
                                <div className="row">
                                    <div className="col-md-9">
                                    	{ content }

                                    </div>
                                </div>
                            </div>

                            <h3 className="nomargin_top">Subscribe</h3>
                            <hr />
                            <div className="panel-group" id="subscribe">
                                <div className="row">

                                    <div className="col-md-6">
                                        <div className="box_style_3" id="general_facilities">
                                            <h3>Premium Membership</h3>
                                            <p style={{marginTop:12, paddingTop:12, borderTop:'1px solid #ddd'}}>
                                                Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, 
                                                code samples, and forums on the site. There are no long term commitments and membership 
                                                can be canceled at any time.
                                            </p>

                                            <ul className="list_ok">
                                                <li>Downloadable Code Samples</li>
                                                <li>Downloadable Videos</li>
                                                <li>Q&A Forum Access</li>
                                                <li>Discounts on Live Courses</li>
                                            </ul>
                                            <button onClick={this.props.showStripeModal.bind(this, {schema:'subscription'})} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white" href="#">Subscribe</button>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className="box_style_3" id="general_facilities">
                                            <h3>Basic Membership</h3>
                                            <p style={{marginTop:12, paddingTop:12, borderTop:'1px solid #ddd'}}>
                                                Join as a basic member to gain access to the free tutorials, get notifications when 
                                                new tutorials and courses are published, and participate in the Q&A forums.
                                            </p>
                                            <input onChange={this.props.updateCredentials.bind(this)} style={{marginTop:12}} className="form-control" type="text" id="username" placeholder="Username" />
                                            <input onChange={this.props.updateCredentials.bind(this)} style={{marginTop:12}} className="form-control" type="text" id="email" placeholder="Email" />
                                            <button onClick={this.props.register.bind(this)} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white">Subscribe</button>
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

const localStyle = {
    input: {
        border: 'none',
        boxShadow: 'none',
        height: 28,
        padding: 0,
        borderBottom: '1px solid #eee'
    }
}

const stateToProps = (state) => {
    return {
        courses: state.course.all,
        tutorials: state.tutorial
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchCourses: (params) => dispatch(actions.fetchCourses(params)),
        fetchTutorials: (params) => dispatch(actions.fetchTutorials(params))
    }
}

export default connect(stateToProps, dispatchToProps)(BaseContainer(Tutorials))
