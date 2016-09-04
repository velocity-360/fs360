import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import { api, TextUtils } from '../../utils'
import { Nav, Footer, CourseCard, RightSidebar, Register } from '../../components'


class Tutorials extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {
			tutorials: []
		}
	}

	componentDidMount(){
		api.handleGet('/api/tutorial', null, (err, response) => {
			if (err){
				alert(err.message)
				return
			}

			console.log(JSON.stringify(response))
			const tutorials = response.tutorials
			this.setState({
				tutorials: tutorials
			})
		})
	}

	render(){
		const tutorialsList = this.state.tutorials.map((tutorial, i) => {
			const link = (tutorial.status == 'live') ? <a href={'/tutorial/'+tutorial.slug} className="button button-3d button-mini button-rounded button-teal">View</a> : <a href='#' className="button button-3d button-mini button-rounded button-teal">Coming Soon!</a>
			const price = (tutorial.price == 0) ? 'FREE' : '$'+tutorial.price
			return (
				<div key={tutorial.id} className="col-md-4">
					<div style={{width:92+'%', margin:'auto', background:'#f9f9f9', border:'1px solid #ddd', textAlign:'center', padding:16, marginBottom:32}}>
						<img style={{width:100, borderRadius:50, marginBottom:12}} src={'https://media-service.appspot.com/site/images/'+tutorial.image+'?crop=460'} />
						<div className="fancy-title title-bottom-border">
							<h3 style={{fontWeight:400}}>
								<a style={{color:'#444'}} href={'/tutorial/'+tutorial.slug}>{tutorial.title}</a>
							</h3>
						</div>
						<p style={{height:144}}>{TextUtils.truncateText(tutorial.description, 180)}</p>
						<h5 style={{marginBottom:0, fontWeight:200}}>
							{tutorial.posts.length} units
							<span style={{margin:10}}>|</span>
							{price}
							<span style={{margin:10}}>|</span>
							{link}
						</h5>
					</div>
				</div>
			)
		})

		return(
			<div className="clearfix">
				<Nav headerStyle="dark" />

				<section>
					<div className="content-wrap">
						<div className="container clearfix">

							<div className="col_full bottommargin-sm">
								<div className="row">
									{tutorialsList}
								</div>
							</div>

						</div>
					</div>
				</section>
				<hr />
				<Register />

				<Footer />
			</div>
		)
	}
}

export default Tutorials