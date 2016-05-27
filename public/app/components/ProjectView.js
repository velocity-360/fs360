import React, { Component } from 'react'

class ProjectView extends Component {
	constructor(props, context){
		super(props, context)

	}

	render(){
		var tags = this.props.project.tags.map(function(tag, i){
			return <a href="#">{tag}</a>

		})

		return (
			<div className="panel panel-default" style={{padding:36}}>
				<img style={{width:'120', marginBottom:16, float:'left', marginRight:24}} src={'https://media-service.appspot.com/site/images/'+this.props.project.image+'?crop=420'} />
				<i onClick={this.toggleEditing} className="i-plain icon-edit"></i>															
				<h2>{this.props.project.title}</h2>
				<hr />
				<div className="tagcloud clearfix">
					{tags}
				</div>

				<div style={{marginTop:36, padding:16, border:'1px solid #ddd', textAlign:'center', background:'#f9f9f9'}}>
                    <div className="masonry-thumbs col-4">
                        <a href="/images/logo_round_blue_260.png" data-lightbox="image">
                            <img style={{width:96}} src="/images/logo_round_blue_260.png" alt="Single Image" />
                            <div style={{width:96}} className="overlay"><div className="overlay-wrap"><i className="icon-line-plus"></i></div></div>
                        </a>
                        <a href="/images/logo_round_blue_260.png" data-lightbox="image">
                            <img style={{width:96}} src="/images/logo_round_blue_260.png" alt="Single Image" />
                            <div style={{width:96}} className="overlay"><div className="overlay-wrap"><i className="icon-line-plus"></i></div></div>
                        </a>
                        <a href="/images/logo_round_blue_260.png" data-lightbox="image">
                            <img style={{width:96}} src="/images/logo_round_blue_260.png" alt="Single Image" />
                            <div style={{width:96}} className="overlay"><div className="overlay-wrap"><i className="icon-line-plus"></i></div></div>
                        </a>
                        <a href="/images/logo_round_blue_260.png" data-lightbox="image">
                            <img style={{width:96}} src="/images/logo_round_blue_260.png" alt="Single Image" />
                            <div style={{width:96}} className="overlay"><div className="overlay-wrap"><i className="icon-line-plus"></i></div></div>
                        </a>
                    </div>
                </div>

                <h3 style={{marginTop:36, marginBottom:0}}>Summary</h3>
				<p>
					{this.props.project.description}
				</p>											
			</div>
		)
	}

}

export default ProjectView