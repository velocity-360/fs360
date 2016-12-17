import React, { Component } from 'react'
import styles from './styles'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import actions from '../../actions'

class Online extends Component {
    componentDidMount(){
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

                <table style={{background:'#fff', border:'1px solid #ddd'}} className="table table-striped">
                    <thead>
                        <tr>
                            <td><strong>Title</strong></td>
                            <td><strong>Source</strong></td>
                        </tr>
                    </thead>

                    <tbody>
                        { (this.props.tutorials == null) ? null :
                            this.props.tutorials.map((tutorial, i) => {
                                const className = (i==0) ? 'info' : ''
                                return (
                                    <tr key={tutorial.id} className={className}>
                                        <td><Link to={'/tutorial/'+tutorial.slug}>{tutorial.title}</Link></td>
                                        <td>TEST</td>
                                    </tr>
                                )
                            })
                        }                    
                    </tbody>
                </table>

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
