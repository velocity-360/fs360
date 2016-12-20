import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './style'

class Account extends Component {

	render(){

        const user = this.props.currentUser
		return (
            <div style={{marginBottom:36, marginTop:12, textAlign:'right'}}>
                <h4 style={localStyle.title}>Welcome { user.firstName.toUpperCase() }</h4>
                <a href="/account" className="button button-small button-circle button-border button-aqua">View Account</a>
            </div>
		)
	}
}

const localStyle = {
    title: {
        fontFamily:'Pathway Gothic One',
        fontWeight: 100,
        marginBottom:2
    },
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
export default Account
