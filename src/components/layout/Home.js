import React, { Component } from 'react'
import styles from './styles'
import { Header, Footer, Section } from '../view'
import { FeaturedTutorials } from '../containers'

class Home extends Component {
    componentDidMount(){
        window.scrollTo(0 ,0)
    }
    
	render(){
		const style = styles.home

		return ( 
			<div className="clearfix">
                <Header />
                <Section content="articles" />
                <FeaturedTutorials />
                <Section content="velocityAdvantage" />
                <Footer />

			</div>
		)
	}
}

export default Home
