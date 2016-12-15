import React, { Component } from 'react'
import styles from './styles'

class Online extends Component {
	render(){
        const style = styles.home
        
		return (
            <div>
                <div className="heading-block topmargin-lg" style={{marginBottom:20}}>
                    <h2 style={styles.title}>Online</h2>
                </div>

                <p style={style.paragraph}>
                    Technology, more than any other industry, changes rapidly and many fall behind. 
                    As a newcomer to tech, it is imperative to understand the trends and develop the 
                    skills that will be valued tomorrow over those in vogue today. Velocity 360 
                    strongly prepares students under that guiding principle. Our curriculum is highly 
                    focused on the bleeding edge of tech evolution: Node JS, React, and React Native.
                </p>

                <table style={{background:'#fff', border:'1px solid #ddd'}} className="table table-striped">
                    <thead>
                        <tr><td><strong>Article</strong></td><td><strong>Source</strong></td></tr>
                    </thead>

                    <tbody>
                        <tr className="info"><td><a target="_blank" href="http://stackoverflow.com/research/developer-survey-2016#technology-trending-tech-on-stack-overflow">2016 Developer Survey Results</a></td><td>Stack Overflow</td></tr>
                        <tr><td><a target="_blank" href="https://www.youtube.com/watch?v=sBzRwzY7G-k">2016/2017 Must-Know Web Development Tech</a></td><td>YouTube</td></tr>
                        <tr className="info"><td><a target="_blank" href="https://blog.whoishiring.io/hacker-news-who-is-hiring-thread-part-3/#front endframeworks">Hacker News “Who is Hiring?” - Supporting Technologies</a></td><td>Hacker News</td></tr>
                        <tr><td><a href="https://www.velocity360.io/post/starting-out-today">Starting Out Today</a></td><td>Velocity 360</td></tr>
                    </tbody>
                </table>
                <div>
                    <i style={style.paragraph}>* Cleary React is the winner here, Facebook did enormous job delivering a good technology and even better job convincing the JS crowd how good it is...it looks like the battle is lost.</i>
                    <br />
                    <a target="_blank" style={{fontWeight:100, float:'right'}} href="https://blog.whoishiring.io/hacker-news-who-is-hiring-thread-part-3/#front endframeworks">- Sebastian Pawluś, WhoIsHiring.io</a>
                </div>
			</div>
		)
	}
}

export default Online
