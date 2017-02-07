import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Link, browserHistory } from 'react-router'
import { TextUtils, Stripe } from '../../utils'


class Account extends Component {

	componentDidMount(){
        if (this.props.tutorials != null)
        	return

        this.props.fetchTutorials({isFeatured:'yes'})
        .then(response => {
        	console.log('TUTORIALS: '+JSON.stringify(response))

        })
        .catch(err => {
//        	console.log('FETCH TUTORIALS ERROR: '+JSON.stringify(err))

        })
	}

	componentDidUpdate(){
		console.log('componentDidUpdate: ')

	}

	render(){
		let list = null
		if (this.props.tutorials != null){
			list = this.props.tutorials.map((tutorial, i) => {
				return (
                    <div key={tutorial.id} className="review_strip_single">
                        <img alt="Pic" className="img-circle" src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=68'} />
                        <small> - { tutorial.posts.length } Units -</small>
                        <h4><a href={'/tutorial/'+tutorial.slug}>{ tutorial.title }</a></h4>
                        <p>{ TextUtils.truncateText(tutorial.description, 250) }</p>
                    </div>
				)
			})
		}

		return (
            <div style={{paddingTop:64}}>
                <div className="container margin_60_35">
                    <div className="row">
                    
                        <div className="col-md-3" id="sidebar">
                            <div className="theiaStickySidebar">
                                <div id="faq_box">
                                    <ul id="cat_nav">
                                        <li><a href="#courses" className="active">My Courses</a></li>
                                        <li><a href="#profile">Profile</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-9">
                            <h3 className="nomargin_top">My Courses</h3>
                            <hr />

                            <div className="panel-group" id="courses">
                                <div className="row">
                                    <div className="col-md-9">
                                        {list}
                                    </div>
                                </div>
                            </div>


                            <h3 className="nomargin_top">Profile</h3>
                            <hr />
                            <div className="panel-group" id="profile">
                                <div className="row">
                                    <div className="col-md-9">
                                        <p>text text</p>
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

const stateToProps = (state) => {
    return {
        account: state.account,
		tutorials: state.tutorial.all
    }
}

const dispatchToProps = (dispatch) => {
    return {
		fetchTutorials: (params) => dispatch(actions.fetchTutorials(params)),
        fetchCourses: (params) => dispatch(actions.fetchCourses(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Account)

