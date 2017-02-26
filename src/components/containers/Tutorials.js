import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { Preview, Section } from '../view'

class Tutorials extends Component {
    constructor(){
        super()
        this.state = {
            selected: 'My Courses',
            showModal: false,
            showCreateTeam: false,
            passwords: {},
            updatedProfile: null
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        // if (this.props.courses == null)
        //     this.props.fetchCourses(null)
    }

    selectItem(item, event){
        event.preventDefault()
        this.setState({
            selected: item
        })
    }


	render(){
        const style = styles.home

        const selected = this.state.selected

		return (
			<div>
			    <section className="parallax-window" id="short" data-parallax="scroll" data-image-src="/img/joe_light_blue.png" data-natural-width="1400" data-natural-height="350">
			        <div id="subheader">
			            <h1>Tutorials</h1>
				    </div>
			    </section>

                <div className="container margin_60_35" style={{paddingTop:64}}>
                    <div className="row">
                    
                        <div className="col-md-3" id="sidebar">
                            <div className="theiaStickySidebar">
                                <div id="faq_box">
                                    <ul id="cat_nav">
                                        <li><a onClick={this.selectItem.bind(this, 'My Courses')} href="#" className="active">My Courses</a></li>
                                        <li><a onClick={this.selectItem.bind(this, 'Profile')} href="#">Profile</a></li>
                                        <li><a href="/account/logout">Log Out</a></li>
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
                                    	CONTENT

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
        courses: state.course.all
    }
}

const dispatchToProps = (dispatch) => {
    return {
        fetchCourses: (params) => dispatch(actions.fetchCourses(params))
    }
}

export default connect(stateToProps, dispatchToProps)(Tutorials)
