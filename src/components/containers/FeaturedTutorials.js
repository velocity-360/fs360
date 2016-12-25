import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'

class FeaturedTutorials extends Component {

	componentDidMount(){
		this.props.fetchTutorials(null)

	}

	render(){
		let list = null
		if (this.props.tutorials != null){
			list = this.props.tutorials.map((tutorial, i) => {
				if (i < 4){ // only show 4
					return (
					    <div key={tutorial.id} className="col-sm-6 col-md-6">
							<div className="thumbnail">
							    <div className="caption">
	                                <img style={styles.icon} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=320'} />
									<h3 style={styles.title}>
										<Link to={'/tutorial/'+tutorial.slug}>{tutorial.title}</Link>
									</h3>
									<hr />
									<p style={styles.paragraph}>
										{tutorial.description}
									</p>
									<div style={{textAlign:'right'}}>
										<Link to={'/tutorial/'+tutorial.slug} className="btn btn-primary" role="button">View</Link>
									</div>
							    </div>
							</div>
					    </div>
					)
				}
			})
		}


		return (
		    <section style={{background:'#FDFEFE', paddingTop:48, borderTop:'1px solid #ddd'}}>
		        <div className="content-wrap" style={{paddingTop:0}}>
		            <div className="container clearfix">
		                <div className="heading-block bottommargin-lg" style={{marginBottom:20}}>
		                    <h2 style={styles.title}>Online Tutorials</h2>
		                </div>

            			<div className="col_two_third">
							<div className="row">

								{ list }

							</div>
            			</div>

			            <div className="col_one_third col_last">
			                <div className="heading-block fancy-title nobottomborder title-bottom-border">
			                    <h4 style={styles.title}>Premium <span>Membership</span></h4>
			                </div>

			                <p style={styles.paragraph}>
			                    Join as a premium member for $19.99 each month and receive unlimited access to all tutorials, 
			                    code samples, and forums on the site. There are no long term commitments and membership 
			                    can be canceled at any time.
			                </p>
			                <a href="#" className="button button-small button-circle button-border button-aqua">Subscribe</a>
			            </div>

		            </div>
		        </div>
		    </section>
		)
	}
}

const stateToProps = (state) => {
	return {
		tutorials: state.tutorial.all
	}
}

const dispatchToProps = (dispatch) => {
	return {
		fetchTutorials: (params) => dispatch(actions.fetchTutorials(params))
	}
}

export default connect(stateToProps, dispatchToProps)(FeaturedTutorials)



