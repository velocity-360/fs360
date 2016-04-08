import React, {Component} from 'react'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Testimonial from '../../components/Testimonial'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import api from '../../api/api'

class Course extends Component {

	render(){

		return (
			<div>
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
									<a href="images/blog/full/17.jpg" data-lightbox="image">
										<img className="image_fade" src="/images/blog/standard/17.jpg" alt="Standard Post with Image" />
									</a>
								</div>
								<div className="entry-title">
									<h2><a href="blog-single.html">This is a Standard post with a Preview Image</a></h2>
								</div>
								<ul className="entry-meta clearfix">
									<li><a href="#"><i className="icon-user"></i> admin</a></li>
									<li><i className="icon-folder-open"></i> <a href="#">General</a>, <a href="#">Media</a></li>
									<li><a href="blog-single.html#comments"><i className="icon-comments"></i> 13 Comments</a></li>
									<li><a href="#"><i className="icon-camera-retro"></i></a></li>
								</ul>
								<div className="entry-content">
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere.</p>
									<a href="blog-single.html"className="more-link">Read More</a>
								</div>
							</div>

							<div className="entry clearfix">
								<div className="entry-timeline">
									10<span>Feb</span>
									<div className="timeline-divider"></div>
								</div>
								<div className="entry-title">
									<h2><a href="blog-single.html">This is a Standard post with a Preview Image</a></h2>
								</div>
								<ul className="entry-meta clearfix">
									<li><a href="#"><i className="icon-user"></i> admin</a></li>
									<li><i className="icon-folder-open"></i> <a href="#">General</a>, <a href="#">Media</a></li>
									<li><a href="blog-single.html#comments"><i className="icon-comments"></i> 13 Comments</a></li>
									<li><a href="#"><i className="icon-camera-retro"></i></a></li>
								</ul>
								<div className="entry-content">
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, asperiores quod est tenetur in. Eligendi, deserunt, blanditiis est quisquam doloribus voluptate id aperiam ea ipsum magni aut perspiciatis rem voluptatibus officia eos rerum deleniti quae nihil facilis repellat atque vitae voluptatem libero at eveniet veritatis ab facere.</p>
									<a href="blog-single.html"className="more-link">Read More</a>
								</div>
							</div>

							<div className="entry clearfix">
								<div className="entry-timeline">
									21<span>Mar</span>
									<div className="timeline-divider"></div>
								</div>
								<div className="entry-image">
									<div className="panel panel-default">
										<div className="panel-body">
											Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, fuga optio voluptatibus saepe tenetur aliquam debitis eos accusantium! Vitae, hic, atque aliquid repellendus accusantium laudantium minus eaque quibusdam ratione sapiente.
										</div>
									</div>
								</div>
								<ul className="entry-meta clearfix">
									<li><a href="#"><i className="icon-user"></i> admin</a></li>
									<li><i className="icon-folder-open"></i> <a href="#">Status</a>, <a href="#">News</a></li>
									<li><a href="blog-single.html#comments"><i className="icon-comments"></i> 11 Comments</a></li>
									<li><a href="#"><i className="icon-align-justify2"></i></a></li>
								</ul>
							</div>

						</div>
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
        testimonials: state.staticReducer.testimonials
    }
}


export default connect(stateToProps)(Course)