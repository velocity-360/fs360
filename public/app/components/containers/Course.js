import React, {Component} from 'react'
import ReactBootstrap, { Modal } from 'react-bootstrap'
import Loader from 'react-loader'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import CourseSection from '../../components/CourseSection'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Course extends Component {

	constructor(props, context){
		super(props, context)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.state = {
			showLoader: false,
			showModal: false,
		}
	}

	componentWillMount(){

	}

	componentDidMount(){
		api.handleGet('/api/course?slug='+this.props.slug, {}, function(err, response){
			if (err){
				alert(response.message)
				return
			}

			store.dispatch(actions.coursesRecieved(response.courses))
		})
	}

	openModal(event){
		event.preventDefault()
		this.setState({showModal: true})
	}

	closeModal(){
		this.setState({showModal: false})
	}


	render(){
		var _course = this.props.course
		var units = this.props.course.units.map(function(unit, i){
			return <CourseSection key={unit.index} unit={unit} course={_course} />
		})


		if (this.props.slug == 'ios-high-school-course'){
			console.log('IOS HIGH SCHOOL COURSE');

		}


		return (
			<div>
				<Loader options={this.props.loaderOptions} loaded={!this.state.showLoader} className="spinner" loadedClassName="loadedContent" />
				<Sidebar />
				<section id="content" style={{backgroundColor: '#F5F5F5'}}>

					<div className="content-wrap">
						<div className="container clearfix">
							<div className="postcontent nobottommargin col_last clearfix">
								<div id="posts" className="post-timeline clearfix">
									<div className="timeline-border"></div>

									<div className="entry clearfix">
										<div className="entry-timeline">
											10<span>Feb</span>
											<div className="timeline-divider"></div>
										</div>
										<div className="entry-image">
											<a href="/images/blog/full/17.jpg" data-lightbox="image">
												<img className="image_fade" src="/images/hacking-2.jpg" alt="Standard Post with Image" />
											</a>
										</div>
										<div className="entry-content">
											<div className="col_half">
												<h2 style={{marginBottom:0}}>{this.props.course.title}</h2>
												<p>{this.props.course.description}</p>
											</div>

											<div className="col_half panel panel-default col_last">
												<div style={{backgroundColor:'#f1f9f5'}} className="panel-heading">Details</div>
												<div className="panel-body">
													{this.props.course.dates}<br />
													{this.props.course.schedule}<br />
													Tuition: ${this.props.course.tuition}<br />
													Depost: ${this.props.course.deposit}
													<hr />
													<a href="#" onClick={this.openModal} style={{marginRight:12}} className="button button-border button-dark button-rounded noleftmargin">Apply</a>
													<a href="#" onClick={this.openModal} className="button button-border button-dark button-rounded noleftmargin">Request Syllabus</a>
												</div>
											</div>
										</div>
									</div>

									{units}


									<div className="entry clearfix">
										<div className="entry-timeline">
											Unit<span>!</span>
											<div className="timeline-divider"></div>
										</div>
										<div className="entry-image">
											<div className="panel panel-default">
												<div className="panel-body" style={{padding:36}}>
													<h2>Sign Up</h2>
													<hr />
													Ready to take the plunge? Need more information? Request a syllabus below or begin the application process.
													<a onClick={this.openModal} href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">Apply</a>
													<a onClick={this.openModal} href="#" className="button button-border button-dark button-rounded button-large noleftmargin topmargin-sm">Request Syllabus</a>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>

						</div>


					</div>

				</section>

				<section id="content" style={{backgroundColor: '#fff', paddingBottom:48}}>
					<div className="row common-height clearfix" style={{background:'#fff', border:'1px solid #ddd'}}>
						<div className="col-sm-8 col-padding">
							<div>
								<div className="heading-block">
									<h3>Welcome</h3>
								</div>

								<div className="row clearfix">
									<div className="col-md-10">
										<p>
											Our Mission is to teach you tomorrow’s technology, today.  If you want to work for a leading tech firm, for a technology startup, or become an entrepreneur, this 2-week class will put you on the right track to achieve any of these goals.  This iOS class is based entirely on Swift language, which is the main language you will need to know while developing the majority of iOS app.  In our iOS class you will not be learning how to program games, however you will be able to learn how to develop social media applications similar to Snapchat and Instagram.
										</p>
										<p>
											Even if you do not want to become a professional developer and have it become your lifelong career, learning how an iOS app developed will give you the edge both in the immediate and distant future.  It might be a cliché, but learning how to code will empower you to act on future ideas.  For example if you are sitting in class one day and think of the next great social media app, it doesn’t have to just be a pipe dream or something that you would have to rely on someone else to build, it could be a project that you start building right away.
										</p>
										<a href="#" className="social-icon inline-block si-small si-light si-rounded si-facebook">
											<i className="icon-facebook"></i>
											<i className="icon-facebook"></i>
										</a>
										<a href="#" className="social-icon inline-block si-small si-light si-rounded si-twitter">
											<i className="icon-twitter"></i>
											<i className="icon-twitter"></i>
										</a>
										<a href="#" className="social-icon inline-block si-small si-light si-rounded si-gplus">
											<i className="icon-gplus"></i>
											<i className="icon-gplus"></i>
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-sm-4 col-padding" style={{background: "url('/images/kids.jpg') center center no-repeat", backgroundSize: 'cover'}}></div>
					</div>

					<div className="content-wrap" style={{background:'#f9f9f9', borderBottom:'1px solid #ddd'}}>

						<div className="container clear-bottommargin clearfix">
							<div className="row">

								<div className="col-md-4 col-sm-6 bottommargin">
									<div className="ipost clearfix">
										<div className="entry-image">
											<a href="#"><img className="image_fade" src="/images/magazine/thumb/1.jpg" alt="Image" /></a>
										</div>
										<div className="entry-title">
											<h3><a href="blog-single.html">Bloomberg smart cities; change-makers economic security</a></h3>
										</div>
										<ul className="entry-meta clearfix">
											<li><i className="icon-calendar3"></i> 13th Jun 2014</li>
											<li><a href="blog-single.html#comments"><i className="icon-comments"></i> 53</a></li>
										</ul>
										<div className="entry-content">
											<p>Prevention effect, advocate dialogue rural development lifting people up community civil society. Catalyst, grantees leverage.</p>
										</div>
									</div>
								</div>

								<div className="col-md-4 col-sm-6 bottommargin">
									<div className="ipost clearfix">
										<div className="entry-image">
											<a href="#"><img className="image_fade" src="/images/magazine/thumb/2.jpg" alt="Image" /></a>
										</div>
										<div className="entry-title">
											<h3><a href="blog-single.html">Medicine new approaches communities, outcomes partnership</a></h3>
										</div>
										<ul className="entry-meta clearfix">
											<li><i className="icon-calendar3"></i> 24th Feb 2014</li>
											<li><a href="blog-single.html#comments"><i className="icon-comments"></i> 17</a></li>
										</ul>
										<div className="entry-content">
											<p>Cross-agency coordination clean water rural, promising development turmoil inclusive education transformative community.</p>
										</div>
									</div>
								</div>

								<div className="col-md-4 col-sm-6 bottommargin">
									<div className="ipost clearfix">
										<div className="entry-image">
											<a href="#"><img className="image_fade" src="/images/magazine/thumb/4.jpg" alt="Image" /></a>
										</div>
										<div className="entry-title">
											<h3><a href="blog-single.html">Compassion conflict resolution, progressive; tackle</a></h3>
										</div>
										<ul className="entry-meta clearfix">
											<li><i className="icon-calendar3"></i> 15th Jan 2014</li>
											<li><a href="blog-single.html#comments"><i className="icon-comments"></i> 54</a></li>
										</ul>
										<div className="entry-content">
											<p>Community health workers best practices, effectiveness meaningful work The Elders fairness. Our ambitions local solutions globalization.</p>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>


					<div className="container clearfix">

						<div id="faqs" className="faqs">
							<h3 style={{marginTop:48}}>Some of your Questions:</h3>
							<div className="divider"><i className="icon-circle"></i></div>

							<div className="col_half nobottommargin">
								<h4 id="faq-1"><strong>Q.</strong> How do I become an author?</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, dolorum, vero ipsum molestiae minima odio quo voluptate illum excepturi quam cum voluptates doloribus quae nisi tempore necessitatibus dolores ducimus enim libero eaque explicabo suscipit animi at quaerat aliquid ex expedita perspiciatis? Saepe, aperiam, nam unde quas beatae vero vitae nulla.</p>

								<div className="line"></div>

								<h4 id="faq-2"><strong>Q.</strong> Helpful Resources for Authors</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, placeat, architecto rem dolorem dignissimos repellat veritatis in et eos doloribus magnam aliquam ipsa alias assumenda officiis quasi sapiente suscipit veniam odio voluptatum. Enim at asperiores quod velit minima officia accusamus cumque eligendi consequuntur fuga? Maiores, quasi, voluptates, exercitationem fuga voluptatibus a repudiandae expedita omnis molestiae alias repellat perferendis dolores dolor.</p>

								<div className="line"></div>

								<h4 id="faq-3"><strong>Q.</strong> How much money can I make?</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, fugiat iste nisi tempore nesciunt nemo fuga? Nesciunt, delectus laboriosam nisi repudiandae nam fuga saepe animi recusandae. Asperiores, provident, esse, doloremque, adipisci eaque alias dolore molestias assumenda quasi saepe nisi ab illo ex nesciunt nobis laboriosam iusto quia nulla ad voluptatibus iste beatae voluptas corrupti facilis accusamus recusandae sequi debitis reprehenderit quibusdam. Facilis eligendi a exercitationem nisi et placeat excepturi velit!</p>

								<div className="line"></div>

								<h4 id="faq-4"><strong>Q.</strong> Can I offer my items for free on a promotional basis?</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, fugiat iste nisi tempore nesciunt nemo fuga? Nesciunt, delectus laboriosam nisi repudiandae nam fuga saepe animi recusandae. Asperiores, provident, esse, doloremque, adipisci eaque alias dolore molestias assumenda quasi saepe nisi ab illo ex nesciunt nobis laboriosam iusto quia nulla ad voluptatibus iste beatae voluptas corrupti facilis accusamus recusandae sequi debitis reprehenderit quibusdam. Facilis eligendi a exercitationem nisi et placeat excepturi velit!</p>

								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed facere eos harum ipsum quia recusandae sunt fugit ad quaerat sapiente. Iure, ut maiores commodi voluptas ullam sunt harum autem veniam.</p>

								<div className="line"></div>

								<h4 id="faq-5"><strong>Q.</strong> An Introduction to the Marketplaces for Authors</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In, quisquam atque vero delectus corrupti! Quo, maiores, dolorem, hic commodi nulla ratione accusamus doloribus fuga magnam id temporibus dignissimos deleniti quidem ipsam corporis sapiente nam expedita saepe quas ab? Vero, assumenda.</p>

								<div className="line"></div>

								<h4 id="faq-6"><strong>Q.</strong> How does the Tuts+ Premium affiliate program work?</h4>
								<p className="nobottommargin">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad odio ab quis architecto recusandae doloremque incidunt! Eius, quidem, pariatur necessitatibus commodi aliquid deleniti repudiandae accusantium tempora soluta vel nesciunt est quibusdam iure adipisci aspernatur maiores saepe ea eaque quo harum reprehenderit similique nemo voluptate ullam natus illum magnam alias nobis doloremque delectus ipsa dicta repellat maxime dignissimos eveniet quae debitis ratione assumenda tempore officiis fugiat dolor. Saepe iusto praesentium ullam aliquam impedit distinctio blanditiis soluta cum! Fugiat, aliquam, ad, nam mollitia accusantium facere fugit ex libero quidem cupiditate placeat eveniet provident id aspernatur harum sed in enim cum reiciendis delectus.</p>
							</div>

							<div className="col_half nobottommargin col_last">
								<h4 id="faq-7"><strong>Q.</strong> What Images, Videos, Code or Music Can I Use in my Items?</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad odio ab quis architecto recusandae doloremque incidunt! Eius, quidem, pariatur necessitatibus commodi aliquid deleniti repudiandae accusantium tempora soluta vel nesciunt est quibusdam iure adipisci aspernatur maiores saepe ea eaque quo harum reprehenderit similique nemo voluptate ullam natus illum magnam alias nobis doloremque delectus ipsa dicta repellat maxime dignissimos eveniet quae debitis ratione assumenda tempore officiis fugiat dolor. Saepe iusto praesentium ullam aliquam impedit.</p>

								<div className="line"></div>

								<h4 id="faq-8"><strong>Q.</strong> Can I use trademarked names in my items?</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, nisi, laborum autem reprehenderit excepturi harum ipsum quod sit. Inventore et sunt nemo natus labore voluptate omnis reprehenderit culpa. Minus vitae molestiae totam ut a accusamus at fugiat nemo debitis delectus? Consectetur, deleniti, cupiditate ad doloribus numquam minus illum fugit laborum a voluptatum nulla at autem ab beatae odio dolorem assumenda magni laudantium saepe recusandae doloremque illo nesciunt aut quos debitis neque reiciendis veritatis iusto eos aliquid voluptatem pariatur eveniet velit?</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, esse, dolore, animi sed aliquam est consequatur atque magnam sunt voluptas nostrum sint minus neque iste ut velit iure eius! Hic, laudantium, consequatur veniam magnam ullam eveniet sed minus rem deleniti!</p>

								<div className="line"></div>

								<h4 id="faq-9"><strong>Q.</strong> Tips for Increasing Your Referral Income</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, nisi, laborum autem reprehenderit excepturi harum ipsum quod sit. Inventore et sunt nemo natus labore voluptate omnis reprehenderit culpa. Minus vitae molestiae totam ut a accusamus at fugiat nemo debitis delectus? Consectetur, deleniti, cupiditate ad doloribus numquam minus illum fugit laborum a voluptatum nulla at autem ab beatae odio dolorem assumenda magni laudantium saepe recusandae doloremque illo nesciunt aut quos debitis neque reiciendis veritatis iusto eos aliquid voluptatem pariatur eveniet velit?</p>

								<div className="line"></div>

								<h4 id="faq-10"><strong>Q.</strong> How can I get support for an item which isnt working correctly?</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, culpa eaque! Accusamus, molestiae, aspernatur, consequatur eaque laborum ipsum iure tempora minus laudantium inventore dolor assumenda magni cum id odio quam.</p>
								<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo iusto aliquam voluptatem? Reiciendis, beatae, ipsam delectus voluptas ea error voluptates labore corporis ad tenetur sunt temporibus aperiam sit quis quasi tempora enim quo numquam provident ullam velit cumque similique veritatis quidem aliquam voluptatibus atque fugiat recusandae accusamus praesentium aut ipsa.</p>

								<div className="line"></div>

								<h4 id="faq-11"><strong>Q.</strong> How do I pay for items on the Marketplaces?</h4>
								<p className="nobottommargin">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo iusto aliquam voluptatem? Reiciendis, beatae, ipsam delectus voluptas ea error voluptates labore corporis ad tenetur sunt temporibus aperiam sit quis quasi tempora enim quo numquam provident ullam velit cumque similique veritatis quidem aliquam voluptatibus atque fugiat recusandae accusamus praesentium aut ipsa.</p>
							</div>
						</div>
					</div>

				</section>

		        <Modal show={this.state.showModal} onHide={this.closeModal}>
			        <Modal.Header closeButton style={{textAlign:'center', padding:12}}>
			        	<h2>Request Syllabus</h2>
			        </Modal.Header>
			        <Modal.Body style={{background:'#f9f9f9', padding:24}}>
			        	<input className="form-control" type="text" id="name" placeholder="Name" /><br />
			        	<input className="form-control" type="text" id="email" placeholder="Email" /><br />

			        </Modal.Body>

			        <Modal.Footer style={{textAlign:'center'}}>
						<a href="#" style={{marginRight:12}} className="button button-border button-dark button-rounded button-large noleftmargin">Submit</a>
			        </Modal.Footer>
		        </Modal>

				<Footer />
			</div>
		)
	}
}

const stateToProps = function(state) {
//	console.log('STATE TO PROPS: '+JSON.stringify(state));
	var keys = Object.keys(state.courseReducer.courses)

    return {
        currentUser: state.profileReducer.currentUser,
        course: state.courseReducer.courses[keys[0]],
        //course: state.courseReducer.courseArray[0],
        testimonials: state.staticReducer.testimonials,
        loaderOptions: state.staticReducer.loaderConfig

    }
}


export default connect(stateToProps)(Course)