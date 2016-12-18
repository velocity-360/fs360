import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './style'

class Login extends Component {
    constructor(){
        super()
        this.state = {
            register: true,
            visitor: {
                fullName: '',
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

    submitCredentials(event){
//        console.log('submitCredentials: '+JSON.stringify(this.state.visitor))
        event.preventDefault()

        if (this.props.onSubmit == null)
            return

        const mode = (this.state.register) ? 'register' : 'login'
        this.props.onSubmit(this.state.visitor, mode)

        // if (this.state.register){ // sign up

        //     return
        // }

        // this.props.login(this.state.visitor)
        // .then((profile) => {

        // })
        // .catch((err) => {
        //     alert(err)
        // })
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

            <div style={{marginBottom:36, marginTop:12, textAlign:'right'}}>
                { (this.state.register) ? <input id="fullName" style={localStyle.input} onChange={this.updateVisitor.bind(this)} type="text" placeholder="Full Name" /> : null }
                <input id="email" onChange={this.updateVisitor.bind(this)} style={localStyle.input} type="text" placeholder="Email" /><br />
                <input id="password" onChange={this.updateVisitor.bind(this)} style={localStyle.input} type="password" placeholder="Password" /><br />
                <a href="#" onClick={this.submitCredentials.bind(this)} className="button button-small button-circle button-border button-aqua">{ (this.state.register) ? 'Sign Up' : 'Log In'}</a>
                <br />
                { (this.state.register) ? <span style={localStyle.smallText}>Already registered? Login <a onClick={this.toggleLoginMode.bind(this)} href="#">HERE</a>.</span> : <span style={localStyle.smallText}>Sign up <a onClick={this.toggleLoginMode.bind(this)} href="#">HERE</a>.</span> }
            </div>

		)
	}
}

const localStyle = {
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
        fontSize:14,
        color:'#999',
        fontWeight:100
    }
}
export default Login
