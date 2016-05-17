import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseCard from '../../components/CourseCard'
import CodeSample from '../../components/CodeSample'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Vault extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.updateSample = this.updateSample.bind(this)
		this.createSample = this.createSample.bind(this)
		this.state = {
			showModal: false,
			sample:{
				title:'',
				topic:'ios',
				image:'',
				url:'',
				description:'',
				tagString:''
			}
		}
	}

	openModal(){
		this.setState({
			showModal: true
		})
	}

	closeModal(){
		this.setState({
			showModal: false
		})
	}

	updateSample(event){
		event.preventDefault()

		var updatedSample = Object.assign({}, this.state.sample)
		updatedSample[event.target.id] = event.target.value
		this.setState({
			sample: updatedSample
		})
	}

	componentDidMount(){
		var endpoint = '/api/sample'
		api.handleGet(endpoint, {}, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			store.dispatch(actions.samplesRecieved(response.samples))
		})
	}

	createSample(event){
		event.preventDefault()
		this.setState({
			showModal: false
		})

		var sample = Object.assign({}, this.state.sample)
		var t = sample.tagString.split(',')
		var tags = []
		for (var i=0; i<t.length; i++){
			var tag = t[i]
			if (tag.length < 2)
				continue

			tags.push(tag)
		}

		sample['tags'] = tags


		var endpoint = '/api/sample'
		api.handlePost(endpoint, sample, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			store.dispatch(actions.sampleCreated(response.sample))
		})
	}

	render(){

		var _this = this
		var list = this.props.samples.map(function(sample, i){
			return <CodeSample key={i} sample={sample} accountType={_this.props.currentUser.accountType} />
		})

		var btnAddsample = (this.props.currentUser.id == null ) ? null : <button onClick={this.openModal} className="btn btn-lg btn-danger btn-block nomargin" value="submit">Add Code Sample</button>


		return (
			<div style={{background:'#f5f5f5'}}>
				<Sidebar />
				<section id="content">

					<div className="content-wrap" style={{background:'#f5f5f5'}}>
						<div className="container clearfix">
							<div className="postcontent nobottommargin col_last">

								<div className="entry clearfix">
									<div className="entry-content">
										<div className="col_half">
											<h2 style={{ marginBottom:16 }}>Code Vault</h2>
											{ btnAddsample }		                        			
										</div>

									</div>
								</div>

		                        <div className="list-group">
									{list}
		                        </div>

							</div>
						</div>
					</div>
				</section>

		        <Modal show={this.state.showModal} onHide={this.closeModal} bsSize="large" >
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h3>Project</h3>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<div className="row">
				        	<div className="col-md-6">
					        	<input onChange={this.updateSample} id="title" value={this.state.sample.title} className="form-control" type="text" placeholder="Title" /><br />
					        	<input onChange={this.updateSample} id="url" value={this.state.sample.url} className="form-control" type="text" placeholder="http://" /><br />
					        	<input onChange={this.updateSample} id="tagString" value={this.state.sample.tagString} className="form-control" type="text" placeholder="Python, iOS, JavaScript, etc." /><br />
					        	<select onChange={this.updateSample} id="topic" className="form-control">
					        		<option value="ios">iOS</option>
					        		<option value="node">Node</option>
					        		<option value="react">React</option>
					        		<option value="angular">Angular</option>
					        	</select>
				        	</div>

				        	<div className="col-md-6">
					        	<textarea onChange={this.updateSample} id="description" value={this.state.sample.description} className="form-control" placeholder="Text" style={{minHeight:260}}></textarea><br />
				        	</div>
			        	</div>

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.createSample} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
			        </Modal.Footer>
		        </Modal>


				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(state.sampleReducer.samplesArray));

    return {
        currentUser: state.profileReducer.currentUser,
        samples: state.sampleReducer.samplesArray
    }
}


export default connect(stateToProps)(Vault)