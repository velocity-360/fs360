import React from 'react'
import styles from './style'

export default ({content}) => {
    switch (content){
        case 'header':
            return (header)

        case 'articles':
            return (articles)

        case 'velocityAdvantage':
            return (velocityAdvantage)

        case 'testimonials':
            return (testimonials)

        case 'companies':
            return (companies)

        default:
            return (velocityAdvantage)
    }
}

const header = (
    <section className="page-section section parallax dark" style={{background: 'url("/images/oc-dark-blue.jpg") center', overflow:'visible', margin:0}} data-height-lg="425" data-height-md="425" data-height-sm="850" data-height-xs="850" data-height-xxs="850">
        <div className="vertical-middle">
            <div className="heading-block center nobottomborder">
                <h1 style={styles.titleWhite} data-animate="fadeInUp">Become a Full Stack Developer</h1>
                <span style={{fontWeight:300}} data-animate="fadeInUp" data-delay="300">
                    Velocity 360 is the only coding bootcamp that trains students for the future 
                    of software - Node, React, and React Native.
                </span>
                <br /><br />

                <div data-animate="fadeIn" data-delay="800">
                    <button className="btn btn-lg btn-info nomargin" value="submit" type="submit">Request Syllabus</button>
                    <br /><br />
                    <h4 style={styles.titleWhite}>Next Cohort Begins January 9th</h4>
                </div>                          
            </div>
        </div>
    </section>
)

const articles = (
    <section className="notopmargin nobottommargin">
        <div className="container clearfix">
            <div className="col_two_third nobottommargin">
                <div className="heading-block topmargin-lg" style={{marginBottom:20}}>
                    <h2 style={styles.title}>Prepare for tomorrow</h2>
                </div>

                <p style={styles.paragraph}>
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
                    <i style={styles.paragraph}>* Cleary React is the winner here, Facebook did enormous job delivering a good technology and even better job convincing the JS crowd how good it is...it looks like the battle is lost.</i>
                    <br />
                    <a target="_blank" style={{fontWeight:100, float:'right'}} href="https://blog.whoishiring.io/hacker-news-who-is-hiring-thread-part-3/#front endframeworks">- Sebastian Pawluś, WhoIsHiring.io</a>
                </div>
            </div>

            <div className="col_one_third col_last nobottommargin topmargin-lg">
                <img style={{padding:6, background:'#fff', border:'1px solid #ddd'}} src="/images/girl.png" alt="Velocity 360" className="center-block" />
            </div>

        </div>
    </section>
)

const companies = (
    <section style={{background:'#FDFEFE', paddingTop:48, borderTop:'1px solid #ddd'}}>
        <div className="content-wrap" style={{paddingTop:0}}>
            <div className="container clearfix">
                <div className="heading-block bottommargin-lg" style={{marginBottom:20}}>
                    <h2 style={styles.title}>Our Students Currently Work At</h2>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <img style={styles.company} src="/images/crains.png" alt="Velocity 360" />
                    </div>
                    <div className="col-md-3">
                        <img style={styles.company} src="/images/bloomberg.png" alt="Velocity 360" />
                    </div>
                    <div className="col-md-3">
                        <img style={styles.company} src="/images/nytimes.png" alt="Velocity 360" />
                    </div>
                    <div className="col-md-3">
                        <img style={styles.company} src="/images/codeacademy.png" alt="Velocity 360" />
                    </div>
                </div>
            </div>
        </div>
    </section>
)

