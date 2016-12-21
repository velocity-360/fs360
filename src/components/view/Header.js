import React, { Component } from 'react'
import styles from './style'

class Header extends Component {

	
	render(){
		return (
		    <section className="page-section section parallax dark" style={{background: 'url("/images/oc-dark-blue.jpg") center', overflow:'visible', margin:0}} data-height-lg="425" data-height-md="425" data-height-sm="850" data-height-xs="850" data-height-xxs="850">
		        <div className="vertical-middle">
		            <div className="heading-block center nobottomborder">
		                <h1 style={styles.titleWhite} data-animate="fadeInUp">Become a Full Stack Developer</h1>
		                <span style={{fontWeight:300}} data-animate="fadeInUp" data-delay="300">
		                    Velocity 360 is the only coding bootcamp that trains students for the future 
		                    of software - Node, React, and React Native.
		                </span>
		                <br /><br />

		                <div data-animate="fadeIn" data-delay="800">
		                    <button className="btn btn-lg btn-info nomargin" value="submit" type="submit">Request Syllabus</button>
		                    <br /><br />
		                    <h4 style={styles.titleWhite}>Next Cohort Begins January 9th</h4>
		                </div>                          
		            </div>
		        </div>
		    </section>
		)
	}
}

export default Header
