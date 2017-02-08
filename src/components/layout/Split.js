import React, { Component } from 'react'
import { Footer, Section } from '../view'
import { Courses, Course, Online, Tutorial, Account, Sidebar, Nav, BaseContainer } from '../containers'
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

        const FooterHOC = BaseContainer(Footer)
		return ( 
            <div>
                <Nav type="standard" />
                <div className="main-container">
                    { content }
                    <FooterHOC />
                </div>
            </div>


		)
	}
}


export default Split
