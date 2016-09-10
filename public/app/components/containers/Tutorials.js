import React, { Component } from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import { api, TextUtils } from '../../utils'
import { Nav, Footer, CourseCard, RightSidebar, Register, TutorialCard } from '../../components'


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

//			console.log(JSON.stringify(response))
			const tutorials = response.tutorials
			this.setState({
				tutorials: tutorials
			})
		})
	}

	render(){
        const tutorialsList = this.state.tutorials.map((tutorial, i) => {
            return <TutorialCard key={tutorial.id} tutorial={tutorial} />
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