import React, {Component} from 'react'
import Loader from 'react-loader'
import { connect } from 'react-redux'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import api from '../utils/APIManager'
import QualifyingForm from '../components/QualifyingForm'


class Header extends Component {
	constructor(props, context){
		super(props, context)
		this.submitInfoRequest = this.submitInfoRequest.bind(this)
		this.hideForm = this.hideForm.bind(this)
		this.toggleLoader = this.toggleLoader.bind(this)
		this.state = {
			showLoader: false,
			showForm: false
		}
	}

	hideForm(){
		this.setState({
			showForm: false
		})
	}

	toggleLoader(show){
		this.setState({
			showLoader: show
		})
	}

	submitInfoRequest(event){
		event.preventDefault()
		this.setState({
			showForm: true
		})
	}


	render(){
		const nextEvent = this.props.events[0]

		return (
	        <section id="slider" style={{background: 'url("/images/joe_light_blue.png") center', overflow:'visible'}} data-height-lg="450" data-height-md="450" data-height-sm="600" data-height-xs="600" data-height-xxs="600">
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
	            <br />
	            <div className="container clearfix">
	                <form action="#" method="post" role="form" className="landing-wide-form landing-form-overlay dark clearfix">
	                    <div className="heading-block nobottommargin nobottomborder">
	                        <h4>Attend Next Workshop</h4>
	                    </div>

						<div style={{border:'1px solid #ddd', background:'#f9f9f9', marginBottom:16, marginTop:16}}>
							<img style={{width:104, float:'left', marginRight:12}} src={'https://media-service.appspot.com/site/images/'+nextEvent.image+'?crop=260'} alt="Velocity 360" />
							<div style={{padding:12, height:104, textAlign:'right'}}>
								<h5 style={{fontWeight:200, marginBottom:0, fontSize:12}}><a href={'/event/'+nextEvent.slug}>{nextEvent.title}</a></h5>
								<span style={{fontWeight:100, fontSize:12, color:'#444'}}>{nextEvent.date}, {nextEvent.time}</span><br />
								<a href={'/event/'+nextEvent.slug} style={{marginRight:0}} className="button button-3d button-mini button-rounded button-teal">Details</a>
							</div>
						</div>

	                    <div className="line" style={{ margin: '15px 0 30px' }}></div>
	                    <div className="col_full nobottommargin">
	                        <button onClick={this.submitInfoRequest} className="btn btn-lg btn-danger btn-block nomargin" value="submit">RSVP</button>
	                    </div>
	                </form>
	            </div>

	        	<QualifyingForm show={this.state.showForm} closeModal={this.hideForm} subject={nextEvent} toggleLoader={this.toggleLoader} endpoint='/account/rsvp' />
	        </section>
		)
	}

}

const stateToProps = function(state) {
    return {
        loaderOptions: state.staticReducer.loaderConfig,
		events: state.eventReducer.eventArray
    }
}

export default connect(stateToProps)(Header)
