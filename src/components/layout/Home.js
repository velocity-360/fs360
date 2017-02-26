import React, { Component } from 'react'
import styles from './styles'
import { Header, Footer, Section } from '../view'
import { FeaturedTutorials, Nav, Join, BaseContainer } from '../containers'

class Home extends Component {
    componentDidMount(){
        window.scrollTo(0, 0)
    }

    showElement(element, event){
        event.preventDefault()
        const divPosition = $('#'+element).offset()
        $('html, body').animate({scrollTop: divPosition.top}, 'slow')
    }
    
	render(){
        const FooterHOC = BaseContainer(Footer)

		return (
            <div>
                <div className="layer"></div>
                <div id="preloader">
                    <div data-loader="circle-side"></div>
                </div>
                
                <Nav />
                <Section showElement={this.showElement.bind(this)} content="header" />
                <Section content="welcome" />
                <FeaturedTutorials />
                <Section content="testimonials" />
                <Join />

                <div id="dtBox"></div>
                <FooterHOC />

            </div>
		)
	}
}

export default Home
