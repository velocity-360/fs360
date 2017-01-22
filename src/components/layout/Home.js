import React, { Component } from 'react'
import styles from './styles'
import { Header, Footer, Section, Nav } from '../view'
import { FeaturedTutorials } from '../containers'

class Home extends Component {
    componentDidMount(){
        window.scrollTo(0 ,0)
    }
    
	render(){

		return ( 
            <div>
                <Nav />
                <div className="main-container">
                    <Section content="header" />
                    <Section content="welcome" />

                    <section>
                        <FeaturedTutorials />
                    </section>
                    
                    <Section content="testimonials" />
                    <Section content="join" />
                    <Footer />
                </div>

            </div>
		)
	}
}

export default Home
