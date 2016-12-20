import React, { Component } from 'react'
import { Footer, Section } from '../view'
import { Courses, Course, Online, Tutorial, Account, Sidebar } from '../containers'
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
            if (page == 'courses')
                content = <Courses />

            if (page == 'online')
                content = <Online />

            if (page == 'account')
                content = <Account />

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

                            <div style={{textAlign:'right'}}>
                                <img style={{padding:3, background:'#fff', border:'1px solid #ddd', width:100+'%'}} src="/images/node-react-1.jpg" alt="Velocity 360" />
                                <br />
                                <i style={styles.smallText}>* Node & React Intro Course, instructed by Roger Beaman.</i>
                            </div>
                        </div>

                    </div>
                </section>

                { (page == 'courses') ? <div><Section content="velocityAdvantage" /><Section content="testimonials" /><Section content="companies" /></div> : null }

                <Footer />
			</div>
		)
	}
}


export default Split
