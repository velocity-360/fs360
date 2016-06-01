import React, { Component } from 'react'
import TextUtils from '../utils/TextUtils'


class CourseCopy extends Component {

	render(){
		var faq = this.props.questions.map(function(qa, i){
			return (
				<div key={i}>
					<h4><strong>Q.</strong> {qa.question}</h4>
					<p dangerouslySetInnerHTML={{__html: qa.answer}}></p>
					<div className="line"></div>
				</div>
			)
		});

		return (
			<section id="content" style={{backgroundColor: '#fff', paddingBottom:48}}>
				<div className="row common-height clearfix" style={{background:'#fff', border:'1px solid #ddd'}}>
					<div className="col-sm-8 col-padding">
						<div>
							<div className="heading-block">
								<h3>Prepare for Tomorrow</h3>
							</div>

							<div className="row clearfix">
								<div className="col-md-10">
									<p>
										Our Mission is to teach you tomorrow’s technology, today.  If you want to work for a leading tech firm, for a technology startup, or become an entrepreneur, our classes will put you on the right track to achieve these goals.  This iOS class is based entirely on Swift language, which is the main language you will need to know while developing the majority of iOS app.  In our iOS class you will not be learning how to program games, however you will be able to learn how to develop social media applications similar to Snapchat and Instagram.
									</p>
									<p>
										Even if you do not want to become a professional developer and have it become your lifelong career, learning how an iOS app developed will give you the edge both in the immediate and distant future.  It might be a cliché, but learning how to code will empower you to act on future ideas.  For example if you are sitting in class one day and think of the next great social media app, it doesn’t have to just be a pipe dream or something that you would have to rely on someone else to build, it could be a project that you start building right away.
									</p>
									<a target="_blank" href="https://www.facebook.com/FullStack-360-1631852427085987/" className="social-icon inline-block si-small si-light si-rounded si-facebook">
										<i className="icon-facebook"></i>
										<i className="icon-facebook"></i>
									</a>
									<a target="_blank" href="https://twitter.com/fullstack360" className="social-icon inline-block si-small si-light si-rounded si-twitter">
										<i className="icon-twitter"></i>
										<i className="icon-twitter"></i>
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
										<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/class.jpg" alt="FullStack 360" />
									</div>
									<div className="entry-title">
										<h3>Small Classes</h3>
										<hr />
									</div>
									<div className="entry-content">
										<p>
											Our average class size is six students and the maximum per class is ten. Every student recieves individual attenttion and no one falls far behind.
										</p>
									</div>
								</div>
							</div>

							<div className="col-md-4 col-sm-6 bottommargin">
								<div className="ipost clearfix">
									<div className="entry-image">
										<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/phone.jpg" alt="FullStack 360" />
									</div>
									<div className="entry-title">
										<h3>Realistic Projects</h3>
										<hr />
									</div>
									<div className="entry-content">
										<p>
											All courses are taught by current professionals who work on real projects. As such, our curriculum is heavily driven by the skills required in the tech industry and prepares our students for the challenges they will face.
										</p>
									</div>
								</div>
							</div>

							<div className="col-md-4 col-sm-6 bottommargin">
								<div className="ipost clearfix">
									<div className="entry-image">
										<img style={{background:'#fff', padding:6, border:'1px solid #ddd'}} className="image_fade" src="/images/joe.jpg" alt="FullStack 360" />
									</div>
									<div className="entry-title">
										<h3>Cutting Edge Curriculum</h3>
										<hr />
									</div>
									<div className="entry-content">
										<p>
											Ruby on Rails? Django? Ember? Backbone? PHP? Angular? Swift? Objective C? Node? JavaScript? React? To beginners, the tech landscape is overwhelming and the wrong choice can waste a lot of time and money. We make the right choices for you. Simple as that.
										</p>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>

				<div className="container clearfix">
					<div id="faqs" className="faqs">
						<h3 style={{marginTop:48}}>Frequently Asked Questions:</h3>
						<div className="divider"><i className="icon-circle"></i></div>

						<div className="col_full nobottommargin">
							{faq}
						</div>
					</div>
				</div>

			</section>


		)
	}

}

export default CourseCopy