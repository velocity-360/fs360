import React, { Component } from 'react'
import { Footer } from '../view'
import { Courses, Course, Online, Tutorial, Sidebar } from '../containers'
import styles from './styles'

class Split extends Component {
    componentDidMount(){
//        console.log('componentDidMount = '+JSON.stringify(this.props.location))
        window.scrollTo(0, 0)
    }

	render(){
		const style = styles.home

        const path = this.props.location.pathname.replace('/', '')
        const parts = path.split('/')
        const page = parts[0]

        let content = null
        if (parts.length == 1){
            content = (page == 'courses') ? <Courses /> : <Online />
        }
        if (parts.length == 2){
            const slug = parts[1]
            content = (page == 'course') ? <Course slug={slug} /> : <Tutorial slug={slug} />
        }

		return ( 
			<div className="clearfix">
                <section className="notopmargin">
                    <div className="container clearfix">

                        <div className="col_two_third">
                            { content }
                        </div>

                        <div className="col_one_third col_last topmargin-lg">
                            <Sidebar />
                        </div>

                    </div>
                </section>

                <Footer />
			</div>
		)
	}
}


export default Split
