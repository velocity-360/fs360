import React, { Component } from 'react'
import styles from './styles'

class Home extends Component {
	render(){
		const style = styles.home

		return ( 
			<div className="clearfix">

				<header id="header" className="no-sticky" style={{background:'#f9f9f9'}}>
		            <div id="header-wrap">

		            </div>
				</header>

				<section id="content" style={style.content}>
					<div className="content-wrap container clearfix">
						<div className="col_two_third">
							Main content
						</div>

						<div className="col_one_third col_last">
							Right side

						</div>

					</div>
				</section>
			</div>
		)
	}
}

export default Home
