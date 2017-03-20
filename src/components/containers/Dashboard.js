import React, { Component } from 'react'
import styles from './styles'
import { Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Link, browserHistory } from 'react-router'
import { TextUtils, Stripe } from '../../utils'
import BaseContainer from './BaseContainer'


class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            selected: 'My Courses',
            showModal: false,
            showCreateTeam: false,
            passwords: {},
            updatedProfile: null
        }
    }

	componentDidMount(){
        const user = this.props.account.currentUser
        if (user == null)
            return

        this.setState({
            updatedProfile: Object.assign({}, user)
        })

        if (user.confirmed != 'yes'){
            setTimeout(() => {
                this.setState({
                    showModal: true
                })
            }, 750)
        }

        if (this.props.tutorials != null)
        	return

        this.props.fetchTutorials({isFeatured:'yes'})
        .then(response => {
        	console.log('TUTORIALS: '+JSON.stringify(response))

        })
        .catch(err => {
//        	console.log('FETCH TUTORIALS ERROR: '+JSON.stringify(err))

        })
	}

    selectItem(item, event){
        event.preventDefault()
        this.setState({
            selected: item
        })
    }

    toggleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }

    updatePassword(event){
        let updated = Object.assign({}, this.state.passwords)
        updated[event.target.id] = event.target.value
        this.setState({
            passwords: updated
        })
    }

    updateProfile(event){
        let updated = Object.assign({}, this.state.updatedProfile)
        updated[event.target.id] = event.target.value
        this.setState({
            updatedProfile: updated
        })
    }

    submitPassword(event){
        event.preventDefault()

        let passwords = this.state.passwords
        if (passwords.password1 == null){
            alert('Please complete both fields.')
            return
        }

        if (passwords.password2 == null){
            alert('Please complete both fields.')
            return
        }

        if (passwords.password1 !== passwords.password2){
            alert('Passwords do not match.')
            return
        }

        const user = this.props.account.currentUser
        if (user == null)
            return

        const params = {
            password: passwords.password1,
            confirmed: 'yes'
        }

        this.setState({showModal: false})
        this.props.updateData('profile', user, params)
        .then(result => {
            alert('Your password has been updated. Thanks!')
            return result
        })
        .catch(err => {
            alert(err)
        })
    }

    updateAccount(event){
        event.preventDefault()
        const user = this.props.account.currentUser
        if (user == null)
            return

        this.props.updateData('profile', user, this.state.updatedProfile)
        .then(result => {
            alert('Your Account Has Been Updated!')
            return result
        })
        .catch(err => {
            alert(err)
        })
    }

	componentDidUpdate(){
        const selected = this.state.selected
        console.log('componentDidUpdate: '+selected)
	}

	render(){
        const user = this.props.account.currentUser

        const selected = this.state.selected
        let content = null

        if (selected == 'My Courses'){
            const list = this.props.tutorials.all || []
            content = (
                <div>
                    { list.map((tutorial, i) => {
                            return (
                                <div key={tutorial.id} className="review_strip_single">
                                    <img alt="Pic" className="img-circle" src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=68'} />
                                    <small> - { tutorial.posts.length } Units -</small>
                                    <h4><a href={'/tutorial/'+tutorial.slug}>{ tutorial.title }</a></h4>
                                    <p>{ TextUtils.truncateText(tutorial.description, 175) }</p>
                                    <div style={{textAlign:'right'}}>
                                        <a target="_blank" href={'/premium/tutorial/'+tutorial.id} style={{height:36, borderRadius:18, marginTop:12}} className="btn_1 white">Download</a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        if (selected == 'Profile'){
            content = (
                <div className="box_style_1">
                    <div id="message-booking"></div>
                    <div className="row">
                        <div className="col-md-12 col-sm-6">
                            <div className="form-group">
                                <label>First Name</label>
                                <input onChange={this.updateProfile.bind(this)} value={this.state.updatedProfile.firstName} type="text" className="form-control" id="firstName" placeholder="First Name" />
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-6">
                            <div className="form-group">
                                <label>Last Name</label>
                                <input onChange={this.updateProfile.bind(this)} value={this.state.updatedProfile.lastName} type="text" className="form-control" id="lastName" placeholder="Last Name" />
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-6">
                            <div className="form-group">
                                <label>Username</label>
                                <input onChange={this.updateProfile.bind(this)} value={this.state.updatedProfile.username} type="text" className="form-control" id="username" placeholder="Username" />
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-6">
                            <div className="form-group">
                                <label>Email</label>
                                <input onChange={this.updateProfile.bind(this)} value={this.state.updatedProfile.email} type="text" className="form-control" id="email" placeholder="Email" />
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12">
                            <div className="form-group">
                                <button onClick={this.updateAccount.bind(this)} className="btn_full">Update Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            )            
        }

		return (
            <div style={{paddingTop:64}}>
                <div className="container margin_60_35">
                    <div className="row">
                    
                        <div className="col-md-3" id="sidebar">
                            <div className="theiaStickySidebar">
                                <div id="faq_box">
                                    <ul id="cat_nav">
                                        <li><a onClick={this.selectItem.bind(this, 'My Courses')} href="#" className="active">My Courses</a></li>
                                        <li><a onClick={this.selectItem.bind(this, 'Profile')} href="#">Profile</a></li>
                                        <li><a href="/account/logout">Log Out</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-9">
                            <h3 className="nomargin_top">TEST</h3>
                            <hr />

                            <div className="panel-group" id="courses">
                                <div className="row">
                                    <div className="col-md-9">
                                        {content}
                                    </div>
                                </div>
                            </div>
                                
                        </div>
                    </div>
                </div>

                <Modal bsSize="sm" show={this.state.showModal} onHide={this.toggleModal.bind(this)}>
                    <Modal.Body style={styles.nav.modal}>
                        <div style={{textAlign:'center'}}>
                            <img style={styles.nav.logo} src='/images/logo_dark.png' />
                            <hr />
                            <h4>Set Password</h4>
                        </div>

                        <input id="password1" onChange={this.updatePassword.bind(this)} className={styles.nav.textField.className} style={styles.nav.textField} type="password" placeholder="Password" />
                        <input id="password2" onChange={this.updatePassword.bind(this)} className={styles.nav.textField.className} style={styles.nav.textField} type="password" placeholder="Repeat Password" />
                        <div style={styles.nav.btnLoginContainer}>
                            <a href="#" onClick={this.submitPassword.bind(this)} className={styles.nav.btnLogin.className}><i className="icon-lock3"></i>Update Password</a>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
	}
}

const stateToProps = (state) => {
    return {

    }
}

const dispatchToProps = (dispatch) => {
    return {
		fetchTutorials: (params) => dispatch(actions.fetchTutorials(params)),
        fetchCourses: (params) => dispatch(actions.fetchCourses(params))
    }
}

export default connect(stateToProps, dispatchToProps)(BaseContainer(Dashboard))

