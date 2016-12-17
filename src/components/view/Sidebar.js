import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import styles from './style'

class Sidebar extends Component {
    constructor(){
        super()
        this.state = {
            visitor: {
                email: '',
                password: ''
            }
        }
    }

    updateVisitor(event){
        var updatedVisitor = Object.assign({}, this.state.visitor)
        updatedVisitor[event.target.id] = event.target.value
        this.setState({
            visitor: updatedVisitor
        })      
    }

	render(){
		return (
            <div>
                <div className="heading-block fancy-title nobottomborder nobottommargin">
                    <h4 style={styles.title}>Account</h4>
                </div>
                <div style={{background:'#f9f9f9', padding:12, marginBottom:36, marginTop:6, textAlign:'right'}}>
                    <input style={style.input} type="text" placeholder="Email" /><br />
                    <input style={style.input} type="password" placeholder="Password" /><br />
                    <a href="#" className="button button-small button-circle button-border button-aqua">Log In</a>
                </div>


                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>Recent <span>Posts</span></h4>
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

const style = {
    input: {
        border: 'none',
        width: 100+'%',
        marginBottom: 12,
        padding: 4,
        fontWeight: 200
    }
}

export default Sidebar
