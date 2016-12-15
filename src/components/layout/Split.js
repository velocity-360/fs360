import React, { Component } from 'react'
import { Footer } from '../view'
import { Courses, Online } from '../containers'
import styles from './styles'

class Split extends Component {
    componentDidMount(){
        window.scrollTo(0 ,0)
    }

	render(){
		const style = styles.home

        const path = this.props.location.pathname.replace('/', '')
        const content = (path == 'courses') ? <Courses /> : <Online />

		return ( 
			<div className="clearfix">
                <section className="notopmargin">
                    <div className="container clearfix">

                        <div className="col_two_third">
                            { content }
                        </div>

                        <div className="col_one_third col_last topmargin-lg">
                            Right Side
                        </div>

                    </div>
                </section>

                <Footer />
			</div>
		)
	}
}

export default Split
