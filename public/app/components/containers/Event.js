import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import EventCard from '../../components/EventCard'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Event extends Component {

	render(){

		return (
			<div>
				<Nav />
				Event Page
			</div>

		)

	}
}

export default Event