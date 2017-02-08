import React, { Component } from 'react'
import styles from './styles'
import { Header, Footer, Section, BaseContainer } from '../view'
import { Tutorials } from '../containers'

class Landing extends Component {
    componentDidMount(){
        window.scrollTo(0 ,0)
    }
    
	render(){
		const style = styles.home

        const FooterHOC = BaseContainer(Footer)
		return ( 
			<div className="clearfix">
                <Header content="tutorials" />
                <Tutorials />
                <FooterHOC />
			</div>
		)
	}
}

export default Landing
