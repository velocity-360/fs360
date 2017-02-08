import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Link, browserHistory } from 'react-router'
import { TextUtils, Stripe } from '../../utils'


class Account extends Component {
    constructor(){
        super()
        this.state = {
            selected: 'My Courses'
        }
    }

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

    selectItem(item, event){
        event.preventDefault()
        this.setState({
            selected: item
        })

    }

	componentDidUpdate(){
        const selected = this.state.selected
        console.log('componentDidUpdate: '+selected)

	}

	render(){

        const selected = this.state.selected
        let content = null

        if (selected == 'My Courses'){
            content = (
                <div>
                    { (this.props.tutorials == null) ? null : (
                            this.props.tutorials.map((tutorial, i) => {
                                return (
                                    <div key={tutorial.id} className="review_strip_single">
                                        <img alt="Pic" className="img-circle" src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=68'} />
                                        <small> - { tutorial.posts.length } Units -</small>
                                        <h4><a href={'/tutorial/'+tutorial.slug}>{ tutorial.title }</a></h4>
                                        <p>{ TextUtils.truncateText(tutorial.description, 175) }</p>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            )
        }
        if (selected == 'Profile'){
            content = (
                <div style={{height: 600}}>
                    <p>text text</p>
                </div>
            )            
        }

		return (
            <div style={{paddingTop:64}}>
                <div className="container margin_60_35">
                    <div className="row">
                    
                        <div className="col-md-3" id="sidebar">
                            <div className="theiaStickySidebar">
                                <div id="faq_box">
                                    <ul id="cat_nav">
                                        <li><a onClick={this.selectItem.bind(this, 'My Courses')} href="#" className="active">My Courses</a></li>
                                        <li><a onClick={this.selectItem.bind(this, 'Profile')} href="#">Profile</a></li>
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
                                        {content}
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

