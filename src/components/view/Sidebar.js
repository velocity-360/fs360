import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import styles from './style'

class Sidebar extends Component {
    constructor(){
        super()
        this.state = {
            register: true,
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

    toggleLoginMode(event){
        event.preventDefault()
        console.log('toggleLoginMode')
        this.setState({
            register: !this.state.register
        })
    }

	render(){
		return (
            <div>
                <div className="heading-block fancy-title nobottomborder nobottommargin title-bottom-border">
                    <h4 style={styles.title}>Account</h4>
                </div>
                <div style={{marginBottom:36, marginTop:12, textAlign:'right'}}>
                    { (this.state.register) ? <input id="fullName" style={style.input} onChange={this.updateVisitor.bind(this)} type="text" placeholder="Full Name" /> : null }
                    <input id="email" style={style.input} onChange={this.updateVisitor.bind(this)} type="text" placeholder="Email" /><br />
                    <input id="password" style={style.input} onChange={this.updateVisitor.bind(this)} type="password" placeholder="Password" /><br />
                    <a href="#" className="button button-small button-circle button-border button-aqua">{ (this.state.register) ? 'Sign Up' : 'Log In'}</a>
                    <br />
                    { (this.state.register) ? <span style={style.smallText}>Already registered? Login <a onClick={this.toggleLoginMode.bind(this)} href="#">HERE</a>.</span> : <span style={style.smallText}>Sign up <a onClick={this.toggleLoginMode.bind(this)} href="#">HERE</a>.</span> }
                </div>


                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>Recent <span>Posts</span></h4>
                </div>

                <div className="clearfix" style={{marginBottom:16, lineHeight:'4px'}}>
                    <img style={styles.icon} src={'https://media-service.appspot.com/site/images/K4h2ZFdY?crop=320'} />
                    <h4 style={{fontFamily:'Pathway Gothic One', fontWeight: 100, marginBottom:2}}><a href="#" style={{color:'#444'}}>Post synopsis</a></h4>
                    <span style={style.smallText}>username</span>
                </div>
                <div className="clearfix" style={{marginBottom:16, lineHeight:'4px'}}>
                    <img style={styles.icon} src={'https://media-service.appspot.com/site/images/K4h2ZFdY?crop=320'} />
                    <h4 style={{fontFamily:'Pathway Gothic One', fontWeight: 100, marginBottom:2}}><a href="#" style={{color:'#444'}}>Post synopsis</a></h4>
                    <span style={style.smallText}>username</span>
                </div>

            </div>
		)
	}
}

const style = {
    input: {
        border: 'none',
        borderBottom:'1px solid #eee',
        width: 100+'%',
        marginBottom: 12,
        padding: 4,
        fontWeight: 200,
        background: '#fff'
    },
    smallText: {
        fontSize:14, color:'#999', fontWeight:100
    }
}

export default Sidebar
