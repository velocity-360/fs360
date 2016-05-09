import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Dropzone from 'react-dropzone'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseCard from '../../components/CourseCard'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Vault extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.state = {
			showModal: false,
			sample:{
				title:'',
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

	componentDidMount(){

	}

	render(){

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
		                        			<button onClick={this.openModal} className="btn btn-lg btn-danger btn-block nomargin" value="submit">Add Code Sample</button>
										</div>

									</div>
								</div>


		                        <div className="col_half panel panel-default">
		                            <div className="panel-heading" style={{background:'#f1f9f5'}}>
		                                <h2 className="panel-title">Panel title</h2>
		                            </div>
		                            <div className="panel-body">
		                            	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, esse, velit, eaque officiis mollitia inventore ipsum minus quo itaque provident error adipisci quisquam ratione assumenda at illo doloribus beatae totam?
		                            </div>
		                        </div>

		                        <div className="col_half panel panel-default col_last">
		                            <div className="panel-heading" style={{background:'#f1f9f5'}}>
		                                <h2 className="panel-title">Panel title</h2>
		                            </div>
		                            <div className="panel-body">
		                            	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, at, vitae, veritatis, temporibus soluta accusamus eum accusantium incidunt eius quisquam suscipit inventore neque. Distinctio, impedit.
		                            </div>
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
					        	<input onChange={this.updateProject} id="title" value={this.state.sample.title} className="form-control" type="text" placeholder="Title" /><br />
					        	<input onChange={this.updateProject} id="url" value={this.state.sample.url} className="form-control" type="text" placeholder="http://" /><br />
					        	<input onChange={this.updateProject} id="tagString" value={this.state.sample.tagString} className="form-control" type="text" placeholder="Python, iOS, JavaScript, etc." /><br />
					            <Dropzone style={{width:100+'%', marginBottom:24, background:'#fff', border:'1px dotted #ddd'}} onDrop={this.uploadImage}>
					              <div style={{padding:24}}>
					              	{ (this.state.sample.image.length == 0) ? null : <img style={{width:64, border:'1px solid #ddd', marginRight:6}} src={'https://media-service.appspot.com/site/images/'+this.state.sample.image+'?crop=120'} /> }
					              	Drop file here, or click to select image to upload.
					              </div>
					            </Dropzone>
				        	</div>

				        	<div className="col-md-6">
					        	<textarea onChange={this.updateProject} id="description" value={this.state.sample.description} className="form-control" placeholder="Text" style={{minHeight:260}}></textarea><br />
				        	</div>
			        	</div>

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a onClick={this.submitProject} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
			        </Modal.Footer>
		        </Modal>


				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(state));

    return {
        currentUser: state.profileReducer.currentUser
    }
}


export default connect(stateToProps)(Vault)