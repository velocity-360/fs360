import React, { Component } from 'react'
import styles from './style'

class Sidebar extends Component {
	render(){
		return (
            <div>
                <div className="heading-block fancy-title nobottomborder">
                    <h4 style={styles.title}>Account</h4>
                </div>


                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>Full <span>Tuition</span></h4>
                </div>

                <div className="clearfix" style={{marginBottom:16, lineHeight:'4px'}}>
                    <img style={styles.icon} src={'https://media-service.appspot.com/site/images/K4h2ZFdY?crop=320'} />
                    <h4 style={{fontFamily:'Pathway Gothic One', fontWeight: 100, marginBottom:2}}><a href="#" style={{color:'#444'}}>Post synopsis</a></h4>
                    <span style={{fontSize:14, color:'#999', fontWeight:100}}>username</span>
                </div>
                <div className="clearfix" style={{marginBottom:16, lineHeight:'4px'}}>
                    <img style={styles.icon} src={'https://media-service.appspot.com/site/images/K4h2ZFdY?crop=320'} />
                    <h4 style={{fontFamily:'Pathway Gothic One', fontWeight: 100, marginBottom:2}}><a href="#" style={{color:'#444'}}>Post synopsis</a></h4>
                    <span style={{fontSize:14, color:'#999', fontWeight:100}}>username</span>
                </div>



            </div>
		)
	}
}

export default Sidebar
