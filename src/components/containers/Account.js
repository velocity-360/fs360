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
                    <div key={tutorial.id}>
                        <div className="overflow-hidden">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="inline-block pull-left">
                                        <h6 className="uppercase mb0 mt0 number">{ tutorial.posts.length } Units | { (tutorial.price == 0) ? 'Free' : '$'+tutorial.price}</h6>
                                        <a style={{color:'#333'}} href={'/tutorial/'+tutorial.slug}><h4 className="mb0 mt0">{ tutorial.title }</h4></a>
                                        <p className="mb0 mt24">
                                            { TextUtils.truncateText(tutorial.description, 250) }
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-2 pull-right">
                                    <img alt="Pic" style={{maxWidth:90, border:'1px solid #ddd'}} className="mb24 pull-left" src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=120'} />
                                </div>
                            </div>
                            <div className="inline-block pull-right pt24 pt-xs-24">
                                <a href={'/tutorial/'+tutorial.slug} className="btn btn-lg" role="button">View Tutorial</a>
                            </div>
                        </div>
                        <hr className="mt40 mb40 mt-xs-0 mb-xs-24" />
                    </div>
				)
			})
		}


		return (
			<section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h4 className="uppercase mb24">Account</h4>

                            <div className="tabbed-content button-tabs vertical">
                                <ul className="tabs">
                                    <li className="active">
                                        <div className="tab-title">
                                            <span>Courses</span>
                                        </div>
                                        <div className="tab-content">
                                            <hr />
                                            { list }

                                        </div>
                                    </li>
                                    <li>
                                        <div className="tab-title">
                                            <span>Profile</span>
                                        </div>
                                        <div className="tab-content">
                                            <h5 className="uppercase">Profile</h5>
                                            <hr />
                                            <p>
                                                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="tab-title">
                                            <span>Culture</span>
                                        </div>
                                        <div className="tab-content">
                                            <h5 className="uppercase">Shorter Tabs</h5>
                                            <hr />
                                            <p>
                                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est.
                                            </p>
                                        </div>
                                    </li>
                                </ul>


                            </div>
                        </div>
                    </div>
                </div>
            </section>


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

