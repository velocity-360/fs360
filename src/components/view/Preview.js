import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './style'

export default (props) => {
    const course = props.course
    const schema = course.schema
    const detail = (schema == 'course') ? course.dates : <span>{ (course.price == 0) ? 'Free' : '$'+course.price}</span>


    return (
        <div className="container_styled_1" style={{borderBottom:'1px solid #ededed'}}>
            <div className="container margin_60">
                <div className="row">
                    <div className="col-md-3 col-md-offset-1">
                        <figure className="room_pic">
                            <a href={'/course/'+course.slug}>
                                <img src={'https://media-service.appspot.com/site/images/'+course.image+'?crop=260'} alt="Velocity 360" className="img-responsive" />
                            </a>
                        </figure>
                    </div>
                    <div className="col-md-6 col-md-offset-1">
                        <div className="room_desc_home">
                            <h3><a href={'/course/'+course.slug}>{course.title}</a></h3>
                            <p>{course.description}</p>
                            <a href={'/course/'+course.slug} className="btn_1 white">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


