import React, { Component } from 'react'
import { Footer } from '../view'
import { Courses } from '../containers'
import styles from './styles'

class Split extends Component {
    componentDidMount(){
        window.scrollTo(0 ,0)
    }

	render(){
		const style = styles.home

		return ( 
			<div className="clearfix">
                <section className="notopmargin">
                    <div className="container clearfix">

                        <div className="col_two_third">
                            <Courses />
                        </div>

                        <div className="col_one_third col_last topmargin-lg">
                            TEST


                        </div>

                    </div>
                </section>

                <Footer />
			</div>
		)
	}
}

export default Split
