import React, { Component } from 'react'

class CourseSection extends Component {

	render(){
		console.log('ACCOUNT TYPE: '+this.props.accountType)

		// var videoThumb = null;
		// if (this.props.course.type == 'online'){
		// 	videoThumb = <div className={'wistia_embed wistia_async_'+this.props.unit.wistia+' videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>
		// }


		var videoThumb = null;
		if (this.props.course.type == 'online'){
			if (this.props.unit.index < 1){ // always show first video
				videoThumb = <div className={'wistia_embed wistia_async_'+this.props.unit.wistia+' videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>
			}
			else if (this.props.accountType == 'premium'){ // premium subscriber
				videoThumb = <div className={'wistia_embed wistia_async_'+this.props.unit.wistia+' videoFoam=true'} style={{height:200, width:356, marginTop:12}}>&nbsp;</div>
			}
			else if (this.props.accountType == 'basic' || this.props.accountType == ''){
				videoThumb = <div style={{border:'1px solid #ddd', padding:12, background:'#f9f9f9', marginTop:12, marginBottom:12}}>To view this video, please <a style={{color:'red'}} onClick={this.subscribeAction} href="#">upgrade</a> your account to Premium</div>
			}
			else { // not logged in
				videoThumb = <div style={{border:'1px solid #ddd', padding:12, background:'#f9f9f9', marginTop:12, marginBottom:12}}>Please log in or <a style={{color:'red'}} href="/#register">register</a> to view this video.</div>
			}
		}

	// if (this.props.course.type == 'online'){
		// if (this.props.unit.index < 2){ // always show first video
		// 	videoThumb = <span className={'wistia_embed wistia_async_'+this.props.section.wistia+' popover=true popoverAnimateThumbnail=true'} style={{display:'inline-block',height:168,width:300,marginTop:24}}>&nbsp;</span>;
		// }
		// else if (this.props.accountType == 'premium'){
		// 	videoThumb = <span className={'wistia_embed wistia_async_'+this.props.section.wistia+' popover=true popoverAnimateThumbnail=true'} style={{display:'inline-block',height:168,width:300,marginTop:24}}>&nbsp;</span>;
		// }
		// else if (this.props.accountType == 'basic' || this.props.accountType == ''){
		// 	videoThumb = <div style={{border:'1px solid #ddd', padding:12, background:'#fff', marginTop:12, marginBottom:12}}>To view this video, please <a style={{color:'red'}} onClick={this.subscribeAction} href="#">upgrade</a> your account to Premium</div>
		// }
			// else if (this.props.accountType == 'none'){ // not logged in
			// 	videoThumb = <div style={{border:'1px solid #ddd', padding:12, background:'#fff', marginTop:12, marginBottom:12}}>Please log in or <a style={{color:'red'}} href="/premium">register</a> to view this video.</div>
			// }
		// }

		return (
			<div className="entry clearfix">
				<div className="entry-timeline">
					Unit<span>{this.props.unit.index+1}</span>
					<div className="timeline-divider"></div>
				</div>
				<div className="entry-image">
					<div className="panel panel-default">
						<div className="panel-body" style={{padding:36}}>
							<h2>{this.props.unit.topic}</h2>
							<hr />
							{this.props.unit.description}<br />
							{videoThumb}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CourseSection