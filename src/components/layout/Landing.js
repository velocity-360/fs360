import React, { Component } from 'react'
import styles from './styles'
import { Header, Footer, Section } from '../view'
import { Tutorials } from '../containers'

class Landing extends Component {
    componentDidMount(){
        window.scrollTo(0 ,0)
    }
    
	render(){
		const style = styles.home

		return ( 
			<div className="clearfix">
                <Header content="tutorials" />
                <Tutorials />
                <Footer />
			</div>
		)
	}
}

export default Landing
