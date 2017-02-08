import React, { Component } from 'react'
import styles from './styles'
import { Header, Footer, Section } from '../view'
import { FeaturedTutorials, Nav, Join } from '../containers'

class Home extends Component {
    componentDidMount(){
        window.scrollTo(0, 0)
    }
    
	render(){

		return ( 
            <div>            
                <div className="layer"></div>
                <div id="preloader">
                    <div data-loader="circle-side"></div>
                </div>
                
                <Nav />
                <Section content="header" />
                <Section content="welcome" />
                <FeaturedTutorials />
                <Section content="testimonials" />
                <Join />

                <div id="dtBox"></div>
                <Footer />
            </div>
		)
	}
}

export default Home
