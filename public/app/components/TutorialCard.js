import React, { Component } from 'react'
import { TextUtils } from '../utils'


class TutorialCard extends Component {

	render(){
		const tutorial = this.props.tutorial
        const link = (tutorial.status == 'live') ? <a href={'/tutorial/'+tutorial.slug} className="button button-3d button-mini button-rounded button-teal">View</a> : <a href='#' className="button button-3d button-mini button-rounded button-teal">Coming Soon!</a>
        const price = (tutorial.price == 0) ? 'FREE' : '$'+tutorial.price
        const background = (this.props.bg == null) ? '#f9f9f9' : this.props.bg


		return (
            <div className="col-md-4">
                <div style={{width:92+'%', margin:'auto', background:background, border:'1px solid #ddd', textAlign:'center', padding:16, marginBottom:32}}>
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
	}
}

export default TutorialCard