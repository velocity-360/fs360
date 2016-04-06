import React, {Component} from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Testimonial from '../../components/Testimonial'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Home extends Component {

	constructor(props, context){
		super(props, context)
		this.updateUserRegistration = this.updateUserRegistration.bind(this)
		this.register = this.register.bind(this)
		this.state = {
			testimonials: [
				{name:'Brian Correa', image:'briancorrea.jpg', course:'iOS Course'},
				{name:'Mike Maloney', image:'mikemaloney.jpg', course:'MEAN Stack Course'},
				{name:'Jeff Abraham', image:'jeffabraham.jpg', course:'iOS Course'},
				{name:'Jennifer Lin', image:'jenn.jpg', course:'Web Development Intensive'}
			]
		}
	}

	componentWillMount(){
//		getCurrentUser()
	}

	componentDidMount(){
		console.log('HOME: componentDidMount')
		api.handleGet('/api/course?isFeatured=yes', {});

	}

	updateUserRegistration(event){
		event.preventDefault()
		var updatedUser = Object.assign({}, this.props.currentUser);
		updatedUser[event.target.id] = event.target.value
		store.dispatch(actions.updateCurrentUser(updatedUser));
	}

	register(event){
		event.preventDefault()
		console.log('REGISTER: '+JSON.stringify(this.props.currentUser));

		api.handlePost('/api/test', this.props.currentUser);

		
	}

	render(){
		var courses = this.props.courses.map(function(course, i){
			var index = i+1;
			var colClass = (index%3 == 0) ? "col_one_third" : "col_one_third col_last";
			return (
				<div key={i} className={colClass}>
					<div className="feature-box fbox-plain">
						<div className="fbox-icon" data-animate="bounceIn">
							<a href="#">
								<img src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=360'} alt="Responsive Layout" />
							</a>
						</div>
						<h3><a href="#">{course.title}</a></h3>
						<p>{course.description}</p>
					</div>
				</div>
			)
		});

		var testimonialList = this.state.testimonials.map(function(testimonial){
			return <Testimonial testimonial={testimonial} />

		});

		return (

			<div>
				<Nav />


				<section id="slider" className="slider-parallax dark full-screen" style={{background: "url(images/programming.jpg) center"}}>

					<div className="slider-parallax-inner">
						<div className="container clearfix">
							<div className="vertical-middle">

								<div className="heading-block center nobottomborder">
									<h1 data-animate="fadeInUp">Its your time to <strong>create</strong> Landing Pages for <strong>FREE</strong></h1>
									<span data-animate="fadeInUp" data-delay="300">Building a Landing Page was never so Easy &amp; Interactive.</span>
								</div>

								<form action="#" method="post" role="form" className="landing-wide-form clearfix">
									<div className="col_four_fifth nobottommargin">
										<div className="col_one_third nobottommargin">
											<input value={this.props.currentUser.firstName} onChange={this.updateUserRegistration} id="firstName" type="text" className="form-control input-lg not-dark" placeholder="First Name*" />
										</div>
										<div className="col_one_third nobottommargin">
											<input value={this.props.currentUser.lastName} onChange={this.updateUserRegistration} id="lastName" type="text" className="form-control input-lg not-dark" placeholder="Last Name*" />
										</div>
										<div className="col_one_third col_last nobottommargin">
											<input value={this.props.currentUser.email} onChange={this.updateUserRegistration} id="email" type="text" className="form-control input-lg not-dark" placeholder="Email*" />
										</div>
									</div>
									<div className="col_one_fifth col_last nobottommargin">
										<button onClick={this.register} className="btn btn-lg btn-danger btn-block nomargin" value="submit" type="submit">JOIN</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>


				<section id="content">
					<div className="content-wrap">
						<div className="container clearfix">

							<div id="section-features" className="heading-block title-center page-section">
								<div style={{background:'#f9f9f9', border:'1px solid #ddd', padding:24, marginBottom:24, fontSize:16}}>
									FullStack 360 conducts development courses that are relevant in the 
									startup and tech world today. We focus on the most up-to-date frameworks 
									and libraries such as React, Angular, and Node JS. Our students are always 
									prepared for rapid changes in the industry and are ready to work in tech 
									after a course.
								</div>
								<h3>Featured Courses</h3>
							</div>

							{courses}

							<div className="clear"></div>

							<div className="divider divider-short divider-center"><i className="icon-circle"></i></div>

							<div className="container clearfix">
								<div className="col_one_third bottommargin-sm center">
									<img data-animate="fadeInLeft" src="images/services/iphone6.png" alt="Iphone" />
								</div>

								<div className="col_two_third bottommargin-sm col_last">
									<div className="heading-block topmargin-sm">
										<h3>Optimized for Mobile &amp; Touch Enabled Devices.</h3>
									</div>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quod consequuntur quibusdam, enim expedita sed quia nesciunt incidunt accusamus necessitatibus modi adipisci officia libero accusantium esse hic, obcaecati, ullam, laboriosam!</p>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti vero, animi suscipit id facere officia. Aspernatur, quo, quos nisi dolorum aperiam fugiat deserunt velit rerum laudantium cum magnam.</p>
									<a href="#" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">Learn more</a>
								</div>
							</div>
						</div>

						<div className="section">
							<div className="container clearfix">

								<div id="section-couple" className="heading-block title-center page-section">
									<h2>Meet Our Students</h2>
									<span>Meet the Bride &amp; the Groom</span>
								</div>

								{testimonialList}
								
							</div>
						</div>


					</div>

				</section>
				<Footer />

			</div>

		)
	}

}

const stateToProps = function(state) {
	console.log('STATE TO PROPS: '+JSON.stringify(state));
    return {
        currentUser: state.profileReducer.currentUser,
        courses: state.courseReducer.courses
    }
}

// const StoreSelector = function(store){
// 	console.log('StoreSelector: '+JSON.stringify(store.profileReducer.currentUser));
// 	return {
// 		currentUser: store.profileReducer.currentUser
// 	}

// }

export default connect(stateToProps)(Home)