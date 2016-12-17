import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'
import { Preview } from '../view'

class Online extends Component {
    componentDidMount(){
        window.scrollTo(0, 0)
        if (this.props.tutorials == null)
            this.props.fetchTutorials(null)
    }

	render(){
        const style = styles.home
        
		return (
            <div>
                <div className="heading-block topmargin-lg" style={{marginBottom:20}}>
                    <h2 style={styles.title}>Online</h2>
                </div>

                <p style={style.paragraph}>
                    Cant make it to our live courses? Check out our online video tutorials. The video series are a great 
                    way to learn while watching someone code a project from the bottom up. All original source code 
                    is included in each series package and there is a forum dedicated to answering questions and 
                    tracking down bugs.
                </p>

                <div id="posts" className="events small-thumbs">
                    { (this.props.tutorials == null) ? null :
                        this.props.tutorials.map((tutorial, i) => {
                            return <Preview course={tutorial} key={tutorial.id} />
                        })
                    }
                </div>

			</div>
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

export default connect(stateToProps, dispatchToProps)(Online)