const testimonials = (
    <section id="section-testimonials" className="page-section section parallax dark" style={{backgroundImage: 'url("/images/joe_blue.png")', padding:'100px 0', margin:0}} data-stellar-background-ratio="0.3">
        <div className="container clearfix">
            <div className="col_half nobottommargin">
                <div className="heading-block center">
                    <h4 style={styles.titleWhite}>Harsh Sinha, Bloomberg</h4>
                    <img style={{marginTop:12}} src="/images/harsh.png" />
                </div>

                <div className="fslider testimonial testimonial-full nobgcolor noborder noshadow nopadding" data-arrows="false">
                    <div className="testi-content">
                        <p style={{color:'#fff'}}>
                            I came into Velocity 360 as an experienced developer looking to sharpen my knowledge in react.js and web applications. Dan Kwon did a fantastic job guiding us into subject at a pace that worked for everybody.
                            We all began the class with many questions about Node, React, and Redux. But by the end we were able to create an actual project with real world applications.
                        </p>
                        <a target="_blank" href="https://www.coursereport.com/schools/velocity">Read More</a>
                    </div>
                </div>
            </div>

            <div className="col_half nobottommargin col_last">
                <div className="heading-block center">
                    <h4 style={styles.titleWhite}>Rob Ungar, Code Academy</h4>
                    <img style={{marginTop:12}} src="/images/rob.png" />
                </div>

                <div className="fslider testimonial testimonial-full nobgcolor noborder noshadow nopadding" data-arrows="false">
                    <div className="testi-content">
                        <p style={{color:'#fff'}}>
                            This is the best learning experience in my journey to become a developer...You are coding on day one, there are no long lectures about theory. You code along and things are explained as you go. And then you build the project again. 
                        </p>
                        <a target="_blank" href="https://www.coursereport.com/schools/velocity">Read More</a>
                    </div>
                </div>
            </div>
        </div>

        <div style={{textAlign:'center', marginTop:36}}>
            <div className="heading-block center">
                <h2 style={styles.titleWhite}>Read More Reviews</h2>
            </div>

            <div className="row">
                <div className="col-md-2 col-md-offset-4">
                    <a target="_blank" href="https://www.switchup.org/bootcamps/velocity-360">
                        <img style={{marginBottom:24}} src="/images/switchup.png" />
                    </a>
                </div>
                <div className="col-md-2">
                    <a target="_blank" href="https://www.coursereport.com/schools/velocity">
                        <img src="/images/coursereport.png" />
                    </a>
                </div>
            </div>
        </div>
    </section>

)

const velocityAdvantage = (
    <section style={{background:'#FDFEFE', borderTop:'1px solid #ddd'}} id="section-about" className="page-section nobottommargin section">
        <div className="container clearfix">
            <div className="heading-block bottommargin-lg" style={{marginBottom:20}}>
                <h2 style={styles.title}>The Velocity Advantage</h2>
            </div>

            <div className="col_one_third">
                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>True Full <span>Stack</span></h4>
                </div>
                <img style={{marginBottom:12}} src="/images/aws.png" />
                <p style={{fontWeight:100}}>
                    At Velocity 360, students learn ALL areas of the stack: backend, front end, mobile, 
                    and even dev ops. Through Node, React and React Native, we are able to focus on a 
                    wider range of areas because the concepts are transferrable. This is a key reason 
                    why React & React Native are becoming so popular - one set of concepts can be applied 
                    to both web and mobile development. Our course highly emphasizes this cross-compatibility 
                    preparing students for careers in almost any aspect of software development.
                </p>
            </div>

            <div className="col_one_third">
                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>Small <span>Classes</span></h4>
                </div>
                <img style={{marginBottom:12}} src="/images/class-2.jpg" />
                <p style={{fontWeight:100}}>
                    The average class size at Velocity is 10 students. We take very careful measures to 
                    ensure that the students selected for each cohort are qualified, motivated and prepared 
                    to succeed beyond the course. The tech bootcamp industry is quickly developing a 
                    reputation for churning out unqualified devs and much of this is due to students enrolling 
                    for the wrong reasons. We make sure our students are pursuing a career in software for the 
                    right reasons.
                </p>

            </div>

            <div className="col_one_third col_last">
                <div className="heading-block fancy-title nobottomborder title-bottom-border">
                    <h4 style={styles.title}>Modern <span>Curriculum</span></h4>
                </div>
                <img style={{marginBottom:12}} src="/images/node-react.png" />
                <p style={styles.paragraph}>
                    While other bootcamps continue to teach Ruby on Rails (Dev Bootcamp, Flatiron 
                    School, General Assembly, NYCDA, App Academy, etc) and have been doing so for 
                    several years, Velocity 360 is the only bootcamp in NYC that focuses on the 
                    tremendously growing Node/React/React-Native ecosystem. Rather than joining the 
                    mass of Ruby on Rails devs that graduate from bootcamps every three months, you 
                    will leave Velocity 360 with the skills highly in demand yet hard to find in the 
                    tech world.
                </p>
            </div>
        </div>
        <div style={{textAlign:'center'}}>
            <iframe src="https://player.vimeo.com/video/183060655" width="640" height="360" frameBorder="0"></iframe>
            <p>
                <a target="_blank" href="https://vimeo.com/183060655">Velocity360</a> on 
                <a target="_blank" href="https://vimeo.com"> Vimeo</a>
            </p>
        </div>
    </section>
)